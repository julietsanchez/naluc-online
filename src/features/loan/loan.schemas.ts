/**
 * Schemas Zod para validación de cada paso del flujo.
 */

import { z } from "zod";
import { LOAN_AMOUNT_MIN, LOAN_AMOUNT_MAX, INSTALLMENTS_MIN, INSTALLMENTS_MAX } from "@/lib/constants";

export const loanSimulationSchema = z.object({
  amount: z
    .number()
    .min(LOAN_AMOUNT_MIN, `Mínimo ${LOAN_AMOUNT_MIN.toLocaleString("es-AR")}`)
    .max(LOAN_AMOUNT_MAX, `Máximo ${LOAN_AMOUNT_MAX.toLocaleString("es-AR")}`),
  installments: z
    .number()
    .min(INSTALLMENTS_MIN, `Mínimo ${INSTALLMENTS_MIN} cuotas`)
    .max(INSTALLMENTS_MAX, `Máximo ${INSTALLMENTS_MAX} cuotas`),
});

const dniRegex = /^\d{7,8}$/;

export const applicantStartSchema = z.object({
  dni: z
    .string()
    .min(1, "Ingresá tu DNI")
    .refine((v) => dniRegex.test(v.replace(/\D/g, "")), "DNI inválido (7 u 8 dígitos)"),
  email: z.string().min(1, "Ingresá tu email").email("Email inválido"),
  phone: z
    .string()
    .min(1, "Ingresá tu teléfono")
    .refine((v) => /^\d{10}$/.test(v), "Ingresá 10 dígitos sin 0 ni 15. Ej: 3812345678"),
});

export const phoneVerificationSchema = z.object({
  code: z
    .string()
    .length(4, "Ingresá el código de 4 dígitos")
    .regex(/^\d{4}$/, "El código debe ser numérico"),
  acceptedTermsAndPrivacy: z.literal(true, {
    errorMap: () => ({ message: "Debés aceptar los términos para continuar" }),
  }),
});

const cbuOrAliasRegex = /^(\d{22}|[a-zA-Z0-9.\-]{6,22})$/;

export const applicantPersonalSchema = z.object({
  firstName: z.string().min(2, "Nombre con al menos 2 caracteres").max(50, "Nombre demasiado largo"),
  lastName: z.string().min(2, "Apellido con al menos 2 caracteres").max(50, "Apellido demasiado largo"),
  birthDate: z.string().min(1, "Ingresá tu fecha de nacimiento"),
  address: z.string().min(5, "Dirección con al menos 5 caracteres").max(120, "Dirección demasiado larga"),
  province: z.string().min(1, "Seleccioná una provincia"),
  city: z.string().min(2, "Ciudad con al menos 2 caracteres").max(80, "Ciudad demasiado larga"),
  employmentStatus: z.string().min(1, "Seleccioná tu situación laboral"),
  monthlyIncome: z
    .number({ invalid_type_error: "Ingresá un monto válido" })
    .min(1, "Ingresá tu ingreso mensual")
    .max(999_999_999, "Valor no válido"),
  bank: z.string().min(1, "Seleccioná tu banco"),
  cbuOrAlias: z
    .string()
    .refine(
      (v) => !v || v.trim() === "" || cbuOrAliasRegex.test(v.replace(/\s/g, "")),
      "CBU (22 dígitos) o Alias (6 a 22 caracteres)"
    ),
});

export const contractSignSchema = z.object({
  acceptedContractTerms: z.literal(true, {
    errorMap: () => ({ message: "Debés aceptar los términos legales de firma para continuar" }),
  }),
});

export type LoanSimulationForm = z.infer<typeof loanSimulationSchema>;
export type ApplicantStartForm = z.infer<typeof applicantStartSchema>;
export type PhoneVerificationForm = z.infer<typeof phoneVerificationSchema>;
export type ApplicantPersonalForm = z.infer<typeof applicantPersonalSchema>;
export type ContractSignForm = z.infer<typeof contractSignSchema>;
