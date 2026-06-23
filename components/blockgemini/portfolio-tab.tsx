"use client";

import { TrendingUp, TrendingDown, Plus, ArrowUpRight, ArrowDownLeft, Wallet } from "lucide-react";

interface Holding {
  symbol: string;
  name: string;
  emoji: string;
  amount: number;
  piValue: number;
  usdValue: string;
  change24h: number;
  allocation: number;
  allocColor: string;
}

const HOLDINGS: Holding[] = [
  { symbol: "PI", name: "Pi Network", emoji: "π", amount: 1240.5, piValue: 1240.5, usdValue: "$1,044.5", change24h: 5.67, allocation: 62, allocColor: "#7C3AED" },
  { symbol: "BTC", name: "Bitcoin", emoji: "₿", amount: 0.006, piValue: 483.4, usdValue: "$407.1", change24h: 2.34, allocation: 24, allocColor: "#F59E0B" },
  { symbol: "ETH", name: "Ethereum", emoji: "Ξ", amount: 0.08, piValue: 334.6, usdValue: "$281.7", change24h: -1.12, allocation: 10, allocColor: "#22c55e" },
  { symbol: "SOL", name: "Solana", emoji: "◎", amount: 0.75, piValue: 110.2, usdValue: "$92.8", change24h: 3.21, allocation: 4, allocColor: "#38bdf8" },
];

const TRANSACTIONS = [
  { type: "BUY", symbol: "PI", amount: "500 π", piValue: "+π 500", date: "Today 09:24", color: "#22c55e" },
  { type: "SELL", symbol: "ETH", amount: "0.02 ETH", piValue: "-π 83.6", date: "Yesterday", color: "#ef4444" },
  { type: "BUY", symbol: "BTC", amount: "0.002 BTC", piValue: "+π 161.1", date: "Mar 9", color: "#22c55e" },
  { type: "RECV", symbol: "PI", amount: "240.5 π", piValue: "+π 240.5", date: "Mar 7", color: "#7C3AED" },
];

const TOTAL_PI = 2168.7;
const CHANGE_24H = 4.82;

