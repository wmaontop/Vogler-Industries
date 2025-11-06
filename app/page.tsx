"use client"

import { useState, useEffect, useRef } from "react"

const PRODUCTS = [
  {
    id: "kb",
    name: "Mechanical Keyboards",
    baseCost: 5,
    income: 0.2,
    img: "/assets/keyboards.png",
    desc: "Custom mechanical keyboards from Vogler.",
  },
  {
    id: "mouse",
    name: "Pro Mice",
    baseCost: 25,
    income: 1.2,
    img: "/assets/mice.png",
    desc: "Precision mice that click with zeal.",
  },
  {
    id: "server",
    name: "Rack Servers",
    baseCost: 120,
    income: 8,
    img: "/assets/rack_servers.png",
    desc: "Powerful servers for hosting.",
  },
  {
    id: "rack",
    name: "Server Racks",
    baseCost: 650,
    income: 50,
    img: "/assets/server_racks.png",
    desc: "Organize and scale your datacenter.",
  },
  {
    id: "setup",
    name: "Setup Help",
    baseCost: 3000,
    income: 260,
    img: "/assets/setup_help.png",
    desc: "Consulting & hands-on setup services.",
  },
  {
    id: "ai",
    name: "AI Assistants",
    baseCost: 12000,
    income: 900,
    img: "/assets/ai.png",
    desc: "Automate your operations with AI.",
  },
  {
    id: "quantum",
    name: "Quantum Servers",
    baseCost: 70000,
    income: 5000,
    img: "/assets/quantum.png",
    desc: "Next-gen quantum computing.",
  },
  {
    id: "datacenter",
    name: "Data Centers",
    baseCost: 350000,
    income: 28000,
    img: "/assets/datacenter.png",
    desc: "Scale your empire globally.",
  },
  {
    id: "space",
    name: "Space Servers",
    baseCost: 2000000,
    income: 150000,
    img: "/assets/space_servers.png",
    desc: "Servers in orbit for ultimate speed.",
  },
  {
    id: "nano",
    name: "Nano Bots",
    baseCost: 10000000,
    income: 900000,
    img: "/assets/nano_bots.png",
    desc: "Automated nano bots for operations.",
  },
  {
    id: "logan",
    name: "Logan Nichols",
    baseCost: 100000000,
    income: 1000000,
    img: "/assets/logan.png",
    desc: "A wild Logan Nichols joins your team!",
  },
  {
    id: "david",
    name: "Salesman Vogler",
    baseCost: 999999999999,
    income: 100000000,
    img: "/assets/SalesmanVoglerKeys.png",
    desc: "Salesman Vogler steals all SSDs!",
  },
]

const AVATARS = ["/assets/vg1.jpg", "/assets/vg2.jpg", "/assets/vg3.jpg", "/assets/vg4.png", "/assets/vg5.png"]

const ACHIEVEMENTS = [
  { id: "first", name: "First Click", desc: "Make your first click", done: (s) => s.clickCount >= 1 },
  { id: "100bucks", name: "$100", desc: "Reach $100", done: (s) => s.money >= 100 },
  { id: "10items", name: "Collector", desc: "Own 10 items", done: (s) => s.totalOwned >= 10 },
  { id: "1k", name: "Money Hoarder", desc: "Reach $1,000", done: (s) => s.money >= 1000 },
  { id: "100clicks", name: "Click Master", desc: "100 total clicks", done: (s) => s.clickCount >= 100 },
]

const fmt = (n) => {
  if (n >= 1e12) return "$" + (n / 1e12).toFixed(2) + "T"
  if (n >= 1e9) return "$" + (n / 1e9).toFixed(2) + "B"
  if (n >= 1e6) return "$" + (n / 1e6).toFixed(2) + "M"
  if (n >= 1e3) return "$" + (n / 1e3).toFixed(2) + "k"
  return "$" + (Math.round(n * 100) / 100).toFixed(2)
}

