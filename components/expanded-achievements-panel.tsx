"use client"

import { useState } from "react"
import { achievements } from "@/lib/achievements"
import { Card } from "@/components/ui/card"

interface ExpandedAchievementsPanelProps {
  totalClicks: number
  totalMoney: number
  lifeTimeEarnings: number
  autoClickers: number
  prestigeLevel: number
  totalUpgrades: number
  criticalHits: number
  upgradesCombination: Record<string, number>
}

export default function ExpandedAchievementsPanel({
  totalClicks,
  totalMoney,
  lifeTimeEarnings,
  autoClickers,
  prestigeLevel,
  totalUpgrades,
  criticalHits,
  upgradesCombination,
}: ExpandedAchievementsPanelProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const stats = {
    totalClicks,
    totalMoney,
    lifeTimeEarnings,
    autoClickers,
    prestigeLevel,
    totalUpgrades,
    criticalHits,
    maxMoneyAtOnce: totalMoney,
    upgradesCombination,
  }

  const categories = [
    { id: "clicks", name: "Clicks", color: "cyan" },
    { id: "money", name: "Money", color: "emerald" },
    { id: "upgrades", name: "Upgrades", color: "amber" },
    { id: "prestige", name: "Prestige", color: "purple" },
    { id: "hidden", name: "Secret", color: "pink" },
  ]

  const filteredAchievements = selectedCategory
    ? achievements.filter((a) => a.category === selectedCategory)
    : achievements

  const unlockedCount = achievements.filter((a) => a.condition(stats)).length
  const totalCount = achievements.length
  const progressPercent = Math.round((unlockedCount / totalCount) * 100)

  const getProgressPercent = (ach) => {
    if (ach.condition(stats)) return 100

    if (ach.id === "clicking100") {
      return Math.min((totalClicks / 100) * 100, 99)
    } else if (ach.id === "clicking1k") {
      return Math.min((totalClicks / 1000) * 100, 99)
    } else if (ach.id === "clicking10k") {
      return Math.min((totalClicks / 10000) * 100, 99)
    } else if (ach.id === "money100") {
      return Math.min((totalMoney / 100) * 100, 99)
    } else if (ach.id === "money1k") {
      return Math.min((totalMoney / 1000) * 100, 99)
    } else if (ach.id === "money1m") {
      return Math.min((lifeTimeEarnings / 1000000) * 100, 99)
    } else if (ach.id === "upgrade5") {
      return Math.min((totalUpgrades / 5) * 100, 99)
    } else if (ach.id === "upgrade25") {
      return Math.min((totalUpgrades / 25) * 100, 99)
    } else if (ach.id === "autoClickers10") {
      return Math.min((autoClickers / 10) * 100, 99)
    } else if (ach.id === "critical100") {
      return Math.min((criticalHits / 100) * 100, 99)
    } else if (ach.id === "prestige5") {
      return Math.min((prestigeLevel / 5) * 100, 99)
    } else if (ach.id === "prestige10") {
      return Math.min((prestigeLevel / 10) * 100, 99)
    }

    return 0
  }

  return (
    <div className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-cyan-400">Achievements</h2>
        <div className="text-xs bg-cyan-500/20 px-3 py-1 rounded-full border border-cyan-500/30">
          {unlockedCount}/{totalCount} ({progressPercent}%)
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-white/5 rounded-full h-2 mb-4 border border-white/10 overflow-hidden">
        <div
          className="bg-gradient-to-r from-cyan-500 to-emerald-500 h-full transition-all duration-500"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Category Filters */}
      <div className="grid grid-cols-5 gap-2 mb-4">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`text-xs py-2 px-2 rounded transition-all ${
            selectedCategory === null ? "bg-cyan-500 text-white" : "bg-white/5 text-slate-400 hover:bg-white/10"
          }`}
        >
          All
        </button>
        {categories.map((cat) => {
          const count = achievements.filter((a) => a.category === cat.id && a.condition(stats)).length
          const total = achievements.filter((a) => a.category === cat.id).length

          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`text-xs py-2 px-2 rounded transition-all ${
                selectedCategory === cat.id
                  ? `bg-${cat.color}-500 text-white`
                  : "bg-white/5 text-slate-400 hover:bg-white/10"
              }`}
            >
              {cat.name} {count}/{total}
            </button>
          )
        })}
      </div>

      {/* Achievements List */}
      <div className="space-y-2 max-h-96 overflow-y-auto">
        {filteredAchievements.map((ach) => {
          const isUnlocked = ach.condition(stats)
          const progress = getProgressPercent(ach)
          const shouldHide = ach.secret && !isUnlocked

          if (shouldHide) {
            return (
              <Card key={ach.id} className="p-3 bg-white/5 border-white/10">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-white/50 text-sm">???</p>
                    <p className="text-xs text-slate-600">Secret Achievement</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-500">Locked</p>
                  </div>
                </div>
              </Card>
            )
          }

          return (
            <div key={ach.id}>
              <Card
                onClick={() => setExpandedId(expandedId === ach.id ? null : ach.id)}
                className={`p-3 cursor-pointer transition-all ${
                  isUnlocked
                    ? "bg-emerald-900/20 border-emerald-400/30"
                    : "bg-white/5 border-white/10 hover:border-white/20"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{ach.icon}</span>
                      <div>
                        <p className={`font-semibold text-sm ${isUnlocked ? "text-emerald-300" : "text-white"}`}>
                          {ach.name}
                        </p>
                        <p className="text-xs text-slate-400">{ach.description}</p>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-xs font-bold ${isUnlocked ? "text-emerald-400" : "text-slate-400"}`}>
                      {isUnlocked ? "Unlocked" : `${Math.floor(progress)}%`}
                    </p>
                  </div>
                </div>

                {/* Progress Bar for Locked Achievements */}
                {!isUnlocked && progress > 0 && (
                  <div className="w-full bg-white/5 rounded-full h-1.5 mt-2 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full transition-all"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                )}
              </Card>

              {/* Expanded Details */}
              {expandedId === ach.id && (
                <Card className="mt-1 p-3 bg-white/5 border-white/10 text-xs">
                  <p className="text-slate-300 mb-2">{ach.description}</p>
                  {ach.reward && <p className="text-amber-400 font-semibold">Reward: +{ach.reward} points</p>}
                </Card>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
