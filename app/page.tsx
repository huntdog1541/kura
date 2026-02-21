// app/page.tsx
"use client";

import { useState, useEffect } from "react";
import BoardItem from "@/components/BoardItem";
import UploadModal from "@/components/UploadModal";
import { supabase } from "@/lib/supabase";
import { logger } from "@/lib/logger";

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
      logger.info("Fetching board items from Supabase");
      const { data, error } = await supabase
        .from("posts")
        .select("id, image_url, note")
        .order("created_at", { ascending: false });

      if (error) {
        logger.error("Failed to fetch items from Supabase", error);
        setError("Failed to load items.");
      } else {
        logger.info(`Successfully fetched ${(data ?? []).length} items`);
        setItems(data ?? []);
      }
      setLoading(false);
    }

    fetchItems();
  }, []);

  async function handleAdd(url: string, note: string) {
    logger.debug("Adding new item", { url, note });
    setError(null);
    const { data, error } = await supabase
      .from("posts")
      .insert({ image_url: url, note })
      .select("id, image_url, note")
      .single();

    if (error) {
      logger.error("Failed to add item to Supabase", error);
      setError("Failed to add item.");
    } else if (data) {
      logger.info(`Successfully added new item with ID: ${data.id}`);
      setItems((prev) => [data, ...prev]);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-violet-50 via-fuchsia-50 to-amber-50 p-8">
      {/* Header */}
      <header className="max-w-6xl mx-auto mb-12 flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-violet-600 via-pink-500 to-orange-400 bg-clip-text text-transparent">Kura</h1>
          <p className="text-gray-500 mt-2">Visual fragments and inspiration.</p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="bg-gradient-to-r from-violet-500 to-pink-500 text-white px-6 py-2 rounded-full font-medium hover:from-violet-600 hover:to-pink-600 transition-all shadow-md hover:shadow-lg hover:shadow-pink-200"
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
            <BoardItem key={item.id} id={item.id} imageUrl={item.image_url} note={item.note} />
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
