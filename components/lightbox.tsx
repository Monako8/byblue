"use client";

import { useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { MediaItem } from "./post-card";

interface LightboxProps {
  media: MediaItem[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export function Lightbox({ media, currentIndex, isOpen, onClose, onNext, onPrev }: LightboxProps) {
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, onNext, onPrev]);

  if (!isOpen || !media.length || !media[currentIndex]) return null;

  return (
    <div 
      className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center" 
      onClick={onClose}
    >
      <button onClick={onClose} className="absolute top-5 right-5 z-[100] text-white">
        <X size={40} />
      </button>

      {media.length > 1 && (
        <>
          <button onClick={(e) => { e.stopPropagation(); onPrev(); }} className="absolute left-5 z-[100] text-white">
            <ChevronLeft size={48} />
          </button>
          <button onClick={(e) => { e.stopPropagation(); onNext(); }} className="absolute right-5 z-[100] text-white">
            <ChevronRight size={48} />
          </button>
        </>
      )}

      <div className="relative w-full h-full flex items-center justify-center p-4" onClick={(e) => e.stopPropagation()}>
        <img
          key={currentIndex}
          src={media[currentIndex].src}
          alt="Full size"
          className="max-w-full max-h-full object-contain"
        />
      </div>
    </div>
  );
}