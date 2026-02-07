"use client";

import { forwardRef, useState } from "react";
import { Info } from "lucide-react";

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "className"> {
  label: string;
  error?: string;
  hint?: string;
  infoTooltip?: string;
  className?: string;
  inputClassName?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, error, hint, infoTooltip, className = "", inputClassName = "", id, ...props },
  ref
) {
  const generatedId = id ?? `input-${Math.random().toString(36).slice(2, 9)}`;
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className={className}>
      <div className="flex items-center gap-1.5 mb-1">
        <label htmlFor={generatedId} className="block text-sm font-semibold text-gray-700">
          {label}
        </label>
        {infoTooltip && (
          <div className="relative inline-flex">
            <button
              type="button"
              className="text-gray-400 hover:text-primary-600 transition-colors focus:outline-none"
              aria-label={infoTooltip}
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              onFocus={() => setShowTooltip(true)}
              onBlur={() => setShowTooltip(false)}
              onClick={() => setShowTooltip((prev) => !prev)}
            >
              <Info className="w-4 h-4" />
            </button>
            {showTooltip && (
              <div
                role="tooltip"
                className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 text-xs font-medium text-white bg-gray-800 rounded-lg shadow-lg whitespace-nowrap z-50"
              >
                {infoTooltip}
                <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px border-4 border-transparent border-t-gray-800" />
              </div>
            )}
          </div>
        )}
      </div>
      <input
        ref={ref}
        id={generatedId}
        className={`w-full h-11 px-3 rounded-xl border bg-white text-gray-900 placeholder:text-gray-400 focus-visible-ring ${
          error ? "border-red-500" : "border-gray-300"
        } ${inputClassName}`}
        aria-invalid={!!error}
        aria-describedby={error ? `${generatedId}-error` : hint ? `${generatedId}-hint` : undefined}
        {...props}
      />
      {error && (
        <p id={`${generatedId}-error`} className="mt-1 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
      {hint && !error && (
        <p id={`${generatedId}-hint`} className="mt-1 text-sm text-gray-500">
          {hint}
        </p>
      )}
    </div>
  );
});

export default Input;
