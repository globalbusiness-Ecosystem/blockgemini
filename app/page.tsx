"use client";

import { useState } from "react";
import { Header } from "@/components/blockgemini/header";
import { Ticker } from "@/components/blockgemini/ticker";
import { Sidebar } from "@/components/blockgemini/sidebar";
import { BottomNav } from "@/components/blockgemini/bottom-nav";
import { HomeTab } from "@/components/blockgemini/home-tab";
import { MarketsTab } from "@/components/blockgemini/markets-tab";
import { GemsTab } from "@/components/blockgemini/gems-tab";
import { PortfolioTab } from "@/components/blockgemini/portfolio-tab";
import { ProfileTab } from "@/components/blockgemini/profile-tab";
import { SettingsPage } from "@/components/blockgemini/settings-page";

type Tab = "home" | "markets" | "gems" | "portfolio" | "profile";

export default function BlockgeminiApp() {
  const [activeTab, setActiveTab] = useState<Tab>("home");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  function renderTab() {
    switch (activeTab) {
      case "home":      return <HomeTab />;
      case "markets":   return <MarketsTab />;
      case "gems":      return <GemsTab />;
      case "portfolio": return <PortfolioTab />;
      case "profile":   return <ProfileTab />;
    }
  }

  return (
    <div
      className="relative flex flex-col"
      style={{
        backgroundColor: "#030712",
        minHeight: "100dvh",
        maxWidth: "430px",
        margin: "0 auto",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Fixed header stack */}
      <div className="sticky top-0 z-30">
        <Header
          onMenuClick={() => setSidebarOpen(true)}
          onSettingsClick={() => setSettingsOpen(true)}
        />
        <Ticker />
      </div>

      {/* Scrollable content */}
      <main
        className="flex-1 overflow-y-auto"
        style={{ paddingBottom: "80px" }}
        id="main-content"
      >
        {renderTab()}
      </main>

      {/* Fixed bottom nav */}
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Overlays */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onNavigate={(tab) => { setActiveTab(tab as Tab); setSidebarOpen(false); }}
        activeTab={activeTab}
      />

      {settingsOpen && (
        <SettingsPage onClose={() => setSettingsOpen(false)} />
      )}
    </div>
  );
}
