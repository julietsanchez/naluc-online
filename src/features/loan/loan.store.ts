/**
 * Store Zustand para el draft de solicitud. Persistencia opcional en localStorage.
 * Storage seguro para SSR: en el servidor no hay localStorage, se usa un no-op.
 */

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type {
  LoanApplicationDraft,
  LoanSimulationInput,
  LoanSimulationResult,
  ApplicantStart,
  ApplicantPersonalData,
  CreditCheckResult,
} from "./loan.types";
import { calculateLoanSimulation } from "./loan.calculations";
import { LOAN_AMOUNT_MIN, INSTALLMENTS_MIN } from "@/lib/constants";

const defaultSimulation = calculateLoanSimulation({
  amount: LOAN_AMOUNT_MIN,
  installments: INSTALLMENTS_MIN,
});

const initialState: LoanApplicationDraft = {
  simulation: {
    amount: LOAN_AMOUNT_MIN,
    installments: INSTALLMENTS_MIN,
    ...defaultSimulation,
  },
  start: null,
  phoneVerified: false,
  acceptedTermsAndPrivacy: false,
  creditCheck: null,
  personal: null,
  contractSigned: false,
  signatureDataUrl: null,
  acceptedContractTerms: false,
  applicationId: null,
};

const noopStorage = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
};

function getStorage() {
  if (typeof window === "undefined") return noopStorage;
  return window.localStorage;
}

type LoanStore = LoanApplicationDraft & {
  setSimulation: (input: LoanSimulationInput) => void;
  setSimulationResult: (result: LoanSimulationResult) => void;
  setStart: (data: ApplicantStart | null) => void;
  setPhoneVerified: (verified: boolean) => void;
  setAcceptedTermsAndPrivacy: (accepted: boolean) => void;
  setCreditCheck: (data: CreditCheckResult | null) => void;
  setPersonal: (data: ApplicantPersonalData | null) => void;
  setContractSigned: (signed: boolean) => void;
  setSignatureDataUrl: (url: string | null) => void;
  setAcceptedContractTerms: (accepted: boolean) => void;
  setApplicationId: (id: string | null) => void;
  reset: () => void;
};

export const useLoanStore = create<LoanStore>()(
  persist(
    (set) => ({
      ...initialState,
      setSimulation: (input) => {
        const result = calculateLoanSimulation(input);
        set(() => ({
          simulation: { ...input, ...result },
        }));
      },
      setSimulationResult: (result) => {
        set((s) => ({
          simulation: s.simulation ? { ...s.simulation, ...result } : { ...initialState.simulation, ...result },
        }));
      },
      setStart: (data) => set({ start: data }),
      setPhoneVerified: (verified) => set({ phoneVerified: verified }),
      setAcceptedTermsAndPrivacy: (accepted) => set({ acceptedTermsAndPrivacy: accepted }),
      setCreditCheck: (data) => set({ creditCheck: data }),
      setPersonal: (data) => set({ personal: data }),
      setContractSigned: (signed) => set({ contractSigned: signed }),
      setSignatureDataUrl: (url) => set({ signatureDataUrl: url }),
      setAcceptedContractTerms: (accepted) => set({ acceptedContractTerms: accepted }),
      setApplicationId: (id) => set({ applicationId: id }),
      reset: () => set(initialState),
    }),
    {
      name: "loan-application-draft",
      storage: createJSONStorage<Partial<LoanApplicationDraft>>(() => getStorage()),
      partialize: (s) => ({
        simulation: s.simulation,
        start: s.start,
        phoneVerified: s.phoneVerified,
        acceptedTermsAndPrivacy: s.acceptedTermsAndPrivacy,
        creditCheck: s.creditCheck,
        personal: s.personal,
        contractSigned: s.contractSigned,
        signatureDataUrl: s.signatureDataUrl,
        acceptedContractTerms: s.acceptedContractTerms,
        applicationId: s.applicationId,
      }),
    }
  )
);
