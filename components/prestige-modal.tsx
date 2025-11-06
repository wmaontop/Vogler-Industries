"use client"

import { useState } from "react"
import { calculatePrestigeBonus, calculatePrestigeReward, getPrestigeMilestones } from "@/lib/prestige"
import GlowButton from "./glow-button"

export default function PrestigeModal({ prestigeLevel, money, onPrestige, onClose }) {
  const [showDetails, setShowDetails] = useState(false)
  const bonus = calculatePrestigeReward(money, prestigeLevel)
  const nextBonus = calculatePrestigeBonus(prestigeLevel + 1)
  const currentBonus = calculatePrestigeBonus(prestigeLevel)
  const milestones = getPrestigeMilestones(prestigeLevel + 1)

  const formatCurrency = (n) => {
    if (n >= 1e12) return "$" + (n / 1e12).toFixed(2) + "T"
    if (n >= 1e9) return "$" + (n / 1e9).toFixed(2) + "B"
    if (n >= 1e6) return "$" + (n / 1e6).toFixed(2) + "M"
    if (n >= 1e3) return "$" + (n / 1e3).toFixed(2) + "K"
    return "$" + (Math.round(n * 100) / 100).toFixed(2)
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gradient-to-b from-slate-900 to-slate-950 rounded-xl p-8 border border-purple-400/30 max-w-2xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-3xl font-bold text-purple-400 mb-2">Prestige Advancement</h2>
        <p className="text-slate-400 mb-6">
          Reset your progress and unlock powerful permanent bonuses. Your accumulated power transfers forward!
        </p>

        {/* Current Stats */}
        <div className="bg-white/5 p-4 rounded-lg mb-6 border border-white/5">
          <h3 className="text-sm font-semibold text-cyan-400 mb-3">Current Prestige Level {prestigeLevel}</h3>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <span className="text-slate-400">Income Multiplier:</span>
              <span className="text-cyan-400 font-bold ml-2">x{currentBonus.incomeMultiplier.toFixed(2)}</span>
            </div>
            <div>
              <span className="text-slate-400">Click Power Bonus:</span>
              <span className="text-cyan-400 font-bold ml-2">
                +{((currentBonus.clickPowerMultiplier - 1) * 100).toFixed(1)}%
              </span>
            </div>
            <div>
              <span className="text-slate-400">Efficiency Bonus:</span>
              <span className="text-cyan-400 font-bold ml-2">+{(currentBonus.efficiencyBonus * 100).toFixed(1)}%</span>
            </div>
            <div>
              <span className="text-slate-400">Upgrade Discount:</span>
              <span className="text-cyan-400 font-bold ml-2">
                {(currentBonus.upgradeDiscountPercent * 100).toFixed(0)}%
              </span>
            </div>
          </div>
        </div>

        {/* Next Level Benefits */}
        <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-4 rounded-lg mb-6 border border-purple-500/20">
          <h3 className="text-sm font-semibold text-emerald-400 mb-3">After Prestige → Level {prestigeLevel + 1}</h3>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <span className="text-slate-400">Income Multiplier:</span>
              <span className="text-emerald-400 font-bold ml-2">x{nextBonus.incomeMultiplier.toFixed(2)}</span>
            </div>
            <div>
              <span className="text-slate-400">Click Power Bonus:</span>
              <span className="text-emerald-400 font-bold ml-2">
                +{((nextBonus.clickPowerMultiplier - 1) * 100).toFixed(1)}%
              </span>
            </div>
            <div>
              <span className="text-slate-400">Efficiency Bonus:</span>
              <span className="text-emerald-400 font-bold ml-2">+{(nextBonus.efficiencyBonus * 100).toFixed(1)}%</span>
            </div>
            <div>
              <span className="text-slate-400">Upgrade Discount:</span>
              <span className="text-emerald-400 font-bold ml-2">
                {(nextBonus.upgradeDiscountPercent * 100).toFixed(0)}%
              </span>
            </div>
          </div>
        </div>

        {/* Prestige Reward */}
        <div className="bg-white/5 p-4 rounded-lg mb-6 border border-white/5">
          <h3 className="text-sm font-semibold text-purple-400 mb-2">Prestige Reward</h3>
          <p className="text-lg font-bold text-purple-300">+{formatCurrency(bonus)} added to your starting balance</p>
          <p className="text-xs text-slate-400 mt-2">10% of current earnings + prestige level bonus</p>
        </div>

        {milestones.length > 0 && (
          <div className="bg-white/5 p-4 rounded-lg mb-6 border border-white/5">
            <h3 className="text-sm font-semibold text-amber-400 mb-2">Unlocked at Level {prestigeLevel + 1}</h3>
            <div className="space-y-1">
              {milestones.map((milestone, idx) => (
                <div key={idx} className="flex items-start gap-2 text-sm">
                  <span className="text-amber-400">+</span>
                  <span className="text-slate-300">{milestone}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Details Toggle */}
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="text-xs text-slate-400 hover:text-slate-300 mb-4 transition-colors"
        >
          {showDetails ? "Hide" : "Show"} detailed calculations
        </button>

        {showDetails && (
          <div className="bg-white/5 p-4 rounded-lg mb-6 border border-white/5 text-xs text-slate-400 space-y-2">
            <p>
              <strong>Bonus Calculation:</strong> Base reward is 10% of current money (
              {formatCurrency(Math.floor(money * 0.1))}). Level {prestigeLevel} adds {prestigeLevel * 5}% (
              {prestigeLevel * 5}% of base).
            </p>
            <p>
              <strong>Income Multiplier:</strong> 10% per prestige level stacks multiplicatively with all upgrades.
            </p>
            <p>
              <strong>Click Power:</strong> Increases 5% every 3 prestige levels for scaling power.
            </p>
            <p>
              <strong>Efficiency:</strong> Passive bonus increases 2% every 5 prestige levels.
            </p>
          </div>
        )}

        {/* Warning */}
        <div className="bg-red-500/10 p-4 rounded-lg mb-6 border border-red-500/20 text-sm">
          <p className="text-red-400 font-semibold mb-1">All Progress Will Reset</p>
          <p className="text-red-300/80">
            You will lose all upgrades, auto-clickers, and temporary bonuses. Only prestige bonuses carry forward.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg transition-all"
          >
            Cancel
          </button>
          <GlowButton onClick={onPrestige} variant="purple" className="flex-1 py-3">
            Prestige Now
          </GlowButton>
        </div>
      </div>
    </div>
  )
}
