// src/components/ContributeModal.jsx
import React, { useState, useRef, useMemo } from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css"; // Import styles
import { supabase } from "../supabase";
import { X, UploadCloud, Loader2, ImageIcon, FileText } from "lucide-react";

const isImageUrl = (url) => {
  if (!url) return false;
  return url.match(/\.(jpeg|jpg|gif|png|webp)(\?.*)?$/i) !== null;
};

const closeModal = () => {
  setIsModalOpen(false);
  setTitle("");
  setPostContent("");
  setFile(null);
};

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
  currentUser,
  selectedCourse,
  setSelectedCourse,
  setPosts,
  posts,
}) {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  // Editor configuration
  const editorOptions = useMemo(
    () => ({
      spellChecker: false,
      placeholder: "Write your content here...",
      status: false,
      minHeight: "200px",
      autofocus: true,
    }),
    []
  );

  if (!isModalOpen) return null;

  const handlePostSubmit = async () => {
    // 1. Validation First
    if (!title || !selectedCourse) {
      return alert("Select a course and add a title.");
    }

    setIsUploading(true);
    let currentMediaUrl = null;
    let updatedContent = postContent; // Create a local copy of the content

    try {
      // 2. Handle File Upload (If applicable)
      if (file && postTypeTab === "FILE") {
        const fileExt = file.name.split(".").pop();
        const fileName = `${Date.now()}-${Math.random()
          .toString(36)
          .substring(7)}.${fileExt}`;
        const filePath = `${currentUser.id}/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("peer-hub-media")
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data: publicUrlData } = supabase.storage
          .from("peer-hub-media")
          .getPublicUrl(filePath);

        currentMediaUrl = publicUrlData.publicUrl;

        // 3. If it's an image, append the Markdown syntax to our content copy
        if (isImageUrl(currentMediaUrl)) {
          updatedContent =
            updatedContent + `\n\n![Uploaded Image](${currentMediaUrl})`;
          // Also update the UI state for the user to see
          setPostContent(updatedContent);
        }
      }

      // 4. Submit to Backend
      const response = await fetch("https://mtrkyf-3000.csb.app/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title,
          content: updatedContent, // Use the updated content copy
          type: postTypeTab,
          courseId: selectedCourse.id,
          userId: currentUser.id,
          mediaUrl: currentMediaUrl,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setPosts([data.post, ...posts]);
        closeModal(); // Close and reset
      } else {
        alert("Failed to save post: " + data.error);
      }
    } catch (error) {
      console.error("Submission Error:", error);
      alert("Something went wrong while posting.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div
        className={`${
          isDark ? "bg-slate-900 border-slate-700" : "bg-white border-slate-200"
        } w-full max-w-3xl rounded-3xl shadow-2xl border flex flex-col overflow-hidden animate-in zoom-in-95`}
      >
        <div
          className={`px-6 py-4 border-b flex justify-between items-center ${
            isDark ? "border-slate-800" : "border-slate-100"
          }`}
        >
          <h2 className="text-xl font-display font-extrabold">
            Contribute Resource
          </h2>
          <button onClick={() => setIsModalOpen(false)} className={textMuted}>
            <X size={20} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[85vh] custom-scrollbar">
          <div className="flex gap-4 mb-4">
            <select
              value={selectedCourse?.id || ""}
              onChange={(e) =>
                setSelectedCourse(courses.find((c) => c.id === e.target.value))
              }
              className={`flex-1 px-4 py-3 rounded-xl font-bold outline-none border ${
                isDark
                  ? "bg-slate-800 text-white border-slate-700"
                  : "bg-slate-100 border-slate-200"
              }`}
            >
              <option value="" disabled>
                Select Course...
              </option>
              {courses.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.courseCode}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Title*"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`flex-[2] px-4 py-3 rounded-xl font-bold outline-none border ${
                isDark
                  ? "bg-slate-800 text-white border-slate-700"
                  : "bg-slate-50 border-slate-200"
              }`}
            />
          </div>

          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setPostTypeTab("TEXT")}
              className={`flex-1 py-2 rounded-lg font-bold flex items-center justify-center gap-2 border ${
                postTypeTab === "TEXT"
                  ? "bg-indigo-500 text-white border-indigo-500"
                  : textMuted
              }`}
            >
              <FileText size={18} /> Text Editor
            </button>
            <button
              onClick={() => setPostTypeTab("FILE")}
              className={`flex-1 py-2 rounded-lg font-bold flex items-center justify-center gap-2 border ${
                postTypeTab === "FILE"
                  ? "bg-indigo-500 text-white border-indigo-500"
                  : textMuted
              }`}
            >
              <ImageIcon size={18} /> Media Attachment
            </button>
          </div>

          {postTypeTab === "TEXT" ? (
            <div className={`prose-sm ${isDark ? "dark-mde" : ""}`}>
              <SimpleMDE
                value={postContent}
                onChange={setPostContent}
                options={editorOptions}
              />
            </div>
          ) : (
            <div
              onClick={() => fileInputRef.current.click()}
              className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer hover:border-indigo-500 transition-colors ${
                isDark
                  ? "bg-slate-800/50 border-slate-700"
                  : "bg-slate-50 border-slate-300"
              }`}
            >
              <UploadCloud size={48} className="mx-auto mb-4 text-indigo-500" />
              <p className="font-bold">
                {file ? file.name : "Click to upload Image/PDF"}
              </p>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
          )}
        </div>

        <div
          className={`p-4 bg-slate-50 dark:bg-slate-800/50 border-t flex justify-end gap-3 ${
            isDark ? "border-slate-800" : "border-slate-200"
          }`}
        >
          <button
            onClick={() => setIsModalOpen(false)}
            className="px-6 py-2 font-bold"
          >
            Cancel
          </button>
          <button
            onClick={handlePostSubmit}
            disabled={isUploading}
            className="px-10 py-2 bg-indigo-500 text-white rounded-full font-bold shadow-lg flex items-center gap-2 disabled:opacity-50"
          >
            {isUploading ? <Loader2 className="animate-spin" /> : "Publish"}
          </button>
        </div>
      </div>
    </div>
  );
}
