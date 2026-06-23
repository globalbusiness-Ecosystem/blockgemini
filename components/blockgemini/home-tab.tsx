"use client";

import { useState, useEffect } from "react";
import { TrendingUp, TrendingDown, Minus, Zap, Target, Brain } from "lucide-react";
import { PiPaymentButton } from "@/components/blockgemini/pi-payment-button";

type SignalType = "BUY" | "SELL" | "HOLD";

interface Signal {
  id: number;
  coin: string;
  symbol: string;
  emoji: string;
  signal: SignalType;
  confidence: number;
  price: string;
  change: number;
  reason: string;
  reasonAr: string;
  timeAgo: string;
}

const SIGNALS: Signal[] = [
  {
    id: 1,
    coin: "Bitcoin",
    symbol: "BTC",
    emoji: "₿",
    signal: "BUY",
    confidence: 92,
    price: "$67,842",
    change: 2.34,
    reason: "Strong support at $65K, bullish momentum building",
    reasonAr: "دعم قوي عند $65K، زخم صاعد يتشكل",
    timeAgo: "2m ago",
  },
  {
    id: 2,
    coin: "Ethereum",
    symbol: "ETH",
    emoji: "Ξ",
    signal: "HOLD",
    confidence: 78,
    price: "$3,521",
    change: -1.12,
    reason: "Consolidation phase, wait for breakout above $3,600",
    reasonAr: "مرحلة توطيد، انتظر الاختراق فوق $3,600",
    timeAgo: "5m ago",
  },
  {
    id: 3,
    coin: "Pi Network",
    symbol: "PI",
    emoji: "π",
    signal: "BUY",
    confidence: 88,
    price: "$0.842",
    change: 5.67,
    reason: "Mainnet upgrade catalyst, strong community growth",
    reasonAr: "محفز ترقية الشبكة الرئيسية، نمو المجتمع قوي",
    timeAgo: "8m ago",
  },
  {
    id: 4,
    coin: "Solana",
    symbol: "SOL",
    emoji: "◎",
    signal: "SELL",
    confidence: 71,
    price: "$185.3",
    change: 3.21,
    reason: "Overbought RSI at 78, take profits near resistance",
    reasonAr: "RSI مبالغ فيه عند 78، خذ الأرباح قرب المقاومة",
    timeAgo: "12m ago",
  },
  {
    id: 5,
    coin: "Avalanche",
    symbol: "AVAX",
    emoji: "A",
    signal: "BUY",
    confidence: 83,
    price: "$38.72",
    change: -0.73,
    reason: "Oversold bounce expected, key support level held",
    reasonAr: "ارتداد متوقع من منطقة بيع مفرط، دعم محتجز",
    timeAgo: "15m ago",
  },
];

const SIGNAL_CONFIG: Record<SignalType, { bg: string; border: string; text: string; Icon: typeof TrendingUp }> = {
  BUY: { bg: "rgba(34,197,94,0.12)", border: "rgba(34,197,94,0.35)", text: "#22c55e", Icon: TrendingUp },
  SELL: { bg: "rgba(239,68,68,0.12)", border: "rgba(239,68,68,0.35)", text: "#ef4444", Icon: TrendingDown },
  HOLD: { bg: "rgba(245,158,11,0.12)", border: "rgba(245,158,11,0.35)", text: "#F59E0B", Icon: Minus },
};

