"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import StepperNav from "@/components/layout/StepperNav";
import { applicantStartSchema, type ApplicantStartForm } from "@/features/loan/loan.schemas";
import { useLoanStore } from "@/features/loan/loan.store";
import { startApplication } from "@/features/loan/loan.api";
import { formatDNI, formatPhone } from "@/lib/format";

export default function SolicitudInicioPage() {
  const router = useRouter();
  const simulation = useLoanStore((s) => s.simulation);
  const setStart = useLoanStore((s) => s.setStart);
  const setApplicationId = useLoanStore((s) => s.setApplicationId);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<ApplicantStartForm>({
    resolver: zodResolver(applicantStartSchema),
    defaultValues: {
      dni: "",
      email: "",
      phone: "",
    },
  });

  const dni = watch("dni");
  const phone = watch("phone");

  useEffect(() => {
    if (!simulation?.amount) {
      router.replace("/");
      return;
    }
  }, [simulation, router]);

  const onSubmit = async (data: ApplicantStartForm) => {
    setError(null);
    setLoading(true);
    try {
      const { applicationId } = await startApplication({
        dni: data.dni.replace(/\D/g, ""),
        email: data.email,
        phone: data.phone,
      });
      setApplicationId(applicationId);
      setStart({
        dni: data.dni.replace(/\D/g, ""),
        email: data.email,
        phone: data.phone,
      });
      router.push("/solicitud/verificacion");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al iniciar la solicitud. Intentá de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  if (!simulation?.amount) return null;

  return (
    <div className="space-y-6">
      <StepperNav />
      <Card className="border border-primary-100/50">
        <h2 className="text-2xl font-bold text-gray-900 mb-1">Creá tu cuenta</h2>
        <p className="text-sm font-medium text-gray-600 mb-6">Completá tus datos para continuar con la solicitud.</p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="DNI"
            placeholder="12.345.678"
            error={errors.dni?.message}
            {...register("dni")}
            value={dni}
            onChange={(e) => setValue("dni", formatDNI(e.target.value), { shouldValidate: true })}
          />
          <Input
            label="Email"
            type="email"
            placeholder="tu@email.com"
            error={errors.email?.message}
            {...register("email")}
          />
          <Input
            label="Teléfono celular"
            placeholder="3812345678"
            hint="Sin 0 ni 15. Ej: 3812345678"
            error={errors.phone?.message}
            {...register("phone")}
            value={phone}
            onChange={(e) => setValue("phone", formatPhone(e.target.value), { shouldValidate: true })}
            inputMode="numeric"
          />
          {error && (
            <p className="text-sm text-red-600" role="alert">
              {error}
            </p>
          )}
          <div className="flex gap-3 pt-2">
            <Link href="/" className="flex-1">
              <Button type="button" variant="outline" fullWidth>
                Atrás
              </Button>
            </Link>
            <Button type="submit" fullWidth loading={loading} className="flex-1">
              Continuar
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
