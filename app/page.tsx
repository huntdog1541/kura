// app/page.tsx
"use client";

import { useState, useEffect } from "react";
import BoardItem from "@/components/BoardItem";
import UploadModal from "@/components/UploadModal";
import { supabase } from "@/lib/supabase";

interface BoardItemData {
  id: number;
  image_url: string;
  note: string;
}

export default function MoodBoard() {
  const [items, setItems] = useState<BoardItemData[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchItems() {
      const { data, error } = await supabase
        .from("posts")
        .select("id, image_url, note")
        .order("created_at", { ascending: false });

      if (error) {
        setError("Failed to load items.");
      } else {
        setItems(data ?? []);
      }
      setLoading(false);
    }

    fetchItems();
  }, []);

  async function handleAdd(url: string, note: string) {
    setError(null);
    const { data, error } = await supabase
      .from("posts")
      .insert({ image_url: url, note })
      .select("id, image_url, note")
      .single();

    if (error) {
      setError("Failed to add item.");
    } else if (data) {
      setItems((prev) => [data, ...prev]);
    }
  }

  return (
    <main className="min-h-screen bg-[#f8f9fa] p-8">
      {/* Header */}
      <header className="max-w-6xl mx-auto mb-12 flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight">Kura</h1>
          <p className="text-gray-500 mt-2">Visual fragments and inspiration.</p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="bg-black text-white px-6 py-2 rounded-full font-medium hover:bg-gray-800 transition-colors"
        >
          Add Item
        </button>
      </header>

      {/* Board */}
      {loading ? (
        <p className="max-w-6xl mx-auto text-center text-gray-400 py-24">Loading...</p>
      ) : error ? (
        <p className="max-w-6xl mx-auto text-center text-red-400 py-24">{error}</p>
      ) : items.length === 0 ? (
        <p className="max-w-6xl mx-auto text-center text-gray-400 py-24">
          No items yet — add your first one!
        </p>
      ) : (
        <div className="max-w-6xl mx-auto columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4">
          {items.map((item) => (
            <BoardItem key={item.id} imageUrl={item.image_url} note={item.note} />
          ))}
        </div>
      )}

      <UploadModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onAdd={handleAdd}
      />
    </main>
  );
}
