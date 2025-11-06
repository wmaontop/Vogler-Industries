// Advanced upgrades configuration and utility functions
export const UPGRADE_TYPES = {
  CLICK_POWER: "clickPower",
  EFFICIENCY: "efficiency",
  AUTO_CLICKER: "autoClicker",
  MULTIPLIER: "multiplier",
  CRIT_CHANCE: "critChance",
  CRIT_DAMAGE: "critDamage",
  BULK_BUY: "bulkBuy",
  PASSIVE_INCOME: "passiveIncome",
} as const

export interface Upgrade {
  id: string
  type: string
  name: string
  description: string
  baseCost: number
  costMultiplier: number
  effect: (current: number) => number
  owned: number
  maxLevel?: number
}

export const upgrades: Record<string, Upgrade> = {
  clickPower: {
    id: "clickPower",
    type: UPGRADE_TYPES.CLICK_POWER,
    name: "Click Power",
    description: "+1 per click",
    baseCost: 100,
    costMultiplier: 1.15,
    effect: (current) => current + 1,
    owned: 0,
  },
  efficiency: {
    id: "efficiency",
    type: UPGRADE_TYPES.EFFICIENCY,
    name: "Efficiency",
    description: "All clicks +5%",
    baseCost: 250,
    costMultiplier: 1.2,
    effect: (current) => current + 0.05,
    owned: 0,
  },
  autoClicker: {
    id: "autoClicker",
    type: UPGRADE_TYPES.AUTO_CLICKER,
    name: "Auto-Clicker Unit",
    description: "+1 auto-clicker",
    baseCost: 500,
    costMultiplier: 1.18,
    effect: (current) => current + 1,
    owned: 0,
  },
  multiplier: {
    id: "multiplier",
    type: UPGRADE_TYPES.MULTIPLIER,
    name: "Power Multiplier",
    description: "x1.1 global multiplier",
    baseCost: 1000,
    costMultiplier: 1.25,
    effect: (current) => current * 1.1,
    owned: 0,
  },
  critChance: {
    id: "critChance",
    type: UPGRADE_TYPES.CRIT_CHANCE,
    name: "Crit Chance",
    description: "+1% critical strike",
    baseCost: 750,
    costMultiplier: 1.22,
    effect: (current) => current + 0.01,
    owned: 0,
    maxLevel: 50,
  },
  critDamage: {
    id: "critDamage",
    type: UPGRADE_TYPES.CRIT_DAMAGE,
    name: "Crit Damage",
    description: "+0.5x critical multiplier",
    baseCost: 1500,
    costMultiplier: 1.2,
    effect: (current) => current + 0.5,
    owned: 0,
  },
  bulkBuy: {
    id: "bulkBuy",
    type: UPGRADE_TYPES.BULK_BUY,
    name: "Bulk Purchase",
    description: "+10% buying discount",
    baseCost: 2000,
    costMultiplier: 1.3,
    effect: (current) => current + 0.1,
    owned: 0,
    maxLevel: 10,
  },
  passiveIncome: {
    id: "passiveIncome",
    type: UPGRADE_TYPES.PASSIVE_INCOME,
    name: "Passive Income",
    description: "+10% auto income",
    baseCost: 3000,
    costMultiplier: 1.28,
    effect: (current) => current + 0.1,
    owned: 0,
  },
}

export function getCost(upgrade: Upgrade): number {
  return Math.floor(upgrade.baseCost * Math.pow(upgrade.costMultiplier, upgrade.owned))
}

export function calculateSynergyBonus(upgradeOwned: Record<string, number>): number {
  // Synergy bonus: every 5 upgrades across all types grants 2% bonus
  const totalUpgrades = Object.values(upgradeOwned).reduce((a, b) => a + b, 0)
  return 1 + Math.floor(totalUpgrades / 5) * 0.02
}

export function canBuyUpgrade(upgrade: Upgrade, money: number, bulkDiscount = 0): boolean {
  const cost = getCost(upgrade)
  const discountedCost = Math.ceil(cost * (1 - bulkDiscount))
  return money >= discountedCost && (!upgrade.maxLevel || upgrade.owned < upgrade.maxLevel)
}
