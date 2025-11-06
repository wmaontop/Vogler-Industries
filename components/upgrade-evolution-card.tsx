"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowUp } from "lucide-react"
import { getCurrentTier, getTierInfo, getEvolveProgress } from "@/lib/evolution"

interface UpgradeEvolutionCardProps {
  upgrade: any
  cost: number
  discountedCost: number
  canAfford: boolean
  owned: number
  onBuy: () => void
  discount: number
}

export default function UpgradeEvolutionCard({
  upgrade,
  cost,
  discountedCost,
  canAfford,
  owned,
  onBuy,
  discount,
}: UpgradeEvolutionCardProps) {
  const currentTier = getCurrentTier(upgrade.id, owned)
  const tierInfo = getTierInfo(upgrade.id, currentTier)
  const progress = getEvolveProgress(owned, currentTier)
  const nextTierInfo = getTierInfo(upgrade.id, Math.min(currentTier + 1, 4))

  return (
    <Card className="p-4 bg-gradient-to-br from-white/10 to-white/5 border-white/10 hover:border-cyan-500/30 transition-all">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          {/* Tier display with icon */}
          <div className="flex items-center gap-2 mb-2">
            <span className="text-3xl">{tierInfo?.icon || "?"}</span>
            <div>
              <p className="font-bold text-white text-sm">{upgrade.name}</p>
              <p className="text-xs text-cyan-400">{tierInfo?.name}</p>
            </div>
          </div>
          <p className="text-xs text-slate-400 mb-2">{upgrade.description}</p>

          {/* Evolution progress bar */}
          {currentTier < 4 && (
            <div className="mb-2">
              <div className="flex justify-between mb-1">
                <span className="text-xs text-slate-500">Tier {currentTier}</span>
                <span className="text-xs text-slate-500">
                  {progress.current}/{progress.max}
                </span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-1.5 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all"
                  style={{ width: `${(progress.current / progress.max) * 100}%` }}
                />
              </div>
              {nextTierInfo && <p className="text-xs text-purple-400 mt-1">Next: {nextTierInfo.name}</p>}
            </div>
          )}
          {currentTier === 4 && <div className="text-xs text-purple-400 font-semibold mb-2">⭐ MAX TIER</div>}
        </div>

        <Button
          onClick={onBuy}
          disabled={!canAfford}
          className={`text-xs py-1 h-auto ml-2 ${
            canAfford ? "bg-cyan-600 hover:bg-cyan-500" : "bg-slate-600 opacity-50 cursor-not-allowed"
          }`}
        >
          <ArrowUp className="w-3 h-3 mr-1" />
          {discount > 0 && (
            <>
              <span className="line-through text-xs">${cost}</span>
              <span className="ml-1">${discountedCost}</span>
            </>
          )}
          {discount === 0 && `$${cost}`}
        </Button>
      </div>

      {/* Tier benefits */}
      {tierInfo && (
        <div className="text-xs bg-white/5 rounded p-2 mb-2">
          <span className="text-slate-400">Effect: </span>
          <span className="text-cyan-400 font-bold">{tierInfo.effectMultiplier.toFixed(1)}x</span>
        </div>
      )}

      {/* Owned count */}
      <div className="text-xs text-slate-400">Owned: {owned}</div>
    </Card>
  )
}
