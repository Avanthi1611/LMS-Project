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
  GraduationCap,
  MessageSquare,
  Share2,
  Flag,
  ArrowBigUp,
  ArrowBigDown,
  Edit3,
  X,
  UploadCloud,
  Link as LinkIcon,
  FileText,
  Image as ImageIcon,
  Bold,
  Italic,
  Strikethrough,
  Link2,
  Code,
  Quote,
  List,
  ListOrdered,
} from "lucide-react";

// Custom Ascend Brand Logo
const AscendLogo = ({ className }) => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <rect x="6" y="16" width="6" height="12" rx="2" fill="currentColor" />
    <rect x="16" y="8" width="6" height="20" rx="2" fill="currentColor" />
    <path d="M14 2L18 6L14 10L10 6L14 2Z" fill="#FACC15" />
  </svg>
);

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("STUDENT");
  const [theme, setTheme] = useState("light");
  const [activeTab, setActiveTab] = useState("dashboard");

  // Real Database State
  const [courses, setCourses] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  // Modal & Peer Hub State
  const [activeCourseFilter, setActiveCourseFilter] = useState("ALL");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postTypeTab, setPostTypeTab] = useState("TEXT");
  const [postContent, setPostContent] = useState("");

  // Fetch Courses (Strict Error Handling)
  useEffect(() => {
    if (isLoggedIn) {
      setLoading(true);
      // NOTE: Ensure this URL matches your CodeSandbox backend URL perfectly!
      fetch("https://mtrkyf-3000.csb.app/api/courses")
        .then((res) => {
          if (!res.ok) throw new Error(`HTTP Error! Status: ${res.status}`);
          return res.json();
        })
        .then((data) => {
          setCourses(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Course fetch error:", err);
          setErrorMsg("Failed to load courses. Is the backend running?");
          setLoading(false);
        });
    }
  }, [isLoggedIn]);

  // Fetch Posts (Strict Error Handling)
  useEffect(() => {
    if (isLoggedIn) {
      fetch("https://mtrkyf-3000.csb.app/api/posts")
        .then((res) => {
          if (!res.ok) throw new Error(`HTTP Error! Status: ${res.status}`);
          return res.json();
        })
        .then((data) => setPosts(data))
        .catch((err) => console.error("Posts fetch error:", err));
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
        <div className="flex-1 flex flex-col overflow-hidden py-4 pr-4 relative">
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
                <div className="bg-gradient-to-r from-indigo-500 to-indigo-700 rounded-3xl p-8 text-white flex justify-between items-center mb-8 shadow-lg relative overflow-hidden">
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
                  {/* LEFT: Course Grid (100% REAL DATA) */}
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
                    ) : errorMsg ? (
                      <div className="bg-red-100 text-red-700 p-4 rounded-xl font-bold">
                        {errorMsg}
                      </div>
                    ) : courses.length === 0 ? (
                      <div className="text-center p-10 border-2 border-dashed rounded-xl border-slate-300 text-slate-500 font-bold">
                        No active enrollments found.
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
                              Instructor: {course.instructor?.name || "TBA"}
                            </p>

                            {/* Zeroed-out Progress Bar */}
                            <div className="mb-6">
                              <div className="flex justify-between text-xs mb-2 font-bold">
                                <span>Progress</span>
                                <span className="text-indigo-500">0%</span>
                              </div>
                              <div
                                className={`w-full rounded-full h-2 ${
                                  isDark ? "bg-slate-700" : "bg-slate-100"
                                }`}
                              >
                                <div
                                  className="bg-indigo-500 h-2 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.5)]"
                                  style={{ width: "0%" }}
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

                  {/* RIGHT: Trending Hub Sidebar (100% REAL DATA) */}
                  <div className="space-y-4">
                    <h2
                      className={`text-2xl font-display font-extrabold border-b pb-2 ${
                        isDark ? "border-slate-700" : "border-slate-200"
                      }`}
                    >
                      Trending in Peer Hub
                    </h2>

                    {posts.length === 0 ? (
                      <div
                        className={`p-5 rounded-3xl ${glassCard} text-center`}
                      >
                        <p className={`text-sm ${textMuted}`}>
                          No trending posts yet.
                        </p>
                      </div>
                    ) : (
                      // DYNAMIC LOGIC: Sort by highest score, slice the top 2
                      [...posts]
                        .sort((a, b) => b.helpfulScore - a.helpfulScore)
                        .slice(0, 2)
                        .map((post) => (
                          <div
                            key={`trend-${post.id}`}
                            onClick={() => setActiveTab("peerhub")}
                            className={`${glassCard} rounded-3xl p-5 cursor-pointer hover:border-indigo-500 transition-colors`}
                          >
                            <div className="flex justify-between items-start mb-3">
                              <span
                                className={`text-xs font-bold uppercase tracking-wider ${textMuted}`}
                              >
                                {post.course?.courseCode || "GENERAL"}
                              </span>
                              <span className="flex items-center gap-1 text-xs font-bold text-green-500 bg-green-500/10 px-2.5 py-1 rounded-md">
                                <Star size={14} fill="currentColor" />{" "}
                                {post.helpfulScore}
                              </span>
                            </div>
                            <h4 className="font-bold mb-2 leading-tight line-clamp-2">
                              {post.title}
                            </h4>
                            <p className={`text-xs ${textMuted}`}>
                              Uploaded by {post.author?.name || "Anonymous"}
                            </p>
                          </div>
                        ))
                    )}
                  </div>
                </div>
              </>
            )}

            {/* ========================================== */}
            {/* PEER HUB TAB (100% REAL DATA)              */}
            {/* ========================================== */}
            {activeTab === "peerhub" && (
              <div className="max-w-4xl mx-auto pb-20">
                <div className="flex justify-between items-center mb-6">
                  <h1 className="text-3xl font-display font-extrabold">
                    Peer Hub
                  </h1>
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-2.5 rounded-full font-bold flex items-center gap-2 shadow-lg hover:shadow-indigo-500/30 transition-all transform hover:-translate-y-0.5"
                  >
                    <Edit3 size={18} /> Contribute
                  </button>
                </div>

                <div className="flex gap-3 mb-8 overflow-x-auto pb-2 scrollbar-hide">
                  <button
                    onClick={() => setActiveCourseFilter("ALL")}
                    className={`px-5 py-2 rounded-full font-bold text-sm whitespace-nowrap transition-colors ${
                      activeCourseFilter === "ALL"
                        ? "bg-slate-800 text-white dark:bg-white dark:text-slate-900"
                        : `${glassCard} hover:border-indigo-500`
                    }`}
                  >
                    All Enrolled
                  </button>
                  {courses.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setActiveCourseFilter(c.courseCode)}
                      className={`px-5 py-2 rounded-full font-bold text-sm whitespace-nowrap transition-colors ${
                        activeCourseFilter === c.courseCode
                          ? "bg-slate-800 text-white dark:bg-white dark:text-slate-900"
                          : `${glassCard} hover:border-indigo-500`
                      }`}
                    >
                      {c.courseCode}
                    </button>
                  ))}
                </div>

                <div className="space-y-6">
                  {posts.length === 0 && (
                    <p className="text-center font-bold text-slate-500 py-10 border-2 border-dashed rounded-xl border-slate-300">
                      No resources found.
                    </p>
                  )}

                  {posts
                    .filter(
                      (post) =>
                        activeCourseFilter === "ALL" ||
                        post.course?.courseCode === activeCourseFilter
                    )
                    .map((post) => (
                      <div
                        key={post.id}
                        className={`${glassCard} rounded-2xl overflow-hidden hover:border-indigo-400 transition-colors`}
                      >
                        <div
                          className={`px-4 py-3 border-b flex items-center gap-2 text-xs ${
                            isDark ? "border-slate-700/50" : "border-slate-100"
                          }`}
                        >
                          <div className="w-6 h-6 rounded-full bg-indigo-100 border border-indigo-200 overflow-hidden">
                            <img
                              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${post.author?.name}`}
                              alt="avatar"
                            />
                          </div>
                          <div className="flex items-center gap-1.5">
                            <div className="relative group cursor-pointer">
                              <span className="text-indigo-500 font-black hover:underline tracking-wide">
                                {post.course?.courseCode || "GEN"}
                              </span>
                              <div className="absolute bottom-full left-0 mb-2 hidden group-hover:block w-max bg-slate-800 text-white text-xs font-bold py-1.5 px-3 rounded-lg shadow-xl z-50 pointer-events-none">
                                {post.course?.name || "General"}
                                <div className="absolute top-full left-4 -mt-1 border-4 border-transparent border-t-slate-800"></div>
                              </div>
                            </div>
                            <span className={`${textMuted} font-bold`}>/</span>
                            <span
                              className={`font-bold ${
                                isDark ? "text-slate-300" : "text-slate-700"
                              }`}
                            >
                              {post.author?.name || "Unknown"}
                            </span>
                          </div>

                          {/* Real DB Timestamp! */}
                          <div className="flex-1 text-right">
                            <span className={`${textMuted} font-medium`}>
                              {post.createdAt
                                ? new Date(post.createdAt).toLocaleDateString()
                                : "Just now"}
                            </span>
                          </div>
                        </div>

                        <div className="flex">
                          <div
                            className={`w-14 flex flex-col items-center py-4 bg-slate-50/50 dark:bg-slate-800/30 border-r ${
                              isDark
                                ? "border-slate-700/50"
                                : "border-slate-100"
                            }`}
                          >
                            <button
                              className={`hover:text-green-500 transition-colors ${textMuted}`}
                            >
                              <ArrowBigUp size={24} strokeWidth={1.5} />
                            </button>
                            <span className={`font-bold my-1`}>
                              {post.helpfulScore}
                            </span>
                            <button
                              className={`hover:text-red-500 transition-colors ${textMuted}`}
                            >
                              <ArrowBigDown size={24} strokeWidth={1.5} />
                            </button>
                          </div>
                          <div className="p-4 flex-1">
                            <h2
                              className={`text-xl font-bold mb-2 ${
                                post.type === "CODE"
                                  ? "font-code tracking-tight"
                                  : "font-display"
                              }`}
                            >
                              {post.title}
                            </h2>
                            <p
                              className={`${
                                isDark ? "text-slate-300" : "text-slate-700"
                              } mb-4 whitespace-pre-wrap`}
                            >
                              {post.content}
                            </p>
                            <div
                              className={`flex items-center gap-4 text-xs font-bold ${textMuted}`}
                            >
                              <button className="flex items-center gap-1.5 hover:bg-slate-200 dark:hover:bg-slate-700 px-2 py-1.5 rounded transition-colors">
                                <MessageSquare size={16} strokeWidth={2} />{" "}
                                Comments
                              </button>
                              <button className="flex items-center gap-1.5 hover:bg-slate-200 dark:hover:bg-slate-700 px-2 py-1.5 rounded transition-colors">
                                <Share2 size={16} strokeWidth={2} /> Share
                              </button>
                              <div className="flex-1"></div>
                              <button className="flex items-center gap-1.5 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 px-2 py-1.5 rounded transition-colors">
                                <Flag size={16} strokeWidth={2} /> Flag
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </main>
        </div>

        {/* ========================================== */}
        {/* CONTRIBUTE MODAL (Floating Overlay)        */}
        {/* ========================================== */}
        {isModalOpen && (
          <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-opacity">
            <div
              className={`${
                isDark
                  ? "bg-slate-900 border-slate-700"
                  : "bg-white border-slate-200"
              } w-full max-w-2xl rounded-3xl shadow-2xl border flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200`}
            >
              <div
                className={`px-6 py-4 border-b flex justify-between items-center ${
                  isDark ? "border-slate-800" : "border-slate-100"
                }`}
              >
                <h2 className="text-xl font-display font-extrabold">
                  Create Post
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className={`p-2 rounded-full hover:bg-slate-500/10 transition-colors ${textMuted}`}
                >
                  <X size={20} strokeWidth={2.5} />
                </button>
              </div>

              <div className="p-6 overflow-y-auto max-h-[80vh]">
                <div className="mb-6">
                  <select
                    defaultValue=""
                    className={`w-64 px-4 py-2.5 rounded-xl font-bold outline-none focus:ring-2 focus:ring-indigo-500 ${
                      isDark
                        ? "bg-slate-800 text-white border-slate-700"
                        : "bg-slate-100 text-slate-900 border-slate-200"
                    }`}
                  >
                    <option value="" disabled>
                      Select a Course...
                    </option>
                    {courses.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.courseCode} - {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div
                  className={`flex gap-6 border-b mb-6 font-bold text-sm ${
                    isDark ? "border-slate-800" : "border-slate-200"
                  }`}
                >
                  <button
                    onClick={() => setPostTypeTab("TEXT")}
                    className={`pb-3 border-b-2 transition-colors flex items-center gap-2 ${
                      postTypeTab === "TEXT"
                        ? "border-indigo-500 text-indigo-500"
                        : "border-transparent text-slate-400 hover:text-slate-600"
                    }`}
                  >
                    <FileText size={16} /> Text
                  </button>
                  <button
                    onClick={() => setPostTypeTab("FILE")}
                    className={`pb-3 border-b-2 transition-colors flex items-center gap-2 ${
                      postTypeTab === "FILE"
                        ? "border-indigo-500 text-indigo-500"
                        : "border-transparent text-slate-400 hover:text-slate-600"
                    }`}
                  >
                    <ImageIcon size={16} /> Images & Files
                  </button>
                  <button
                    onClick={() => setPostTypeTab("LINK")}
                    className={`pb-3 border-b-2 transition-colors flex items-center gap-2 ${
                      postTypeTab === "LINK"
                        ? "border-indigo-500 text-indigo-500"
                        : "border-transparent text-slate-400 hover:text-slate-600"
                    }`}
                  >
                    <LinkIcon size={16} /> Link
                  </button>
                </div>

                <div className="mb-4 relative">
                  <input
                    type="text"
                    placeholder="Title*"
                    maxLength={300}
                    className={`w-full px-5 py-3 rounded-xl font-bold outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${
                      isDark
                        ? "bg-slate-800 text-white placeholder-slate-500 border border-slate-700"
                        : "bg-slate-50 text-slate-900 placeholder-slate-400 border border-slate-200"
                    }`}
                  />
                  <span
                    className={`absolute right-4 top-3.5 text-xs font-bold ${textMuted}`}
                  >
                    0/300
                  </span>
                </div>

                {postTypeTab === "TEXT" && (
                  <div
                    className={`rounded-xl border focus-within:ring-2 focus-within:ring-indigo-500 transition-all overflow-hidden ${
                      isDark
                        ? "bg-slate-800 border-slate-700"
                        : "bg-slate-50 border-slate-200"
                    }`}
                  >
                    <div
                      className={`flex items-center gap-1 p-2 border-b ${
                        isDark
                          ? "border-slate-700 bg-slate-900/30"
                          : "border-slate-200 bg-slate-100/50"
                      }`}
                    >
                      <button
                        className={`p-1.5 rounded hover:bg-slate-200 dark:hover:bg-slate-700 ${textMuted}`}
                      >
                        <Bold size={16} />
                      </button>
                      <button
                        className={`p-1.5 rounded hover:bg-slate-200 dark:hover:bg-slate-700 ${textMuted}`}
                      >
                        <Italic size={16} />
                      </button>
                      <button
                        className={`p-1.5 rounded hover:bg-slate-200 dark:hover:bg-slate-700 ${textMuted}`}
                      >
                        <Strikethrough size={16} />
                      </button>
                      <div
                        className={`w-px h-4 mx-1 ${
                          isDark ? "bg-slate-700" : "bg-slate-300"
                        }`}
                      ></div>
                      <button
                        className={`p-1.5 rounded hover:bg-slate-200 dark:hover:bg-slate-700 ${textMuted}`}
                      >
                        <Link2 size={16} />
                      </button>
                      <button
                        className={`p-1.5 rounded hover:bg-slate-200 dark:hover:bg-slate-700 ${textMuted}`}
                      >
                        <Quote size={16} />
                      </button>
                      <button
                        className={`p-1.5 rounded hover:bg-slate-200 dark:hover:bg-slate-700 ${textMuted}`}
                      >
                        <Code size={16} />
                      </button>
                      <div
                        className={`w-px h-4 mx-1 ${
                          isDark ? "bg-slate-700" : "bg-slate-300"
                        }`}
                      ></div>
                      <button
                        className={`p-1.5 rounded hover:bg-slate-200 dark:hover:bg-slate-700 ${textMuted}`}
                      >
                        <List size={16} />
                      </button>
                      <button
                        className={`p-1.5 rounded hover:bg-slate-200 dark:hover:bg-slate-700 ${textMuted}`}
                      >
                        <ListOrdered size={16} />
                      </button>
                    </div>
                    <textarea
                      value={postContent}
                      onChange={(e) => setPostContent(e.target.value)}
                      placeholder="Body text (optional) or paste your C-Code here..."
                      rows={6}
                      className={`w-full px-5 py-4 font-medium outline-none resize-none bg-transparent ${
                        isDark
                          ? "text-white placeholder-slate-500 font-code"
                          : "text-slate-900 placeholder-slate-400 font-code"
                      }`}
                    />
                  </div>
                )}

                {postTypeTab === "FILE" && (
                  <div
                    className={`w-full border-2 border-dashed rounded-xl p-10 flex flex-col items-center justify-center text-center transition-colors cursor-pointer ${
                      isDark
                        ? "border-slate-700 hover:border-indigo-500 bg-slate-800/50"
                        : "border-slate-300 hover:border-indigo-500 bg-slate-50"
                    }`}
                  >
                    <div className="w-16 h-16 bg-indigo-100 text-indigo-500 rounded-full flex items-center justify-center mb-4">
                      <UploadCloud size={32} />
                    </div>
                    <p className="font-bold mb-1">Drag and drop files here</p>
                    <p className={`text-sm ${textMuted} mb-4`}>
                      Supported: PDF, ZIP, PNG, C, JAVA, PPTX (Max 20MB)
                    </p>
                    <button className="px-5 py-2 border border-slate-300 rounded-full font-bold text-sm hover:bg-slate-100 transition-colors dark:border-slate-600 dark:hover:bg-slate-700">
                      Browse Files
                    </button>
                  </div>
                )}

                {postTypeTab === "LINK" && (
                  <input
                    type="url"
                    placeholder="Paste URL (e.g. https://github.com/my-project)"
                    className={`w-full px-5 py-3 rounded-xl font-medium outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${
                      isDark
                        ? "bg-slate-800 text-white placeholder-slate-500 border border-slate-700"
                        : "bg-slate-50 text-slate-900 placeholder-slate-400 border border-slate-200"
                    }`}
                  />
                )}
              </div>

              <div
                className={`px-6 py-4 bg-slate-50 dark:bg-slate-800/50 border-t flex justify-end items-center gap-3 ${
                  isDark ? "border-slate-800" : "border-slate-200"
                }`}
              >
                <button
                  onClick={() => setIsModalOpen(false)}
                  className={`px-5 py-2.5 rounded-full font-bold transition-colors ${
                    isDark
                      ? "text-slate-300 hover:bg-slate-800"
                      : "text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  Cancel
                </button>
                <button
                  className={`px-5 py-2.5 rounded-full font-bold border transition-colors ${
                    isDark
                      ? "border-slate-600 text-white hover:bg-slate-700"
                      : "border-slate-300 text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  Save Draft
                </button>
                <button className="px-8 py-2.5 bg-indigo-500 hover:bg-indigo-600 text-white rounded-full font-bold transition-all shadow-md hover:shadow-indigo-500/30">
                  Post
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ==========================================
  // LOGIN VIEW (Clean Canvas Default)
  // ==========================================
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4 font-sans text-slate-900">
      <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white/70 backdrop-blur-md border border-slate-200/80 rounded-3xl shadow-xl overflow-hidden">
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
