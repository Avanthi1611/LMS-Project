// src/components/Sidebar.jsx
import React from "react";
import {
  LayoutDashboard,
  BookOpen,
  Users,
  Settings as SettingsIcon,
  LogOut,
} from "lucide-react";
import AscendLogo from "./AscendLogo";

export default function Sidebar({
  activeTab,
  setActiveTab,
  setIsLoggedIn,
  isDark,
  glassCard,
  textMuted,
  glassHover,
}) {
  return (
    <aside
      className={`w-64 flex flex-col hidden md:flex z-10 ${glassCard} m-4 rounded-3xl`}
    >
      <div
        className={`p-6 flex items-center gap-3 border-b ${
          isDark ? "border-slate-700/50" : "border-slate-200/80"
        }`}
      >
        <div className="text-indigo-500">
          <AscendLogo />
        </div>
        <span className="text-2xl font-extrabold tracking-tight font-display">
          Ascend
        </span>
      </div>

      <nav className="flex-1 p-4 space-y-2 font-medium">
        <button
          onClick={() => setActiveTab("dashboard")}
          className={`w-full flex items-center gap-3 p-3 rounded-xl transition-colors ${
            activeTab === "dashboard"
              ? "bg-indigo-500/10 text-indigo-500"
              : `${textMuted} ${glassHover}`
          }`}
        >
          <LayoutDashboard size={20} strokeWidth={2} /> Dashboard
        </button>
        <button
          onClick={() => setActiveTab("courses")}
          className={`w-full flex items-center gap-3 p-3 rounded-xl transition-colors ${
            activeTab === "courses"
              ? "bg-indigo-500/10 text-indigo-500"
              : `${textMuted} ${glassHover}`
          }`}
        >
          <BookOpen size={20} strokeWidth={2} /> My Courses
        </button>
        <button
          onClick={() => setActiveTab("peerhub")}
          className={`w-full flex items-center gap-3 p-3 rounded-xl transition-colors ${
            activeTab === "peerhub"
              ? "bg-indigo-500/10 text-indigo-500"
              : `${textMuted} ${glassHover}`
          }`}
        >
          <Users size={20} strokeWidth={2} /> Peer Hub
        </button>
        <button
          onClick={() => setActiveTab("settings")}
          className={`w-full flex items-center gap-3 p-3 rounded-xl transition-colors ${
            activeTab === "settings"
              ? "bg-indigo-500/10 text-indigo-500"
              : `${textMuted} ${glassHover}`
          }`}
        >
          <SettingsIcon size={20} strokeWidth={2} /> Settings
        </button>
      </nav>

      <div
        className={`p-4 border-t ${
          isDark ? "border-slate-700/50" : "border-slate-200/80"
        }`}
      >
        <button
          onClick={() => setIsLoggedIn(false)}
          className={`flex items-center gap-3 p-3 w-full rounded-xl text-red-500 ${
            isDark ? "hover:bg-red-500/10" : "hover:bg-red-50"
          } transition-colors font-medium`}
        >
          <LogOut size={20} strokeWidth={2} /> Log Out
        </button>
      </div>
    </aside>
  );
}
