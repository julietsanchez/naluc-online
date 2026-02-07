"use client";

import { usePathname } from "next/navigation";
import Stepper from "@/components/ui/Stepper";

const STEPS = [
  { id: "simulacion", label: "Simulación" },
  { id: "inicio", label: "Cuenta" },
  { id: "verificacion", label: "Verificación" },
  { id: "datos", label: "Datos" },
  { id: "resumen", label: "Firma" },
];

export function getStepId(pathname: string): string {
  if (pathname.endsWith("/inicio")) return "inicio";
  if (pathname.endsWith("/verificacion")) return "verificacion";
  if (pathname.endsWith("/datos")) return "datos";
  if (pathname.endsWith("/resumen")) return "resumen";
  if (pathname.endsWith("/confirmacion")) return "resumen";
  return "simulacion";
}

export default function StepperNav() {
  const pathname = usePathname();
  const currentStepId = getStepId(pathname ?? "");
  return <Stepper steps={STEPS} currentStepId={currentStepId} />;
}
