"use client"

import { useState } from "react"
import { upgrades, getCost, calculateSynergyBonus, canBuyUpgrade } from "@/lib/upgrades"
import UpgradeEvolutionCard from "./upgrade-evolution-card"

interface AdvancedUpgradesPanelProps {
  money: number
  upgradeOwned: Record<string, number>
  stats: {
    clickPower: number
    efficiency: number
    multiplier: number
    critChance: number
    critDamage: number
    bulkDiscount: number
    passiveIncome: number
  }
  onBuyUpgrade: (upgradeId: string) => void
}

export default function AdvancedUpgradesPanel({
  money,
  upgradeOwned,
  stats,
  onBuyUpgrade,
}: AdvancedUpgradesPanelProps) {
  const [filter, setFilter] = useState<string | null>(null)
  const synergyBonus = calculateSynergyBonus(upgradeOwned)
  const totalUpgrades = Object.values(upgradeOwned).reduce((a, b) => a + b, 0)

  const sortedUpgrades = Object.values(upgrades).sort((a, b) => {
    const costA = getCost(a)
    const costB = getCost(b)
    return costA - costB
  })

  const filteredUpgrades = filter ? sortedUpgrades.filter((u) => u.type === filter) : sortedUpgrades

  return (
    <div className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-cyan-400">Advanced Upgrades</h2>
        <div className="text-xs bg-purple-500/20 px-3 py-1 rounded-full border border-purple-500/30">
          Synergy: x{synergyBonus.toFixed(2)}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-4">
        <button
          onClick={() => setFilter(null)}
          className={`text-xs py-1 px-2 rounded transition-all ${
            filter === null ? "bg-cyan-500 text-white" : "bg-white/5 text-slate-400 hover:bg-white/10"
          }`}
        >
          All ({totalUpgrades})
        </button>
        <button
          onClick={() => setFilter("clickPower")}
          className={`text-xs py-1 px-2 rounded transition-all ${
            filter === "clickPower" ? "bg-cyan-500 text-white" : "bg-white/5 text-slate-400 hover:bg-white/10"
          }`}
        >
          Click ({upgradeOwned["clickPower"] || 0})
        </button>
        <button
          onClick={() => setFilter("autoClicker")}
          className={`text-xs py-1 px-2 rounded transition-all ${
            filter === "autoClicker" ? "bg-cyan-500 text-white" : "bg-white/5 text-slate-400 hover:bg-white/10"
          }`}
        >
          Auto ({upgradeOwned["autoClicker"] || 0})
        </button>
        <button
          onClick={() => setFilter("multiplier")}
          className={`text-xs py-1 px-2 rounded transition-all ${
            filter === "multiplier" ? "bg-cyan-500 text-white" : "bg-white/5 text-slate-400 hover:bg-white/10"
          }`}
        >
          Power ({upgradeOwned["multiplier"] || 0})
        </button>
      </div>

      {/* Upgrades list with evolution cards */}
      <div className="space-y-2 max-h-96 overflow-y-auto">
        {filteredUpgrades.map((upgrade) => {
          const cost = getCost(upgrade)
          const discount = upgrade.id === "bulkBuy" ? stats.bulkDiscount : 0
          const discountedCost = Math.ceil(cost * (1 - discount))
          const canAfford = canBuyUpgrade(upgrade, money, discount)
          const owned = upgradeOwned[upgrade.id] || 0

          return (
            <UpgradeEvolutionCard
              key={upgrade.id}
              upgrade={upgrade}
              cost={cost}
              discountedCost={discountedCost}
              canAfford={canAfford}
              owned={owned}
              onBuy={() => onBuyUpgrade(upgrade.id)}
              discount={discount}
            />
          )
        })}
      </div>

      {/* Stats summary */}
      <div className="mt-4 pt-4 border-t border-white/10">
        <p className="text-xs font-semibold text-cyan-400 mb-2">Current Stats</p>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-white/5 p-2 rounded">
            <span className="text-slate-400">Click Power:</span>
            <span className="text-cyan-400 font-bold ml-1">{stats.clickPower}</span>
          </div>
          <div className="bg-white/5 p-2 rounded">
            <span className="text-slate-400">Multiplier:</span>
            <span className="text-cyan-400 font-bold ml-1">x{stats.multiplier.toFixed(2)}</span>
          </div>
          <div className="bg-white/5 p-2 rounded">
            <span className="text-slate-400">Crit Chance:</span>
            <span className="text-cyan-400 font-bold ml-1">{(stats.critChance * 100).toFixed(1)}%</span>
          </div>
          <div className="bg-white/5 p-2 rounded">
            <span className="text-slate-400">Passive:</span>
            <span className="text-cyan-400 font-bold ml-1">+{(stats.passiveIncome * 100).toFixed(0)}%</span>
          </div>
        </div>
      </div>
    </div>
  )
}
