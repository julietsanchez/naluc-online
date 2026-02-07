"use client";

import { forwardRef } from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated";
}

const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { className = "", variant = "default", children, ...props },
  ref
) {
  return (
    <div
      ref={ref}
      className={`rounded-card bg-white p-6 shadow-card ${
        variant === "elevated" ? "shadow-card-hover" : ""
      } transition-shadow ${className}`}
      {...props}
    >
      {children}
    </div>
  );
});

export default Card;
