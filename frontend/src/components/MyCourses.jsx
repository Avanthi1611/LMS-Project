// src/components/MyCourses.jsx
import React from "react";
import {
  Settings as SettingsIcon,
  BookOpen,
  ArrowLeft,
  FileCode,
  Folder,
  CheckCircle,
} from "lucide-react";

export default function MyCourses({
  courses,
  loading,
  errorMsg,
  selectedCourse,
  setSelectedCourse,
  posts,
  isDark,
  glassCard,
  textMuted,
}) {
  return (
    <div className="max-w-5xl mx-auto pb-20">
      {/* VIEW 1: The Clean Course Grid */}
      {!selectedCourse ? (
        <>
          <h1 className="text-3xl font-display font-extrabold mb-8">
            My Courses
          </h1>

          {loading ? (
            <div className="flex justify-center p-10">
              <span className="animate-spin text-indigo-500">
                <SettingsIcon size={32} />
              </span>
            </div>
          ) : courses.length === 0 ? (
            <div
              className={`${glassCard} flex flex-col items-center justify-center p-16 border-2 border-dashed rounded-3xl ${
                isDark ? "border-slate-700" : "border-slate-200"
              }`}
            >
              <BookOpen
                size={48}
                className="text-indigo-500/80 dark:text-indigo-400 mb-5"
                strokeWidth={1.5}
              />
              <h3 className="text-2xl font-display font-extrabold mb-2">
                No active enrollments
              </h3>
              <p className={`${textMuted} font-medium text-center max-w-sm`}>
                You are not currently assigned to any courses for this semester.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <div
                  key={`course-tab-${course.id}`}
                  onClick={() => setSelectedCourse(course)}
                  className={`${glassCard} rounded-2xl overflow-hidden flex flex-col cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border ${
                    isDark
                      ? "border-slate-700/50 hover:border-indigo-500/50"
                      : "border-slate-200/80 hover:border-indigo-300"
                  }`}
                >
                  <div className="h-24 bg-gradient-to-br from-indigo-500 to-purple-600 relative overflow-hidden flex items-end p-5">
                    <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMSI+PC9yZWN0Pgo8cGF0aCBkPSJNMCAwbDggOHptOCAwTDAgOHoiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgZmlsbD0ibm9uZSI+PC9wYXRoPgo8L3N2Zz4=')]"></div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                      <span
                        className={`text-xs font-bold uppercase tracking-wider ${textMuted}`}
                      >
                        {course.courseCode}
                      </span>
                      <span className={`text-xs font-bold ${textMuted}`}>
                        Current Semester
                      </span>
                    </div>
                    <h3 className="text-xl font-display font-bold mb-6 leading-tight">
                      {course.name}
                    </h3>

                    <div className="mt-auto">
                      <div className="flex justify-between text-xs mb-1.5 font-bold">
                        <span>Progress</span>
                        <span className="text-indigo-500">0%</span>
                      </div>
                      <div
                        className={`w-full rounded-full h-1.5 ${
                          isDark ? "bg-slate-700" : "bg-slate-100"
                        }`}
                      >
                        <div
                          className="bg-indigo-500 h-1.5 rounded-full"
                          style={{ width: "0%" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        /* VIEW 2: The Drill-Down Course Page (Tiles) */
        <div className="animate-in fade-in slide-in-from-right-4 duration-300">
          <button
            onClick={() => setSelectedCourse(null)}
            className={`flex items-center gap-2 text-sm font-bold mb-6 hover:text-indigo-500 transition-colors ${textMuted}`}
          >
            <ArrowLeft size={16} strokeWidth={2.5} /> Back to Courses
          </button>

          <div className="mb-8">
            <span className="text-indigo-500 font-bold uppercase tracking-wider text-sm">
              {selectedCourse.courseCode}
            </span>
            <h1 className="text-3xl font-display font-extrabold">
              {selectedCourse.name}
            </h1>
            <p className={`${textMuted} font-medium mt-1`}>
              Instructor: {selectedCourse.instructor?.name || "TBA"}
            </p>
          </div>

          {/* The Resources "Tiles" List */}
          <div className="space-y-4">
            <h3
              className={`font-bold uppercase tracking-wider text-xs mb-4 ${textMuted}`}
            >
              Course Materials & Submissions
            </h3>

            {posts.filter((p) => p.courseId === selectedCourse.id).length ===
            0 ? (
              <div className="text-center py-10 border-2 border-dashed rounded-xl border-slate-300 text-slate-500 font-bold">
                No materials posted for this course yet.
              </div>
            ) : (
              posts
                .filter((p) => p.courseId === selectedCourse.id)
                .map((post) => (
                  <div
                    key={`tile-${post.id}`}
                    className={`flex items-center p-4 rounded-xl border transition-all hover:shadow-md cursor-pointer ${
                      isDark
                        ? "bg-slate-800/50 border-slate-700"
                        : "bg-white border-slate-200"
                    }`}
                  >
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center mr-4 text-white shadow-inner ${
                        post.type === "CODE" ? "bg-pink-500" : "bg-blue-500"
                      }`}
                    >
                      {post.type === "CODE" ? (
                        <FileCode size={24} />
                      ) : (
                        <Folder size={24} />
                      )}
                    </div>

                    <div className="flex-1">
                      <p
                        className={`text-[10px] font-bold uppercase tracking-widest ${textMuted} mb-0.5`}
                      >
                        {post.type === "CODE" ? "SUBMISSION" : "MATERIAL"}
                      </p>
                      <h4 className="font-bold text-blue-600 dark:text-blue-400 text-base">
                        {post.title}
                      </h4>
                    </div>

                    <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-bold text-sm flex items-center gap-1.5 transition-colors">
                      <CheckCircle size={16} /> Open
                    </button>
                  </div>
                ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
