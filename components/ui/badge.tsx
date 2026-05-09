import * as React from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'secondary';
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const variants = {
    default: "bg-indigo-100 text-indigo-700 border-indigo-200",
    success: "bg-emerald-100 text-emerald-700 border-emerald-200",
    warning: "bg-yellow-100 text-yellow-700 border-yellow-200",
    danger: "bg-orange-100 text-orange-700 border-orange-200",
    secondary: "bg-slate-100 text-slate-800 border-slate-200"
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-2 py-1 text-[10px] font-bold uppercase tracking-tight transition-colors border",
        variants[variant],
        className
      )}
      {...props}
    />
  )
}

export { Badge }
