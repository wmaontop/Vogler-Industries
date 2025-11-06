// Prestige system configuration and bonus calculations

export interface PrestigeState {
  level: number
  totalPrestige: number
  lifeTimeEarnings: number
  prestigeMilestones: Record<number, boolean>
}

export const PRESTIGE_MULTIPLIER_BASE = 0.1 // 10% per level

export interface PrestigeBonus {
  incomeMultiplier: number
  clickPowerMultiplier: number
  efficiencyBonus: number
  upgradeDiscountPercent: number
}

/**
 * Calculate prestige bonuses based on prestige level
 */
export function calculatePrestigeBonus(prestigeLevel: number): PrestigeBonus {
  const baseIncome = 1 + prestigeLevel * PRESTIGE_MULTIPLIER_BASE
  const clickPowerMult = 1 + Math.floor(prestigeLevel / 3) * 0.05 // 5% every 3 levels
  const efficiencyBonus = Math.floor(prestigeLevel / 5) * 0.02 // 2% every 5 levels
  const upgradeDiscount = Math.min(Math.floor(prestigeLevel / 10) * 0.05, 0.25) // 5% every 10 levels, max 25%

  return {
    incomeMultiplier: baseIncome,
    clickPowerMultiplier: clickPowerMult,
    efficiencyBonus,
    upgradeDiscountPercent: upgradeDiscount,
  }
}

/**
 * Calculate prestige reward (one-time bonus on prestige)
 */
export function calculatePrestigeReward(money: number, prestigeLevel: number): number {
  // Scale reward based on current prestige level
  const baseReward = Math.floor(money * 0.1) // 10% of current money
  const levelBonus = 1 + prestigeLevel * 0.05 // 5% bonus per existing prestige level
  return Math.floor(baseReward * levelBonus)
}

/**
 * Check if prestige level unlocks new features
 */
export function getPrestigeMilestones(prestigeLevel: number): string[] {
  const milestones: string[] = []

  if (prestigeLevel >= 1) milestones.push("Unlock Critical Strike system")
  if (prestigeLevel >= 3) milestones.push("Bulk Purchase discount available")
  if (prestigeLevel >= 5) milestones.push("Prestige Bonuses increase significantly")
  if (prestigeLevel >= 10) milestones.push("Upgrade Cost reduction unlocked")
  if (prestigeLevel >= 15) milestones.push("Prestige Point multiplier doubled")
  if (prestigeLevel >= 20) milestones.push("Ultimate prestige rewards available")

  return milestones
}

/**
 * Calculate total lifetime earnings bonus
 */
export function getLifetimeEarningsBonus(lifeTimeEarnings: number): number {
  // Every 1 million lifetime earnings grants 1% bonus, capped at 100%
  const bonusLevels = Math.floor(lifeTimeEarnings / 1000000)
  return Math.min(bonusLevels * 0.01, 1)
}
