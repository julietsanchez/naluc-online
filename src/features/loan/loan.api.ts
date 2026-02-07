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

export async function getApplicationStatus(dni: string): Promise<ApplicationStatusResponse> {
  await delay(600);

  const cleanDni = dni.replace(/\D/g, "");

  if (cleanDni.length < 7) {
    return {
      found: false,
      status: "not_found",
      applicantName: "",
      dni: cleanDni,
      applicationId: "",
      loanAmount: 0,
      installmentsCount: 0,
      monthlyPayment: 0,
      timeline: [],
      installments: [],
    };
  }

  const today = new Date();
  const installments: ApplicationStatusResponse["installments"] = [];
  for (let i = 1; i <= 12; i++) {
    const dueDate = new Date(today.getFullYear(), today.getMonth() + i, 15);
    installments.push({
      number: i,
      amount: 28750,
      dueDate: dueDate.toISOString(),
      status: i <= 2 ? "paid" : i === 3 ? "pending" : "pending",
      paidDate: i <= 2 ? new Date(today.getFullYear(), today.getMonth() + i - 1, 14).toISOString() : undefined,
    });
  }

  return {
    found: true,
    status: "credito_confirmado",
    applicantName: "Julieta Sánchez",
    dni: cleanDni,
    applicationId: "NAL-2026-00847",
    loanAmount: 200000,
    installmentsCount: 12,
    monthlyPayment: 28750,
    timeline: [
      { step: "Solicitud en progreso", date: new Date(today.getTime() - 5 * 86400000).toISOString(), completed: true, active: false },
      { step: "Depósito en progreso", date: new Date(today.getTime() - 3 * 86400000).toISOString(), completed: true, active: false },
      { step: "Confirmación de crédito", date: new Date(today.getTime() - 1 * 86400000).toISOString(), completed: true, active: true },
    ],
    installments,
  };
}
