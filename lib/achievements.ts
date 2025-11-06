// Comprehensive achievements and milestones system

export interface Achievement {
  id: string
  name: string
  description: string
  icon: string
  category: "clicks" | "money" | "upgrades" | "prestige" | "hidden"
  condition: (stats: AchievementStats) => boolean
  reward?: number // Bonus currency or points
  secret?: boolean // Hidden until unlocked
}

export interface AchievementStats {
  totalClicks: number
  totalMoney: number
  lifeTimeEarnings: number
  autoClickers: number
  prestigeLevel: number
  totalUpgrades: number
  criticalHits: number
  maxMoneyAtOnce: number
  upgradesCombination: Record<string, number>
}

export const achievements: Achievement[] = [
  // Click Achievements
  {
    id: "firstClick",
    name: "First Step",
    description: "Make your first click",
    icon: "👆",
    category: "clicks",
    condition: (stats) => stats.totalClicks >= 1,
    reward: 10,
  },
  {
    id: "clicking100",
    name: "Click Master",
    description: "Reach 100 total clicks",
    icon: "⚡",
    category: "clicks",
    condition: (stats) => stats.totalClicks >= 100,
    reward: 50,
  },
  {
    id: "clicking1k",
    name: "Click Legend",
    description: "Reach 1,000 total clicks",
    icon: "🔥",
    category: "clicks",
    condition: (stats) => stats.totalClicks >= 1000,
    reward: 200,
  },
  {
    id: "clicking10k",
    name: "Unstoppable",
    description: "Reach 10,000 total clicks",
    icon: "💥",
    category: "clicks",
    condition: (stats) => stats.totalClicks >= 10000,
    reward: 500,
  },
  {
    id: "clicking100k",
    name: "The Clicker",
    description: "Reach 100,000 total clicks",
    icon: "⭐",
    category: "clicks",
    condition: (stats) => stats.totalClicks >= 100000,
    reward: 2000,
    secret: true,
  },

  // Money Achievements
  {
    id: "money100",
    name: "First Fortune",
    description: "Earn $100",
    icon: "💰",
    category: "money",
    condition: (stats) => stats.totalMoney >= 100,
    reward: 25,
  },
  {
    id: "money1k",
    name: "Rich",
    description: "Earn $1,000",
    icon: "💎",
    category: "money",
    condition: (stats) => stats.totalMoney >= 1000,
    reward: 100,
  },
  {
    id: "money1m",
    name: "Millionaire",
    description: "Earn $1,000,000",
    icon: "👑",
    category: "money",
    condition: (stats) => stats.lifeTimeEarnings >= 1000000,
    reward: 500,
  },
  {
    id: "money1b",
    name: "Billionaire",
    description: "Earn $1,000,000,000",
    icon: "🏰",
    category: "money",
    condition: (stats) => stats.lifeTimeEarnings >= 1000000000,
    reward: 5000,
    secret: true,
  },

  // Upgrade Achievements
  {
    id: "upgrade5",
    name: "Investor",
    description: "Purchase 5 upgrades",
    icon: "📈",
    category: "upgrades",
    condition: (stats) => stats.totalUpgrades >= 5,
    reward: 75,
  },
  {
    id: "upgrade25",
    name: "Upgrade Master",
    description: "Purchase 25 upgrades",
    icon: "🔧",
    category: "upgrades",
    condition: (stats) => stats.totalUpgrades >= 25,
    reward: 300,
  },
  {
    id: "upgrade100",
    name: "Perfectionist",
    description: "Purchase 100 upgrades",
    icon: "✨",
    category: "upgrades",
    condition: (stats) => stats.totalUpgrades >= 100,
    reward: 1000,
    secret: true,
  },
  {
    id: "autoClickers10",
    name: "Automation",
    description: "Own 10 auto-clickers",
    icon: "🤖",
    category: "upgrades",
    condition: (stats) => stats.autoClickers >= 10,
    reward: 200,
  },
  {
    id: "criticalStrike",
    name: "Lucky Shot",
    description: "Land a critical hit",
    icon: "💢",
    category: "upgrades",
    condition: (stats) => stats.criticalHits >= 1,
    reward: 50,
  },
  {
    id: "critical100",
    name: "Critical Master",
    description: "Land 100 critical hits",
    icon: "🎯",
    category: "upgrades",
    condition: (stats) => stats.criticalHits >= 100,
    reward: 400,
    secret: true,
  },

  // Prestige Achievements
  {
    id: "firstPrestige",
    name: "New Beginning",
    description: "Reach prestige level 1",
    icon: "🌟",
    category: "prestige",
    condition: (stats) => stats.prestigeLevel >= 1,
    reward: 100,
  },
  {
    id: "prestige5",
    name: "Elite",
    description: "Reach prestige level 5",
    icon: "👸",
    category: "prestige",
    condition: (stats) => stats.prestigeLevel >= 5,
    reward: 500,
  },
  {
    id: "prestige10",
    name: "Ascended",
    description: "Reach prestige level 10",
    icon: "🚀",
    category: "prestige",
    condition: (stats) => stats.prestigeLevel >= 10,
    reward: 2000,
    secret: true,
  },
  {
    id: "prestige20",
    name: "Divine",
    description: "Reach prestige level 20",
    icon: "🌈",
    category: "prestige",
    condition: (stats) => stats.prestigeLevel >= 20,
    reward: 10000,
    secret: true,
  },

  // Hidden/Special Achievements
  {
    id: "speedClicker",
    name: "Speed Demon",
    description: "Earn over $1,000 before first prestige",
    icon: "🏎️",
    category: "hidden",
    condition: (stats) => stats.totalMoney >= 1000 && stats.prestigeLevel === 0,
    reward: 150,
    secret: true,
  },
  {
    id: "balanced",
    name: "Balanced Build",
    description: "Own at least 1 of each upgrade type",
    icon: "⚖️",
    category: "hidden",
    condition: (stats) => {
      const types = Object.keys(stats.upgradesCombination)
      return types.length >= 5 && types.every((t) => stats.upgradesCombination[t] > 0)
    },
    reward: 300,
    secret: true,
  },
]

export function checkNewAchievements(stats: AchievementStats, previousStats: AchievementStats): Achievement[] {
  return achievements.filter((ach) => !ach.condition(previousStats) && ach.condition(stats))
}

export function getAchievementProgress(
  stats: AchievementStats,
): Record<string, { unlocked: boolean; progress: number }> {
  const progress: Record<string, { unlocked: boolean; progress: number }> = {}

  achievements.forEach((ach) => {
    const unlocked = ach.condition(stats)
    let progressPercent = 0

    if (!unlocked) {
      // Calculate progress based on achievement type
      if (ach.id === "clicking100") {
        progressPercent = Math.min((stats.totalClicks / 100) * 100, 100)
      } else if (ach.id === "clicking1k") {
        progressPercent = Math.min((stats.totalClicks / 1000) * 100, 100)
      } else if (ach.id === "money100") {
        progressPercent = Math.min((stats.totalMoney / 100) * 100, 100)
      } else if (ach.id === "money1k") {
        progressPercent = Math.min((stats.totalMoney / 1000) * 100, 100)
      } else if (ach.id === "upgrade5") {
        progressPercent = Math.min((stats.totalUpgrades / 5) * 100, 100)
      }
    }

    progress[ach.id] = { unlocked, progress: unlocked ? 100 : progressPercent }
  })

  return progress
}

export function getCategoryAchievements(category: string): Achievement[] {
  return achievements.filter((a) => a.category === category)
}
