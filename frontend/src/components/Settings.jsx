import React from "react";

export default function Settings({
  theme,
  setTheme,
  isDark,
  glassCard,
  textMuted,
}) {
  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-display font-extrabold mb-6">Settings</h1>
      <div className={`${glassCard} p-6 rounded-3xl`}>
        <h3 className="text-lg font-bold mb-4 font-display">Appearance</h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Theme Preference</p>
            <p className={`text-sm ${textMuted}`}>
              Switch between Light and Deep Space mode.
            </p>
          </div>
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="px-5 py-2.5 bg-indigo-500 text-white font-medium rounded-xl hover:bg-indigo-600 transition-colors shadow-md"
          >
            {theme === "dark"
              ? "Switch to Clean Canvas"
              : "Switch to Deep Space"}
          </button>
        </div>
      </div>
    </div>
  );
}