export function PortfolioTab() {
  const isPositive = CHANGE_24H >= 0;

  return (
    <div className="pb-4">
      {/* Total value card */}
      <div
        className="mx-4 mt-4 rounded-2xl p-5 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 55%, #1e1b4b 100%)" }}
      >
        <div className="relative z-10">
          <div className="flex items-center gap-1.5 mb-2">
            <Wallet size={12} className="text-purple-300" />
            <span className="text-purple-300 text-[11px] uppercase tracking-widest font-medium">
              Total Portfolio Value
            </span>
          </div>
          <p className="text-white text-3xl font-bold leading-none tabular-nums">
            π {TOTAL_PI.toLocaleString("en", { minimumFractionDigits: 1 })}
          </p>
          <p className="text-purple-300 text-sm mt-1">≈ $1,826.1 USD</p>

          <div className="flex items-center gap-3 mt-3">
            <div
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl"
              style={{
                backgroundColor: isPositive ? "rgba(34,197,94,0.15)" : "rgba(239,68,68,0.15)",
              }}
            >
              {isPositive
                ? <ArrowUpRight size={13} className="text-green-400" />
                : <ArrowDownLeft size={13} className="text-red-400" />}
              <span
                className="text-sm font-bold"
                style={{ color: isPositive ? "#22c55e" : "#ef4444" }}
              >
                {isPositive ? "+" : ""}{CHANGE_24H}% today
              </span>
            </div>
            <span className="text-purple-400 text-sm font-medium">+$84.7</span>
          </div>
        </div>
        <div
          className="absolute -right-8 -bottom-8 w-28 h-28 rounded-full"
          style={{ backgroundColor: "rgba(167,139,250,0.08)" }}
        />
      </div>

      {/* Quick actions */}
      <div className="flex gap-2.5 px-4 mt-4">
        {[
          { label: "Buy", labelAr: "شراء", color: "#7C3AED", Icon: Plus },
          { label: "Receive", labelAr: "استلام", color: "#22c55e", Icon: ArrowDownLeft },
          { label: "Send", labelAr: "إرسال", color: "#F59E0B", Icon: ArrowUpRight },
        ].map((action) => {
          const Icon = action.Icon;
          return (
            <button
              key={action.label}
              className="flex-1 flex flex-col items-center gap-1.5 rounded-2xl py-3 transition-all active:scale-95"
              style={{ backgroundColor: `${action.color}12`, border: `1px solid ${action.color}30` }}
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: action.color }}
              >
                <Icon size={17} className="text-white" />
              </div>
              <span className="text-white text-xs font-semibold">{action.label}</span>
              <span className="text-gray-600 text-[9px]" dir="rtl">{action.labelAr}</span>
            </button>
          );
        })}
      </div>

      {/* Allocation bar */}
      <div className="mx-4 mt-5">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-white font-bold text-sm">Allocation</h2>
          <span className="text-gray-600 text-xs" dir="rtl">التوزيع</span>
        </div>
        <div className="w-full h-3 rounded-full overflow-hidden flex">
          {HOLDINGS.map((h) => (
            <div key={h.symbol} style={{ width: `${h.allocation}%`, backgroundColor: h.allocColor }} />
          ))}
        </div>
        <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2">
          {HOLDINGS.map((h) => (
            <div key={h.symbol} className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: h.allocColor }} />
              <span className="text-gray-400 text-[10px]">{h.symbol} {h.allocation}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Holdings */}
      <div className="mx-4 mt-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-white font-bold text-sm">Holdings</h2>
          <span className="text-gray-600 text-xs" dir="rtl">الأصول</span>
        </div>
        <div className="flex flex-col gap-2">
          {HOLDINGS.map((h) => {
            const isUp = h.change24h >= 0;
            return (
              <div
                key={h.symbol}
                className="flex items-center gap-3 rounded-2xl p-3.5 border"
                style={{ backgroundColor: "#0d1526", borderColor: "#1e293b" }}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-base font-bold flex-shrink-0"
                  style={{ backgroundColor: "#1e1b4b", color: "#c4b5fd" }}
                >
                  {h.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-white font-semibold text-sm">{h.symbol}</p>
                    <p className="text-white font-bold text-sm tabular-nums">π {h.piValue.toFixed(1)}</p>
                  </div>
                  <div className="flex items-center justify-between mt-0.5">
                    <p className="text-gray-600 text-xs tabular-nums">{h.amount} {h.symbol}</p>
                    <div className="flex items-center gap-1.5">
                      <span className="text-gray-600 text-[10px]">{h.usdValue}</span>
                      <span
                        className="text-xs font-bold flex items-center gap-0.5"
                        style={{ color: isUp ? "#22c55e" : "#ef4444" }}
                      >
                        {isUp ? <TrendingUp size={9} /> : <TrendingDown size={9} />}
                        {Math.abs(h.change24h).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent transactions */}
      <div className="mx-4 mt-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-white font-bold text-sm">Recent Transactions</h2>
          <span className="text-gray-600 text-xs" dir="rtl">المعاملات الأخيرة</span>
        </div>
        <div className="flex flex-col gap-2">
          {TRANSACTIONS.map((tx, i) => (
            <div
              key={i}
              className="flex items-center gap-3 rounded-xl p-3 border"
              style={{ backgroundColor: "#0d1526", borderColor: "#1e293b" }}
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-[9px] font-bold flex-shrink-0"
                style={{ backgroundColor: `${tx.color}18`, color: tx.color }}
              >
                {tx.type}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-white text-sm font-semibold">{tx.symbol}</p>
                  <p className="text-sm font-bold tabular-nums" style={{ color: tx.color }}>{tx.piValue}</p>
                </div>
                <div className="flex items-center justify-between mt-0.5">
                  <p className="text-gray-600 text-xs">{tx.amount}</p>
                  <p className="text-gray-700 text-xs">{tx.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
