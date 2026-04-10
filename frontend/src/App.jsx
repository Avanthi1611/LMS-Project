import AscendLogo from "./components/AscendLogo";
import Login from "./components/Login";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Settings from "./components/Settings";
import Dashboard from "./components/Dashboard";
import MyCourses from "./components/MyCourses";
import PeerHub from "./components/PeerHub";
import ContributeModal from "./components/ContributeModal";
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
  ArrowLeft,
  CheckCircle,
  Folder,
  FileCode,
} from "lucide-react";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [role, setRole] = useState("STUDENT");
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [loginError, setLoginError] = useState("");
  const [theme, setTheme] = useState("light");
  const [activeTab, setActiveTab] = useState("dashboard");
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostType, setNewPostType] = useState("MATERIAL");

  // Real Database State
  const [courses, setCourses] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(null); // Tracks the open course page

  // Modal & Peer Hub State
  const [activeCourseFilter, setActiveCourseFilter] = useState("ALL");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postTypeTab, setPostTypeTab] = useState("TEXT");
  const [postContent, setPostContent] = useState("");

  // Fetch Courses (Strict Error Handling)
  // Fetch Courses (Tenant-Scoped)
  useEffect(() => {
    // Only run this if we are logged in AND we know WHO is logged in
    if (isLoggedIn && currentUser) {
      setLoading(true);
      fetch(
        `https://mtrkyf-3000.csb.app/api/courses?userId=${currentUser.id}&role=${currentUser.role}`
      )
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
          setErrorMsg("Failed to load courses.");
          setLoading(false);
        });
    }
  }, [isLoggedIn, currentUser]); // Run again if the user changes!

  // Fetch Posts (Tenant-Scoped)
  useEffect(() => {
    if (isLoggedIn && currentUser) {
      fetch(
        `https://mtrkyf-3000.csb.app/api/posts?userId=${currentUser.id}&role=${currentUser.role}`
      )
        .then((res) => {
          if (!res.ok) throw new Error(`HTTP Error! Status: ${res.status}`);
          return res.json();
        })
        .then((data) => setPosts(data))
        .catch((err) => console.error("Posts fetch error:", err));
    }
  }, [isLoggedIn, currentUser]);

  // ==========================================
  // CREATE NEW POST (Frontend Pipeline)
  // ==========================================
  const handleCreatePost = async (e) => {
    e.preventDefault(); // Prevents the page from reloading

    // Safety check: Make sure they are actually inside a course!
    if (!selectedCourse || !currentUser) return;

    try {
      // 1. Send the POST request to our new backend route
      const response = await fetch("https://mtrkyf-3000.csb.app/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newPostTitle,
          content: newPostContent,
          type: newPostType,
          courseId: selectedCourse.id,
          userId: currentUser.id,
        }),
      });

      const data = await response.json();

      if (data.success) {
        // 2. MAGIC UX: Add the new post to the top of the feed instantly
        setPosts([data.post, ...posts]);

        // 3. Clean up: Close the modal and clear the inputs
        setShowContributeModal(false);
        setNewPostTitle("");
        setNewPostContent("");
      } else {
        alert("Failed to create post: " + data.error);
      }
    } catch (err) {
      console.error("Server connection failed", err);
      alert("Could not connect to the database.");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError(""); // Clear previous errors

    try {
      // Send the email and role to our new backend route
      const response = await fetch("https://mtrkyf-3000.csb.app/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: emailInput,
          password: passwordInput,
          role: role,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setCurrentUser(data.user); // Save the DB user to React!
        setIsLoggedIn(true); // Unlock the dashboard
      } else {
        setLoginError("Account not found. Invalid email, password, or role.");
      }
    } catch (err) {
      console.error("Login request failed", err);
      setLoginError("Server offline. Cannot connect to database.");
    }
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
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          setIsLoggedIn={setIsLoggedIn}
          isDark={isDark}
          glassCard={glassCard}
          textMuted={textMuted}
          glassHover={glassHover}
        />
        {/* MAIN CONTENT WRAPPER */}
        <div className="flex-1 flex flex-col overflow-hidden py-4 pr-4 relative">
          {/* TOP NAVBAR */}
          <Navbar
            currentUser={currentUser}
            role={role}
            isDark={isDark}
            glassCard={glassCard}
            textMuted={textMuted}
          />
          {/* DYNAMIC TAB CONTENT */}
          <main className="flex-1 overflow-y-auto px-2">
            {/* SETTINGS TAB */}
            {activeTab === "settings" && (
              <Settings
                theme={theme}
                setTheme={setTheme}
                isDark={isDark}
                glassCard={glassCard}
                textMuted={textMuted}
              />
            )}

            {/* DASHBOARD TAB */}
            {activeTab === "dashboard" && (
              <Dashboard
                currentUser={currentUser}
                loading={loading}
                errorMsg={errorMsg}
                courses={courses}
                posts={posts}
                setActiveTab={setActiveTab}
                isDark={isDark}
                glassCard={glassCard}
                textMuted={textMuted}
              />
            )}

            {/* MY COURSES TAB                             */}
            {activeTab === "courses" && (
              <MyCourses
                courses={courses}
                loading={loading}
                errorMsg={errorMsg}
                selectedCourse={selectedCourse}
                setSelectedCourse={setSelectedCourse}
                posts={posts}
                isDark={isDark}
                glassCard={glassCard}
                textMuted={textMuted}
              />
            )}

            {/* PEER HUB TAB                               */}
            {activeTab === "peerhub" && (
              <PeerHub
                posts={posts}
                courses={courses}
                activeCourseFilter={activeCourseFilter}
                setActiveCourseFilter={setActiveCourseFilter}
                setIsModalOpen={setIsModalOpen}
                isDark={isDark}
                glassCard={glassCard}
                textMuted={textMuted}
              />
            )}
          </main>
        </div>

        {/* CONTRIBUTE MODAL                           */}
        <ContributeModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          courses={courses}
          postTypeTab={postTypeTab}
          setPostTypeTab={setPostTypeTab}
          postContent={postContent}
          setPostContent={setPostContent}
          isDark={isDark}
          textMuted={textMuted}
          currentUser={currentUser}
          selectedCourse={selectedCourse}
          setSelectedCourse={setSelectedCourse}
          setPosts={setPosts}
          posts={posts}
        />
      </div>
    );
  }

  // LOGIN VIEW (Clean Canvas Default)
  return (
    <Login
      role={role}
      setRole={setRole}
      emailInput={emailInput}
      setEmailInput={setEmailInput}
      passwordInput={passwordInput}
      setPasswordInput={setPasswordInput}
      handleLogin={handleLogin}
      loginError={loginError}
    />
  );
}
