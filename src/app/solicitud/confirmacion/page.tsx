"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { useLoanStore } from "@/features/loan/loan.store";

export default function SolicitudConfirmacionPage() {
  const [mounted, setMounted] = useState(false);
  const start = useLoanStore((s) => s.start);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const displayId = start?.dni ? `${start.dni.replace(/\D/g, "")}/01` : "—";

  return (
    <div className="space-y-6">
      <Card className="text-center border border-primary-100/50">
        <div className="flex justify-center mb-4">
          <div className="rounded-full bg-green-100 p-4">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">¡Solicitud enviada!</h2>
        <p className="text-gray-600 font-medium mb-6">
          Recibimos tu solicitud y contrato firmado. Te contactaremos al número que
          registraste.
        </p>
        <div className="mb-6">
          <p className="text-sm font-semibold text-gray-500 mb-1">Número de solicitud</p>
          <Badge variant="success" className="text-sm font-mono font-bold">
            {displayId}
          </Badge>
        </div>
        <p className="text-sm text-gray-600 mb-8">
          Podés consultar el estado de tu solicitud en cualquier momento con tu DNI y este
          número.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link href="/" className="flex-1">
            <Button fullWidth>Volver al inicio</Button>
          </Link>
          <Link href="/estado" className="flex-1">
            <Button variant="outline" fullWidth>
              Consultar estado
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
