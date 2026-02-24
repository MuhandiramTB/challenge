import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "danger";
  loading?: boolean;
  className?: string;
}

export function Button({
  children,
  onClick,
  disabled = false,
  variant = "primary",
  loading = false,
  className = "",
}: ButtonProps) {
  return (
    <button
      type="button"
      className={`btn btn-${variant} ${disabled ? "btn-disabled" : ""} ${className}`.trim()}
      disabled={disabled || loading}
      onClick={onClick}
      aria-busy={loading}
    >
      {loading ? <span className="btn-spinner">Loading...</span> : children}
    </button>
  );
}
