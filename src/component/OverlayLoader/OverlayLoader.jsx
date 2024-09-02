import React from "react";

export default function OverlayLoader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="loader border-t-4 border-primary-orange border-solid rounded-full w-16 h-16 animate-spin"></div>
    </div>
  );
}