function ConfidenceBar({ value }: { value: number }) {
  const color = value >= 85 ? "#22c55e" : value >= 70 ? "#F59E0B" : "#ef4444";
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: "#1e293b" }}>
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${value}%`, backgroundColor: color }}
        />
      </div>
      <span className="text-xs font-bold tabular-nums" style={{ color, minWidth: "2.5rem", textAlign: "right" }}>
        {value}%
      </span>
    </div>
  );
}

function SignalCard({ signal }: { signal: Signal }) {
  const config = SIGNAL_CONFIG[signal.signal];
  const Icon = config.Icon;
  const isPositive = signal.change >= 0;

  return (
    <article
      className="rounded-2xl p-4 mb-3 border"
      style={{ backgroundColor: "#0d1526", borderColor: "#1e293b", boxShadow: "0 2px 20px rgba(124,58,237,0.08)" }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center text-xl font-bold flex-shrink-0"
            style={{ backgroundColor: "#1e1b4b", color: "#c4b5fd" }}
          >
            {signal.emoji}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-white font-bold text-sm">{signal.coin}</span>
              <span className="text-gray-500 text-xs">{signal.symbol}</span>
            </div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-white text-sm font-semibold">{signal.price}</span>
              <span
                className="text-xs font-semibold"
                style={{ color: isPositive ? "#22c55e" : "#ef4444" }}
              >
                {isPositive ? "+" : ""}{signal.change.toFixed(2)}%
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end gap-1.5">
          <span
            className="flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-lg border"
            style={{ backgroundColor: config.bg, borderColor: config.border, color: config.text }}
          >
            <Icon size={11} />
            {signal.signal}
          </span>
          <span className="text-gray-600 text-[10px]">{signal.timeAgo}</span>
        </div>
      </div>

      <div className="mb-2.5">
        <div className="flex items-center justify-between mb-1">
          <span className="text-gray-500 text-[11px]">AI Confidence</span>
          <span className="text-gray-600 text-[10px]" dir="rtl">ثقة الذكاء الاصطناعي</span>
        </div>
        <ConfidenceBar value={signal.confidence} />
      </div>

      <div
        className="rounded-xl p-2.5 mt-2"
        style={{ backgroundColor: "rgba(124,58,237,0.07)" }}
      >
        <p className="text-gray-300 text-[11px] leading-relaxed">{signal.reason}</p>
        <p className="text-purple-400/60 text-[10px] mt-1 leading-relaxed text-right" dir="rtl">
          {signal.reasonAr}
        </p>
      </div>
    </article>
  );
}

function StatCard({
  value, label, labelAr,
  icon: Icon, color,
}: {
  value: string; label: string; labelAr: string;
  icon: typeof Zap; color: string;
}) {
  return (
    <div
      className="flex-1 rounded-2xl p-3 flex flex-col items-center gap-1 border"
      style={{ backgroundColor: "#0d1526", borderColor: "#1e293b" }}
    >
      <div
        className="w-8 h-8 rounded-xl flex items-center justify-center mb-0.5"
        style={{ backgroundColor: `${color}18` }}
      >
        <Icon size={16} style={{ color }} />
      </div>
      <span className="text-white font-bold text-base leading-none">{value}</span>
      <span className="text-gray-400 text-[10px] text-center leading-tight">{label}</span>
      <span className="text-[9px] text-center leading-tight" style={{ color: `${color}80` }} dir="rtl">
        {labelAr}
      </span>
    </div>
  );
}

export function HomeTab() {
  const [signalCount, setSignalCount] = useState(10247);

  useEffect(() => {
    const interval = setInterval(() => {
      setSignalCount((prev) => prev + Math.floor(Math.random() * 3));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="pb-4">
      {/* Hero banner */}
      <div
        className="mx-4 mt-4 rounded-2xl p-4 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #3b0764 0%, #7C3AED 55%, #4c1d95 100%)" }}
      >
        <div className="relative z-10">
          <div className="flex items-center gap-1.5 mb-1">
            <Brain size={13} className="text-purple-200" />
            <span className="text-purple-200 text-[11px] font-semibold uppercase tracking-wider">
              AI-Powered Signals
            </span>
          </div>
          <h1 className="text-white text-xl font-bold leading-tight">
            Smart Crypto Trading
          </h1>
          <p className="text-purple-200/80 text-[11px] mt-0.5" dir="rtl">
            تداول ذكي مع إشارات الذكاء الاصطناعي
          </p>

          <div className="flex items-center gap-4 mt-4">
            <div>
              <p className="text-white font-bold text-sm tabular-nums">{signalCount.toLocaleString()}+</p>
              <p className="text-purple-300 text-[10px]">Signals Today</p>
            </div>
            <div className="w-px h-8" style={{ backgroundColor: "rgba(255,255,255,0.15)" }} />
            <div>
              <p className="text-white font-bold text-sm">95%</p>
              <p className="text-purple-300 text-[10px]">Accuracy</p>
            </div>
            <div className="w-px h-8" style={{ backgroundColor: "rgba(255,255,255,0.15)" }} />
            <div>
              <p className="text-white font-bold text-sm">π Powered</p>
              <p className="text-purple-300 text-[10px]">Pay with Pi</p>
            </div>
          </div>

          <PiPaymentButton variant="outline" className="mt-4" />
        </div>
        <div
          className="absolute -right-10 -top-10 w-36 h-36 rounded-full"
          style={{ backgroundColor: "rgba(167,139,250,0.12)" }}
        />
        <div
          className="absolute -right-2 -bottom-6 w-20 h-20 rounded-full"
          style={{ backgroundColor: "rgba(167,139,250,0.08)" }}
        />
      </div>

      {/* Stats row */}
      <div className="flex gap-2.5 mx-4 mt-3.5">
        <StatCard value="10K+" label="Signals" labelAr="إشارات" icon={Zap} color="#7C3AED" />
        <StatCard value="95%" label="Accuracy" labelAr="دقة" icon={Target} color="#F59E0B" />
        <StatCard value="π AI" label="Powered" labelAr="مدعوم" icon={Brain} color="#22c55e" />
      </div>

      {/* AI Signals section header */}
      <div className="flex items-center justify-between mx-4 mt-5 mb-3">
        <div>
          <h2 className="text-white font-bold text-base leading-tight">AI Signals</h2>
          <p className="text-gray-600 text-[10px]" dir="rtl">إشارات الذكاء الاصطناعي</p>
        </div>
        <div
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-full"
          style={{ backgroundColor: "rgba(34,197,94,0.12)", border: "1px solid rgba(34,197,94,0.25)" }}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          <span className="text-green-400 text-[10px] font-bold">LIVE</span>
        </div>
      </div>

      {/* Signal cards */}
      <div className="px-4">
        {SIGNALS.map((signal) => (
          <SignalCard key={signal.id} signal={signal} />
        ))}
      </div>
    </div>
  );
}
