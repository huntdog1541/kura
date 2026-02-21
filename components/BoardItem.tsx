// components/BoardItem.tsx
import React from 'react';

interface BoardItemProps {
    imageUrl: string;
    note: string;
}

export default function BoardItem({ imageUrl, note }: BoardItemProps) {
    return (
        <div className="break-inside-avoid mb-4 group relative overflow-hidden rounded-2xl border border-white/20 bg-white/10 transition-all hover:scale-[1.02] hover:shadow-xl">
            <img
                src={imageUrl}
                alt={note}
                className="w-full object-cover"
                loading="lazy"
            />

            {/* Caption Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-white/30 backdrop-blur-md border-t border-white/20 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <p className="text-sm font-medium text-gray-800">{note}</p>
            </div>
        </div>
    );
}