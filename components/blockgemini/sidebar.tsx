"use client";

import { X, Home, TrendingUp, Gem, Briefcase, User, Bell, Star, Shield, BookOpen, HelpCircle, LogOut } from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (tab: string) => void;
  activeTab: string;
}

const NAV_ITEMS = [
  { icon: Home, label: "Home", labelAr: "الرئيسية", tab: "home" },
  { icon: TrendingUp, label: "Markets", labelAr: "الأسواق", tab: "markets" },
  { icon: Gem, label: "AI Gems", labelAr: "جواهر AI", tab: "gems", badge: "HOT" },
  { icon: Briefcase, label: "Portfolio", labelAr: "المحفظة", tab: "portfolio" },
  { icon: User, label: "Profile", labelAr: "الملف الشخصي", tab: "profile" },
];

const EXTRA_ITEMS = [
  { icon: Bell, label: "Notifications", labelAr: "الإشعارات" },
  { icon: Star, label: "Watchlist", labelAr: "قائمة المراقبة" },
  { icon: Shield, label: "Security", labelAr: "الأمان" },
  { icon: BookOpen, label: "Learn Crypto", labelAr: "تعلم العملات" },
  { icon: HelpCircle, label: "Help & Support", labelAr: "المساعدة والدعم" },
];

export function Sidebar({ isOpen, onClose, onNavigate, activeTab }: SidebarProps) {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 sidebar-overlay"
          style={{ backgroundColor: "rgba(0,0,0,0.75)" }}
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className="fixed top-0 left-0 z-50 h-full w-72 flex flex-col transition-transform duration-300 ease-in-out"
        style={{
          backgroundColor: "#07060f",
          borderRight: "1px solid #1e1b4b",
          transform: isOpen ? "translateX(0)" : "translateX(-100%)",
        }}
        aria-label="Navigation sidebar"
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-5 h-14 flex-shrink-0"
          style={{ backgroundColor: "#7C3AED" }}
        >
          <div className="flex flex-col">
            <span className="text-white font-bold text-base leading-tight">🔮 blockgemini</span>
            <span className="text-purple-200 text-[10px]">blockgemini.pi</span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-white transition-colors"
            style={{ backgroundColor: "rgba(255,255,255,0.15)" }}
            aria-label="Close sidebar"
          >
            <X size={16} />
          </button>
        </div>

        {/* User info */}
        <div className="px-4 pt-4 pb-2">
          <div
            className="rounded-2xl p-3 flex items-center gap-3"
            style={{ backgroundColor: "#1e1b4b" }}
          >
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-base flex-shrink-0"
              style={{ backgroundColor: "#7C3AED" }}
            >
              π
            </div>
            <div className="min-w-0">
              <p className="text-white text-sm font-semibold truncate">Pi User</p>
              <p className="text-purple-300 text-[11px]">π 1,240.50 balance</p>
            </div>
            <div
              className="ml-auto flex-shrink-0 px-2 py-0.5 rounded-full text-[9px] font-bold"
              style={{ backgroundColor: "#F59E0B", color: "#000" }}
            >
              PRO
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 overflow-y-auto py-2">
          <p className="text-gray-600 text-[10px] uppercase tracking-widest mb-1.5 px-2">
            Navigation · التنقل
          </p>
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.tab;
            return (
              <button
                key={item.tab}
                onClick={() => { onNavigate(item.tab); onClose(); }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl mb-0.5 transition-all text-left"
                style={{
                  backgroundColor: isActive ? "#7C3AED" : "transparent",
                  color: isActive ? "#fff" : "#94a3b8",
                }}
              >
                <Icon size={17} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{item.label}</p>
                  <p className="text-[10px] opacity-60" dir="rtl">{item.labelAr}</p>
                </div>
                {item.badge && (
                  <span
                    className="text-[9px] font-bold px-1.5 py-0.5 rounded flex-shrink-0"
                    style={{ backgroundColor: "#F59E0B", color: "#000" }}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          <p className="text-gray-600 text-[10px] uppercase tracking-widest mb-1.5 mt-4 px-2">
            More · المزيد
          </p>
          {EXTRA_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl mb-0.5 text-gray-500 hover:text-gray-300 transition-all text-left"
              >
                <Icon size={16} />
                <div>
                  <p className="text-sm">{item.label}</p>
                  <p className="text-[10px] opacity-60" dir="rtl">{item.labelAr}</p>
                </div>
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div
          className="px-4 py-4 flex-shrink-0"
          style={{ borderTop: "1px solid #1e1b4b" }}
        >
          <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-gray-600 hover:text-red-400 transition-colors">
            <LogOut size={15} />
            <span className="text-sm">Sign Out · تسجيل الخروج</span>
          </button>
          <p className="text-gray-700 text-[10px] text-center mt-2">
            Powered by Pi Network · v1.0.0
          </p>
        </div>
      </aside>
    </>
  );
}
