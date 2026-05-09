import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'secondary' | 'danger' | 'soft' | 'soft-secondary';
  size?: 'default' | 'sm' | 'lg' | 'xs';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    const variants = {
      default: "bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm",
      outline: "border border-slate-300 bg-transparent hover:bg-slate-50 text-slate-700",
      ghost: "bg-transparent hover:bg-slate-100 text-slate-700",
      secondary: "bg-slate-100 text-slate-900 hover:bg-slate-200",
      danger: "bg-red-600 text-white hover:bg-red-700 shadow-sm",
      soft: "text-indigo-600 hover:bg-indigo-50 bg-white border border-indigo-100",
      "soft-secondary": "text-slate-600 hover:bg-slate-100 bg-white border border-slate-200",
    };

    const sizes = {
      default: "h-10 px-4 py-2",
      sm: "h-8 px-3 text-sm",
      xs: "px-3 py-1 text-xs font-semibold rounded",
      lg: "h-12 px-8 text-lg"
    };

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-lg font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 disabled:pointer-events-none disabled:opacity-50",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
