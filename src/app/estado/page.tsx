"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Badge from "@/components/ui/Badge";
import { getApplicationStatus } from "@/features/loan/loan.api";
import type { ApplicationStatusResponse, LoanInstallment } from "@/features/loan/loan.types";
import { formatDNI, formatARS } from "@/lib/format";
import {
  Search,
  Loader2,
  CheckCircle,
  Clock,
  Banknote,
  CreditCard,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  User,
  FileText,
  CalendarDays,
  ArrowLeft,
} from "lucide-react";

type FormValues = { dni: string };

const STATUS_LABELS: Record<string, string> = {
  solicitud_en_progreso: "Solicitud en progreso",
  deposito_en_progreso: "Depósito en progreso",
  credito_confirmado: "Crédito confirmado",
};

const INSTALLMENT_STATUS_LABELS: Record<LoanInstallment["status"], string> = {
  paid: "Pagada",
  pending: "Pendiente",
  overdue: "Vencida",
};

export default function EstadoPage() {
  const [result, setResult] = useState<ApplicationStatusResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showInstallments, setShowInstallments] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: { dni: "" },
  });

  const onSubmit = async (data: FormValues) => {
    setError(null);
    setResult(null);
    setLoading(true);
    setShowInstallments(false);
    try {
      const res = await getApplicationStatus(data.dni);
      if (!res.found) {
        setError("No encontramos solicitudes asociadas a ese DNI. Verificá el número e intentá de nuevo.");
      } else {
        setResult(res);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo consultar el estado. Intentá más tarde.");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setResult(null);
    setError(null);
    setShowInstallments(false);
  };

  const paidCount = result?.installments.filter((i) => i.status === "paid").length ?? 0;
  const pendingCount = result?.installments.filter((i) => i.status !== "paid").length ?? 0;

  return (
    <div className="min-h-[80vh] bg-gray-50/80">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 pb-16 space-y-6">

        {/* ---------- Header ---------- */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary-100 mb-4">
            <Search className="w-7 h-7 text-primary-600" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
            Consultar mi crédito
          </h1>
          <p className="mt-2 text-sm text-gray-500 max-w-md mx-auto">
            Ingresá tu DNI para ver el estado de tu solicitud y gestionar tu crédito.
          </p>
        </div>

        {/* ---------- Formulario de búsqueda ---------- */}
        {!result && (
          <Card className="border border-primary-100/50">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <Input
                label="DNI"
                placeholder="12.345.678"
                error={errors.dni?.message}
                {...register("dni", {
                  required: "Ingresá tu DNI",
                  minLength: { value: 7, message: "El DNI debe tener al menos 7 dígitos" },
                  onChange: (e) => {
                    e.target.value = formatDNI(e.target.value);
                  },
                })}
              />
              {error && (
                <div className="flex items-start gap-2 rounded-xl bg-red-50 border border-red-200 p-3">
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}
              <Button type="submit" fullWidth loading={loading} disabled={loading}>
                {loading ? "Consultando..." : "Consultar estado"}
              </Button>
            </form>
          </Card>
        )}

        {/* ---------- Portal cliente ---------- */}
        {result && result.found && (
          <>
            {/* Botón volver */}
            <button
              onClick={handleBack}
              className="inline-flex items-center gap-1.5 text-sm text-primary-600 hover:text-primary-700 font-medium transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Nueva consulta
            </button>

            {/* Card de bienvenida */}
            <Card className="border border-primary-100/50 bg-gradient-to-br from-white to-primary-50/30">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                  <User className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900">{result.applicantName}</h2>
                  <p className="text-sm text-gray-500">DNI {formatDNI(result.dni)} · Solicitud {result.applicationId}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Badge variant={result.status === "credito_confirmado" ? "success" : "default"}>
                  {STATUS_LABELS[result.status] ?? result.status}
                </Badge>
              </div>
            </Card>

            {/* Timeline de 3 pasos */}
            <Card className="border border-primary-100/50">
              <h3 className="font-bold text-gray-900 mb-6">Progreso de tu solicitud</h3>

              <div className="relative">
                {/* Connecting line */}
                <div className="absolute top-6 left-6 right-6 h-0.5 bg-gray-200 hidden sm:block" aria-hidden="true" />
                <div
                  className="absolute top-6 left-6 h-0.5 bg-primary-500 hidden sm:block transition-all duration-500"
                  style={{
                    width: `${(result.timeline.filter((t) => t.completed).length - 1) / (result.timeline.length - 1) * 100}%`,
                    maxWidth: "calc(100% - 3rem)",
                  }}
                  aria-hidden="true"
                />

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4 relative">
                  {result.timeline.map((step, index) => {
                    const StepIcon = index === 0 ? FileText : index === 1 ? Banknote : CreditCard;
                    return (
                      <div key={index} className="flex sm:flex-col items-start sm:items-center gap-4 sm:gap-3 text-center">
                        {/* Circle */}
                        <div
                          className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                            step.completed
                              ? step.active
                                ? "bg-primary-600 text-white shadow-lg shadow-primary-600/30 ring-4 ring-primary-100"
                                : "bg-primary-600 text-white"
                              : "bg-gray-100 text-gray-400"
                          }`}
                        >
                          {step.completed ? (
                            step.active ? (
                              <StepIcon className="w-5 h-5" />
                            ) : (
                              <CheckCircle className="w-5 h-5" />
                            )
                          ) : (
                            <Clock className="w-5 h-5" />
                          )}
                        </div>

                        {/* Text */}
                        <div className="sm:text-center">
                          <p
                            className={`text-sm font-semibold ${
                              step.completed ? "text-gray-900" : "text-gray-400"
                            }`}
                          >
                            {step.step}
                          </p>
                          {step.date && step.completed && (
                            <p className="text-xs text-gray-400 mt-0.5">
                              {new Date(step.date).toLocaleDateString("es-AR", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              })}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Card>

            {/* Resumen del crédito */}
            <Card className="border border-primary-100/50">
              <h3 className="font-bold text-gray-900 mb-4">Resumen de tu crédito</h3>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="rounded-xl bg-gray-50 p-4">
                  <p className="text-xs text-gray-500 mb-1">Monto del préstamo</p>
                  <p className="text-lg font-bold text-gray-900">{formatARS(result.loanAmount)}</p>
                </div>
                <div className="rounded-xl bg-gray-50 p-4">
                  <p className="text-xs text-gray-500 mb-1">Cuota mensual</p>
                  <p className="text-lg font-bold text-primary-600">{formatARS(result.monthlyPayment, true)}</p>
                </div>
                <div className="rounded-xl bg-green-50 p-4">
                  <p className="text-xs text-gray-500 mb-1">Cuotas pagadas</p>
                  <p className="text-lg font-bold text-green-600">{paidCount} / {result.installmentsCount}</p>
                </div>
                <div className="rounded-xl bg-amber-50 p-4">
                  <p className="text-xs text-gray-500 mb-1">Cuotas pendientes</p>
                  <p className="text-lg font-bold text-amber-600">{pendingCount}</p>
                </div>
              </div>

              {/* Toggle cuotas */}
              <button
                type="button"
                onClick={() => setShowInstallments(!showInstallments)}
                className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-primary-50 hover:bg-primary-100 transition-colors text-sm font-semibold text-primary-700"
              >
                <span className="flex items-center gap-2">
                  <CalendarDays className="w-4 h-4" />
                  Ver detalle de cuotas
                </span>
                {showInstallments ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>

              {/* Tabla de cuotas */}
              {showInstallments && (
                <div className="mt-4 overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-100">
                        <th className="text-left py-3 px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          Cuota
                        </th>
                        <th className="text-left py-3 px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          Monto
                        </th>
                        <th className="text-left py-3 px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          Vencimiento
                        </th>
                        <th className="text-left py-3 px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          Estado
                        </th>
                        <th className="text-right py-3 px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          Acción
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {result.installments.map((inst) => (
                        <tr
                          key={inst.number}
                          className={`transition-colors ${
                            inst.status === "paid" ? "bg-green-50/30" : inst.status === "overdue" ? "bg-red-50/30" : ""
                          }`}
                        >
                          <td className="py-3 px-2 font-medium text-gray-900">
                            {inst.number}/{result.installmentsCount}
                          </td>
                          <td className="py-3 px-2 text-gray-700">
                            {formatARS(inst.amount, true)}
                          </td>
                          <td className="py-3 px-2 text-gray-600">
                            {new Date(inst.dueDate).toLocaleDateString("es-AR", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })}
                          </td>
                          <td className="py-3 px-2">
                            <Badge
                              variant={
                                inst.status === "paid"
                                  ? "success"
                                  : inst.status === "overdue"
                                  ? "error"
                                  : "warning"
                              }
                            >
                              {INSTALLMENT_STATUS_LABELS[inst.status]}
                            </Badge>
                          </td>
                          <td className="py-3 px-2 text-right">
                            {inst.status === "paid" ? (
                              <span className="text-xs text-gray-400">
                                {inst.paidDate
                                  ? new Date(inst.paidDate).toLocaleDateString("es-AR", {
                                      day: "2-digit",
                                      month: "short",
                                    })
                                  : "—"}
                              </span>
                            ) : (
                              <Button
                                size="sm"
                                className="text-xs px-3 py-1.5 rounded-lg"
                                onClick={() => {
                                  alert(`Funcionalidad de pago próximamente disponible.\nCuota ${inst.number} — ${formatARS(inst.amount, true)}`);
                                }}
                              >
                                Pagar
                              </Button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </Card>

            {/* Aviso legal */}
            <p className="text-xs text-gray-400 text-center px-4">
              La información mostrada es de carácter informativo. Para consultas detalladas, contactate con nuestro equipo de atención al cliente.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
