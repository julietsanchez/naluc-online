"use client";

import { forwardRef } from "react";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "className"> {
  label: string;
  options: SelectOption[];
  placeholder?: string;
  error?: string;
  className?: string;
  selectClassName?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { label, options, placeholder, error, className = "", selectClassName = "", id, ...props },
  ref
) {
  const generatedId = id ?? `select-${Math.random().toString(36).slice(2, 9)}`;
  return (
    <div className={className}>
      <label htmlFor={generatedId} className="block text-sm font-semibold text-gray-700 mb-1">
        {label}
      </label>
      <select
        ref={ref}
        id={generatedId}
        className={`w-full h-11 px-3 rounded-xl border bg-white text-gray-900 focus-visible-ring ${
          error ? "border-red-500" : "border-gray-300"
        } ${selectClassName}`}
        aria-invalid={!!error}
        aria-describedby={error ? `${generatedId}-error` : undefined}
        {...props}
      >
        {placeholder && (
          <option value="">{placeholder}</option>
        )}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && (
        <p id={`${generatedId}-error`} className="mt-1 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
});

export default Select;
