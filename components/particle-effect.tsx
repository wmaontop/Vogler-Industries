"use client"

import type React from "react"

import { useEffect, useState } from "react"

interface Particle {
  id: string
  x: number
  y: number
  tx: number
  ty: number
  color: string
}

interface ParticleEffectProps {
  x: number
  y: number
  count?: number
  color?: string
}

export default function ParticleEffect({ x, y, count = 8, color = "cyan" }: ParticleEffectProps) {
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    const newParticles = Array.from({ length: count }).map((_, i) => {
      const angle = (i / count) * Math.PI * 2
      const distance = 60 + Math.random() * 40
      return {
        id: `${Math.random()}`,
        x,
        y,
        tx: Math.cos(angle) * distance,
        ty: Math.sin(angle) * distance,
        color,
      }
    })
    setParticles(newParticles)

    const timer = setTimeout(() => setParticles([]), 1000)
    return () => clearTimeout(timer)
  }, [x, y, count, color])

  const colorMap = {
    cyan: "bg-cyan-400",
    emerald: "bg-emerald-400",
    purple: "bg-purple-400",
    red: "bg-red-400",
  }

  return (
    <>
      {particles.map((p) => (
        <div
          key={p.id}
          className={`fixed pointer-events-none rounded-full ${colorMap[color as keyof typeof colorMap] || "bg-cyan-400"} animate-particle-burst`}
          style={
            {
              left: `${p.x}px`,
              top: `${p.y}px`,
              width: "6px",
              height: "6px",
              "--tx": `${p.tx}px`,
              "--ty": `${p.ty}px`,
            } as React.CSSProperties
          }
        />
      ))}
    </>
  )
}
