"use client";

import { useState } from "react";
import {
  X, Globe, DollarSign, Bell, Info, ChevronRight,
  Shield, Palette, Smartphone, Star, ChevronDown,
} from "lucide-react";

interface SettingsPageProps {
  onClose: () => void;
}

function Toggle({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={onChange}
      className="w-11 h-6 rounded-full relative transition-colors flex-shrink-0"
      style={{ backgroundColor: checked ? "#7C3AED" : "#1e293b" }}
    >
      <span
        className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform"
        style={{ transform: checked ? "translateX(22px)" : "translateX(2px)" }}
      />
    </button>
  );
}

function SectionLabel({ en, ar }: { en: string; ar: string }) {
  return (
    <p className="text-gray-600 text-[10px] uppercase tracking-widest px-4 mb-1 mt-4 flex items-center justify-between">
      <span>{en}</span>
      <span dir="rtl">{ar}</span>
    </p>
  );
}

function SettingRow({
  icon: Icon,
  label,
  labelAr,
  iconColor = "#7C3AED",
  value,
  onClick,
  children,
}: {
  icon: typeof Globe;
  label: string;
  labelAr: string;
  iconColor?: string;
  value?: string;
  onClick?: () => void;
  children?: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 px-4 py-3.5 border-b transition-colors text-left"
      style={{ borderColor: "#0d1526" }}
    >
      <div
        className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: `${iconColor}18` }}
      >
        <Icon size={15} style={{ color: iconColor }} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-white text-sm font-medium leading-tight">{label}</p>
        <p className="text-gray-600 text-[10px] leading-tight" dir="rtl">{labelAr}</p>
      </div>
      {children ?? (
        <div className="flex items-center gap-1.5 flex-shrink-0">
          {value && <span className="text-gray-500 text-xs">{value}</span>}
          <ChevronRight size={13} className="text-gray-600" />
        </div>
      )}
    </button>
  );
}

function Picker({ items, selected, onSelect, color }: {
  items: string[];
  selected: string;
  onSelect: (v: string) => void;
  color: string;
}) {
  return (
    <div className="border-b" style={{ backgroundColor: "#07060f", borderColor: "#0d1526" }}>
      {items.map((item) => (
        <button
          key={item}
          onClick={() => onSelect(item)}
          className="w-full flex items-center justify-between px-8 py-2.5"
        >
          <span className="text-gray-300 text-sm">{item}</span>
          {selected === item && (
            <div className="w-4 h-4 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
          )}
        </button>
      ))}
    </div>
  );
}

const THEMES = ["Dark (Default)", "OLED Black", "Purple Night"];
const LANGUAGES = ["English", "العربية (Arabic)"];
const CURRENCIES = ["USD ($)", "EUR (€)", "GBP (£)", "SAR (ر.س)", "AED (د.إ)"];

