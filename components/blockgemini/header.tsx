"use client";

import { Settings, Menu } from "lucide-react";

interface HeaderProps {
  onMenuClick: () => void;
  onSettingsClick: () => void;
}

export function Header({ onMenuClick, onSettingsClick }: HeaderProps) {
  return (
    <header
      className="sticky top-0 z-40 flex items-center justify-between px-4 h-14"
      style={{ backgroundColor: "#7C3AED" }}
    >
      <button
        onClick={onMenuClick}
        className="flex items-center justify-center w-10 h-10 rounded-xl text-white transition-colors"
        style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
        aria-label="Open menu"
      >
        <Menu size={20} />
      </button>

      <div className="flex flex-col items-center">
        <span className="text-white font-bold text-lg leading-tight tracking-tight">
          🔮 blockgemini
        </span>
        <span className="text-purple-200 text-[10px] leading-none tracking-wider">
          blockgemini.pi
        </span>
      </div>

      <button
        onClick={onSettingsClick}
        className="flex items-center justify-center w-10 h-10 rounded-xl text-white transition-colors"
        style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
        aria-label="Open settings"
      >
        <Settings size={18} />
      </button>
    </header>
  );
}
