"use client";

import { forwardRef } from "react";

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "className"> {
  label: string;
  error?: string;
  hint?: string;
  className?: string;
  inputClassName?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, error, hint, className = "", inputClassName = "", id, ...props },
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
