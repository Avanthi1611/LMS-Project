import React from "react";

export default function AscendLogo({ className }) {
  return (
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
}
