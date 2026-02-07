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
  CheckCircle,
  Clock,
  Banknote,
  CreditCard,
  AlertCircle,
  User,
  FileText,
  CalendarDays,
  ArrowLeft,
  Calendar,
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

/* ────────────────────────────────────────────────────────────
   Stepper del timeline con estados activo / inactivo / completado
   ──────────────────────────────────────────────────────────── */
function TimelineStepper({
  timeline,
}: {
  timeline: ApplicationStatusResponse["timeline"];
}) {
  const completedCount = timeline.filter((t) => t.completed).length;
  const progressPercent =
    timeline.length > 1
      ? ((completedCount - 1) / (timeline.length - 1)) * 100
      : 0;

  const STEP_ICONS = [FileText, Banknote, CreditCard];

  return (
    <div className="relative">
      {/* ── Línea de conexión horizontal (desktop) ── */}
      <div
        className="absolute top-6 left-6 right-6 h-0.5 bg-gray-200 hidden sm:block"
        aria-hidden="true"
      />
      <div
        className="absolute top-6 left-6 h-0.5 bg-primary-500 hidden sm:block transition-all duration-500"
        style={{
          width: `${progressPercent}%`,
          maxWidth: "calc(100% - 3rem)",
        }}
        aria-hidden="true"
      />

      {/* ── Línea de conexión vertical (mobile) ── */}
      <div
        className="absolute top-0 bottom-0 left-6 w-0.5 bg-gray-200 sm:hidden"
        aria-hidden="true"
      />
      <div
        className="absolute top-0 left-6 w-0.5 bg-primary-500 sm:hidden transition-all duration-500"
        style={{
          height: `${progressPercent}%`,
        }}
        aria-hidden="true"
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4 relative">
        {timeline.map((step, index) => {
          const StepIcon = STEP_ICONS[index] ?? Clock;
          const isCompleted = step.completed;
          const isActive = step.active;
          const isInactive = !isCompleted && !isActive;

          return (
            <div
              key={index}
              className={`flex sm:flex-col items-start sm:items-center gap-4 sm:gap-3 text-center rounded-xl p-3 sm:p-2 transition-all duration-300 ${
                isActive
                  ? "bg-primary-50/60 sm:bg-transparent"
                  : ""
              }`}
            >
              {/* Circle */}
              <div
                className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                  isActive
                    ? "bg-primary-600 text-white shadow-lg shadow-primary-600/30 ring-4 ring-primary-100 ring-offset-2 animate-pulse"
                    : isCompleted
                    ? "bg-primary-600 text-white"
                    : "bg-gray-100 text-gray-300 border-2 border-dashed border-gray-300"
                }`}
              >
                {isCompleted && !isActive ? (
                  <CheckCircle className="w-5 h-5" />
                ) : isActive ? (
                  <StepIcon className="w-5 h-5" />
                ) : (
                  <Clock className="w-5 h-5" />
                )}
              </div>

              {/* Text */}
              <div className="sm:text-center">
                <p
                  className={`text-sm font-semibold transition-colors ${
                    isActive
                      ? "text-primary-700"
                      : isCompleted
                      ? "text-gray-900"
                      : "text-gray-400"
                  }`}
                >
                  {step.step}
                </p>
                {isActive && (
                  <span className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-full bg-primary-100 text-primary-700 text-[10px] font-bold uppercase tracking-wide">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-500 animate-pulse" />
                    En curso
                  </span>
                )}
                {step.date && isCompleted && !isActive && (
                  <p className="text-xs text-gray-400 mt-0.5">
                    {new Date(step.date).toLocaleDateString("es-AR", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                )}
                {isInactive && (
                  <p className="text-xs text-gray-300 mt-0.5">Pendiente</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   Card individual de cuota (mobile)
   ──────────────────────────────────────────────────────────── */
function InstallmentCard({
  inst,
  total,
}: {
  inst: LoanInstallment;
  total: number;
}) {
  const statusColors = {
    paid: "border-l-green-500 bg-green-50/40",
    pending: "border-l-amber-400 bg-amber-50/30",
    overdue: "border-l-red-500 bg-red-50/40",
  };

  return (
    <div
      className={`rounded-xl border border-gray-100 border-l-4 ${statusColors[inst.status]} p-4 transition-all`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-gray-900">
            Cuota {inst.number}/{total}
          </span>
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
        </div>
        <span className="text-base font-bold text-gray-900">
          {formatARS(inst.amount, true)}
        </span>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs text-gray-500">
          <Calendar className="w-3.5 h-3.5" />
          <span>
            Vence:{" "}
            {new Date(inst.dueDate).toLocaleDateString("es-AR", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </span>
        </div>
        {inst.status === "paid" && inst.paidDate && (
          <span className="text-xs text-green-600 font-medium">
            Pagada el{" "}
            {new Date(inst.paidDate).toLocaleDateString("es-AR", {
              day: "2-digit",
              month: "short",
            })}
          </span>
        )}
        {inst.status !== "paid" && (
          <Button
            size="sm"
            className="text-xs px-4 py-1.5 rounded-lg"
            onClick={() => {
              alert(
                `Funcionalidad de pago próximamente disponible.\nCuota ${inst.number} — ${formatARS(inst.amount, true)}`
              );
            }}
          >
            Pagar
          </Button>
        )}
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   Página principal
   ──────────────────────────────────────────────────────────── */
export default function EstadoPage() {
  const [result, setResult] = useState<ApplicationStatusResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
    try {
      const res = await getApplicationStatus(data.dni);
      if (!res.found) {
        setError(
          "No encontramos solicitudes asociadas a ese DNI. Verificá el número e intentá de nuevo."
        );
      } else {
        setResult(res);
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "No se pudo consultar el estado. Intentá más tarde."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setResult(null);
    setError(null);
  };

  const nextInstallment = result?.installments.find(
    (i) => i.status === "pending" || i.status === "overdue"
  );

  return (
    <div className="min-h-[80vh] bg-gray-50/80">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 pb-16 space-y-6">
        {/* ────── Header ────── */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary-100 mb-4">
            <Search className="w-7 h-7 text-primary-600" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
            Consultar mi crédito
          </h1>
          <p className="mt-2 text-sm text-gray-500 max-w-md mx-auto">
            Ingresá tu DNI para ver el estado de tu solicitud y gestionar tu
            crédito.
          </p>
        </div>

        {/* ────── Formulario de búsqueda ────── */}
        {!result && (
          <Card className="border border-primary-100/50">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <Input
                label="DNI"
                placeholder="12.345.678"
                error={errors.dni?.message}
                {...register("dni", {
                  required: "Ingresá tu DNI",
                  minLength: {
                    value: 7,
                    message: "El DNI debe tener al menos 7 dígitos",
                  },
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
              <Button
                type="submit"
                fullWidth
                loading={loading}
                disabled={loading}
              >
                {loading ? "Consultando..." : "Consultar estado"}
              </Button>
            </form>
          </Card>
        )}

        {/* ────── Portal del cliente ────── */}
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
                  <h2 className="text-lg font-bold text-gray-900">
                    {result.applicantName}
                  </h2>
                  <p className="text-sm text-gray-500">
                    DNI {formatDNI(result.dni)} · Solicitud{" "}
                    {result.applicationId}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge
                  variant={
                    result.status === "credito_confirmado"
                      ? "success"
                      : "default"
                  }
                >
                  {STATUS_LABELS[result.status] ?? result.status}
                </Badge>
              </div>
            </Card>

            {/* ────── Stepper del progreso ────── */}
            <Card className="border border-primary-100/50">
              <h3 className="font-bold text-gray-900 mb-6">
                Progreso de tu solicitud
              </h3>
              <TimelineStepper timeline={result.timeline} />
            </Card>

            {/* ────── Próximo pago ────── */}
            {nextInstallment && (
              <Card className="border border-amber-200/60 bg-gradient-to-br from-amber-50/50 to-white">
                <div className="flex items-center gap-2 mb-3">
                  <CalendarDays className="w-4 h-4 text-amber-600" />
                  <span className="text-sm font-bold text-gray-900">
                    Próximo pago
                  </span>
                  {nextInstallment.status === "overdue" && (
                    <Badge variant="error">Vencida</Badge>
                  )}
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Cuota</span>
                    <span className="font-semibold text-gray-900">
                      {nextInstallment.number}/{result.installmentsCount}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Monto</span>
                    <span className="font-bold text-lg text-gray-900">
                      {formatARS(nextInstallment.amount, true)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Vencimiento</span>
                    <span className="font-medium text-gray-700">
                      {new Date(nextInstallment.dueDate).toLocaleDateString(
                        "es-AR",
                        { day: "2-digit", month: "short", year: "numeric" }
                      )}
                    </span>
                  </div>
                </div>
                <Button
                  fullWidth
                  size="sm"
                  className="mt-3"
                  onClick={() => {
                    alert(
                      `Funcionalidad de pago próximamente disponible.\nCuota ${nextInstallment.number} — ${formatARS(nextInstallment.amount, true)}`
                    );
                  }}
                >
                  Pagar ahora
                </Button>
              </Card>
            )}

            {/* ────── Detalle de cuotas (desplegado por defecto) ────── */}
            <Card className="border border-primary-100/50">
              <div className="flex items-center gap-2 mb-4">
                <CalendarDays className="w-5 h-5 text-primary-600" />
                <h3 className="font-bold text-gray-900">Detalle de cuotas</h3>
              </div>

              {/* ── Vista mobile: cards ── */}
              <div className="sm:hidden space-y-3">
                {result.installments.map((inst) => (
                  <InstallmentCard
                    key={inst.number}
                    inst={inst}
                    total={result.installmentsCount}
                  />
                ))}
              </div>

              {/* ── Vista desktop: tabla ── */}
              <div className="hidden sm:block overflow-x-auto">
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
                          inst.status === "paid"
                            ? "bg-green-50/30"
                            : inst.status === "overdue"
                            ? "bg-red-50/30"
                            : ""
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
                                ? new Date(
                                    inst.paidDate
                                  ).toLocaleDateString("es-AR", {
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
                                alert(
                                  `Funcionalidad de pago próximamente disponible.\nCuota ${inst.number} — ${formatARS(inst.amount, true)}`
                                );
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
            </Card>

            {/* Aviso legal */}
            <p className="text-xs text-gray-400 text-center px-4">
              La información mostrada es de carácter informativo. Para consultas
              detalladas, contactate con nuestro equipo de atención al cliente.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
