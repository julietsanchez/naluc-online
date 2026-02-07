"use client";

import { forwardRef } from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  fullWidth?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    className = "",
    variant = "primary",
    size = "md",
    loading = false,
    fullWidth = false,
    disabled,
    children,
    ...props
  },
  ref
) {
  const base =
    "inline-flex items-center justify-center font-semibold rounded-pill transition-colors focus-visible-ring disabled:opacity-50 disabled:pointer-events-none";
  const variants = {
    primary: "bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800 shadow-md hover:shadow-lg",
    secondary: "bg-primary-100 text-primary-800 hover:bg-primary-200 font-bold",
    outline: "border-2 border-primary-600 text-primary-700 hover:bg-primary-50 font-bold",
    ghost: "text-primary-700 hover:bg-primary-50 font-semibold",
  };
  const sizes = {
    sm: "h-9 px-4 text-sm",
    md: "h-11 px-6 text-base",
    lg: "h-12 px-8 text-lg",
  };

  return (
    <button
      ref={ref}
      type={props.type ?? "button"}
      className={`${base} ${variants[variant]} ${sizes[size]} ${fullWidth ? "w-full" : ""} ${className}`}
      disabled={disabled || loading}
      aria-busy={loading}
      {...props}
    >
      {loading ? (
        <>
          <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent mr-2" aria-hidden />
          {children}
        </>
      ) : (
        children
      )}
    </button>
  );
});

export default Button;
