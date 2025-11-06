"use client"

import { useState } from "react"
import GlowButton from "./glow-button"
import ParticleEffect from "./particle-effect"

export default function ClickerPanel({ clickValue, money, onMainClick, onClickBuy, onBoostBuy, boostActive }) {
  const [showParticles, setShowParticles] = useState({ x: 0, y: 0, show: false })
  const [buttonScale, setButtonScale] = useState(1)

  const handleMainClick = () => {
    const rect = (event?.currentTarget as HTMLButtonElement)?.getBoundingClientRect?.()
    if (rect) {
      setShowParticles({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2, show: true })
      setTimeout(() => setShowParticles((p) => ({ ...p, show: false })), 100)
    }
    setButtonScale(0.95)
    setTimeout(() => setButtonScale(1), 100)
    onMainClick()
  }

  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 animate-pulse-glow">
        <p className="text-sm text-slate-400 mb-4">Click for Vogler Bucks</p>
        <button
          onClick={handleMainClick}
          className="w-full py-4 px-6 text-2xl font-bold text-slate-900 bg-gradient-to-b from-cyan-400 to-cyan-500 hover:from-cyan-300 hover:to-cyan-400 rounded-lg transition-all active:scale-95 shadow-lg hover:shadow-cyan-500/50 animate-scale-pulse hover:animate-none"
          style={{ transform: `scale(${buttonScale})` }}
        >
          + ${clickValue}
        </button>
        <p className="text-xs text-slate-400 mt-4 text-center">
          Click Power: <span className="text-cyan-400 font-bold">{clickValue}</span>
        </p>
      </div>

      <div className="space-y-2">
        <GlowButton onClick={onClickBuy} disabled={money < 500} variant="emerald" className="w-full text-sm">
          Auto-Clicker ($500)
        </GlowButton>
        <GlowButton
          onClick={onBoostBuy}
          disabled={money < 2000 || boostActive}
          variant="amber"
          className="w-full text-sm"
        >
          2x Boost 30s ($2000)
        </GlowButton>
      </div>

      {showParticles.show && <ParticleEffect x={showParticles.x} y={showParticles.y} count={12} color="cyan" />}
    </div>
  )
}
