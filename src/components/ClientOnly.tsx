"use client";

import { useState, useEffect } from "react";

/**
 * Renderiza los hijos solo en el cliente. Evita hidratación incorrecta
 * cuando se usa localStorage (ej. Zustand persist) o APIs del browser.
 */
export default function ClientOnly({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-[40vh] flex items-center justify-center" aria-busy="true">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-primary-600 border-t-transparent animate-spin" />
          <p className="text-sm text-gray-500">Cargando...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
