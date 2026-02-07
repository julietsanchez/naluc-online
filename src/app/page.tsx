import Image from "next/image";
import SimulatorCard from "@/components/loan/SimulatorCard";
import FAQAccordion from "@/components/home/FAQAccordion";
import {
  Shield,
  Clock,
  CreditCard,
  Smartphone,
  FileCheck,
  Wallet,
  UserCheck,
  Banknote,
  ClipboardList,
  Zap,
  CheckCircle2,
} from "lucide-react";

export default function HomePage() {
  return (
    <>
      {/* ================================================================
          HERO SECTION
          Texto centrado + badges + SimulatorCard debajo
          ================================================================ */}
      <section
        id="simulador"
        className="relative overflow-hidden bg-gradient-to-br from-primary-900 via-primary-800 to-primary-950"
      >
        {/* Decorative blobs */}
        <div className="hero-blob w-[500px] h-[500px] bg-primary-400 -top-32 -right-32" />
        <div className="hero-blob w-[350px] h-[350px] bg-primary-500 bottom-0 -left-24" />
        <div className="hero-blob w-[200px] h-[200px] bg-primary-300 top-1/2 left-1/3" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          {/* ---------- Texto centrado ---------- */}
          <div className="text-center max-w-3xl mx-auto">
            {/* Logo grande en blanco con resplandor */}
            <div className="mb-8">
              <Image
                src="/logo.png"
                alt="NALUC"
                width={260}
                height={87}
                className="h-28 sm:h-32 lg:h-40 xl:h-48 w-auto object-contain brightness-0 invert mx-auto drop-shadow-[0_0_35px_rgba(147,197,253,0.5)]"
                priority
              />
            </div>

            <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white/90 text-sm font-medium px-4 py-2 rounded-full border border-white/10">
              <Zap className="w-4 h-4" />
              100% Online y en minutos
            </span>

            <h1 className="mt-6 text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold text-white leading-[1.08] tracking-tight">
              ¡Tu préstamo{" "}
              <span className="text-primary-300">al instante!</span>
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-white/65 max-w-lg mx-auto leading-relaxed">
              Pedí efectivo 100% online, recibilo en minutos y pagalo en
              cuotas fijas. Sin papeleos, sin vueltas.
            </p>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 justify-center">
              {["Sin papeleos", "Cuotas fijas", "Respuesta inmediata"].map(
                (text) => (
                  <div
                    key={text}
                    className="flex items-center gap-2 text-white/80"
                  >
                    <CheckCircle2 className="w-5 h-5 text-primary-300 shrink-0" />
                    <span className="text-sm font-medium">{text}</span>
                  </div>
                )
              )}
            </div>
          </div>

          {/* ---------- Simulador centrado debajo ---------- */}
          <div className="mt-12 sm:mt-16 max-w-xl mx-auto">
            <SimulatorCard />
          </div>
        </div>
      </section>

      {/* ================================================================
          TRUST INDICATORS
          Franja de confianza al estilo Ualá
          ================================================================ */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-10">
            {(
              [
                {
                  icon: Shield,
                  label: "Seguro",
                  desc: "Datos protegidos y encriptados",
                },
                {
                  icon: Clock,
                  label: "Rápido",
                  desc: "Respuesta en minutos",
                },
                {
                  icon: CreditCard,
                  label: "Cuotas fijas",
                  desc: "Sabés exactamente cuánto pagás",
                },
                {
                  icon: Smartphone,
                  label: "100% Online",
                  desc: "Todo desde tu celular",
                },
              ] as const
            ).map(({ icon: Icon, label, desc }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="rounded-xl bg-primary-50 p-3 shrink-0">
                  <Icon className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">{label}</p>
                  <p className="text-xs text-gray-500">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          ¿CÓMO FUNCIONA?
          3 pasos numerados al estilo Moni + Credicuotas
          ================================================================ */}
      <section id="como-funciona" className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
              ¿Cómo <span className="gradient-text">funciona</span>?
            </h2>
            <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
              En 3 simples pasos tenés tu préstamo acreditado en tu cuenta.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12 relative">
            {/* Connecting line — desktop only */}
            <div
              className="hidden md:block absolute top-[1.75rem] left-[16.67%] right-[16.67%] h-0.5 bg-gradient-to-r from-primary-200 via-primary-400 to-primary-200"
              aria-hidden="true"
            />

            {(
              [
                {
                  step: 1,
                  icon: ClipboardList,
                  title: "Simulá tu préstamo",
                  desc: "Elegí el monto y la cantidad de cuotas que mejor se adapten a tu necesidad.",
                },
                {
                  step: 2,
                  icon: UserCheck,
                  title: "Completá tus datos",
                  desc: "Ingresá tu información personal para que podamos validar tu identidad.",
                },
                {
                  step: 3,
                  icon: Banknote,
                  title: "Recibí el dinero",
                  desc: "Una vez aprobado, el dinero se acredita en tu cuenta bancaria al instante.",
                },
              ] as const
            ).map(({ step, icon: Icon, title, desc }) => (
              <div
                key={step}
                className="relative flex flex-col items-center text-center"
              >
                {/* Number badge */}
                <div className="relative z-10 w-14 h-14 rounded-full bg-primary-600 text-white flex items-center justify-center text-xl font-bold shadow-lg shadow-primary-600/25 mb-6">
                  {step}
                </div>

                {/* Card */}
                <div className="bg-white rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 w-full border border-gray-50">
                  <div className="rounded-2xl bg-primary-50 p-4 w-14 h-14 flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-7 h-7 text-primary-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          REQUISITOS
          Cards modernas al estilo Ualá
          ================================================================ */}
      <section id="requisitos" className="bg-gray-50/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
              ¿Qué <span className="gradient-text">necesitás</span>?
            </h2>
            <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
              Solo necesitás cumplir estos requisitos para acceder a tu préstamo
              personal.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {(
              [
                {
                  icon: FileCheck,
                  title: "DNI Argentino",
                  desc: "Ser mayor de 18 años y contar con DNI vigente para validar tu identidad.",
                },
                {
                  icon: Wallet,
                  title: "Cuenta bancaria",
                  desc: "CBU y tarjeta de débito a tu nombre para recibir el dinero y pagar cuotas.",
                },
                {
                  icon: Smartphone,
                  title: "Celular activo",
                  desc: "Un número de celular para validar tu línea y mantenerte informado del proceso.",
                },
                {
                  icon: Banknote,
                  title: "Ingresos",
                  desc: "Contar con ingresos demostrables para la evaluación crediticia.",
                },
              ] as const
            ).map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="bg-white rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 group"
              >
                <div className="rounded-2xl bg-primary-50 p-4 w-14 h-14 flex items-center justify-center mb-5 group-hover:bg-primary-100 transition-colors">
                  <Icon className="w-7 h-7 text-primary-600" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">
                  {title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          ¿POR QUÉ ELEGIRNOS?
          Sección oscura con glass cards (inspiración Credicuotas)
          ================================================================ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-900 via-primary-800 to-primary-950">
        <div className="hero-blob w-[400px] h-[400px] bg-primary-500 -top-20 right-1/4" />
        <div className="hero-blob w-[250px] h-[250px] bg-primary-400 bottom-0 left-10" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              ¿Por qué elegir{" "}
              <span className="text-primary-300">NALUC</span>?
            </h2>
            <p className="mt-4 text-lg text-white/55 max-w-2xl mx-auto">
              Somos tu aliado financiero. Transparencia, velocidad y compromiso
              en cada paso.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {(
              [
                {
                  icon: Zap,
                  title: "Respuesta inmediata",
                  desc: "Sabés al instante si tu préstamo fue aprobado. Sin esperas innecesarias.",
                },
                {
                  icon: Shield,
                  title: "Seguro y confiable",
                  desc: "Tus datos están protegidos con los más altos estándares de seguridad.",
                },
                {
                  icon: CreditCard,
                  title: "Cuotas fijas",
                  desc: "Todas las cuotas son fijas. Sabés exactamente cuánto pagás cada mes.",
                },
                {
                  icon: Smartphone,
                  title: "100% Online",
                  desc: "Todo el proceso lo hacés desde tu celular o computadora, sin moverte de tu casa.",
                },
              ] as const
            ).map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="bg-white/[0.06] backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/[0.1] transition-all duration-300"
              >
                <div className="rounded-xl bg-primary-500/20 p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-primary-300" />
                </div>
                <h3 className="font-bold text-white text-lg mb-2">{title}</h3>
                <p className="text-sm text-white/55 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          FAQ
          Accordion al estilo Credicuotas / Ualá
          ================================================================ */}
      <section id="faq" className="bg-gray-50/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
              Preguntas{" "}
              <span className="gradient-text">frecuentes</span>
            </h2>
            <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
              Resolvé tus dudas antes de empezar.
            </p>
          </div>
          <FAQAccordion />
        </div>
      </section>

      {/* ================================================================
          CTA FINAL
          Llamado a acción con gradiente
          ================================================================ */}
      <section className="relative overflow-hidden bg-gradient-to-r from-primary-700 via-primary-600 to-primary-700">
        <div className="hero-blob w-[300px] h-[300px] bg-primary-400 -top-16 right-10 opacity-20" />
        <div className="hero-blob w-[200px] h-[200px] bg-primary-300 bottom-0 -left-10 opacity-20" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            ¿Listo para tu préstamo?
          </h2>
          <p className="text-lg text-white/70 mb-8 max-w-xl mx-auto">
            Simulá ahora y descubrí cuánto podés pedir. Es rápido, fácil y 100%
            online.
          </p>
          <a href="#simulador">
            <button
              type="button"
              className="inline-flex items-center justify-center bg-white text-primary-700 font-bold text-lg px-8 py-4 rounded-full hover:bg-gray-50 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 focus-visible-ring"
            >
              Simular mi préstamo
            </button>
          </a>
        </div>
      </section>
    </>
  );
}
