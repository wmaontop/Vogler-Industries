"use client"

import { useEffect, useState } from "react"

export default function FloatingText({ text, x, y }) {
  const [opacity, setOpacity] = useState(1)

  useEffect(() => {
    const timer = setTimeout(() => setOpacity(0), 1500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div
      className="fixed pointer-events-none font-bold text-xl animate-float-up"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        opacity,
        textShadow: "0 0 10px rgba(34, 211, 238, 0.5)",
      }}
    >
      {text}
    </div>
  )
}
