export interface UpgradeTier {
  tier: number
  name: string
  icon: string
  effectMultiplier: number
  costToEvolve: number
  description: string
}

export const UPGRADE_EVOLUTION: Record<string, UpgradeTier[]> = {
  clickPower: [
    {
      tier: 1,
      name: "Basic Click",
      icon: "🖱️",
      effectMultiplier: 1,
      costToEvolve: 0,
      description: "Simple mouse click",
    },
    {
      tier: 2,
      name: "Power Click",
      icon: "⚡",
      effectMultiplier: 1.5,
      costToEvolve: 5000,
      description: "Increased strike power",
    },
    {
      tier: 3,
      name: "Turbo Click",
      icon: "💨",
      effectMultiplier: 2.2,
      costToEvolve: 25000,
      description: "Lightning fast clicks",
    },
    {
      tier: 4,
      name: "Quantum Click",
      icon: "⚛️",
      effectMultiplier: 3.5,
      costToEvolve: 150000,
      description: "Subatomic level impact",
    },
  ],
  efficiency: [
    {
      tier: 1,
      name: "Standard Efficiency",
      icon: "🔧",
      effectMultiplier: 1,
      costToEvolve: 0,
      description: "Normal processing",
    },
    {
      tier: 2,
      name: "Optimized Efficiency",
      icon: "⚙️",
      effectMultiplier: 1.5,
      costToEvolve: 8000,
      description: "Fine-tuned operations",
    },
    {
      tier: 3,
      name: "Hyper Efficiency",
      icon: "🚀",
      effectMultiplier: 2.3,
      costToEvolve: 40000,
      description: "Extreme performance",
    },
    {
      tier: 4,
      name: "Infinite Efficiency",
      icon: "∞",
      effectMultiplier: 3.8,
      costToEvolve: 200000,
      description: "Perfect optimization",
    },
  ],
  autoClicker: [
    {
      tier: 1,
      name: "Basic Clicker",
      icon: "🤖",
      effectMultiplier: 1,
      costToEvolve: 0,
      description: "Single unit clicking",
    },
    {
      tier: 2,
      name: "Dual Clicker",
      icon: "🔀",
      effectMultiplier: 2,
      costToEvolve: 10000,
      description: "Two synchronized units",
    },
    {
      tier: 3,
      name: "Swarm Clicker",
      icon: "👾",
      effectMultiplier: 3.5,
      costToEvolve: 60000,
      description: "Army of clickers",
    },
    {
      tier: 4,
      name: "Quantum Swarm",
      icon: "🌌",
      effectMultiplier: 6,
      costToEvolve: 300000,
      description: "Multi-dimensional clickers",
    },
  ],
  multiplier: [
    {
      tier: 1,
      name: "Weak Multiplier",
      icon: "📊",
      effectMultiplier: 1,
      costToEvolve: 0,
      description: "x1.1 boost",
    },
    {
      tier: 2,
      name: "Strong Multiplier",
      icon: "📈",
      effectMultiplier: 1.4,
      costToEvolve: 12000,
      description: "x1.5 boost",
    },
    {
      tier: 3,
      name: "Massive Multiplier",
      icon: "🔥",
      effectMultiplier: 2.1,
      costToEvolve: 80000,
      description: "x2.0 boost",
    },
    {
      tier: 4,
      name: "Cosmic Multiplier",
      icon: "✨",
      effectMultiplier: 3.2,
      costToEvolve: 400000,
      description: "x3.0 boost",
    },
  ],
  critChance: [
    {
      tier: 1,
      name: "Lucky Hit",
      icon: "🎲",
      effectMultiplier: 1,
      costToEvolve: 0,
      description: "Rare critical strikes",
    },
    {
      tier: 2,
      name: "Sharp Edge",
      icon: "🗡️",
      effectMultiplier: 1.8,
      costToEvolve: 15000,
      description: "Increased precision",
    },
    {
      tier: 3,
      name: "Lethal Strike",
      icon: "💀",
      effectMultiplier: 2.8,
      costToEvolve: 90000,
      description: "Devastating attacks",
    },
    {
      tier: 4,
      name: "Divine Judgment",
      icon: "⚡👑",
      effectMultiplier: 4.5,
      costToEvolve: 500000,
      description: "Guaranteed devastation",
    },
  ],
  critDamage: [
    {
      tier: 1,
      name: "Bonus Damage",
      icon: "🎯",
      effectMultiplier: 1,
      costToEvolve: 0,
      description: "x0.5 multiplier",
    },
    {
      tier: 2,
      name: "Heavy Impact",
      icon: "💥",
      effectMultiplier: 1.6,
      costToEvolve: 18000,
      description: "x1.0 multiplier",
    },
    {
      tier: 3,
      name: "Devastating Force",
      icon: "🌪️",
      effectMultiplier: 2.5,
      costToEvolve: 100000,
      description: "x2.5 multiplier",
    },
    {
      tier: 4,
      name: "Apocalyptic Power",
      icon: "🌋",
      effectMultiplier: 3.8,
      costToEvolve: 600000,
      description: "x5.0 multiplier",
    },
  ],
  bulkBuy: [
    {
      tier: 1,
      name: "Minor Discount",
      icon: "🏷️",
      effectMultiplier: 1,
      costToEvolve: 0,
      description: "+10% discount",
    },
    {
      tier: 2,
      name: "Bulk Deal",
      icon: "📦",
      effectMultiplier: 1.5,
      costToEvolve: 20000,
      description: "+15% discount",
    },
    {
      tier: 3,
      name: "Wholesale",
      icon: "🏪",
      effectMultiplier: 2.2,
      costToEvolve: 110000,
      description: "+22% discount",
    },
    {
      tier: 4,
      name: "Free Market",
      icon: "💰",
      effectMultiplier: 3,
      costToEvolve: 700000,
      description: "+30% discount",
    },
  ],
  passiveIncome: [
    {
      tier: 1,
      name: "Passive Generation",
      icon: "💵",
      effectMultiplier: 1,
      costToEvolve: 0,
      description: "+10% passive",
    },
    {
      tier: 2,
      name: "Revenue Stream",
      icon: "🌊",
      effectMultiplier: 1.7,
      costToEvolve: 25000,
      description: "+17% passive",
    },
    {
      tier: 3,
      name: "Money Machine",
      icon: "🏦",
      effectMultiplier: 2.6,
      costToEvolve: 120000,
      description: "+26% passive",
    },
    {
      tier: 4,
      name: "Infinite Fortune",
      icon: "💎",
      effectMultiplier: 4,
      costToEvolve: 800000,
      description: "+40% passive",
    },
  ],
}

export function getCurrentTier(upgradeId: string, ownedCount: number): number {
  const tiers = UPGRADE_EVOLUTION[upgradeId]
  if (!tiers) return 1
  if (ownedCount < 10) return 1
  if (ownedCount < 30) return 2
  if (ownedCount < 70) return 3
  return 4
}

export function getTierInfo(upgradeId: string, tier: number): UpgradeTier | null {
  const tiers = UPGRADE_EVOLUTION[upgradeId]
  if (!tiers) return null
  return tiers.find((t) => t.tier === tier) || null
}

export function getEvolveProgress(ownedCount: number, currentTier: number): { current: number; max: number } {
  const thresholds = [0, 10, 30, 70]
  const max = thresholds[Math.min(currentTier, thresholds.length - 1)] || 70
  const min = thresholds[Math.max(currentTier - 1, 0)] || 0
  return {
    current: Math.max(0, ownedCount - min),
    max: max - min,
  }
}
