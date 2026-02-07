"use client";

import { forwardRef } from "react";

export interface SliderProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type" | "className" | "min" | "max" | "step" | "value"
> {
  label: string;
  valueLabel?: string;
  min: number;
  max: number;
  step?: number;
  value?: number;
  error?: string;
  className?: string;
  /** Oculta visualmente el label (lo deja como sr-only para accesibilidad) */
  hideLabel?: boolean;
}

const Slider = forwardRef<HTMLInputElement, SliderProps>(function Slider(
  { label, valueLabel, min, max, step = 1, error, className = "", id, hideLabel = false, ...props },
  ref
) {
  const generatedId = id ?? `slider-${Math.random().toString(36).slice(2, 9)}`;
  return (
    <div className={className}>
      {hideLabel ? (
        <label htmlFor={generatedId} className="sr-only">
          {label}
        </label>
      ) : (
        <div className="flex justify-between items-baseline mb-1">
          <label htmlFor={generatedId} className="text-sm font-medium text-gray-700">
            {label}
          </label>
          {valueLabel != null && (
            <span className="text-sm font-bold text-primary-600">{valueLabel}</span>
          )}
        </div>
      )}
      <input
        ref={ref}
        type="range"
        id={generatedId}
        min={min}
        max={max}
        step={step}
        className="w-full h-2 rounded-pill cursor-pointer focus-visible-ring"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-invalid={!!error}
        aria-describedby={error ? `${generatedId}-error` : undefined}
        {...props}
      />
      {error && (
        <p id={`${generatedId}-error`} className="mt-1 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
});

export default Slider;
