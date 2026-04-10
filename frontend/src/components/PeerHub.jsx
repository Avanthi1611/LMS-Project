// src/components/PeerHub.jsx
import React from "react";
import {
  Edit3,
  Users,
  Star,
  MessageSquare,
  Share2,
  Flag,
  ArrowBigUp,
  ArrowBigDown,
} from "lucide-react";

export default function PeerHub({
  posts,
  courses,
  activeCourseFilter,
  setActiveCourseFilter,
  setIsModalOpen,
  isDark,
  glassCard,
  textMuted,
}) {
  return (
    <div className="max-w-4xl mx-auto pb-20">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-display font-extrabold">Peer Hub</h1>
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
          <div
            className={`${glassCard} text-center p-16 border-2 border-dashed rounded-3xl ${
              isDark ? "border-slate-700" : "border-slate-200"
            } `}
          >
            <Users
              size={48}
              className="mx-auto text-indigo-500/80 dark:text-indigo-400 mb-5"
              strokeWidth={1.5}
            />
            <h3 className="text-2xl font-display font-extrabold mb-2">
              It's quiet in here...
            </h3>
            <p className={`${textMuted} font-medium mb-8 max-w-sm mx-auto`}>
              No study resources have been shared in your courses yet.
            </p>

            <button
              onClick={() => setIsModalOpen(true)}
              className="px-8 py-3 bg-indigo-500 text-white rounded-full font-bold shadow-lg hover:bg-indigo-600 transition-all transform hover:-translate-y-0.5 flex items-center gap-2 mx-auto"
            >
              <Edit3 size={18} /> Be the first to Contribute!
            </button>
          </div>
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
                    isDark ? "border-slate-700/50" : "border-slate-100"
                  }`}
                >
                  <button
                    className={`hover:text-green-500 transition-colors ${textMuted}`}
                  >
                    <ArrowBigUp size={24} strokeWidth={1.5} />
                  </button>
                  <span className={`font-bold my-1`}>{post.helpfulScore}</span>
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
                      <MessageSquare size={16} strokeWidth={2} /> Comments
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
  );
}
