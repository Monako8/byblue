"use client"

import { useEffect, useCallback } from "react"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import type { MediaItem } from "./post-card"

interface LightboxProps {
  media: MediaItem[]
  currentIndex: number
  isOpen: boolean
  onClose: () => void
  onNext: () => void
  onPrev: () => void
}

export function Lightbox({ media, currentIndex, isOpen, onClose, onNext, onPrev }: LightboxProps) {
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isOpen) return
    
    if (e.key === "Escape") {
      onClose()
    } else if (e.key === "ArrowLeft") {
      onPrev()
    } else if (e.key === "ArrowRight") {
      onNext()
    }
  }, [isOpen, onClose, onNext, onPrev])

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [handleKeyDown])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
      onClick={handleBackdropClick}
    >
      <button
        onClick={onClose}
        className="absolute top-5 right-5 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
        aria-label="Закрыть"
      >
        <X className="w-6 h-6" />
      </button>

      <button
        onClick={(e) => { e.stopPropagation(); onPrev() }}
        className="absolute left-5 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
        aria-label="Предыдущее"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {media[currentIndex]?.type === "video" ? (
        <video
          src={media[currentIndex].src}
          className="max-w-[90%] max-h-[90%] object-contain rounded-lg"
          controls
          autoPlay
          playsInline
        />
      ) : (
        <img
          src={media[currentIndex]?.src}
          alt=""
          className="max-w-[90%] max-h-[90%] object-contain rounded-lg"
        />
      )}

      <button
        onClick={(e) => { e.stopPropagation(); onNext() }}
        className="absolute right-5 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
        aria-label="Следующее"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  )
}
