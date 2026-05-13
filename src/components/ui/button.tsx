import * as React from "react"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg" | "icon" | "icon-sm"
}

export function Button({
  className = "",
  variant = "default",
  size = "default",
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-xl font-medium transition-all disabled:pointer-events-none disabled:opacity-50"

  const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
    default: "bg-[#F27D26] text-black hover:opacity-90",
    outline: "border border-[#F27D26]/40 text-[#E4E3E0] hover:bg-[#F27D26]/10",
    ghost: "text-[#E4E3E0] hover:bg-white/10",
  }

  const sizes: Record<NonNullable<ButtonProps["size"]>, string> = {
    default: "h-10 px-4 py-2",
    sm: "h-9 px-3",
    lg: "h-12 px-6",
    icon: "h-10 w-10 p-0",
    "icon-sm": "h-8 w-8 p-0",
  }

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    />
  )
}

export default Button
