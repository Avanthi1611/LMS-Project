// src/components/Dashboard.jsx
import React from "react";
import {
  Trophy,
  Award,
  Settings as SettingsIcon,
  BookOpen,
  ChevronRight,
  MessageSquare,
  Star,
} from "lucide-react";
import AscendLogo from "./AscendLogo";

export default function Dashboard({
  currentUser,
  loading,
  errorMsg,
  courses,
  posts,
  setActiveTab,
  isDark,
  glassCard,
  textMuted,
}) {
  return (
    <>
      <div className="bg-gradient-to-r from-indigo-500 to-indigo-700 rounded-3xl p-8 text-white flex justify-between items-center mb-8 shadow-lg relative overflow-hidden">
        <div className="absolute -right-10 -top-20 opacity-10">
          <AscendLogo className="w-96 h-96" />
        </div>
        <div className="relative z-10">
          <h1 className="text-3xl sm:text-4xl font-display font-extrabold mb-3">
            Welcome back, {currentUser?.name}!
          </h1>

          <div className="flex flex-wrap gap-3">
            <span className="flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-sm font-bold border border-white/20 shadow-sm">
              <Trophy size={16} className="text-yellow-400" strokeWidth={2.5} />{" "}
              Early Adopter
            </span>
            <span className="flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-sm font-bold border border-white/20 shadow-sm">
              <Award size={16} className="text-blue-300" strokeWidth={2.5} />{" "}
              Subject Mentor
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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
            <div
              className={`${glassCard} flex flex-col items-center justify-center p-12 border-2 border-dashed rounded-3xl ${
                isDark ? "border-slate-700" : "border-slate-200"
              }`}
            >
              <BookOpen
                size={48}
                className="text-indigo-500/80 dark:text-indigo-400 mb-5"
                strokeWidth={1.5}
              />
              <h3 className="text-2xl font-display font-extrabold mb-2">
                No courses enrolled
              </h3>
              <p className={`${textMuted} font-medium text-center max-w-sm`}>
                You are not currently assigned to any active courses.
              </p>
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
                    onClick={() => setActiveTab("courses")}
                    className={`w-full py-3 font-bold rounded-xl transition-colors flex justify-center items-center gap-2 ${
                      isDark
                        ? "bg-slate-700 text-white hover:bg-indigo-500"
                        : "bg-slate-100 text-slate-900 hover:bg-indigo-500 hover:text-white"
                    }`}
                  >
                    Enter Course <ChevronRight size={18} strokeWidth={2.5} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

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
              className={`${glassCard} flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-3xl ${
                isDark ? "border-slate-700" : "border-slate-200"
              }`}
            >
              <MessageSquare
                size={40}
                className="text-indigo-500/80 dark:text-indigo-400 mb-4"
                strokeWidth={1.5}
              />
              <h3 className="text-xl font-display font-extrabold mb-1">
                No trending posts
              </h3>
              <p className={`${textMuted} font-medium text-center text-sm`}>
                Your courses' Peer Hubs are quiet.
              </p>
            </div>
          ) : (
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
                      <Star size={14} fill="currentColor" /> {post.helpfulScore}
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
  );
}