export function SettingsPage({ onClose }: SettingsPageProps) {
  const [notifications, setNotifications] = useState(true);
  const [priceAlerts, setPriceAlerts] = useState(true);
  const [signalAlerts, setSignalAlerts] = useState(true);
  const [biometric, setBiometric] = useState(false);

  const [selectedTheme, setSelectedTheme] = useState("Dark (Default)");
  const [selectedLang, setSelectedLang] = useState("English");
  const [selectedCurrency, setSelectedCurrency] = useState("USD ($)");

  const [showTheme, setShowTheme] = useState(false);
  const [showLang, setShowLang] = useState(false);
  const [showCurrency, setShowCurrency] = useState(false);

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col"
      style={{ backgroundColor: "#030712", maxWidth: "430px", margin: "0 auto" }}
    >
      {/* Header */}
      <header
        className="flex items-center justify-between px-4 h-14 flex-shrink-0"
        style={{ backgroundColor: "#7C3AED" }}
      >
        <div>
          <p className="text-white font-bold text-base leading-tight">Settings</p>
          <p className="text-purple-200 text-[10px] leading-none" dir="rtl">الإعدادات</p>
        </div>
        <button
          onClick={onClose}
          className="w-9 h-9 flex items-center justify-center rounded-xl text-white transition-colors"
          style={{ backgroundColor: "rgba(255,255,255,0.15)" }}
          aria-label="Close settings"
        >
          <X size={18} />
        </button>
      </header>

      <div className="flex-1 overflow-y-auto">
        {/* Appearance */}
        <SectionLabel en="Appearance" ar="المظهر" />
        <div style={{ backgroundColor: "#0d1526" }}>
          <SettingRow
            icon={Palette}
            label="Theme"
            labelAr="الثيم"
            value={selectedTheme.split(" ")[0]}
            iconColor="#7C3AED"
            onClick={() => { setShowTheme(!showTheme); setShowLang(false); setShowCurrency(false); }}
          >
            <div className="flex items-center gap-1 flex-shrink-0">
              <span className="text-gray-500 text-xs">{selectedTheme.split(" ")[0]}</span>
              <ChevronDown size={12} className="text-gray-600" style={{ transform: showTheme ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
            </div>
          </SettingRow>
          {showTheme && <Picker items={THEMES} selected={selectedTheme} onSelect={(v) => { setSelectedTheme(v); setShowTheme(false); }} color="#7C3AED" />}

          <SettingRow
            icon={Globe}
            label="Language"
            labelAr="اللغة"
            iconColor="#22c55e"
            onClick={() => { setShowLang(!showLang); setShowTheme(false); setShowCurrency(false); }}
          >
            <div className="flex items-center gap-1 flex-shrink-0">
              <span className="text-gray-500 text-xs">{selectedLang === "English" ? "EN" : "AR"}</span>
              <ChevronDown size={12} className="text-gray-600" style={{ transform: showLang ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
            </div>
          </SettingRow>
          {showLang && <Picker items={LANGUAGES} selected={selectedLang} onSelect={(v) => { setSelectedLang(v); setShowLang(false); }} color="#22c55e" />}

          <SettingRow
            icon={DollarSign}
            label="Currency"
            labelAr="العملة"
            iconColor="#F59E0B"
            onClick={() => { setShowCurrency(!showCurrency); setShowTheme(false); setShowLang(false); }}
          >
            <div className="flex items-center gap-1 flex-shrink-0">
              <span className="text-gray-500 text-xs">{selectedCurrency.split(" ")[0]}</span>
              <ChevronDown size={12} className="text-gray-600" style={{ transform: showCurrency ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
            </div>
          </SettingRow>
          {showCurrency && <Picker items={CURRENCIES} selected={selectedCurrency} onSelect={(v) => { setSelectedCurrency(v); setShowCurrency(false); }} color="#F59E0B" />}
        </div>

        {/* Notifications */}
        <SectionLabel en="Notifications" ar="الإشعارات" />
        <div style={{ backgroundColor: "#0d1526" }}>
          <SettingRow icon={Bell} label="Push Notifications" labelAr="الإشعارات الفورية" iconColor="#7C3AED">
            <Toggle checked={notifications} onChange={() => setNotifications(!notifications)} />
          </SettingRow>
          <SettingRow icon={Bell} label="Price Alerts" labelAr="تنبيهات الأسعار" iconColor="#F59E0B">
            <Toggle checked={priceAlerts} onChange={() => setPriceAlerts(!priceAlerts)} />
          </SettingRow>
          <SettingRow icon={Bell} label="AI Signal Alerts" labelAr="تنبيهات إشارات AI" iconColor="#22c55e">
            <Toggle checked={signalAlerts} onChange={() => setSignalAlerts(!signalAlerts)} />
          </SettingRow>
        </div>

        {/* Security */}
        <SectionLabel en="Security" ar="الأمان" />
        <div style={{ backgroundColor: "#0d1526" }}>
          <SettingRow icon={Shield} label="Biometric Auth" labelAr="المصادقة البيومترية" iconColor="#22c55e">
            <Toggle checked={biometric} onChange={() => setBiometric(!biometric)} />
          </SettingRow>
          <SettingRow icon={Smartphone} label="Connected Devices" labelAr="الأجهزة المتصلة" value="1 device" iconColor="#38bdf8" />
        </div>

        {/* About */}
        <SectionLabel en="About" ar="حول التطبيق" />
        <div style={{ backgroundColor: "#0d1526" }}>
          <SettingRow icon={Info} label="About blockgemini" labelAr="حول blockgemini" iconColor="#7C3AED" />
          <SettingRow icon={Star} label="Rate the App" labelAr="قيّم التطبيق" iconColor="#F59E0B" />
          <SettingRow icon={Shield} label="Privacy Policy" labelAr="سياسة الخصوصية" iconColor="#94a3b8" />
        </div>

        {/* Version */}
        <div className="px-4 py-6 text-center">
          <p className="text-gray-700 text-xs">blockgemini v1.0.0</p>
          <p className="text-gray-800 text-[10px] mt-1">Powered by Pi Network · AI by blockgemini</p>
          <p className="text-gray-800 text-[10px] mt-0.5" dir="rtl">مدعوم بشبكة Pi</p>
        </div>
      </div>
    </div>
  );
}
