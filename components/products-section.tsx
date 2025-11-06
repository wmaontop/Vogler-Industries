export default function ProductsSection({ money }) {
  const products = [
    { id: 1, name: "Mechanical Keyboards", cost: 5, income: 0.2 },
    { id: 2, name: "Pro Mice", cost: 25, income: 1.2 },
    { id: 3, name: "Rack Servers", cost: 120, income: 8 },
    { id: 4, name: "Server Racks", cost: 650, income: 50 },
  ]

  return (
    <div className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
      <h2 className="text-lg font-bold text-cyan-400 mb-4">Products</h2>
      <div className="space-y-2 max-h-96 overflow-y-auto">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/5 hover:border-cyan-400/30 transition-all"
          >
            <div>
              <p className="font-semibold text-white text-sm">{product.name}</p>
              <p className="text-xs text-emerald-400">+${product.income.toFixed(2)}/s</p>
            </div>
            <button
              disabled={money < product.cost}
              className="px-3 py-1 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white text-xs font-bold rounded transition-all"
            >
              ${product.cost}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
