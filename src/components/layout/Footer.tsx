import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-primary-950 text-white/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <Link href="/" aria-label="NALUC - Inicio">
              <Image
                src="/logo.png"
                alt="NALUC"
                width={120}
                height={40}
                className="h-8 w-auto object-contain brightness-0 invert opacity-80"
              />
            </Link>
            <p className="mt-3 text-sm max-w-md leading-relaxed">
              NALUC Soluciones Financieras. Préstamos personales 100% online,
              rápidos y seguros.
            </p>
          </div>
          <div className="text-sm space-y-1">
            <p className="font-medium text-white/50">Contacto</p>
            <p>info@naluc.com.ar</p>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-white/10">
          <p className="text-xs text-white/35 leading-relaxed max-w-4xl">
            El otorgamiento del préstamo está sujeto a evaluación crediticia.
            Las tasas, montos y plazos ofrecidos pueden variar según el perfil
            del solicitante. La TNA, TEA y CFT serán informados antes de la
            aceptación de la oferta por parte del solicitante. Ejemplo
            ilustrativo: Monto $50.000 a 12 meses, cuota aproximada según tasas
            vigentes. Total a pagar según condiciones del contrato.
          </p>
          <p className="mt-6 text-xs text-white/25">
            &copy; {new Date().getFullYear()} NALUC Soluciones Financieras.
            Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
