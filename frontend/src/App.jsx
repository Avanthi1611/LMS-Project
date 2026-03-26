import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  BookOpen,
  Users,
  Settings as SettingsIcon,
  LogOut,
  Search,
  Bell,
  Trophy,
  Award,
  Star,
  ChevronRight,
} from "lucide-react";

// Custom Ascend Brand Logo (The Upward Monolith)
const AscendLogo = ({ className }) => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Left Shorter Bar */}
    <rect x="6" y="16" width="6" height="12" rx="2" fill="currentColor" />
    {/* Right Taller Bar */}
    <rect x="16" y="8" width="6" height="20" rx="2" fill="currentColor" />
    {/* Spark of Knowledge Diamond */}
    <path d="M14 2L18 6L14 10L10 6L14 2Z" fill="#FACC15" />
  </svg>
);

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("STUDENT");
  const [theme, setTheme] = useState("light"); // Defaults to Light Mode Canvas
  const [activeTab, setActiveTab] = useState("dashboard");

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Courses
  useEffect(() => {
    if (isLoggedIn) {
      fetch("http://localhost:3000/api/courses")
        .then((res) => res.json())
        .then((data) => {
          setCourses(data);
          setLoading(false);
        })
        .catch((err) => console.error("Database fetch error:", err));
    }
  }, [isLoggedIn]);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoggedIn(true);
  };

  // --- Glassmorphism & Theme Variables ---
  const isDark = theme === "dark";
  const bgApp = isDark
    ? "bg-slate-900 text-white"
    : "bg-slate-50 text-slate-900";
  const glassCard = isDark
    ? "bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 shadow-lg"
    : "bg-white/70 backdrop-blur-md border border-slate-200/80 shadow-sm";
  const textMuted = isDark ? "text-slate-400" : "text-slate-500";
  const glassHover = isDark ? "hover:bg-slate-700/50" : "hover:bg-white/90";

  // ==========================================
  // DASHBOARD VIEW (Logged In)
  // ==========================================
  if (isLoggedIn) {
    return (
      <div
        className={`flex h-screen w-full transition-colors duration-500 ${bgApp}`}
      >
        {/* LEFT SIDEBAR */}
        <aside
          className={`w-64 flex flex-col hidden md:flex z-10 ${glassCard} m-4 rounded-3xl`}
        >
          {/* BRAND LOGO */}
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

        {/* MAIN CONTENT WRAPPER */}
        <div className="flex-1 flex flex-col overflow-hidden py-4 pr-4">
          {/* TOP NAVBAR */}
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
                  <p className="text-sm font-bold">Avanthi</p>
                  <p className="text-xs text-indigo-500 font-semibold uppercase">
                    {role}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full bg-indigo-100 border border-indigo-200 flex items-center justify-center overflow-hidden shadow-sm">
                  <img
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=Avanthi"
                    alt="Avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </header>

          {/* DYNAMIC TAB CONTENT */}
          <main className="flex-1 overflow-y-auto px-2">
            {/* SETTINGS TAB */}
            {activeTab === "settings" && (
              <div className="max-w-2xl">
                <h1 className="text-3xl font-display font-extrabold mb-6">
                  Settings
                </h1>
                <div className={`${glassCard} p-6 rounded-3xl`}>
                  <h3 className="text-lg font-bold mb-4 font-display">
                    Appearance
                  </h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Theme Preference</p>
                      <p className={`text-sm ${textMuted}`}>
                        Switch between Light and Deep Space mode.
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        setTheme(theme === "dark" ? "light" : "dark")
                      }
                      className="px-5 py-2.5 bg-indigo-500 text-white font-medium rounded-xl hover:bg-indigo-600 transition-colors shadow-md"
                    >
                      {theme === "dark"
                        ? "Switch to Clean Canvas"
                        : "Switch to Deep Space"}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* DASHBOARD TAB */}
            {activeTab === "dashboard" && (
              <>
                {/* THE HERO BANNER & TROPHY CASE */}
                <div className="bg-gradient-to-r from-indigo-500 to-indigo-700 rounded-3xl p-8 text-white flex justify-between items-center mb-8 shadow-lg relative overflow-hidden">
                  {/* Abstract background shape */}
                  <div className="absolute -right-10 -top-20 opacity-10">
                    <AscendLogo className="w-96 h-96" />
                  </div>

                  <div className="relative z-10">
                    <h1 className="text-3xl sm:text-4xl font-display font-extrabold mb-3">
                      Welcome back, Avanthi!
                    </h1>
                    <p className="text-indigo-100 mb-5 font-medium">
                      Your current rank is Top 15% in Winter Semester 2025-26.
                    </p>

                    {/* Trophy Case */}
                    <div className="flex flex-wrap gap-3">
                      <span className="flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-sm font-bold border border-white/20 shadow-sm">
                        <Trophy
                          size={16}
                          className="text-yellow-400"
                          strokeWidth={2.5}
                        />{" "}
                        Early Adopter
                      </span>
                      <span className="flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-sm font-bold border border-white/20 shadow-sm">
                        <Award
                          size={16}
                          className="text-blue-300"
                          strokeWidth={2.5}
                        />{" "}
                        Subject Mentor
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* LEFT: Course Grid */}
                  <div className="col-span-2 space-y-6">
                    <h2
                      className={`text-2xl font-display font-extrabold border-b pb-2 ${
                        isDark ? "border-slate-700" : "border-slate-200"
                      }`}
                    >
                      Active Enrollments
                    </h2>

                    {loading ? (
                      <div className="flex justify-center p-10">
                        <span className="animate-spin text-indigo-500">
                          <SettingsIcon size={32} />
                        </span>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {courses.map((course) => (
                          <div
                            key={course.id}
                            className={`${glassCard} rounded-3xl p-6 flex flex-col h-full hover:-translate-y-1 transition-transform duration-300`}
                          >
                            <div className="flex justify-between items-start mb-4">
                              <span
                                className={`text-xs font-bold px-3 py-1 rounded-md uppercase tracking-wider ${
                                  isDark
                                    ? "bg-indigo-500/20 text-indigo-400"
                                    : "bg-indigo-50 text-indigo-700"
                                }`}
                              >
                                {course.courseCode}
                              </span>
                            </div>
                            <h3 className="text-xl font-display font-bold mb-2">
                              {course.name}
                            </h3>
                            <p className={`text-sm ${textMuted} mb-6 flex-1`}>
                              Instructor:{" "}
                              {course.instructor?.name || "Dr. Aruna Smith"}
                            </p>

                            {/* Progress Bar */}
                            <div className="mb-6">
                              <div className="flex justify-between text-xs mb-2 font-bold">
                                <span>Progress</span>
                                <span className="text-indigo-500">35%</span>
                              </div>
                              <div
                                className={`w-full rounded-full h-2 ${
                                  isDark ? "bg-slate-700" : "bg-slate-100"
                                }`}
                              >
                                <div
                                  className="bg-indigo-500 h-2 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.5)]"
                                  style={{ width: "35%" }}
                                ></div>
                              </div>
                            </div>

                            <button
                              className={`w-full py-3 font-bold rounded-xl transition-colors flex justify-center items-center gap-2 ${
                                isDark
                                  ? "bg-slate-700 text-white hover:bg-indigo-500"
                                  : "bg-slate-100 text-slate-900 hover:bg-indigo-500 hover:text-white"
                              }`}
                            >
                              Enter Course{" "}
                              <ChevronRight size={18} strokeWidth={2.5} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* RIGHT: Trending Hub Sidebar */}
                  <div className="space-y-4">
                    <h2
                      className={`text-2xl font-display font-extrabold border-b pb-2 ${
                        isDark ? "border-slate-700" : "border-slate-200"
                      }`}
                    >
                      Trending in Peer Hub
                    </h2>

                    <div
                      className={`${glassCard} rounded-3xl p-5 cursor-pointer hover:border-indigo-500 transition-colors`}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <span
                          className={`text-xs font-bold uppercase tracking-wider ${textMuted}`}
                        >
                          CS301
                        </span>
                        <span className="flex items-center gap-1 text-xs font-bold text-green-500 bg-green-500/10 px-2.5 py-1 rounded-md">
                          <Star size={14} fill="currentColor" /> 42
                        </span>
                      </div>
                      <h4 className="font-bold mb-2 leading-tight">
                        Preemptive SJF & Priority Scheduling C Code
                      </h4>
                      <p className={`text-xs ${textMuted}`}>
                        Uploaded by Rahul V.
                      </p>
                    </div>

                    <div
                      className={`${glassCard} rounded-3xl p-5 cursor-pointer hover:border-indigo-500 transition-colors`}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <span
                          className={`text-xs font-bold uppercase tracking-wider ${textMuted}`}
                        >
                          CS301
                        </span>
                        <span className="flex items-center gap-1 text-xs font-bold text-green-500 bg-green-500/10 px-2.5 py-1 rounded-md">
                          <Star size={14} fill="currentColor" /> 28
                        </span>
                      </div>
                      <h4 className="font-bold mb-2 leading-tight">
                        Round Robin Edge Cases Explained
                      </h4>
                      <p className={`text-xs ${textMuted}`}>
                        Uploaded by Avanthi
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </main>
        </div>
      </div>
    );
  }

  // ==========================================
  // LOGIN VIEW (Clean Canvas Default)
  // ==========================================
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4 font-sans text-slate-900">
      <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white/70 backdrop-blur-md border border-slate-200/80 rounded-3xl shadow-xl overflow-hidden">
        {/* Left Side: Brand & Illustration */}
        <div className="hidden md:flex flex-col justify-center items-center w-1/2 p-12 bg-white/40">
          <div className="flex items-center gap-3 mb-10">
            <div className="text-indigo-500">
              <AscendLogo className="w-10 h-10" />
            </div>
            <span className="text-3xl font-display font-extrabold tracking-tight">
              Ascend
            </span>
          </div>
          <img
            src="https://illustrations.popsy.co/amber/student-going-to-school.svg"
            alt="Student Illustration"
            className="w-4/5 mb-8"
          />
          <p className="text-indigo-600 text-center mt-2 font-medium italic">
            "We rise by lifting others." <br />
            <span className="text-sm not-italic font-bold text-slate-500">
              — Robert Ingersoll
            </span>
          </p>
        </div>

        {/* Right Side: The Form */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-white/80">
          <div className="flex justify-center mb-8">
            <div className="bg-slate-100 p-1 rounded-full flex shadow-inner border border-slate-200">
              <button
                onClick={() => setRole("STUDENT")}
                className={`px-8 py-2 rounded-full font-bold text-sm transition-all duration-300 ${
                  role === "STUDENT"
                    ? "bg-indigo-500 text-white shadow-md"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                Student
              </button>
              <button
                onClick={() => setRole("INSTRUCTOR")}
                className={`px-8 py-2 rounded-full font-bold text-sm transition-all duration-300 ${
                  role === "INSTRUCTOR"
                    ? "bg-indigo-500 text-white shadow-md"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                Instructor
              </button>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <input
                type="email"
                placeholder="Email"
                className="w-full px-5 py-4 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all bg-slate-50 font-medium"
                required
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                className="w-full px-5 py-4 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all bg-slate-50 font-medium"
                required
              />
              <div className="text-right mt-3">
                <a
                  href="#"
                  className="text-sm font-bold text-indigo-500 hover:text-indigo-700 transition-colors"
                >
                  Forgot Password?
                </a>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-4 rounded-2xl transition-all shadow-lg hover:shadow-indigo-500/30 transform hover:-translate-y-0.5 mt-4"
            >
              Log In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
