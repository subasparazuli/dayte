import * as React from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'success' | 'warning' | 'error' | 'info' | 'neutral' | 'outline'
}

function Badge({ className, variant = "neutral", ...props }: BadgeProps) {
  const variants = {
    success: "bg-green-100 text-green-800 border-transparent",
    warning: "bg-amber-100 text-amber-800 border-transparent",
    error: "bg-red-100 text-red-800 border-transparent",
    info: "bg-blue-100 text-blue-800 border-transparent",
    neutral: "bg-gray-100 text-gray-800 border-transparent",
    outline: "text-gray-800 border-gray-300 bg-transparent border"
  }

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        variants[variant],
        className
      )}
      {...props}
    />
  )
}

export { Badge }
