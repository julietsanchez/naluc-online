"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Smartphone } from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import OtpInput from "@/components/ui/OtpInput";
import StepperNav from "@/components/layout/StepperNav";
import { useLoanStore } from "@/features/loan/loan.store";
import { verifyPhone } from "@/features/loan/loan.api";

export default function SolicitudVerificacionPage() {
  const router = useRouter();
  const simulation = useLoanStore((s) => s.simulation);
  const start = useLoanStore((s) => s.start);
  const setPhoneVerified = useLoanStore((s) => s.setPhoneVerified);
  const setAcceptedTermsAndPrivacy = useLoanStore((s) => s.setAcceptedTermsAndPrivacy);

  const [code, setCode] = useState("");
  const [codeError, setCodeError] = useState<string | null>(null);
  const [accepted, setAccepted] = useState(false);
  const [acceptError, setAcceptError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [resent, setResent] = useState(false);

  useEffect(() => {
    if (!simulation?.amount || !start) {
      router.replace("/solicitud/inicio");
    }
  }, [simulation, start, router]);

  const handleResend = () => {
    setResent(true);
    setTimeout(() => setResent(false), 3000);
  };

  const handleSubmit = async () => {
    let hasError = false;
    setCodeError(null);
    setAcceptError(null);

    if (code.length !== 4 || !/^\d{4}$/.test(code)) {
      setCodeError("Ingresá el código de 4 dígitos");
      hasError = true;
    }

    if (!accepted) {
      setAcceptError("Debés aceptar los términos para continuar");
      hasError = true;
    }

    if (hasError) return;

    setLoading(true);
    try {
      const result = await verifyPhone(start!.phone, code);
      if (!result.verified) {
        setCodeError("Código incorrecto. Revisá e intentá de nuevo.");
        return;
      }
      setPhoneVerified(true);
      setAcceptedTermsAndPrivacy(true);
      router.push("/solicitud/datos");
    } catch (err) {
      setCodeError(err instanceof Error ? err.message : "Error al verificar. Intentá de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  if (!simulation?.amount || !start) return null;

  const maskedPhone = start.phone.slice(0, 3) + "****" + start.phone.slice(-3);

  return (
    <div className="space-y-6">
      <StepperNav />
      <Card className="border border-primary-100/50">
        <div className="text-center mb-6">
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-primary-50 p-3">
              <Smartphone className="w-8 h-8 text-primary-600" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Verificá tu teléfono</h2>
          <p className="text-sm text-gray-600">
            Te enviamos un código de 4 dígitos al número{" "}
            <span className="font-semibold">{maskedPhone}</span>
          </p>
        </div>

        <div className="space-y-6">
          <OtpInput
            value={code}
            onChange={(val) => {
              setCode(val);
              if (codeError) setCodeError(null);
            }}
            error={codeError ?? undefined}
          />

          <div className="flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={handleResend}
              disabled={resent}
              className="text-sm text-primary-600 hover:text-primary-700 font-medium disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {resent ? "Código reenviado" : "Reenviar código"}
            </button>
            <span className="text-gray-300">|</span>
            <button
              type="button"
              onClick={handleResend}
              disabled={resent}
              className="text-sm text-gray-500 hover:text-gray-700 font-medium disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              No recibí el código
            </button>
          </div>

          <div className="border-t border-gray-100 pt-4">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={accepted}
                onChange={(e) => {
                  setAccepted(e.target.checked);
                  if (e.target.checked) setAcceptError(null);
                }}
                className="mt-1 rounded border-gray-300 text-primary-600 focus:ring-primary-500 flex-shrink-0"
              />
              <span className="text-sm text-gray-700 leading-relaxed">
                Acepto los{" "}
                <Link
                  href="/terminos"
                  target="_blank"
                  className="text-primary-600 underline hover:no-underline font-medium"
                >
                  Términos y Condiciones
                </Link>
                , la{" "}
                <Link
                  href="/privacidad"
                  target="_blank"
                  className="text-primary-600 underline hover:no-underline font-medium"
                >
                  Política de Privacidad
                </Link>
                , y gestionar mi Atención al Cliente vía WhatsApp y llamadas para
                Asistencia de Ventas, Atención al Cliente y Cobranzas.
              </span>
            </label>
            {acceptError && (
              <p className="mt-1 ml-7 text-sm text-red-600" role="alert">
                {acceptError}
              </p>
            )}
          </div>

          <div className="flex gap-3 pt-2">
            <Link href="/solicitud/inicio" className="flex-1">
              <Button type="button" variant="outline" fullWidth>
                Atrás
              </Button>
            </Link>
            <Button
              type="button"
              fullWidth
              loading={loading}
              onClick={handleSubmit}
              className="flex-1"
            >
              Verificar
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
