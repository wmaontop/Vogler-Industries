export default function AchievementsPanel({ clicks, money, owned }) {
  const achievements = [
    { name: "First Click", condition: clicks >= 1, emoji: "👆" },
    { name: "$100", condition: money >= 100, emoji: "💰" },
    { name: "100 Clicks", condition: clicks >= 100, emoji: "⚡" },
    { name: "Collector", condition: owned >= 5, emoji: "📦" },
  ]

  const unlocked = achievements.filter((a) => a.condition).length

  return (
    <div className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
      <h3 className="font-bold text-cyan-400 mb-3">Achievements</h3>
      <div className="text-xs text-slate-400 mb-3">
        {unlocked} / {achievements.length} unlocked
      </div>
      <div className="space-y-2">
        {achievements.map((ach, idx) => (
          <div
            key={idx}
            className={`p-2 rounded text-xs transition-all ${
              ach.condition
                ? "bg-emerald-900/30 border border-emerald-400/30 text-emerald-300"
                : "bg-white/5 border border-white/5 text-slate-400"
            }`}
          >
            <span>{ach.emoji}</span> {ach.name}
          </div>
        ))}
      </div>
    </div>
  )
}
