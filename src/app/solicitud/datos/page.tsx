"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { CheckCircle, Loader2 } from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import FileUpload from "@/components/ui/FileUpload";
import StepperNav from "@/components/layout/StepperNav";
import { applicantPersonalSchema, type ApplicantPersonalForm } from "@/features/loan/loan.schemas";
import { useLoanStore } from "@/features/loan/loan.store";
import { checkCredit } from "@/features/loan/loan.api";
import { formatARS } from "@/lib/format";
import { PROVINCES_AR, EMPLOYMENT_STATUS_OPTIONS, BANKS_AR } from "@/lib/constants";
import type { CreditCheckResult } from "@/features/loan/loan.types";

type Phase = "loading" | "credit_result" | "form";

export default function SolicitudDatosPage() {
  const router = useRouter();
  const simulation = useLoanStore((s) => s.simulation);
  const start = useLoanStore((s) => s.start);
  const phoneVerified = useLoanStore((s) => s.phoneVerified);
  const personal = useLoanStore((s) => s.personal);
  const creditCheckStored = useLoanStore((s) => s.creditCheck);
  const setPersonal = useLoanStore((s) => s.setPersonal);
  const setCreditCheck = useLoanStore((s) => s.setCreditCheck);

  const [phase, setPhase] = useState<Phase>(creditCheckStored ? "form" : "loading");
  const [creditResult, setCreditResult] = useState<CreditCheckResult | null>(creditCheckStored);
  const [creditError, setCreditError] = useState<string | null>(null);

  const [dniFront, setDniFront] = useState<File | null>(null);
  const [dniBack, setDniBack] = useState<File | null>(null);
  const [salaryReceipt, setSalaryReceipt] = useState<File | null>(null);
  const [fileErrors, setFileErrors] = useState<{ dniFront?: string; dniBack?: string }>({});

  const hasFetchedRef = useRef(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<ApplicantPersonalForm>({
    resolver: zodResolver(applicantPersonalSchema),
    defaultValues: personal ?? {
      firstName: creditCheckStored?.firstName ?? "",
      lastName: "",
      birthDate: "",
      address: "",
      province: "",
      city: "",
      employmentStatus: "",
      monthlyIncome: undefined as unknown as number,
      bank: "",
      cbuOrAlias: "",
    },
  });

  useEffect(() => {
    if (!simulation?.amount || !start || !phoneVerified) {
      router.replace("/solicitud/verificacion");
      return;
    }
  }, [simulation, start, phoneVerified, router]);

  useEffect(() => {
    if (hasFetchedRef.current || creditCheckStored) return;
    hasFetchedRef.current = true;

    if (!start?.dni || !simulation?.amount || !simulation?.installments) return;

    checkCredit(start.dni.replace(/\D/g, ""), simulation.amount, simulation.installments)
      .then((result) => {
        setCreditResult(result);
        setCreditCheck(result);
        setPhase("credit_result");
        setValue("firstName", result.firstName);
      })
      .catch(() => {
        setCreditError("No pudimos verificar tu solvencia. Intentá de nuevo más tarde.");
        setPhase("credit_result");
      });
  }, [start, simulation, creditCheckStored, setCreditCheck, setValue]);

  const handleConfirmCredit = () => {
    setPhase("form");
  };

  const onSubmit = (data: ApplicantPersonalForm) => {
    const newFileErrors: { dniFront?: string; dniBack?: string } = {};
    if (!dniFront && !personal) {
      newFileErrors.dniFront = "Subí la foto del frente de tu DNI";
    }
    if (!dniBack && !personal) {
      newFileErrors.dniBack = "Subí la foto del dorso de tu DNI";
    }
    if (Object.keys(newFileErrors).length > 0) {
      setFileErrors(newFileErrors);
      return;
    }

    setPersonal({
      firstName: data.firstName,
      lastName: data.lastName,
      birthDate: data.birthDate,
      address: data.address,
      province: data.province,
      city: data.city,
      employmentStatus: data.employmentStatus,
      monthlyIncome: Number(data.monthlyIncome),
      bank: data.bank,
      cbuOrAlias: data.cbuOrAlias?.trim() ?? "",
    });
    queueMicrotask(() => {
      router.push("/solicitud/resumen");
    });
  };

  if (!simulation?.amount || !start || !phoneVerified) return null;

  return (
    <div className="space-y-6">
      <StepperNav />

      {/* Fase: Cargando verificación crediticia */}
      {phase === "loading" && (
        <Card className="border border-primary-100/50 text-center py-12">
          <Loader2 className="w-10 h-10 text-primary-600 animate-spin mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">Evaluando tu solicitud...</h2>
          <p className="text-sm text-gray-600">
            Estamos verificando tu información. Esto solo toma unos segundos.
          </p>
        </Card>
      )}

      {/* Fase: Resultado del crédito */}
      {phase === "credit_result" && (
        <Card className="border border-primary-100/50">
          {creditResult?.approved && !creditError ? (
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="rounded-full bg-green-100 p-4">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                ¡Buenas noticias, {creditResult.firstName}!
              </h2>
              <p className="text-gray-600 text-lg">Te podemos prestar hasta</p>
              <p className="text-4xl font-extrabold text-primary-600">
                {formatARS(creditResult.maxAmount)}
              </p>
              <div className="rounded-xl bg-primary-50/80 border border-primary-100 p-4 max-w-sm mx-auto">
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">{creditResult.installments} cuotas</span> de{" "}
                  <span className="font-semibold">
                    {formatARS(creditResult.monthlyPayment, true)}
                  </span>
                </p>
              </div>
              <Button onClick={handleConfirmCredit} className="mt-4">
                Confirmar y continuar
              </Button>
            </div>
          ) : (
            <div className="text-center space-y-4">
              <h2 className="text-xl font-bold text-gray-900">
                No pudimos procesar tu solicitud
              </h2>
              <p className="text-sm text-gray-600">
                {creditError ?? "Intentá de nuevo más tarde."}
              </p>
              <Link href="/">
                <Button variant="outline">Volver al inicio</Button>
              </Link>
            </div>
          )}
        </Card>
      )}

      {/* Fase: Formulario de datos personales */}
      {phase === "form" && (
        <Card className="border border-primary-100/50">
          {/* Banner de pre-aprobación */}
          {creditResult?.approved && (
            <div className="rounded-xl bg-green-50 border border-green-200 p-3 mb-6 flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
              <p className="text-sm text-green-800">
                <span className="font-semibold">Pre-aprobado:</span>{" "}
                {formatARS(creditResult.maxAmount)} en {creditResult.installments} cuotas de{" "}
                {formatARS(creditResult.monthlyPayment, true)}
              </p>
            </div>
          )}

          <h2 className="text-2xl font-bold text-gray-900 mb-1">Datos personales</h2>
          <p className="text-sm text-gray-600 mb-6">Completá tal como figuran en tu DNI.</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Nombre"
                error={errors.firstName?.message}
                {...register("firstName")}
              />
              <Input
                label="Apellido"
                error={errors.lastName?.message}
                {...register("lastName")}
              />
            </div>

            <Input
              label="Fecha de nacimiento"
              type="date"
              error={errors.birthDate?.message}
              {...register("birthDate")}
            />

            <Input
              label="Dirección"
              error={errors.address?.message}
              {...register("address")}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Select
                label="Provincia"
                options={PROVINCES_AR.map((p) => ({ value: p, label: p }))}
                placeholder="Seleccioná provincia"
                error={errors.province?.message}
                {...register("province")}
              />
              <Input
                label="Ciudad"
                error={errors.city?.message}
                {...register("city")}
              />
            </div>

            {/* Documentación */}
            <div className="border-t border-gray-100 pt-4 mt-4">
              <h3 className="font-bold text-gray-900 mb-3">Documentación</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FileUpload
                  label="DNI — Frente"
                  accept="image/*"
                  hint="Sacá una foto clara del frente de tu DNI"
                  required
                  capture="environment"
                  onFileSelect={(file) => {
                    setDniFront(file);
                    setFileErrors((prev) => ({ ...prev, dniFront: undefined }));
                  }}
                  error={fileErrors.dniFront}
                />
                <FileUpload
                  label="DNI — Dorso"
                  accept="image/*"
                  hint="Sacá una foto clara del dorso de tu DNI"
                  required
                  capture="environment"
                  onFileSelect={(file) => {
                    setDniBack(file);
                    setFileErrors((prev) => ({ ...prev, dniBack: undefined }));
                  }}
                  error={fileErrors.dniBack}
                />
              </div>
              <div className="mt-4">
                <FileUpload
                  label="Último recibo de sueldo"
                  accept="image/*,.pdf"
                  hint="Imagen o PDF de tu último recibo de haberes"
                  optional
                  onFileSelect={setSalaryReceipt}
                />
              </div>
            </div>

            {/* Datos laborales y bancarios */}
            <div className="border-t border-gray-100 pt-4 mt-4">
              <h3 className="font-bold text-gray-900 mb-3">Datos laborales y bancarios</h3>
              <div className="space-y-4">
                <Select
                  label="Situación laboral"
                  options={EMPLOYMENT_STATUS_OPTIONS.map((o) => ({
                    value: o.value,
                    label: o.label,
                  }))}
                  placeholder="Seleccioná"
                  error={errors.employmentStatus?.message}
                  {...register("employmentStatus")}
                />
                <Input
                  label="Ingreso mensual (ARS)"
                  type="number"
                  min={0}
                  max={99999999}
                  step={1000}
                  placeholder="150000"
                  error={errors.monthlyIncome?.message}
                  {...register("monthlyIncome", { valueAsNumber: true })}
                />
                <Select
                  label="Banco"
                  options={BANKS_AR.map((b) => ({ value: b, label: b }))}
                  placeholder="Seleccioná tu banco"
                  error={errors.bank?.message}
                  {...register("bank")}
                />
                <Input
                  label="CBU o Alias"
                  placeholder="22 dígitos o alias"
                  hint="Opcional"
                  infoTooltip="La cuenta debe estar a tu nombre"
                  error={errors.cbuOrAlias?.message}
                  {...register("cbuOrAlias")}
                />
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Link href="/solicitud/verificacion" className="flex-1">
                <Button type="button" variant="outline" fullWidth>
                  Atrás
                </Button>
              </Link>
              <Button
                type="submit"
                fullWidth
                className="flex-1"
                disabled={isSubmitting}
                loading={isSubmitting}
              >
                Continuar
              </Button>
            </div>
          </form>
        </Card>
      )}
    </div>
  );
}
