/**
 * Cliente API para préstamos. Mock con setTimeout; reemplazar por request() real cuando exista backend.
 */

import type { LoanSimulationInput } from "./loan.types";
import type {
  SimulateLoanResponse,
  StartApplicationResponse,
  VerifyPhoneResponse,
  CreditCheckResponse,
  SubmitApplicationResponse,
  ApplicationStatusResponse,
} from "./loan.types";
import { calculateLoanSimulation } from "./loan.calculations";
import { CFT_ANNUAL_PERCENT } from "@/lib/constants";

const MOCK_DELAY_MS = 400;

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function randomId(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export async function simulateLoan(input: LoanSimulationInput): Promise<SimulateLoanResponse> {
  await delay(MOCK_DELAY_MS);
  const result = calculateLoanSimulation(input);
  return {
    monthlyPayment: result.monthlyPayment,
    totalRepayment: result.totalRepayment,
    cft: result.cft,
  };
}

export interface StartApplicationPayload {
  dni: string;
  email: string;
  phone: string;
}

export async function startApplication(payload: StartApplicationPayload): Promise<StartApplicationResponse> {
  await delay(MOCK_DELAY_MS);
  return { applicationId: randomId() };
}

/**
 * Verifica el código OTP enviado al teléfono del solicitante.
 * Mock: el código válido es siempre "1234".
 */
export async function verifyPhone(_phone: string, code: string): Promise<VerifyPhoneResponse> {
  await delay(MOCK_DELAY_MS);
  return { verified: code === "1234" };
}

/**
 * Consulta la solvencia crediticia del solicitante por DNI.
 * Mock: siempre aprueba con el monto solicitado y nombre hardcodeado.
 */
export async function checkCredit(
  _dni: string,
  amount: number,
  installments: number
): Promise<CreditCheckResponse> {
  await delay(800);
  const monthlyRate = Math.pow(1 + CFT_ANNUAL_PERCENT / 100, 1 / 12) - 1;
  const monthlyPayment =
    installments === 1
      ? amount * (1 + monthlyRate)
      : (amount * monthlyRate * Math.pow(1 + monthlyRate, installments)) /
        (Math.pow(1 + monthlyRate, installments) - 1);

  return {
    approved: true,
    maxAmount: amount,
    firstName: "Julieta",
    installments,
    monthlyPayment: Math.round(monthlyPayment * 100) / 100,
  };
}

export async function updateApplication(
  _applicationId: string,
  _payload: Record<string, unknown>
): Promise<{ ok: boolean }> {
  await delay(MOCK_DELAY_MS);
  return { ok: true };
}

export async function submitApplication(_applicationId: string): Promise<SubmitApplicationResponse> {
  await delay(MOCK_DELAY_MS);
  return {
    status: "received",
    applicationId: _applicationId,
  };
}

export interface GetStatusQuery {
  dni: string;
  applicationId: string;
}

export async function getApplicationStatus(query: GetStatusQuery): Promise<ApplicationStatusResponse> {
  await delay(MOCK_DELAY_MS);
  return {
    status: "received",
    applicationId: query.applicationId,
    timeline: [
      { step: "Solicitud recibida", date: new Date().toISOString(), completed: true },
      { step: "Validación de datos", date: "", completed: false },
      { step: "Respuesta", date: "", completed: false },
    ],
  };
}
