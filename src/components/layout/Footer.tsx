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
          <p className="text-xs text-white/25">
            &copy; {new Date().getFullYear()} NALUC Soluciones Financieras.
            Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
