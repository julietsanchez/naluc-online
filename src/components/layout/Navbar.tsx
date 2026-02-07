"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { Menu, X, CreditCard } from "lucide-react";

const NAV_LINKS = [
  { href: "/#simulador", label: "Simulador" },
  { href: "/#como-funciona", label: "¿Cómo funciona?" },
  { href: "/#requisitos", label: "Requisitos" },
  { href: "/#faq", label: "Preguntas frecuentes" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-[4.5rem]">
          {/* Logo */}
          <Link
            href="/"
            className="focus-visible-ring rounded-lg shrink-0"
            aria-label="NALUC - Inicio"
          >
            <Image
              src="/logo.png"
              alt="NALUC - Préstamos personales"
              width={180}
              height={60}
              className="h-12 lg:h-14 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <nav
            className="hidden lg:flex items-center gap-8"
            aria-label="Navegación principal"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors relative after:absolute after:bottom-[-2px] after:left-0 after:h-[2px] after:w-0 after:bg-primary-600 after:transition-all hover:after:w-full"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <Link href="/estado">
              <Button variant="outline" size="sm" className="gap-1.5">
                <CreditCard className="w-4 h-4" />
                Consultar o Pagar mi crédito
              </Button>
            </Link>
            <a href="/#simulador">
              <Button variant="primary" size="sm">
                Solicitar préstamo
              </Button>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 focus-visible-ring"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {mobileOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white animate-fade-in">
          <nav className="px-4 py-4 space-y-1" aria-label="Navegación móvil">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block px-4 py-3 rounded-xl text-base font-medium text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3 px-1 space-y-2">
              <Link
                href="/estado"
                onClick={() => setMobileOpen(false)}
              >
                <Button variant="outline" fullWidth className="gap-1.5">
                  <CreditCard className="w-4 h-4" />
                  Consultar o Pagar mi crédito
                </Button>
              </Link>
              <a
                href="/#simulador"
                onClick={() => setMobileOpen(false)}
              >
                <Button variant="primary" fullWidth>
                  Solicitar préstamo
                </Button>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
