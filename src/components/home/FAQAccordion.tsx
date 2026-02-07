"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ_DATA: FAQItem[] = [
  {
    question: "¿Cómo solicito un préstamo en NALUC?",
    answer:
      "Es muy simple: simulá tu préstamo eligiendo el monto y las cuotas, completá tus datos personales, validá tu identidad y listo. Todo el proceso es 100% online y tarda solo unos minutos.",
  },
  {
    question: "¿Cuáles son los requisitos para pedir un préstamo?",
    answer:
      "Necesitás ser mayor de 18 años con DNI argentino, tener una cuenta bancaria con CBU a tu nombre, un número de celular activo y contar con ingresos demostrables.",
  },
  {
    question: "¿Cuánto puedo solicitar?",
    answer:
      "Podés solicitar desde $50.000 hasta $500.000. El monto final aprobado dependerá de tu perfil crediticio y la evaluación correspondiente.",
  },
  {
    question: "¿En cuántas cuotas puedo pagar?",
    answer:
      "Ofrecemos planes de 1 a 6 cuotas fijas mensuales. Vos elegís la cantidad de cuotas que mejor se adapte a tu presupuesto.",
  },
  {
    question: "¿Cómo recibo el dinero?",
    answer:
      "Una vez aprobado tu préstamo, el dinero se transfiere directamente a tu cuenta bancaria. La acreditación es en el día en la mayoría de los casos.",
  },
  {
    question: "¿Las cuotas son fijas?",
    answer:
      "Sí, todas las cuotas son fijas desde el momento de la aprobación. Sabés exactamente cuánto pagás cada mes sin sorpresas.",
  },
  {
    question: "¿Puedo cancelar antes de tiempo?",
    answer:
      "Sí, podés realizar la cancelación anticipada total o parcial de tu préstamo en cualquier momento. Consultá las condiciones al momento de la solicitud.",
  },
];

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-3 max-w-3xl mx-auto">
      {FAQ_DATA.map((item, index) => (
        <div
          key={index}
          className="bg-white rounded-2xl border border-gray-100 overflow-hidden transition-shadow hover:shadow-card"
        >
          <button
            type="button"
            className="w-full flex items-center justify-between px-6 py-5 text-left focus-visible-ring rounded-2xl"
            onClick={() => toggle(index)}
            aria-expanded={openIndex === index}
          >
            <span className="text-base font-semibold text-gray-900 pr-4">
              {item.question}
            </span>
            <ChevronDown
              className={`w-5 h-5 text-primary-600 shrink-0 transition-transform duration-300 ${
                openIndex === index ? "rotate-180" : ""
              }`}
            />
          </button>
          <div className={`faq-content ${openIndex === index ? "open" : ""}`}>
            <div>
              <p className="px-6 pb-5 text-gray-600 leading-relaxed">
                {item.answer}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
