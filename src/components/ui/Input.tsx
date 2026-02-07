"use client";

import { forwardRef } from "react";
import { Info } from "lucide-react";

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "className"> {
  label: string;
  error?: string;
  hint?: string;
  infoText?: string;
  className?: string;
  inputClassName?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, error, hint, infoText, className = "", inputClassName = "", id, ...props },
  ref
) {
  const generatedId = id ?? `input-${Math.random().toString(36).slice(2, 9)}`;

  return (
    <div className={className}>
      <label htmlFor={generatedId} className="block text-sm font-semibold text-gray-700 mb-1">
        {label}
      </label>
      <input
        ref={ref}
        id={generatedId}
        className={`w-full h-11 px-3 rounded-xl border bg-white text-gray-900 placeholder:text-gray-400 focus-visible-ring ${
          error ? "border-red-500" : "border-gray-300"
        } ${inputClassName}`}
        aria-invalid={!!error}
        aria-describedby={error ? `${generatedId}-error` : infoText ? `${generatedId}-info` : hint ? `${generatedId}-hint` : undefined}
        {...props}
      />
      {error && (
        <p id={`${generatedId}-error`} className="mt-1 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
      {infoText && !error && (
        <p id={`${generatedId}-info`} className="mt-1.5 flex items-center gap-1.5 text-xs text-gray-500">
          <Info className="w-3.5 h-3.5 text-primary-500 flex-shrink-0" />
          {infoText}
        </p>
      )}
      {hint && !error && !infoText && (
        <p id={`${generatedId}-hint`} className="mt-1 text-sm text-gray-500">
          {hint}
        </p>
      )}
    </div>
  );
});

export default Input;
