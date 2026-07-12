"use client";

import { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

type Variant = "primary" | "secondary" | "ghost" | "danger";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  fullWidth?: boolean;
}

const VARIANT_CLASSES: Record<Variant, string> = {
  primary: "bg-primary text-white hover:bg-primary-dim active:scale-[0.98]",
  secondary: "bg-surface-3 text-text hover:bg-surface-3/80 active:scale-[0.98]",
  ghost: "bg-transparent text-text-muted hover:text-text hover:bg-surface-2",
  danger: "bg-danger/15 text-danger hover:bg-danger/25 active:scale-[0.98]",
};

export function Button({
  variant = "primary",
  fullWidth,
  className,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      className={clsx(
        "inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-150",
        VARIANT_CLASSES[variant],
        fullWidth && "w-full",
        disabled && "opacity-40 pointer-events-none",
        className
      )}
      {...props}
    />
  );
}
