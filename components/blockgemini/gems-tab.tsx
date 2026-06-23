"use client";

import { useState } from "react";
import { Gem, Flame, Star, TrendingUp, TrendingDown, Zap } from "lucide-react";

interface GemCoin {
  id: number;
  name: string;
  symbol: string;
  emoji: string;
  price: string;
  piPrice: string;
  change: number;
  marketCap: string;
  score: number;
  category: "trending" | "new" | "hot" | "pi";
  reason: string;
  reasonAr: string;
  sparkData: number[];
}

const GEM_COINS: GemCoin[] = [
  {
    id: 1, name: "Pi Network", symbol: "PI", emoji: "π",
    price: "$0.842", piPrice: "π 1.00", change: 5.67, marketCap: "$5.6B",
    score: 97, category: "pi",
    reason: "Pi ecosystem growth catalyst — mainnet expansion",
    reasonAr: "محفز نمو نظام Pi — توسع الشبكة الرئيسية",
    sparkData: [20, 22, 21, 25, 28, 32, 35],
  },
  {
    id: 2, name: "Render Token", symbol: "RNDR", emoji: "R",
    price: "$8.24", piPrice: "π 9.79", change: 18.4, marketCap: "$3.1B",
    score: 94, category: "hot",
    reason: "AI GPU marketplace surging on institutional demand",
    reasonAr: "سوق GPU للذكاء الاصطناعي في ارتفاع بسبب الطلب المؤسسي",
    sparkData: [15, 18, 16, 22, 28, 35, 40],
  },
  {
    id: 3, name: "Fetch.ai", symbol: "FET", emoji: "F",
    price: "$2.14", piPrice: "π 2.54", change: 12.3, marketCap: "$1.8B",
    score: 91, category: "trending",
    reason: "AI agent network expansion — DeFi integration",
    reasonAr: "توسع شبكة وكلاء AI — تكامل DeFi",
    sparkData: [25, 23, 28, 30, 29, 33, 36],
  },
  {
    id: 4, name: "Akash Network", symbol: "AKT", emoji: "A",
    price: "$4.82", piPrice: "π 5.73", change: 9.8, marketCap: "$1.2B",
    score: 88, category: "trending",
    reason: "Decentralized cloud computing boom, undervalued",
    reasonAr: "붐 الحوسبة السحابية اللامركزية، مقيّم بأقل من قيمته",
    sparkData: [18, 20, 22, 21, 25, 28, 31],
  },
  {
    id: 5, name: "SingularityNET", symbol: "AGIX", emoji: "S",
    price: "$0.98", piPrice: "π 1.16", change: 7.2, marketCap: "$890M",
    score: 85, category: "new",
    reason: "AGI marketplace growing — strategic partnerships",
    reasonAr: "سوق AGI ينمو — شراكات استراتيجية",
    sparkData: [22, 24, 23, 26, 25, 28, 30],
  },
  {
    id: 6, name: "Ocean Protocol", symbol: "OCEAN", emoji: "O",
    price: "$1.24", piPrice: "π 1.47", change: -2.1, marketCap: "$640M",
    score: 79, category: "new",
    reason: "Data marketplace potential, accumulation zone",
    reasonAr: "إمكانية سوق البيانات، منطقة تراكم",
    sparkData: [30, 28, 27, 29, 26, 25, 24],
  },
];

const CATEGORY_CONFIG = {
  trending: { label: "Trending", color: "#7C3AED", bg: "rgba(124,58,237,0.15)" },
  new: { label: "New Gem", color: "#22c55e", bg: "rgba(34,197,94,0.15)" },
  hot: { label: "Hot", color: "#ef4444", bg: "rgba(239,68,68,0.15)" },
  pi: { label: "Pi Pair", color: "#F59E0B", bg: "rgba(245,158,11,0.15)" },
};

const FILTERS = ["All Gems", "Trending", "Hot", "New", "Pi Pairs"];

