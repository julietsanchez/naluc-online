"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import Button from "./Button";

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  className?: string;
}

export default function Modal({ open, onClose, title, children, className = "" }: ModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const titleId = "modal-title";

  useEffect(() => {
    if (!open) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose();
  };

  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      onClick={handleOverlayClick}
    >
      <div
        className={`bg-white rounded-card shadow-card-hover w-full max-w-lg max-h-[85vh] flex flex-col ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 id={titleId} className="text-lg font-bold text-gray-900">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-gray-500 hover:bg-gray-100 focus-visible-ring"
            aria-label="Cerrar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-4 overflow-y-auto flex-1 text-sm text-gray-700 whitespace-pre-wrap">
          {children}
        </div>
        <div className="p-4 border-t border-gray-200">
          <Button fullWidth onClick={onClose}>
            Cerrar
          </Button>
        </div>
      </div>
    </div>
  );
}
