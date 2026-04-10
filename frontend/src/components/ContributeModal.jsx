import React from "react";
import {
  X,
  FileText,
  Image as ImageIcon,
  Link as LinkIcon,
  UploadCloud,
  Bold,
  Italic,
  Strikethrough,
  Link2,
  Code,
  Quote,
  List,
  ListOrdered,
} from "lucide-react";

export default function ContributeModal({
  isModalOpen,
  setIsModalOpen,
  courses,
  postTypeTab,
  setPostTypeTab,
  postContent,
  setPostContent,
  isDark,
  textMuted,
}) {
  if (!isModalOpen) return null;

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-opacity">
      <div
        className={`${
          isDark ? "bg-slate-900 border-slate-700" : "bg-white border-slate-200"
        } w-full max-w-2xl rounded-3xl shadow-2xl border flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200`}
      >
        <div
          className={`px-6 py-4 border-b flex justify-between items-center ${
            isDark ? "border-slate-800" : "border-slate-100"
          }`}
        >
          <h2 className="text-xl font-display font-extrabold">Create Post</h2>
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
  );
}
