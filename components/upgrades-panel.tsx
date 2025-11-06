"use client"

export default function UpgradesPanel({ money, clickValue, autoClickers, onBuyClickUpgrade }) {
  return (
    <div className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
      <h2 className="text-lg font-bold text-cyan-400 mb-4">Upgrades</h2>

      <div className="space-y-3">
        <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/5">
          <div>
            <p className="font-semibold text-white">Click Power +1</p>
            <p className="text-xs text-slate-400">Current: {clickValue}</p>
          </div>
          <button
            onClick={onBuyClickUpgrade}
            disabled={money < 100}
            className="px-3 py-1 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white text-sm font-bold rounded transition-all"
          >
            $100
          </button>
        </div>

        <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/5">
          <div>
            <p className="font-semibold text-white">Auto-Clickers</p>
            <p className="text-xs text-slate-400">Owned: {autoClickers}</p>
          </div>
          <div className="text-lg font-bold text-emerald-400">{autoClickers}</div>
        </div>
      </div>
    </div>
  )
}
