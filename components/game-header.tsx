"use client"

import { useEffect, useState } from "react"

export default function GameHeader({ money, income }) {
  const [moneyPulse, setMoneyPulse] = useState(false)
  const [incomePulse, setIncomePulse] = useState(false)

  useEffect(() => {
    setMoneyPulse(true)
    const timer = setTimeout(() => setMoneyPulse(false), 300)
    return () => clearTimeout(timer)
  }, [money])

  const formatCurrency = (n) => {
    if (n >= 1e12) return "$" + (n / 1e12).toFixed(2) + "T"
    if (n >= 1e9) return "$" + (n / 1e9).toFixed(2) + "B"
    if (n >= 1e6) return "$" + (n / 1e6).toFixed(2) + "M"
    if (n >= 1e3) return "$" + (n / 1e3).toFixed(2) + "K"
    return "$" + (Math.round(n * 100) / 100).toFixed(2)
  }

  return (
    <header className="flex items-center justify-between backdrop-blur-sm bg-white/5 rounded-xl p-6 border border-white/10 animate-pulse-glow">
      <div>
        <h1 className="text-3xl font-bold text-cyan-400">Vogler Industries</h1>
        <p className="text-sm text-slate-400">Build your tech empire</p>
      </div>
      <div className="flex gap-8">
        <div className="text-right">
          <p className="text-xs text-slate-400 uppercase tracking-wider">Vogler Bucks</p>
          <p className={`text-2xl font-bold text-cyan-400 transition-all ${moneyPulse ? "scale-110" : "scale-100"}`}>
            {formatCurrency(money)}
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs text-slate-400 uppercase tracking-wider">Income/sec</p>
          <p className="text-2xl font-bold text-green-400 animate-scale-pulse">{formatCurrency(income)}</p>
        </div>
      </div>
    </header>
  )
}
