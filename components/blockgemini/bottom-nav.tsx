"use client";

import { Home, TrendingUp, Gem, Briefcase, User } from "lucide-react";

type Tab = "home" | "markets" | "gems" | "portfolio" | "profile";

interface BottomNavProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

const TABS = [
  { id: "home" as Tab, icon: Home, label: "Home", labelAr: "الرئيسية", isGold: false },
  { id: "markets" as Tab, icon: TrendingUp, label: "Markets", labelAr: "الأسواق", isGold: false },
  { id: "gems" as Tab, icon: Gem, label: "AI Gems", labelAr: "جواهر", isGold: true },
  { id: "portfolio" as Tab, icon: Briefcase, label: "Portfolio", labelAr: "المحفظة", isGold: false },
  { id: "profile" as Tab, icon: User, label: "Profile", labelAr: "الملف", isGold: false },
];

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 flex items-end border-t"
      style={{
        backgroundColor: "#07060f",
        borderColor: "#1e1b4b",
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
        maxWidth: "430px",
        margin: "0 auto",
      }}
      aria-label="Main navigation"
    >
      {TABS.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        const activeColor = tab.isGold ? "#F59E0B" : "#7C3AED";
        const inactiveColor = "#475569";

        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className="flex-1 flex flex-col items-center justify-end pb-2 pt-1 gap-0.5 transition-all active:scale-90"
            aria-label={tab.label}
            aria-current={isActive ? "page" : undefined}
          >
            {tab.isGold ? (
              <div
                className="w-11 h-11 rounded-2xl flex items-center justify-center -mt-5 mb-0.5 border-2 transition-all"
                style={{
                  backgroundColor: isActive ? "#F59E0B" : "#451a03",
                  borderColor: isActive ? "#fbbf24" : "#78350f",
                  boxShadow: isActive ? "0 0 18px rgba(245,158,11,0.5)" : "0 0 8px rgba(245,158,11,0.1)",
                }}
              >
                <Icon size={20} style={{ color: isActive ? "#000" : "#F59E0B" }} />
              </div>
            ) : (
              <div className="relative flex items-center justify-center w-6 h-6">
                <Icon
                  size={20}
                  style={{ color: isActive ? activeColor : inactiveColor }}
                />
                {isActive && (
                  <span
                    className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                    style={{ backgroundColor: activeColor }}
                  />
                )}
              </div>
            )}

            <span
              className="text-[9px] font-semibold leading-none"
              style={{ color: isActive ? activeColor : inactiveColor }}
            >
              {tab.label}
            </span>
            <span
              className="text-[8px] leading-none"
              style={{ color: isActive ? `${activeColor}70` : "#1e293b" }}
              dir="rtl"
            >
              {tab.labelAr}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
