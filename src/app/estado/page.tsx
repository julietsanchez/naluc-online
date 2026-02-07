"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Badge from "@/components/ui/Badge";
import { getApplicationStatus } from "@/features/loan/loan.api";
import type { ApplicationStatusResponse } from "@/features/loan/loan.types";
import { formatDNI } from "@/lib/format";

type FormValues = { dni: string; applicationId: string };

export default function EstadoPage() {
  const [result, setResult] = useState<ApplicationStatusResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    defaultValues: { dni: "", applicationId: "" },
  });

  const onSubmit = async (data: FormValues) => {
    setError(null);
    setResult(null);
    setLoading(true);
    try {
      const res = await getApplicationStatus({
        dni: data.dni.replace(/\D/g, ""),
        applicationId: data.applicationId.trim(),
      });
      setResult(res);
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo consultar el estado.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-lg mx-auto px-4 sm:px-6 py-8 pb-16">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Consultar estado de solicitud</h1>
      <Card className="border border-primary-100/50">
        <p className="text-sm font-medium text-gray-600 mb-6">
          Ingresá tu DNI y el número de solicitud que recibiste por email o en la pantalla de confirmación.
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="DNI"
            placeholder="12345678"
            error={errors.dni?.message}
            {...register("dni", {
              required: "Ingresá tu DNI",
              onChange: (e) => {
                e.target.value = formatDNI(e.target.value);
              },
            })}
          />
          <Input
            label="Número de solicitud"
            placeholder="UUID o código"
            error={errors.applicationId?.message}
            {...register("applicationId", { required: "Ingresá el número de solicitud" })}
          />
          {error && (
            <p className="text-sm text-red-600" role="alert">
              {error}
            </p>
          )}
          <Button type="submit" fullWidth loading={loading}>
            Consultar
          </Button>
        </form>
      </Card>

      {result && (
        <Card className="border border-primary-100/50">
          <h2 className="text-lg font-bold text-gray-900 mb-3">Estado de tu solicitud</h2>
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="default" className="font-semibold">{result.status}</Badge>
            <span className="text-sm text-gray-500 font-mono font-medium">{result.applicationId}</span>
          </div>
          {result.timeline && result.timeline.length > 0 && (
            <ul className="space-y-2 text-sm">
              {result.timeline.map((item, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className={item.completed ? "text-green-600" : "text-gray-400"}>
                    {item.completed ? "✓" : "○"}
                  </span>
                  <span className={item.completed ? "text-gray-900" : "text-gray-500"}>
                    {item.step}
                  </span>
                  {item.date && (
                    <span className="text-gray-400 text-xs">
                      {new Date(item.date).toLocaleDateString("es-AR")}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </Card>
      )}
    </div>
  );
}
