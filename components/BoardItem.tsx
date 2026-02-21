// components/BoardItem.tsx
"use client";

import { useState } from "react";
import { logger } from "@/lib/logger";

interface BoardItemProps {
    id: number;
    imageUrl: string;
    note: string;
}

export default function BoardItem({ id: _id, imageUrl, note }: BoardItemProps) {
    const [imgError, setImgError] = useState(false);

    return (
        <div className="break-inside-avoid mb-4 group relative overflow-hidden rounded-2xl border border-white/60 bg-white/80 shadow-sm transition-all hover:scale-[1.02] hover:shadow-xl hover:shadow-purple-100/60">
            {imgError ? (
                <div className="w-full h-48 flex items-center justify-center bg-gray-100 text-gray-400 text-sm">
                    Image unavailable
                </div>
            ) : (
                <div className="relative w-full">
                    <img
                        src={imageUrl}
                        alt={note}
                        className="w-full object-cover"
                        loading="lazy"
                        onError={() => {
                            logger.warn(`Failed to load image: ${imageUrl}`);
                            setImgError(true);
                        }}
                    />
                </div>
            )}

            {/* Caption Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-r from-violet-500/20 via-pink-500/20 to-orange-400/20 backdrop-blur-md border-t border-white/30 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <p className="text-sm font-medium text-gray-800">{note}</p>
            </div>
        </div>
    );
}