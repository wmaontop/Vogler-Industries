"use client"

import type React from "react"
import { cn } from "@/lib/utils"

interface GlowButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  variant?: "cyan" | "emerald" | "purple" | "amber"
}

export default function GlowButton({ children, variant = "cyan", className, ...props }: GlowButtonProps) {
  const variantClasses = {
    cyan: "from-cyan-400 to-cyan-500 hover:shadow-cyan-500/50",
    emerald: "from-emerald-600 to-teal-600 hover:shadow-emerald-500/50",
    purple: "from-purple-600 to-pink-600 hover:shadow-purple-500/50",
    amber: "from-amber-600 to-orange-600 hover:shadow-amber-500/50",
  }

  return (
    <button
      className={cn(
        `relative px-4 py-2 font-semibold text-white rounded-lg transition-all duration-300 
        bg-gradient-to-r ${variantClasses[variant]} hover:shadow-lg active:scale-95 
        transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100`,
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}
