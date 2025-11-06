"use client"

import { useState, useEffect, useCallback } from "react"
import GameHeader from "@/components/game-header"
import ClickerPanel from "@/components/clicker-panel"
import ProductsSection from "@/components/products-section"
import AdvancedUpgradesPanel from "@/components/advanced-upgrades-panel"
import ExpandedAchievementsPanel from "@/components/expanded-achievements-panel"
import PrestigeModal from "@/components/prestige-modal"
import FloatingText from "@/components/floating-text"
import { calculatePrestigeBonus, calculatePrestigeReward } from "@/lib/prestige"
import { checkNewAchievements } from "@/lib/achievements"

export default function Home() {
  const [gameState, setGameState] = useState({
    money: 0,
    clickValue: 1,
    clickCount: 0,
    items: {},
    multiplier: 1,
    autoClickers: 0,
    boostActive: false,
    prestigeLevel: 0,
    totalClicks: 0,
    totalOwned: 0,
    lifeTimeEarnings: 0,
    lastTick: Date.now(),
    upgradeOwned: {},
    criticalHits: 0,
    stats: {
      clickPower: 1,
      efficiency: 0,
      multiplier: 1,
      critChance: 0,
      critDamage: 1,
      bulkDiscount: 0,
      passiveIncome: 0,
    },
  })

  const [floatingTexts, setFloatingTexts] = useState([])
  const [showPrestige, setShowPrestige] = useState(false)
  const [previousState, setPreviousState] = useState(gameState)

  // Load game state on mount
  useEffect(() => {
    const saved = localStorage.getItem("vogler_game_state")
    if (saved) {
      const loaded = JSON.parse(saved)
      setGameState(loaded)
      setPreviousState(loaded)
    }
  }, [])

  // Auto-save game state
  useEffect(() => {
    const interval = setInterval(() => {
      localStorage.setItem("vogler_game_state", JSON.stringify(gameState))
    }, 3000)
    return () => clearInterval(interval)
  }, [gameState])

  useEffect(() => {
    const stats = {
      totalClicks: gameState.totalClicks,
      totalMoney: gameState.money,
      lifeTimeEarnings: gameState.lifeTimeEarnings,
      autoClickers: gameState.autoClickers,
      prestigeLevel: gameState.prestigeLevel,
      totalUpgrades: Object.values(gameState.upgradeOwned).reduce((a, b) => a + b, 0),
      criticalHits: gameState.criticalHits,
      maxMoneyAtOnce: gameState.money,
      upgradesCombination: gameState.upgradeOwned,
    }

    const prevStats = {
      totalClicks: previousState.totalClicks,
      totalMoney: previousState.money,
      lifeTimeEarnings: previousState.lifeTimeEarnings,
      autoClickers: previousState.autoClickers,
      prestigeLevel: previousState.prestigeLevel,
      totalUpgrades: Object.values(previousState.upgradeOwned).reduce((a, b) => a + b, 0),
      criticalHits: previousState.criticalHits,
      maxMoneyAtOnce: previousState.money,
      upgradesCombination: previousState.upgradeOwned,
    }

    const newAchievements = checkNewAchievements(stats, prevStats)
    newAchievements.forEach((ach) => {
      addFloatingText(`Achievement Unlocked: ${ach.name}!`, 50, 30)
    })

    setPreviousState(gameState)
  }, [gameState])

  // Passive income tick with advanced stats
  useEffect(() => {
    const interval = setInterval(() => {
      setGameState((prev) => {
        const income = calculateIncome(prev)
        const newMoney = prev.money + income / 10

        if (prev.autoClickers > 0) {
          return {
            ...prev,
            money: newMoney,
            clickCount: prev.clickCount + prev.autoClickers,
            lifeTimeEarnings: prev.lifeTimeEarnings + income / 10,
          }
        }
        return { ...prev, money: newMoney, lifeTimeEarnings: prev.lifeTimeEarnings + income / 10 }
      })
    }, 100)
    return () => clearInterval(interval)
  }, [])

  const calculateIncome = useCallback((state) => {
    let total = 0
    total += (state.autoClickers || 0) * (state.stats?.clickPower || state.clickValue || 1)
    const passiveBonus = 1 + (state.stats?.passiveIncome || 0)
    const prestigeBonus = calculatePrestigeBonus(state.prestigeLevel || 0)
    return total * (state.stats?.multiplier || state.multiplier || 1) * passiveBonus * prestigeBonus.incomeMultiplier
  }, [])

  const addFloatingText = useCallback((text, x, y) => {
    const id = Math.random()
    setFloatingTexts((prev) => [...prev, { id, text, x, y }])
    setTimeout(() => {
      setFloatingTexts((prev) => prev.filter((t) => t.id !== id))
    }, 1500)
  }, [])

  const handleClick = useCallback(() => {
    const prestigeBonus = calculatePrestigeBonus(gameState.prestigeLevel)
    const baseClick = gameState.stats.clickPower * prestigeBonus.clickPowerMultiplier * gameState.stats.multiplier
    const isCritical = Math.random() < gameState.stats.critChance
    const clickGain = isCritical ? baseClick * gameState.stats.critDamage : baseClick

    setGameState((prev) => ({
      ...prev,
      money: prev.money + clickGain,
      clickCount: prev.clickCount + 1,
      totalClicks: prev.totalClicks + 1,
      lifeTimeEarnings: prev.lifeTimeEarnings + clickGain,
      criticalHits: prev.criticalHits + (isCritical ? 1 : 0),
    }))

    const displayText = isCritical ? `CRIT! +${clickGain.toFixed(0)}` : `+${clickGain.toFixed(0)}`
    addFloatingText(displayText, 50, 50)
  }, [gameState.stats, gameState.prestigeLevel, addFloatingText])

  const handleBuyUpgrade = useCallback(
    (upgradeId) => {
      const upgrade = require("@/lib/upgrades").upgrades[upgradeId]
      if (!upgrade) return

      const { getCost } = require("@/lib/upgrades")
      const cost = getCost(upgrade)
      const discount = gameState.stats.bulkDiscount
      const discountedCost = Math.ceil(cost * (1 - discount))

      if (gameState.money < discountedCost) return

      setGameState((prev) => {
        const newState = { ...prev }
        newState.money -= discountedCost
        newState.upgradeOwned[upgradeId] = (newState.upgradeOwned[upgradeId] || 0) + 1

        switch (upgradeId) {
          case "clickPower":
            newState.stats.clickPower += 1
            addFloatingText("Click Power +1!", 50, 50)
            break
          case "efficiency":
            newState.stats.multiplier *= 1.05
            addFloatingText("Efficiency +5%!", 50, 50)
            break
          case "autoClicker":
            newState.autoClickers += 1
            addFloatingText("Auto-Clicker acquired!", 50, 50)
            break
          case "multiplier":
            newState.stats.multiplier *= 1.1
            addFloatingText("Power x1.1!", 50, 50)
            break
          case "critChance":
            newState.stats.critChance = Math.min(newState.stats.critChance + 0.01, 0.5)
            addFloatingText(`Crit +1% (${(newState.stats.critChance * 100).toFixed(1)}%)`, 50, 50)
            break
          case "critDamage":
            newState.stats.critDamage += 0.5
            addFloatingText("Crit Damage +0.5x!", 50, 50)
            break
          case "bulkBuy":
            newState.stats.bulkDiscount = Math.min(newState.stats.bulkDiscount + 0.1, 0.5)
            addFloatingText("Bulk Discount +10%!", 50, 50)
            break
          case "passiveIncome":
            newState.stats.passiveIncome += 0.1
            addFloatingText("Passive +10%!", 50, 50)
            break
        }

        return newState
      })
    },
    [gameState.money, gameState.stats, addFloatingText],
  )

  const totalUpgrades = Object.values(gameState.upgradeOwned).reduce((a, b) => a + b, 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <GameHeader money={gameState.money} income={calculateIncome(gameState)} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          <div className="lg:col-span-1 space-y-6">
            <ClickerPanel
              clickValue={gameState.stats.clickPower}
              money={gameState.money}
              onClickBuy={() => handleBuyUpgrade("autoClicker")}
              onBoostBuy={() => handleBuyUpgrade("multiplier")}
              onMainClick={handleClick}
              boostActive={gameState.boostActive}
            />
            <ExpandedAchievementsPanel
              totalClicks={gameState.totalClicks}
              totalMoney={gameState.money}
              lifeTimeEarnings={gameState.lifeTimeEarnings}
              autoClickers={gameState.autoClickers}
              prestigeLevel={gameState.prestigeLevel}
              totalUpgrades={totalUpgrades}
              criticalHits={gameState.criticalHits}
              upgradesCombination={gameState.upgradeOwned}
            />
            <button
              onClick={() => setShowPrestige(true)}
              className="w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold rounded-lg transition-all"
            >
              Prestige (Level {gameState.prestigeLevel})
            </button>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <AdvancedUpgradesPanel
              money={gameState.money}
              upgradeOwned={gameState.upgradeOwned}
              stats={gameState.stats}
              onBuyUpgrade={handleBuyUpgrade}
            />
            <ProductsSection money={gameState.money} />
          </div>
        </div>
      </div>

      {floatingTexts.map((ft) => (
        <FloatingText key={ft.id} text={ft.text} x={ft.x} y={ft.y} />
      ))}

      {showPrestige && (
        <PrestigeModal
          prestigeLevel={gameState.prestigeLevel}
          money={gameState.money}
          onPrestige={() => {
            const prestigeReward = calculatePrestigeReward(gameState.money, gameState.prestigeLevel)
            const prestigeBonus = calculatePrestigeBonus(gameState.prestigeLevel + 1)

            setGameState((prev) => ({
              ...prev,
              money: prestigeReward,
              clickValue: 1,
              clickCount: 0,
              autoClickers: 0,
              multiplier: 1,
              prestigeLevel: prev.prestigeLevel + 1,
              upgradeOwned: {},
              stats: {
                clickPower: 1,
                efficiency: prestigeBonus.efficiencyBonus,
                multiplier: prestigeBonus.clickPowerMultiplier,
                critChance: 0,
                critDamage: 1,
                bulkDiscount: prestigeBonus.upgradeDiscountPercent,
                passiveIncome: 0,
              },
            }))
            setShowPrestige(false)
            addFloatingText(`PRESTIGE! +${prestigeReward} Bucks`, 50, 50)
          }}
          onClose={() => setShowPrestige(false)}
        />
      )}
    </div>
  )
}
