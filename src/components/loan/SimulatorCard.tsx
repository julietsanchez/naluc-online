"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import Slider from "@/components/ui/Slider";
import { loanSimulationSchema, type LoanSimulationForm } from "@/features/loan/loan.schemas";
import { useLoanStore } from "@/features/loan/loan.store";
import { formatARS } from "@/lib/format";
import {
  LOAN_AMOUNT_MIN,
  LOAN_AMOUNT_MAX,
  LOAN_AMOUNT_STEP,
  INSTALLMENTS_MIN,
  INSTALLMENTS_MAX,
} from "@/lib/constants";
import { calculateLoanSimulation } from "@/features/loan/loan.calculations";
import { useMemo } from "react";
import { ArrowRight } from "lucide-react";

export default function SimulatorCard() {
  const router = useRouter();
  const setSimulation = useLoanStore((s) => s.setSimulation);

  const {
    register,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<LoanSimulationForm>({
    resolver: zodResolver(loanSimulationSchema),
    defaultValues: {
      amount: LOAN_AMOUNT_MIN,
      installments: INSTALLMENTS_MIN,
    },
  });

  const amountRaw = watch("amount");
  const installmentsRaw = watch("installments");
  const amount = typeof amountRaw === "number" ? amountRaw : LOAN_AMOUNT_MIN;
  const installments =
    typeof installmentsRaw === "number" ? installmentsRaw : INSTALLMENTS_MIN;

  const result = useMemo(
    () => calculateLoanSimulation({ amount, installments }),
    [amount, installments]
  );

  const registerAmount = register("amount", {
    valueAsNumber: true,
    onChange: (e) =>
      setValue("amount", e.target.valueAsNumber, { shouldValidate: true }),
  });
  const registerInstallments = register("installments", {
    valueAsNumber: true,
    onChange: (e) =>
      setValue("installments", e.target.valueAsNumber, {
        shouldValidate: true,
      }),
  });

  const onSubmit = (data: LoanSimulationForm) => {
    setSimulation({
      amount: data.amount,
      installments: data.installments,
    });
    router.push("/solicitud/inicio");
  };

  return (
    <div className="glass rounded-3xl p-6 sm:p-8 shadow-glow-lg">
      <h2 className="text-xl font-bold text-gray-900 mb-1">
        Simulá tu préstamo
      </h2>
      <p className="text-sm text-gray-500 mb-6">
        Elegí el monto y las cuotas que necesitás
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* ---- Monto ---- */}
        <div>
          <p className="text-sm font-medium text-gray-600 mb-2">
            ¿Cuánto necesitás?
          </p>
          <p className="text-3xl sm:text-4xl font-extrabold text-primary-600 mb-4 tracking-tight">
            {formatARS(amount)}
          </p>
          <Slider
            label="Monto del préstamo"
            hideLabel
            min={LOAN_AMOUNT_MIN}
            max={LOAN_AMOUNT_MAX}
            step={LOAN_AMOUNT_STEP}
            value={amount}
            error={errors.amount?.message}
            ref={registerAmount.ref}
            name={registerAmount.name}
            onBlur={registerAmount.onBlur}
            onChange={registerAmount.onChange}
          />
          <div className="flex justify-between mt-2">
            <span className="text-xs text-gray-400 font-medium">
              {formatARS(LOAN_AMOUNT_MIN)}
            </span>
            <span className="text-xs text-gray-400 font-medium">
              {formatARS(LOAN_AMOUNT_MAX)}
            </span>
          </div>
        </div>

        {/* ---- Cuotas ---- */}
        <div>
          <div className="flex items-baseline justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">
              Cantidad de cuotas
            </span>
            <span className="text-lg font-bold text-primary-600">
              {installments} cuotas
            </span>
          </div>
          <Slider
            label="Cantidad de cuotas"
            hideLabel
            min={INSTALLMENTS_MIN}
            max={INSTALLMENTS_MAX}
            step={1}
            value={installments}
            error={errors.installments?.message}
            ref={registerInstallments.ref}
            name={registerInstallments.name}
            onBlur={registerInstallments.onBlur}
            onChange={registerInstallments.onChange}
          />
          <div className="flex justify-between mt-2">
            <span className="text-xs text-gray-400 font-medium">
              {INSTALLMENTS_MIN} cuotas
            </span>
            <span className="text-xs text-gray-400 font-medium">
              {INSTALLMENTS_MAX} cuotas
            </span>
          </div>
        </div>

        {/* ---- Resultado ---- */}
        <div className="rounded-2xl bg-primary-50/80 p-5 space-y-2 border border-primary-100/60">
          <p className="text-sm font-semibold text-gray-600">Cuota estimada</p>
          <p className="text-2xl sm:text-3xl font-extrabold text-primary-700">
            {formatARS(result.monthlyPayment, true)}
          </p>
          <p className="text-sm font-medium text-gray-600">
            Total a devolver: {formatARS(result.totalRepayment)}
          </p>
          <p className="text-xs text-gray-400">
            CFT con IVA: {result.cft}%
          </p>
        </div>

        {/* ---- CTA ---- */}
        <Button
          type="submit"
          fullWidth
          size="lg"
          className="rounded-xl text-base font-bold py-3.5 gap-2"
        >
          Pedir préstamo
          <ArrowRight className="w-5 h-5" />
        </Button>

        <p className="text-xs text-center text-gray-400">
          *Sujeto a evaluación crediticia
        </p>
      </form>
    </div>
  );
}
