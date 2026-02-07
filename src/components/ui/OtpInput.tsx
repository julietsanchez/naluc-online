"use client";

import { useRef } from "react";

interface OtpInputProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export default function OtpInput({ length = 4, value, onChange, error }: OtpInputProps) {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, inputValue: string) => {
    if (!/^\d*$/.test(inputValue)) return;

    const chars = value.padEnd(length, " ").split("");
    chars[index] = inputValue.slice(-1) || " ";
    const result = chars.join("").replace(/ /g, "").slice(0, length);
    onChange(result);

    if (inputValue && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      const chars = value.split("");
      if (chars[index]) {
        chars[index] = "";
        onChange(chars.join(""));
      } else if (index > 0) {
        chars[index - 1] = "";
        onChange(chars.join(""));
        inputsRef.current[index - 1]?.focus();
      }
    }
    if (e.key === "ArrowLeft" && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
    if (e.key === "ArrowRight" && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
    onChange(pasted);
    const focusIndex = Math.min(pasted.length, length - 1);
    inputsRef.current[focusIndex]?.focus();
  };

  return (
    <div>
      <div className="flex gap-3 justify-center">
        {Array.from({ length }).map((_, i) => (
          <input
            key={i}
            ref={(el) => {
              inputsRef.current[i] = el;
            }}
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={1}
            value={value[i] ?? ""}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            onPaste={handlePaste}
            className={`w-14 h-16 text-center text-2xl font-bold rounded-xl border-2 bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
              error ? "border-red-500" : value[i] ? "border-primary-400" : "border-gray-300"
            }`}
            aria-label={`Dígito ${i + 1}`}
          />
        ))}
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-600 text-center" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
