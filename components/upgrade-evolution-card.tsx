"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowUp } from "lucide-react"
import { getCurrentTier, getTierInfo, getEvolveProgress } from "@/lib/evolution"
import { UPGRADE_IMAGES, TIER_VISUALS, TIER_COLORS } from "@/lib/image-mapping"
import Image from "next/image"

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

  const upgradeImage = UPGRADE_IMAGES[upgrade.id as keyof typeof UPGRADE_IMAGES]
  const tierVisual = TIER_VISUALS[currentTier as keyof typeof TIER_VISUALS]
  const tierColor = TIER_COLORS[currentTier as keyof typeof TIER_COLORS] || "from-blue-600 to-cyan-500"

  return (
    <Card
      className={`p-4 bg-gradient-to-br ${tierColor}/20 border-2 border-white/10 hover:border-cyan-500/50 transition-all overflow-hidden`}
    >
      {tierVisual && (
        <div className="absolute inset-0 opacity-10">
          <Image src={tierVisual || "/placeholder.svg"} alt="tier" fill className="object-cover" />
        </div>
      )}

      <div className="relative z-10 flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            {upgradeImage && (
              <div className="relative w-12 h-12 rounded-lg bg-white/10 border border-white/20 flex-shrink-0 overflow-hidden">
                <Image
                  src={upgradeImage || "/placeholder.svg"}
                  alt={upgrade.name}
                  fill
                  className="object-cover"
                  sizes="48px"
                />
              </div>
            )}
            <div className="flex-1">
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
                  className={`h-full bg-gradient-to-r ${tierColor} transition-all`}
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
        <div className="relative z-10 text-xs bg-white/5 rounded p-2 mb-2">
          <span className="text-slate-400">Effect: </span>
          <span className="text-cyan-400 font-bold">{tierInfo.effectMultiplier.toFixed(1)}x</span>
        </div>
      )}

      {/* Owned count */}
      <div className="relative z-10 text-xs text-slate-400">Owned: {owned}</div>
    </Card>
  )
}
