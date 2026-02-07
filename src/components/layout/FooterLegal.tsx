import Image from "next/image";
import Link from "next/link";

const FOOTER_LOGOS = [
  { name: "CNV - Comisión Nacional de Valores", href: "https://www.cnv.gov.ar", src: "/footer-logos/logo CNV .jpg" },
  { name: "RENAPER - Registro Nacional de la Persona", href: "https://www.argentina.gob.ar/interior/renaper", src: "/footer-logos/renaper logo.png" },
  { name: "SID - Sistema de Identificación Digital", href: "https://www.argentina.gob.ar/sid", src: "/footer-logos/SID sistema de identidad digital.png" },
  { name: "PDP - Protección de Datos Personales", href: "https://www.argentina.gob.ar/aaip", src: "/footer-logos/logopdp.png" },
  { name: "Banco Central de la República Argentina", href: "https://www.bcra.gob.ar", src: "/footer-logos/bcralogo.png" },
  { name: "Data Fiscal - AFIP", href: "https://www.afip.gob.ar", src: "/footer-logos/datafiscallogo.png" },
  { name: "Usuarios Financieros", href: "https://www.usuariosfinancieros.gob.ar", src: "/footer-logos/usuarios financieros logo.png" },
] as const;

export default function FooterLegal() {
  return (
    <section
      className="bg-primary-950 text-white/70"
      aria-label="Información legal y regulatoria"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Texto legal */}
        <div className="space-y-4 text-sm leading-relaxed max-w-4xl">
          <p>
            El monto mínimo de financiación es de $10000 y el monto máximo de
            $2850000. El período mínimo para la devolución de un préstamo es de
            6 meses y el máximo 30 meses. El otorgamiento del préstamo está
            sujeto a evaluación crediticia. Tipo de Amortización Francés con
            cuotas mensuales y consecutivas. Tasa Fija.
          </p>
          <p>
            Ejemplo de préstamo online realizado desde el sitio web
            www.naluc.com.ar: Monto solicitado de $100000 a 6 meses, TNA
            (sin IVA): 132.32%, TEA (sin IVA): 251.15%, CFTNA: 132.32% (sin
            IVA), CFTEA: 303.89% (IVA incluido), Cuota: $25126.01 (IVA
            incluido). Total a pagar: $150756.06 (IVA incluido).
          </p>
          <p>
            En todos los casos, la Tasa Nominal Anual (TNA), la Tasa Efectiva
            Anual (TEA) y el Costo Financiero Total Efectivo Anual (CFTEA)
            aplicables serán informados antes de la aceptación de la oferta de
            préstamo por parte del solicitante. Este ejemplo no constituye
            obligación alguna para Naluc Soluciones Financieras de ofrecer el precio
            y el costo que se informa ya que la TNA, la TEA y el CFT varían según
            el perfil crediticio del solicitante del préstamo y el plazo de
            financiación elegido. La CFT TNA de un préstamo varía dependiendo del
            perfil crediticio del solicitante, siendo la mínima 132.32% y la
            máxima 192.14% (sin IVA incluido en ambos casos). La aprobación
            definitiva del préstamo quedará supeditada al cumplimiento de las
            condiciones exigidas por Naluc Soluciones Financieras
          </p>
          <p>
            La expresión del Costo financiero total (Efectivo Anual) responde a
            una exigencia normativa y su cálculo refleja una operación meramente
            teórica en la que se capitalizan mensualmente intereses. Naluc
            Soluciones Financieras en ningún caso capitaliza intereses y utiliza el método
            del interés simple en todos sus cálculos. Los Costos financieros
            totales informados corresponden al cálculo sobre un período mensual
            promedio de 30 días.
          </p>
        </div>

        {/* Sección de tasas destacadas */}
        <div className="mt-8 text-center">
          <p className="text-3xl sm:text-4xl font-bold text-white">
            CFTEA: 303.89%
          </p>
          <p className="mt-1 text-sm text-white/60">IVA incluido (*)</p>
          <p className="mt-2 text-sm text-white/60">
            CFTEA (sin IVA) 251.15%. CFTNA (sin IVA) 132.32%. TNA (sin IVA)
            132.32% (sin IVA). TEA (sin IVA) 251.15%.
          </p>
        </div>

        {/* Fila de logos de entidades financieras - franja blanca de fondo */}
        <div className="mt-10 bg-white py-6 px-4 sm:px-6 rounded-lg">
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8">
            {FOOTER_LOGOS.map((logo) => (
              <Link
                key={logo.name}
                href={logo.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-24 h-14 transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded"
                aria-label={logo.name}
              >
                <Image
                  src={encodeURI(logo.src)}
                  alt={logo.name}
                  width={96}
                  height={56}
                  className="h-14 w-24 object-contain"
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
