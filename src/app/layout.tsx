import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import FooterLegal from "@/components/layout/FooterLegal";
import Footer from "@/components/layout/Footer";
import ClientOnly from "@/components/ClientOnly";

const poppins = Poppins({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NALUC – Préstamos personales rápidos y seguros | Simulá tu préstamo",
  description:
    "Simulá y solicitá tu préstamo personal en minutos. Proceso 100% online, seguro y confiable. Conocé tu cuota al instante.",
  keywords: ["préstamo personal", "préstamos online", "simulador de préstamos", "NALUC", "crédito"],
  openGraph: {
    title: "NALUC – Préstamos personales rápidos y seguros",
    description: "Simulá y solicitá tu préstamo personal en minutos. Proceso online, seguro y confiable.",
    locale: "es_AR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-AR">
      <body className={`${poppins.variable} font-sans min-h-screen antialiased`}>
        <Navbar />
        <main>
          <ClientOnly>{children}</ClientOnly>
        </main>
        <FooterLegal />
        <Footer />
      </body>
    </html>
  );
}
