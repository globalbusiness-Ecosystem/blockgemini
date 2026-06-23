"use client";

import { useState } from "react";
import { Star, Zap, Award, Crown, Target, Flame, Copy, CheckCircle } from "lucide-react";
import { PiPaymentButton } from "@/components/blockgemini/pi-payment-button";

const ACHIEVEMENTS = [
  { icon: Crown, label: "Early Adopter", labelAr: "مستخدم مبكر", color: "#F59E0B", earned: true },
  { icon: Target, label: "Signal Master", labelAr: "سيد الإشارات", color: "#7C3AED", earned: true },
  { icon: Flame, label: "Hot Streak", labelAr: "سلسلة رابحة", color: "#ef4444", earned: true },
  { icon: Star, label: "Gem Hunter", labelAr: "صائد الجواهر", color: "#22c55e", earned: false },
  { icon: Award, label: "Pi Pioneer", labelAr: "رائد Pi", color: "#F59E0B", earned: false },
  { icon: Zap, label: "Speed Trader", labelAr: "متداول سريع", color: "#38bdf8", earned: false },
];

const STATS = [
  { label: "Signals Used", labelAr: "إشارات مستخدمة", value: "247" },
  { label: "Win Rate", labelAr: "نسبة الفوز", value: "78%" },
  { label: "Pi Spent", labelAr: "Pi المنفق", value: "π 45.2" },
  { label: "Member Since", labelAr: "عضو منذ", value: "Mar 2024" },
];

export function ProfileTab() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="pb-4">
      {/* Profile hero */}
      <div
        className="mx-4 mt-4 rounded-2xl p-5 text-center relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #1e1b4b 0%, #4c1d95 55%, #1e1b4b 100%)" }}
      >
        <div className="relative inline-block mb-3">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold border-2"
            style={{ backgroundColor: "#7C3AED", borderColor: "#a78bfa" }}
          >
            π
          </div>
          <div
            className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold"
            style={{ backgroundColor: "#F59E0B", color: "#000" }}
          >
            Pro
          </div>
        </div>

        <h1 className="text-white font-bold text-lg leading-tight">Pi User</h1>
        <p className="text-purple-300 text-xs mt-0.5" dir="rtl">مستخدم Pi</p>

        <button
          onClick={handleCopy}
          className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg mx-auto transition-all"
          style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
          aria-label="Copy Pi address"
        >
          <span className="text-purple-200 text-xs font-mono">GDHX...K42P</span>
          {copied
            ? <CheckCircle size={11} className="text-green-400" />
            : <Copy size={11} className="text-purple-300" />}
        </button>

        <div
          className="inline-flex items-center gap-1.5 mt-3 px-3 py-1 rounded-full"
          style={{ backgroundColor: "rgba(245,158,11,0.18)", border: "1px solid rgba(245,158,11,0.35)" }}
        >
          <Crown size={11} style={{ color: "#F59E0B" }} />
          <span className="text-amber-400 text-[11px] font-semibold">PRO PLAN · π 9.99/mo</span>
        </div>

        <div
          className="absolute -right-8 -top-8 w-28 h-28 rounded-full"
          style={{ backgroundColor: "rgba(167,139,250,0.08)" }}
        />
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-2.5 mx-4 mt-4">
        {STATS.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl p-3.5 border"
            style={{ backgroundColor: "#0d1526", borderColor: "#1e293b" }}
          >
            <p className="text-white font-bold text-xl leading-none">{stat.value}</p>
            <p className="text-gray-400 text-xs mt-1 leading-tight">{stat.label}</p>
            <p className="text-gray-600 text-[10px] leading-tight" dir="rtl">{stat.labelAr}</p>
          </div>
        ))}
      </div>

      {/* Subscription card */}
      <div
        className="mx-4 mt-4 rounded-2xl p-4 border"
        style={{ backgroundColor: "#0d1526", borderColor: "rgba(245,158,11,0.4)", boxShadow: "0 0 20px rgba(245,158,11,0.08)" }}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Crown size={15} style={{ color: "#F59E0B" }} />
            <span className="text-white font-bold text-sm">Pro Plan Active</span>
          </div>
          <span
            className="text-[10px] font-bold px-2 py-0.5 rounded-full"
            style={{ backgroundColor: "rgba(34,197,94,0.15)", color: "#22c55e" }}
          >
            ACTIVE
          </span>
        </div>
        <div className="flex items-center justify-between text-xs mb-1">
          <span className="text-gray-500">Next renewal</span>
          <span className="text-gray-300">Apr 11, 2026</span>
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-500">Payment method</span>
          <span className="text-purple-400 font-semibold">π Pi Coin</span>
        </div>
        <PiPaymentButton variant="gold" className="mt-3" />
      </div>

      {/* Achievements */}
      <div className="mx-4 mt-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-white font-bold text-sm">Achievements</h2>
          <span className="text-gray-600 text-xs" dir="rtl">الإنجازات</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {ACHIEVEMENTS.map((ach) => {
            const Icon = ach.icon;
            return (
              <div
                key={ach.label}
                className="rounded-2xl p-3 flex flex-col items-center gap-1.5 border"
                style={{
                  backgroundColor: ach.earned ? "#0d1526" : "#070c18",
                  borderColor: ach.earned ? `${ach.color}35` : "#1e293b",
                  opacity: ach.earned ? 1 : 0.4,
                }}
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: ach.earned ? `${ach.color}18` : "#1e293b" }}
                >
                  <Icon size={15} style={{ color: ach.earned ? ach.color : "#334155" }} />
                </div>
                <p
                  className="text-[9px] text-center font-medium leading-tight"
                  style={{ color: ach.earned ? "#e2e8f0" : "#334155" }}
                >
                  {ach.label}
                </p>
                <p className="text-[8px] text-center leading-tight text-gray-600" dir="rtl">
                  {ach.labelAr}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* AI usage meter */}
      <div className="mx-4 mt-5">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-white font-bold text-sm">AI Usage This Month</h2>
          <span className="text-gray-600 text-xs" dir="rtl">استخدام AI</span>
        </div>
        <div
          className="rounded-2xl p-4 border"
          style={{ backgroundColor: "#0d1526", borderColor: "#1e293b" }}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-xs">Signals Consumed</span>
            <span className="text-white text-xs font-bold">47 / 100</span>
          </div>
          <div className="w-full h-2 rounded-full overflow-hidden" style={{ backgroundColor: "#1e293b" }}>
            <div
              className="h-full rounded-full"
              style={{ width: "47%", background: "linear-gradient(90deg, #4c1d95, #7C3AED)" }}
            />
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="text-gray-600 text-[10px]">53 remaining this month</span>
            <button className="text-purple-400 text-[10px] font-semibold">
              Upgrade
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