function MiniSparkline({ data, isUp }: { data: number[]; isUp: boolean }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const w = 56;
  const h = 26;
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / range) * (h - 2) - 1;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(" ");

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} aria-hidden="true">
      <polyline
        points={points}
        fill="none"
        stroke={isUp ? "#22c55e" : "#ef4444"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ScoreRing({ score }: { score: number }) {
  const color = score >= 90 ? "#F59E0B" : score >= 80 ? "#7C3AED" : "#22c55e";
  return (
    <div className="flex flex-col items-center gap-0.5">
      <div
        className="w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-bold border-2"
        style={{ borderColor: color, color, backgroundColor: `${color}12` }}
      >
        {score}
      </div>
      <span className="text-[8px] text-gray-600">Score</span>
    </div>
  );
}

function GemCard({ gem }: { gem: GemCoin }) {
  const isUp = gem.change >= 0;
  const catCfg = CATEGORY_CONFIG[gem.category];

  return (
    <article
      className="rounded-2xl p-4 border"
      style={{ backgroundColor: "#0d1526", borderColor: "#1e293b", boxShadow: "0 2px 20px rgba(245,158,11,0.06)" }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold flex-shrink-0"
            style={{ backgroundColor: "#1e1b4b", color: "#c4b5fd" }}
          >
            {gem.emoji}
          </div>
          <div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-white font-bold text-sm">{gem.symbol}</span>
              <span
                className="text-[9px] font-semibold px-1.5 py-0.5 rounded-md"
                style={{ backgroundColor: catCfg.bg, color: catCfg.color }}
              >
                {catCfg.label}
              </span>
            </div>
            <p className="text-gray-500 text-xs leading-tight">{gem.name}</p>
          </div>
        </div>
        <ScoreRing score={gem.score} />
      </div>

      <div className="flex items-center justify-between mb-2">
        <div>
          <p className="text-white font-bold text-base leading-none">{gem.price}</p>
          <p className="text-purple-400 text-[11px] mt-0.5">{gem.piPrice}</p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <span
            className="text-sm font-bold flex items-center gap-0.5"
            style={{ color: isUp ? "#22c55e" : "#ef4444" }}
          >
            {isUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            {isUp ? "+" : ""}{gem.change.toFixed(1)}%
          </span>
          <MiniSparkline data={gem.sparkData} isUp={isUp} />
        </div>
      </div>

      <div className="flex items-center justify-between mb-2.5">
        <span className="text-gray-600 text-[10px]">Market Cap</span>
        <span className="text-gray-400 text-[10px] font-semibold">{gem.marketCap}</span>
      </div>

      <div
        className="rounded-xl p-2.5"
        style={{ backgroundColor: "rgba(124,58,237,0.08)" }}
      >
        <p className="text-purple-300 text-[11px] flex items-start gap-1 leading-relaxed">
          <Zap size={10} className="mt-0.5 flex-shrink-0 text-purple-400" />
          {gem.reason}
        </p>
        <p className="text-purple-500/50 text-[10px] mt-1 text-right leading-relaxed" dir="rtl">
          {gem.reasonAr}
        </p>
      </div>
    </article>
  );
}

export function GemsTab() {
  const [activeFilter, setActiveFilter] = useState("All Gems");

  const filtered = GEM_COINS.filter((g) => {
    if (activeFilter === "All Gems") return true;
    if (activeFilter === "Trending") return g.category === "trending";
    if (activeFilter === "Hot") return g.category === "hot";
    if (activeFilter === "New") return g.category === "new";
    if (activeFilter === "Pi Pairs") return g.category === "pi";
    return true;
  });

  return (
    <div className="pb-4">
      {/* Header banner */}
      <div
        className="mx-4 mt-4 rounded-2xl p-4 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #451a03 0%, #78350f 40%, #92400e 100%)" }}
      >
        <div className="flex items-center gap-2 mb-1">
          <Gem size={15} style={{ color: "#F59E0B" }} />
          <span className="font-bold text-amber-300 text-xs uppercase tracking-widest">
            AI Gem Finder
          </span>
        </div>
        <h2 className="text-white text-lg font-bold leading-tight">Hidden Crypto Gems</h2>
        <p className="text-amber-300/70 text-[11px] mt-0.5" dir="rtl">
          اكتشف العملات المخفية المربحة
        </p>
        <div className="flex items-center gap-4 mt-3">
          <div>
            <p className="text-white font-bold text-sm flex items-center gap-1">
              <Flame size={11} style={{ color: "#F59E0B" }} />
              6 Gems Today
            </p>
            <p className="text-amber-500 text-[10px]">Discovered by AI</p>
          </div>
          <div className="w-px h-8" style={{ backgroundColor: "rgba(255,255,255,0.12)" }} />
          <div>
            <p className="text-white font-bold text-sm flex items-center gap-1">
              <Star size={11} style={{ color: "#F59E0B" }} />
              Avg +12.4%
            </p>
            <p className="text-amber-500 text-[10px]">Weekly Gain</p>
          </div>
        </div>
        <div
          className="absolute -right-8 -top-8 w-28 h-28 rounded-full"
          style={{ backgroundColor: "rgba(245,158,11,0.08)" }}
        />
      </div>

      {/* Filter pills */}
      <div className="flex gap-2 px-4 mt-4 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className="flex-shrink-0 text-xs font-semibold px-3.5 py-1.5 rounded-full transition-all"
            style={
              activeFilter === f
                ? { backgroundColor: "#F59E0B", color: "#000" }
                : { backgroundColor: "#0d1526", color: "#64748b", border: "1px solid #1e293b" }
            }
          >
            {f}
          </button>
        ))}
      </div>

      {/* Gem grid */}
      <div className="px-4 mt-4 flex flex-col gap-3">
        {filtered.map((gem) => (
          <GemCard key={gem.id} gem={gem} />
        ))}
        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Gem size={32} className="text-gray-700 mb-3" />
            <p className="text-gray-500 text-sm">No gems found</p>
            <p className="text-gray-700 text-xs mt-1" dir="rtl">لا توجد جواهر</p>
          </div>
        )}
      </div>
    </div>
  );
}
