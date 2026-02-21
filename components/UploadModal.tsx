// components/UploadModal.tsx
"use client";

import { useState } from "react";
import { logger } from "@/lib/logger";

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (url: string, note: string) => void;
}

export default function UploadModal({ isOpen, onClose, onAdd }: UploadModalProps) {
  const [url, setUrl] = useState("");
  const [note, setNote] = useState("");

  if (!isOpen) return null;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!url.trim()) {
      logger.warn("Attempted to submit form with empty URL");
      return;
    }
    logger.debug("Form submitted with URL and note", { url, note });
    onAdd(url.trim(), note.trim());
    setUrl("");
    setNote("");
    onClose();
  }

  function handleBackdropClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) onClose();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-5">Add Item</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="image-url" className="text-sm font-medium text-gray-700">
              Image URL <span className="text-red-500">*</span>
            </label>
            <input
              id="image-url"
              type="url"
              placeholder="https://..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/20"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="note" className="text-sm font-medium text-gray-700">
              Note
            </label>
            <input
              id="note"
              type="text"
              placeholder="Add a caption or description..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/20"
            />
          </div>
          <div className="flex justify-end gap-3 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-black text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
