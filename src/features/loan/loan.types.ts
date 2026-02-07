/**
 * DTOs y tipos para el flujo de solicitud de préstamo.
 */

export interface LoanSimulationInput {
  amount: number;
  installments: number;
}

export interface LoanSimulationResult {
  monthlyPayment: number;
  totalRepayment: number;
  cft: number;
}

export interface ApplicantStart {
  dni: string;
  email: string;
  phone: string;
}

export interface CreditCheckResult {
  approved: boolean;
  maxAmount: number;
  firstName: string;
  installments: number;
  monthlyPayment: number;
}

export interface ApplicantPersonalData {
  firstName: string;
  lastName: string;
  birthDate: string;
  address: string;
  province: string;
  city: string;
  employmentStatus: string;
  monthlyIncome: number;
  bank: string;
  cbuOrAlias: string;
}

export interface LoanApplicationDraft {
  simulation: LoanSimulationInput & LoanSimulationResult;
  start: ApplicantStart | null;
  phoneVerified: boolean;
  acceptedTermsAndPrivacy: boolean;
  creditCheck: CreditCheckResult | null;
  personal: ApplicantPersonalData | null;
  contractSigned: boolean;
  signatureDataUrl: string | null;
  acceptedContractTerms: boolean;
  applicationId: string | null;
}

export interface SimulateLoanResponse {
  monthlyPayment: number;
  totalRepayment: number;
  cft: number;
}

export interface StartApplicationResponse {
  applicationId: string;
}

export interface VerifyPhoneResponse {
  verified: boolean;
}

export interface CreditCheckResponse {
  approved: boolean;
  maxAmount: number;
  firstName: string;
  installments: number;
  monthlyPayment: number;
}

export interface SubmitApplicationResponse {
  status: string;
  applicationId: string;
}

export interface ApplicationStatusResponse {
  status: string;
  applicationId: string;
  timeline?: { step: string; date: string; completed: boolean }[];
}
