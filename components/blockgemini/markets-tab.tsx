"use client";

import { useState } from "react";
import { Search, TrendingUp, TrendingDown } from "lucide-react";

interface Coin {
  rank: number;
  symbol: string;
  name: string;
  emoji: string;
  price: string;
  change24h: number;
  marketCap: string;
  piPrice: string;
  sparkBars: number[];
}

const COINS: Coin[] = [
  { rank: 1, symbol: "BTC", name: "Bitcoin", emoji: "₿", price: "$67,842", change24h: 2.34, marketCap: "$1.33T", piPrice: "π 80,573", sparkBars: [5, 7, 6, 8, 7, 9, 10] },
  { rank: 2, symbol: "ETH", name: "Ethereum", emoji: "Ξ", price: "$3,521", change24h: -1.12, marketCap: "$423B", piPrice: "π 4,182", sparkBars: [9, 8, 9, 7, 8, 6, 5] },
  { rank: 3, symbol: "PI", name: "Pi Network", emoji: "π", price: "$0.842", change24h: 5.67, marketCap: "$5.6B", piPrice: "π 1.00", sparkBars: [4, 5, 5, 6, 7, 8, 10] },
  { rank: 4, symbol: "BNB", name: "BNB", emoji: "B", price: "$412.5", change24h: 0.88, marketCap: "$63.4B", piPrice: "π 490", sparkBars: [6, 6, 7, 7, 7, 8, 8] },
  { rank: 5, symbol: "SOL", name: "Solana", emoji: "◎", price: "$185.3", change24h: 3.21, marketCap: "$86.1B", piPrice: "π 220", sparkBars: [5, 6, 7, 8, 7, 8, 9] },
  { rank: 6, symbol: "XRP", name: "XRP", emoji: "✕", price: "$0.624", change24h: -2.18, marketCap: "$35.4B", piPrice: "π 0.74", sparkBars: [8, 7, 8, 6, 7, 5, 4] },
  { rank: 7, symbol: "ADA", name: "Cardano", emoji: "₳", price: "$0.612", change24h: -2.45, marketCap: "$21.6B", piPrice: "π 0.73", sparkBars: [9, 8, 7, 8, 6, 5, 4] },
  { rank: 8, symbol: "AVAX", name: "Avalanche", emoji: "A", price: "$38.72", change24h: -0.73, marketCap: "$15.9B", piPrice: "π 46", sparkBars: [7, 8, 7, 6, 7, 6, 6] },
  { rank: 9, symbol: "DOT", name: "Polkadot", emoji: "◉", price: "$8.94", change24h: 1.55, marketCap: "$12.1B", piPrice: "π 10.6", sparkBars: [5, 6, 6, 7, 7, 8, 8] },
  { rank: 10, symbol: "LINK", name: "Chainlink", emoji: "⬡", price: "$18.45", change24h: 4.22, marketCap: "$10.8B", piPrice: "π 21.9", sparkBars: [4, 5, 6, 7, 8, 9, 10] },
];

const CATEGORIES = ["All", "Gainers", "Losers", "Pi Pairs", "Trending"];

function SparkBar({ bars, isUp }: { bars: number[]; isUp: boolean }) {
  const gain = "#22c55e";
  const loss = "#ef4444";
  return (
    <div className="flex items-end gap-0.5 h-7" aria-hidden="true">
      {bars.map((h, i) => (
        <div
          key={i}
          className="w-1 rounded-sm"
          style={{
            height: `${(h / 10) * 100}%`,
            backgroundColor: i === bars.length - 1
              ? (isUp ? gain : loss)
              : (isUp ? "rgba(34,197,94,0.3)" : "rgba(239,68,68,0.3)"),
          }}
        />
      ))}
    </div>
  );
}

export function MarketsTab() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = COINS.filter((c) => {
    const matchSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.symbol.toLowerCase().includes(search.toLowerCase());
    if (!matchSearch) return false;
    if (activeCategory === "Gainers") return c.change24h > 0;
    if (activeCategory === "Losers") return c.change24h < 0;
    if (activeCategory === "Trending") return Math.abs(c.change24h) > 2;
    return true;
  });

  return (
    <div className="pb-4">
      <div className="px-4 pt-4 pb-3">
        <div
          className="flex items-center gap-2 rounded-xl px-3 py-2.5"
          style={{ backgroundColor: "#0d1526", border: "1px solid #1e293b" }}
        >
          <Search size={15} className="text-gray-500 flex-shrink-0" />
          <input
            type="text"
            placeholder="Search coins... / ابحث عن العملات"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent text-white text-sm placeholder-gray-600 outline-none"
            aria-label="Search coins"
          />
        </div>
      </div>

      <div className="flex gap-2 px-4 overflow-x-auto pb-2" style={{ scrollbarWidth: "none" }}>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className="flex-shrink-0 text-xs font-semibold px-3.5 py-1.5 rounded-full transition-all"
            style={
              activeCategory === cat
                ? { backgroundColor: "#7C3AED", color: "#fff" }
                : { backgroundColor: "#0d1526", color: "#64748b", border: "1px solid #1e293b" }
            }
          >
            {cat}
          </button>
        ))}
      </div>

      <div
        className="grid px-4 py-2 mt-1 text-gray-600 text-[10px] uppercase tracking-wider"
        style={{ gridTemplateColumns: "1.5rem 1fr 5.5rem 3.5rem 3.5rem", borderBottom: "1px solid #1e293b" }}
      >
        <span>#</span>
        <span>Coin</span>
        <span className="text-right">Price / π</span>
        <span className="text-right">24h</span>
        <span className="text-right">7D</span>
      </div>

      <div>
        {filtered.map((coin) => {
          const isUp = coin.change24h >= 0;
          return (
            <div
              key={coin.symbol}
              className="grid px-4 py-3 items-center border-b"
              style={{ gridTemplateColumns: "1.5rem 1fr 5.5rem 3.5rem 3.5rem", borderColor: "#0d1526" }}
            >
              <span className="text-gray-600 text-xs">{coin.rank}</span>

              <div className="flex items-center gap-2 min-w-0">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                  style={{ backgroundColor: "#1e1b4b", color: "#c4b5fd" }}
                >
                  {coin.emoji}
                </div>
                <div className="min-w-0">
                  <p className="text-white text-xs font-bold leading-tight">{coin.symbol}</p>
                  <p className="text-gray-600 text-[9px] truncate">{coin.name}</p>
                  <p className="text-purple-500 text-[9px]">{coin.piPrice}</p>
                </div>
              </div>

              <div className="text-right">
                <p className="text-white text-xs font-semibold">{coin.price}</p>
                <p className="text-gray-600 text-[9px]">{coin.marketCap}</p>
              </div>

              <div className="text-right">
                <span
                  className="text-xs font-bold flex items-center justify-end gap-0.5"
                  style={{ color: isUp ? "#22c55e" : "#ef4444" }}
                >
                  {isUp ? <TrendingUp size={9} /> : <TrendingDown size={9} />}
                  {Math.abs(coin.change24h).toFixed(1)}%
                </span>
              </div>

              <div className="flex justify-end">
                <SparkBar bars={coin.sparkBars} isUp={isUp} />
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-gray-500 text-sm">No coins found</p>
            <p className="text-gray-700 text-xs mt-1" dir="rtl">لا توجد نتائج</p>
          </div>
        )}
      </div>
    </div>
  );
}