export default function Home() {
  const [state, setState] = useState({
    money: 0,
    clickValue: 1,
    clickCount: 0,
    items: {},
    multiplier: 1,
    autoClickers: 0,
    boostActive: false,
    totalOwned: 0,
  })

  const [showShop, setShowShop] = useState(false)
  const [golden, setGolden] = useState([])
  const goldRespawnRef = useRef()

  useEffect(() => {
    setState((prev) => ({
      ...prev,
      items: PRODUCTS.reduce((acc, p) => ({ ...acc, [p.id]: 0 }), {}),
    }))
  }, [])

  useEffect(() => {
    const saved = localStorage.getItem("vogler_save_v1")
    if (saved) {
      const data = JSON.parse(saved)
      setState(data)
    }
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      localStorage.setItem("vogler_save_v1", JSON.stringify(state))
    }, 3000)
    return () => clearInterval(interval)
  }, [state])

  useEffect(() => {
    const interval = setInterval(() => {
      setState((prev) => {
        let total = 0
        for (const p of PRODUCTS) total += (prev.items[p.id] || 0) * p.income
        total += prev.autoClickers * prev.clickValue
        const income = total * prev.multiplier
        return { ...prev, money: prev.money + income / 10 }
      })
    }, 100)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      if (state.autoClickers > 0) {
        setState((prev) => ({
          ...prev,
          money: prev.money + prev.autoClickers * prev.clickValue * prev.multiplier,
          clickCount: prev.clickCount + prev.autoClickers,
        }))
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [state.autoClickers, state.clickValue, state.multiplier])

  useEffect(() => {
    const spawn = () => {
      if (Math.random() < 0.25 && golden.length < 3) {
        const id = Math.random()
        const newGolden = {
          id,
          top: 10 + Math.random() * 60,
          left: 10 + Math.random() * 60,
        }
        setGolden((prev) => [...prev, newGolden])
        setTimeout(() => {
          setGolden((prev) => prev.filter((g) => g.id !== id))
        }, 6000)
      }
    }
    goldRespawnRef.current = setInterval(spawn, 15000)
    return () => clearInterval(goldRespawnRef.current)
  }, [golden.length])

  const computeIncomePerSecond = () => {
    let total = 0
    for (const p of PRODUCTS) total += (state.items[p.id] || 0) * p.income
    total += state.autoClickers * state.clickValue
    return total * state.multiplier
  }

  const handleClick = () => {
    const gain = state.clickValue * state.multiplier
    setState((prev) => ({
      ...prev,
      money: prev.money + gain,
      clickCount: prev.clickCount + 1,
    }))
  }

  const buyProduct = (prodId) => {
    const prod = PRODUCTS.find((p) => p.id === prodId)
    const count = state.items[prodId] || 0
    const cost = Math.round(prod.baseCost * Math.pow(1.15, count) * 100) / 100

    if (state.money >= cost) {
      setState((prev) => {
        const newItems = { ...prev.items }
        newItems[prodId] = (newItems[prodId] || 0) + 1
        const totalOwned = Object.values(newItems).reduce((a, b) => a + b, 0)
        return {
          ...prev,
          money: prev.money - cost,
          items: newItems,
          totalOwned,
        }
      })
    }
  }

  const buyAutoClicker = () => {
    if (state.money >= 500) {
      setState((prev) => ({
        ...prev,
        money: prev.money - 500,
        autoClickers: prev.autoClickers + 1,
      }))
      alert("Purchased Auto-Clicker!")
    } else {
      alert("Not enough Vogler Bucks.")
    }
  }

  const buyDoubleBoost = () => {
    if (state.boostActive) {
      alert("Boost already active.")
      return
    }
    if (state.money >= 2000) {
      setState((prev) => ({
        ...prev,
        money: prev.money - 2000,
        multiplier: prev.multiplier * 2,
        boostActive: true,
      }))
      alert("2x income active for 30s!")
      setTimeout(() => {
        setState((prev) => ({
          ...prev,
          multiplier: prev.multiplier / 2,
          boostActive: false,
        }))
      }, 30000)
    } else {
      alert("Not enough Vogler Bucks.")
    }
  }

  const handleGoldenClick = (id) => {
    const income = computeIncomePerSecond()
    const reward = income * 25 + 50
    setState((prev) => ({
      ...prev,
      money: prev.money + reward,
    }))
    setGolden((prev) => prev.filter((g) => g.id !== id))
  }

  const avatarIndex = Math.floor(state.totalOwned / 4) % AVATARS.length
  const currentAvatar = AVATARS[avatarIndex] || AVATARS[0]

  const reset = () => {
    if (confirm("Reset all progress?")) {
      setState({
        money: 0,
        clickValue: 1,
        clickCount: 0,
        items: PRODUCTS.reduce((acc, p) => ({ ...acc, [p.id]: 0 }), {}),
        multiplier: 1,
        autoClickers: 0,
        boostActive: false,
        totalOwned: 0,
      })
    }
  }

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(180deg, #071025 0%, #0b1220 100%)" }}>
      <style>{`
        :root {
          --bg: #0f1724;
          --card: #0b1220;
          --accent: #7dd3fc;
          --glass: rgba(255,255,255,0.04);
          --muted: #93c5fd;
          --gold: #fbbf24;
        }
        * { box-sizing: border-box; color: #e6eef8; margin: 0; }
        .wrap { max-width: 1100px; margin: 20px auto; padding: 18px; display: grid; grid-template-columns: 360px 1fr; gap: 18px; }
        header { grid-column: 1/-1; display: flex; gap: 12px; align-items: center; }
        h1 { margin: 0; font-size: 20px; font-weight: 800; }
        .topbar { margin-left: auto; display: flex; gap: 10px; align-items: center; color: var(--muted); }
        .card { background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01)); border-radius: 12px; padding: 14px; box-shadow: 0 6px 18px rgba(2,6,23,0.7); }
        .left { display: flex; gap: 12px; }
        .avatar { height: 220px; border-radius: 10px; overflow: hidden; background: var(--glass); display: flex; align-items: center; justify-content: center; flex: 1; }
        .avatar img { width: 100%; height: 100%; object-fit: cover; }
        .stats { margin-top: 10px; display: grid; gap: 8px; }
        .stat { display: flex; justify-content: space-between; padding: 8px; background: rgba(255,255,255,0.02); border-radius: 8px; }
        .big-click { display: flex; gap: 10px; flex-direction: column; align-items: center; width: 180px; }
        #clickBtn { font-size: 20px; padding: 18px 26px; border-radius: 12px; background: linear-gradient(180deg, var(--accent), #0284c7); border: none; cursor: pointer; color: #012; font-weight: 700; }
        #clickBtn:active { transform: translateY(2px); }
        .small { font-size: 13px; color: var(--muted); }
        .right { display: flex; flex-direction: column; gap: 12px; }
        .products { display: flex; flex-direction: column; gap: 10px; max-height: 400px; overflow-y: auto; }
        .product { padding: 10px; border-radius: 10px; background: rgba(255,255,255,0.02); display: flex; gap: 8px; align-items: center; }
        .product .thumb { width: 62px; height: 62px; border-radius: 8px; background: #071226; display: flex; align-items: center; justify-content: center; overflow: hidden; }
        .product .thumb img { width: 100%; height: 100%; object-fit: cover; }
        .product .meta { flex: 1; }
        .product .meta h3 { margin: 0; font-size: 15px; }
        .product .meta p { margin: 4px 0 0; font-size: 12px; color: var(--muted); }
        .product button { background: linear-gradient(180deg, #10b981, #059669); border: none; color: #012; font-weight: 700; padding: 8px 10px; border-radius: 8px; cursor: pointer; }
        .product button:disabled { opacity: 0.5; cursor: default; }
        .muted-btn { background: none; border: 1px solid rgba(255,255,255,0.06); color: var(--muted); padding: 6px 8px; border-radius: 8px; cursor: pointer; }
        .controls { display: flex; gap: 8px; align-items: center; margin-top: 10px; flex-wrap: wrap; justify-content: center; }
        .ability { background: linear-gradient(180deg, #facc15, #eab308); color: #111; font-weight: 700; border: none; border-radius: 8px; padding: 6px 10px; cursor: pointer; }
        .ability:disabled { opacity: 0.5; cursor: default; }
        .golden { position: fixed; font-size: 48px; animation: float 0.9s ease-in-out infinite alternate; cursor: pointer; z-index: 9999; }
        @keyframes float { to { transform: translateY(-14px); } }
        .achievements { margin-top: 12px; padding: 10px; background: #071226; border-radius: 10px; max-height: 200px; overflow-y: auto; }
        .achievement { padding: 6px; border-bottom: 1px solid rgba(255,255,255,0.05); font-size: 13px; color: var(--muted); }
        @media (max-width: 880px) { .wrap { grid-template-columns: 1fr; padding: 12px; } .left { flex-direction: column; } }
      `}</style>

      <div className="wrap">
        <header>
          <div>
            <h1>Vogler Industries</h1>
            <div className="small">Click to earn Vogler Bucks — build your tech empire!</div>
          </div>
          <div className="topbar">
            <div style={{ textAlign: "right" }}>
              <div className="small">Vogler Bucks</div>
              <div style={{ fontWeight: 800, fontSize: 18 }}>{fmt(state.money)}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div className="small">Income / sec</div>
              <div>{computeIncomePerSecond().toFixed(2)}</div>
            </div>
          </div>
        </header>

        <section className="left card">
          <div style={{ flex: 1 }}>
            <div className="avatar">
              <img src={currentAvatar || "/placeholder.svg"} alt="Vogler character" />
            </div>
            <div className="stats">
              <div className="stat">
                <div>Vogler Bucks</div>
                <div>{fmt(state.money)}</div>
              </div>
              <div className="stat">
                <div>Total Clicks</div>
                <div>{state.clickCount}</div>
              </div>
              <div className="stat">
                <div>Owned Items</div>
                <div>{state.totalOwned}</div>
              </div>
            </div>
          </div>

          <div className="big-click card">
            <div className="small">Click for Vogler Bucks</div>
            <button id="clickBtn" onClick={handleClick}>
              + ${state.clickValue}
            </button>
            <div className="small">
              Click value: <span>{state.clickValue}</span>
            </div>

            <div className="controls">
              <button className="ability" onClick={buyAutoClicker} disabled={state.money < 500}>
                Buy Auto ($500)
              </button>
              <button className="ability" onClick={buyDoubleBoost} disabled={state.money < 2000 || state.boostActive}>
                2x ($2000)
              </button>
            </div>

            <div style={{ marginTop: 12 }} className="card achievements">
              <strong>Achievements</strong>
              <div>
                {ACHIEVEMENTS.map((a) => (
                  <div key={a.id} className="achievement">
                    {a.name}: {a.desc} {a.done(state) ? "✅" : ""}
                  </div>
                ))}
              </div>
            </div>

            <div style={{ marginTop: 12 }} className="card">
              <strong>Save / Export</strong>
              <div style={{ marginTop: 8, display: "flex", gap: 6 }}>
                <button
                  className="muted-btn"
                  onClick={() => {
                    const data = JSON.stringify(state)
                    const blob = new Blob([data], { type: "text/plain" })
                    const url = URL.createObjectURL(blob)
                    const a = document.createElement("a")
                    a.href = url
                    a.download = "vogler-save.json"
                    document.body.appendChild(a)
                    a.click()
                    a.remove()
                  }}
                >
                  Export
                </button>
                <button
                  className="muted-btn"
                  onClick={() => {
                    const txt = prompt("Paste save data:")
                    if (txt) {
                      try {
                        const data = JSON.parse(txt)
                        setState(data)
                        alert("Loaded!")
                      } catch {
                        alert("Invalid data")
                      }
                    }
                  }}
                >
                  Import
                </button>
              </div>
              <div style={{ marginTop: 8, display: "flex", gap: 6 }}>
                <button className="muted-btn" onClick={reset}>
                  Reset
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="right">
          <div className="card">
            <div style={{ marginBottom: 10 }}>
              <strong>Products — Buy to earn passive Vogler Bucks</strong>
              <div className="small">Each item increases cost when purchased</div>
            </div>
            <div className="products">
              {PRODUCTS.map((prod, idx) => {
                const count = state.items[prod.id] || 0
                const cost = Math.round(prod.baseCost * Math.pow(1.15, count) * 100) / 100
                const shouldShow = idx === 0 || state.items[PRODUCTS[idx - 1].id] > 0

                return shouldShow ? (
                  <div key={prod.id} className="product">
                    <div className="thumb">
                      <img src={prod.img || "/placeholder.svg"} alt={prod.name} />
                    </div>
                    <div className="meta">
                      <h3>{prod.name}</h3>
                      <p>{prod.desc}</p>
                      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6, fontSize: 12 }}>
                        <span>Cost: {fmt(cost)}</span>
                        <span>+{prod.income.toFixed(2)}/s</span>
                      </div>
                    </div>
                    <div>
                      <button onClick={() => buyProduct(prod.id)} disabled={state.money < cost}>
                        Buy
                      </button>
                      <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 4, textAlign: "right" }}>
                        Owned
                        <br />
                        {count}
                      </div>
                    </div>
                  </div>
                ) : null
              })}
            </div>
          </div>

          <div className="card">
            <strong>Game Tips</strong>
            <div className="small">Use upgrades and boosters strategically. Auto clickers help earn while idle.</div>
          </div>
        </section>
      </div>

      {golden.map((g) => (
        <div
          key={g.id}
          className="golden"
          style={{ top: g.top + "%", left: g.left + "%" }}
          onClick={() => handleGoldenClick(g.id)}
        >
          💰
        </div>
      ))}

      {showShop && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "#0b1220",
            padding: 20,
            borderRadius: 12,
            zIndex: 9999,
            boxShadow: "0 0 30px rgba(0,0,0,0.8)",
          }}
        >
          <h3>Shop Closed</h3>
          <p>Vogler Bucks can only be earned!</p>
          <button className="muted-btn" onClick={() => setShowShop(false)}>
            Close
          </button>
        </div>
      )}
    </div>
  )
}
