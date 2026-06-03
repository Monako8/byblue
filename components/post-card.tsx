"use client"

import { useRef, useState, useCallback } from "react"
import { cn } from "@/lib/utils"
import Image from "next/image"

export interface MediaItem {
  src: string
  type: "image" | "video" | "gif"
  poster?: string
  preview?: string
}

export interface PostData {
  id: string
  author: string
  avatar: string
  time: string
  text: string
  headerImage?: string // Добавлено поле для изображения заголовка
  tools?: string[]
  media?: MediaItem[]
  likes: number
  comments: number
  reposts: number
  pinned?: boolean
  category?: "art" | "design" | "web" | "animation"
}

interface PostCardProps {
  post: PostData
  onMediaClick: (src: string, allMedia: MediaItem[]) => void
}

export function PostCard({ post, onMediaClick }: PostCardProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [hasDragged, setHasDragged] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!scrollRef.current) return
    setIsDragging(true)
    setHasDragged(false)
    setStartX(e.pageX - scrollRef.current.offsetLeft)
    setScrollLeft(scrollRef.current.scrollLeft)
  }, [])
  
  const handleMouseLeave = useCallback(() => setIsDragging(false), [])
  const handleMouseUp = useCallback(() => setIsDragging(false), [])
  
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return
    const x = e.pageX - scrollRef.current.offsetLeft
    const walk = (x - startX) * 1.5
    if (Math.abs(walk) > 5) setHasDragged(true)
    scrollRef.current.scrollLeft = scrollLeft - walk
  }, [isDragging, scrollLeft, startX])

  const handleMediaItemClick = (item: MediaItem) => {
    if (!hasDragged && post.media) {
      onMediaClick(item.src, post.media)
    }
  }

  const renderMediaItem = (item: MediaItem, index: number) => {
    const baseClasses = "relative flex-shrink-0 w-[180px] h-[240px] rounded-xl overflow-hidden cursor-pointer hover:scale-[1.02] transition-transform bg-muted border-4 border-white shadow-[0_0_0_1px_#b5b5b5]"
    
    if (item.type === "video") {
      return (
        <video key={index} src={item.src} poster={item.poster} className="w-[180px] h-[240px] object-cover rounded-xl border-4 border-white shadow-[0_0_0_1px_#b5b5b5]" muted playsInline onClick={() => handleMediaItemClick(item)} />
      )
    }

    return (
      <div key={index} className={baseClasses} onClick={() => handleMediaItemClick(item)}>
        <Image src={item.preview || item.src} alt="media" fill sizes="180px" className="object-cover" draggable={false} unoptimized={item.type === "gif"} priority={index === 0} />
      </div>
    )
  }

  return (
    <>
      <article 
        className="relative z-20 p-8 rounded-3xl bg-card shadow-sm border border-foreground/20 overflow-hidden"
        style={{ 
          contentVisibility: 'auto',
          backgroundImage: "linear-gradient(45deg, hsl(var(--foreground)/0.03) 25%, transparent 25%, transparent 75%, hsl(var(--foreground)/0.03) 75%, hsl(var(--foreground)/0.03)), linear-gradient(45deg, hsl(var(--foreground)/0.03) 25%, transparent 25%, transparent 75%, hsl(var(--foreground)/0.03) 75%, hsl(var(--foreground)/0.03))",
          backgroundSize: "20px 20px",
          backgroundPosition: "0 0, 10px 10px"
        }}
      >
{/* Миниатюрный заголовок, выровненный по левому краю */}
{post.headerImage && (
  <div className="flex justify-start mb-6 pl-4">
    <div className="relative w-full max-w-[180px] aspect-[4/1] overflow-hidden">
      <Image 
        src={post.headerImage} 
        alt="header" 
        fill 
        className="object-contain" 
        priority 
      />
    </div>
  </div>
)}
        <div className="flex-1 min-w-0 relative z-10">
          <div 
            className="text-[16px] leading-relaxed whitespace-pre-line text-foreground mb-6 font-sans"
            dangerouslySetInnerHTML={{ __html: post.text }}
          />

          {post.tools && (
            <div className="flex flex-wrap gap-2 mb-8">
              {post.tools.map((tool, i) => {
                const colors = ["#93B8E6", "#8A97AC", "#A8A8C0", "#BCCBE0", "#99AACC"];
                return (
                  <div 
                    key={i} 
                    className="px-4 py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-wider text-white shadow-sm hover:scale-[1.02] transition-transform select-none"
                    style={{ backgroundColor: colors[i % colors.length] }}
                  >
                    {tool}
                  </div>
                )
              })}
            </div>
          )}
          
          {post.media && post.media.length > 0 && (
            <div 
              ref={scrollRef}
              onMouseDown={handleMouseDown}
              onMouseLeave={handleMouseLeave}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
              className={cn("flex gap-4 overflow-x-auto overflow-y-hidden select-none", isDragging ? "cursor-grabbing" : "cursor-grab")}
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
            >
              {post.media.map((item, i) => renderMediaItem(item, i))}
            </div>
          )}
        </div>
      </article>

      <div className="relative z-10 w-[calc(100%+4rem)] -mx-8 h-[60px] -my-[30px] flex justify-center opacity-40 pointer-events-none">
        <div className="w-full h-full" style={{ backgroundImage: "repeating-linear-gradient(90deg, transparent, transparent 15px, hsl(var(--foreground)) 15px, hsl(var(--foreground)) 17px)", maskImage: "linear-gradient(to right, transparent, black 20%, black 80%, transparent)" }} />
      </div>
    </>
  )
}