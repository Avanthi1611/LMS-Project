// src/components/Navbar.jsx
import React from "react";
import { Search, Bell } from "lucide-react";

export default function Navbar({
  currentUser,
  role,
  isDark,
  glassCard,
  textMuted,
}) {
  return (
    <header
      className={`${glassCard} h-20 rounded-3xl flex items-center justify-between px-8 z-0 mb-4`}
    >
      <div className="flex-1">
        <div className="relative w-96 hidden lg:block">
          <input
            type="text"
            placeholder="Search courses, resources..."
            className={`w-full pl-10 pr-4 py-2.5 rounded-full outline-none transition-all ${
              isDark
                ? "bg-slate-900/50 text-white placeholder-slate-500 border border-slate-700"
                : "bg-slate-100 text-slate-900 placeholder-slate-400 border border-slate-200"
            } focus:ring-2 focus:ring-indigo-500`}
          />
          <Search
            size={18}
            className={`absolute left-4 top-3 ${textMuted}`}
            strokeWidth={2}
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button
          className={`${textMuted} hover:text-indigo-500 transition-colors relative`}
        >
          <Bell size={22} strokeWidth={2} />
          <span className="absolute -top-1 -right-1 bg-red-500 w-2.5 h-2.5 rounded-full border-2 border-transparent"></span>
        </button>
        <div
          className={`flex items-center gap-3 border-l pl-6 cursor-pointer ${
            isDark ? "border-slate-700" : "border-slate-200"
          }`}
        >
          <div className="text-right hidden sm:block">
            {/* Added optional chaining (?) just to be safe if currentUser loads slightly slow */}
            <p className="text-sm font-bold">{currentUser?.name}</p>
            <p className="text-xs text-indigo-500 font-semibold uppercase">
              {role}
            </p>
          </div>
          <div className="w-10 h-10 rounded-full bg-indigo-100 border border-indigo-200 flex items-center justify-center overflow-hidden shadow-sm">
            <img
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${
                currentUser?.name || "User"
              }`}
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
