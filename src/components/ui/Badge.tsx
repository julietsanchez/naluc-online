"use client";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "success" | "warning" | "error";
}

export default function Badge({ className = "", variant = "default", children, ...props }: BadgeProps) {
  const variants = {
    default: "bg-primary-100 text-primary-800",
    success: "bg-green-100 text-green-800",
    warning: "bg-amber-100 text-amber-800",
    error: "bg-red-100 text-red-800",
  };
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
