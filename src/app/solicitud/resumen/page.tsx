"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FileText } from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import SignaturePad from "@/components/ui/SignaturePad";
import StepperNav from "@/components/layout/StepperNav";
import { useLoanStore } from "@/features/loan/loan.store";
import { submitApplication } from "@/features/loan/loan.api";
import { formatARS } from "@/lib/format";
import { CONTRACT_TEMPLATE_TEXT } from "@/lib/constants";

export default function SolicitudResumenPage() {
  const router = useRouter();
  const simulation = useLoanStore((s) => s.simulation);
  const start = useLoanStore((s) => s.start);
  const personal = useLoanStore((s) => s.personal);
  const phoneVerified = useLoanStore((s) => s.phoneVerified);
  const creditCheck = useLoanStore((s) => s.creditCheck);
  const applicationId = useLoanStore((s) => s.applicationId);
  const setContractSigned = useLoanStore((s) => s.setContractSigned);
  const setSignatureDataUrl = useLoanStore((s) => s.setSignatureDataUrl);
  const setAcceptedContractTerms = useLoanStore((s) => s.setAcceptedContractTerms);

  const [acceptedLegalTerms, setAcceptedLegalTerms] = useState(false);
  const [signatureData, setSignatureData] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [signatureError, setSignatureError] = useState<string | null>(null);
  const [termsError, setTermsError] = useState<string | null>(null);

  useEffect(() => {
    if (
      !simulation?.amount ||
      !start ||
      !phoneVerified ||
      !creditCheck ||
      !personal ||
      !applicationId
    ) {
      router.replace("/solicitud/datos");
    }
  }, [simulation, start, phoneVerified, creditCheck, personal, applicationId, router]);

  const handleSign = async () => {
    let hasError = false;
    setSignatureError(null);
    setTermsError(null);
    setError(null);

    if (!signatureData) {
      setSignatureError("Dibujá tu firma para continuar");
      hasError = true;
    }

    if (!acceptedLegalTerms) {
      setTermsError("Debés aceptar los términos legales de firma");
      hasError = true;
    }

    if (hasError) return;

    setLoading(true);
    try {
      await submitApplication(applicationId!);
      setContractSigned(true);
      setSignatureDataUrl(signatureData);
      setAcceptedContractTerms(true);
      router.push("/solicitud/confirmacion");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Error al firmar. Intentá de nuevo."
      );
    } finally {
      setLoading(false);
    }
  };

  if (!simulation?.amount || !start || !phoneVerified || !creditCheck || !personal) return null;

  return (
    <div className="space-y-6">
      <StepperNav />
      <Card className="border border-primary-100/50">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            ¡Ya casi, {personal.firstName}!
          </h2>
          <p className="text-gray-600 mt-2">
            Confirmá y firmá el contrato. Una vez recibido, te enviaremos el dinero a tu
            cuenta en menos de 24 hs.
          </p>
        </div>

        {/* Detalle del préstamo */}
        <section className="space-y-4 mb-6">
          <h3 className="font-bold text-gray-900">Detalle del préstamo</h3>
          <div className="rounded-xl bg-primary-50/80 border border-primary-100 p-4 space-y-2">
            <p className="text-sm text-gray-600">
              Monto:{" "}
              <span className="font-semibold text-gray-900">
                {formatARS(simulation.amount)}
              </span>
            </p>
            <p className="text-sm text-gray-600">
              Cuotas:{" "}
              <span className="font-semibold text-gray-900">
                {simulation.installments}
              </span>
            </p>
            <p className="text-sm text-gray-600">
              Cuota estimada:{" "}
              <span className="font-semibold text-gray-900">
                {formatARS(simulation.monthlyPayment, true)}
              </span>
            </p>
            <p className="text-sm text-gray-600">
              Total a devolver:{" "}
              <span className="font-semibold text-gray-900">
                {formatARS(simulation.totalRepayment)}
              </span>
            </p>
            <p className="text-xs text-gray-500">CFT con IVA: {simulation.cft}%</p>
          </div>
        </section>

        {/* Visor de contrato */}
        <section className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <FileText className="w-5 h-5 text-gray-700" />
            <h3 className="font-bold text-gray-900">Contrato de Préstamo</h3>
          </div>
          <div className="rounded-xl border border-gray-200 bg-gray-50 max-h-64 overflow-y-auto">
            <div className="p-6 text-xs text-gray-700 whitespace-pre-wrap leading-relaxed font-mono">
              {CONTRACT_TEMPLATE_TEXT}
            </div>
          </div>
        </section>

        {/* Firma */}
        <section className="mb-6">
          <h3 className="font-bold text-gray-900 mb-3">Tu firma</h3>
          <SignaturePad
            onSignatureChange={(dataUrl) => {
              setSignatureData(dataUrl);
              if (dataUrl) setSignatureError(null);
            }}
          />
          {signatureError && (
            <p className="mt-1 text-sm text-red-600" role="alert">
              {signatureError}
            </p>
          )}
        </section>

        {/* Aceptación legal */}
        <div className="space-y-3 mb-6">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={acceptedLegalTerms}
              onChange={(e) => {
                setAcceptedLegalTerms(e.target.checked);
                if (e.target.checked) setTermsError(null);
              }}
              className="mt-1 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            <span className="text-sm text-gray-700">
              Acepto los términos legales de la firma digital y confirmo que los datos
              proporcionados son veraces.
            </span>
          </label>
          {termsError && (
            <p className="ml-7 text-sm text-red-600" role="alert">
              {termsError}
            </p>
          )}
        </div>

        {error && (
          <p className="text-sm text-red-600 mb-4" role="alert">
            {error}
          </p>
        )}

        <div className="flex gap-3">
          <Link href="/solicitud/datos" className="flex-1">
            <Button type="button" variant="outline" fullWidth>
              Atrás
            </Button>
          </Link>
          <Button
            type="button"
            fullWidth
            loading={loading}
            onClick={handleSign}
            className="flex-1"
          >
            Firmar contrato
          </Button>
        </div>
      </Card>
    </div>
  );
}
