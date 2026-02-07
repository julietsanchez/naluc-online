/**
 * Cálculo de cuota para UI con CFT 200% anual.
 */

import {
  LOAN_AMOUNT_MIN,
  LOAN_AMOUNT_MAX,
  INSTALLMENTS_MIN,
  INSTALLMENTS_MAX,
  MOCK_MONTHLY_RATE,
  CFT_ANNUAL_PERCENT,
} from "@/lib/constants";
import type { LoanSimulationInput, LoanSimulationResult } from "./loan.types";

function clampAmount(amount: number): number {
  return Math.max(LOAN_AMOUNT_MIN, Math.min(LOAN_AMOUNT_MAX, Math.round(amount)));
}

function clampInstallments(installments: number): number {
  return Math.max(INSTALLMENTS_MIN, Math.min(INSTALLMENTS_MAX, Math.round(installments)));
}

/**
 * Cuota = capital * (r * (1+r)^n) / ((1+r)^n - 1)
 * con r = tasa mensual derivada del CFT 200%, n = cantidad de cuotas.
 */
export function calculateLoanSimulation(input: LoanSimulationInput): LoanSimulationResult {
  const amount = clampAmount(input.amount);
  const n = clampInstallments(input.installments);
  const r = MOCK_MONTHLY_RATE;

  if (n <= 0) {
    return {
      monthlyPayment: 0,
      totalRepayment: amount,
      cft: CFT_ANNUAL_PERCENT,
    };
  }

  if (n === 1) {
    const monthlyPayment = amount * (1 + r);
    return {
      monthlyPayment,
      totalRepayment: monthlyPayment,
      cft: CFT_ANNUAL_PERCENT,
    };
  }

  const factor = Math.pow(1 + r, n);
  const monthlyPayment = (amount * (r * factor)) / (factor - 1);
  const totalRepayment = monthlyPayment * n;

  return {
    monthlyPayment,
    totalRepayment,
    cft: CFT_ANNUAL_PERCENT,
  };
}
