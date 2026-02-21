// app/page.tsx
import BoardItem from '@/components/BoardItem';

const MOCK_ITEMS = [
  { id: 1, note: "Architecture inspiration", url: "https://images.unsplash.com/photo-1487958444681-f4201c046297" },
  { id: 2, note: "Color palette: Sage & Sand", url: "https://images.unsplash.com/photo-1541701494587-cb58502866ab" },
  { id: 3, note: "Workspace vibes", url: "https://images.unsplash.com/photo-1497215728101-856f4ea42174" },
  { id: 4, note: "Minimalist UI concept", url: "https://images.unsplash.com/photo-1558655146-d09347e92766" },
  { id: 5, note: "Textures", url: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853" },
];

export default function MoodBoard() {
  return (
      <main className="min-h-screen bg-[#f8f9fa] p-8">
        {/* Header */}
        <header className="max-w-6xl mx-auto mb-12 flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 tracking-tight">Kura</h1>
            <p className="text-gray-500 mt-2">Visual fragments and inspiration.</p>
          </div>
          <button className="bg-black text-white px-6 py-2 rounded-full font-medium hover:bg-gray-800 transition-colors">
            Add Item
          </button>
        </header>

        {/* Responsive Masonry Grid */}
        <div className="max-w-6xl mx-auto columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4">
          {MOCK_ITEMS.map((item) => (
              <BoardItem
                  key={item.id}
                  imageUrl={item.url}
                  note={item.note}
              />
          ))}
        </div>
      </main>
  );
}