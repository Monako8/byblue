"use client"

import { useRef, useState, useCallback } from "react"
import { Heart, MessageCircle, Repeat2, Share, Pin } from "lucide-react"
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
    const baseClasses = "relative flex-shrink-0 w-[180px] h-[240px] rounded-xl overflow-hidden cursor-pointer hover:brightness-95 transition-all bg-muted"

    if (item.type === "video") {
      return (
        <video
          key={index}
          src={item.src}
          poster={item.poster}
          className="w-[180px] h-[240px] object-cover rounded-xl"
          muted
          playsInline
          preload="metadata"
          onClick={(e) => {
            e.currentTarget.play()
            handleMediaItemClick(item)
          }}
        />
      )
    }

    return (
      <div key={index} className={baseClasses} onClick={() => handleMediaItemClick(item)}>
        <Image
          src={item.type === "gif" ? (item.preview || item.src) : item.src}
          alt="media"
          fill
          sizes="180px"
          className="object-cover"
          draggable={false}
          unoptimized={item.type === "gif"}
          priority={index === 0}
          loading={index === 0 ? undefined : "lazy"}
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII="
        />
        {item.type === "gif" && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/10 transition-opacity">
            <span className="bg-black/50 text-white text-[10px] px-2 py-1 rounded-full uppercase">GIF</span>
          </div>
        )}
      </div>
    )
  }

  return (
    <article 
      className="p-4 border-b border-border bg-background will-change-transform"
      style={{ contentVisibility: 'auto', containIntrinsicSize: '0 500px' }}
    >
      {post.pinned && (
        <div className="flex items-center gap-1.5 ml-12 mb-2 text-sm text-muted-foreground">
          <Pin className="w-3.5 h-3.5" fill="currentColor" />
          <span>Закреплено</span>
        </div>
      )}

      <div className="flex gap-3">
        <div className="relative w-9 h-9 flex-shrink-0">
          <Image
            src={post.avatar}
            alt="avatar"
            fill
            sizes="36px"
            className="rounded-full object-cover border border-border"
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap text-[15px]">
            <span className="font-semibold text-foreground">{post.author}</span>
            <span className="text-muted-foreground">· {post.time}</span>
          </div>

          <div 
            className="mt-1 text-[15px] leading-relaxed whitespace-pre-line"
            dangerouslySetInnerHTML={{ __html: post.text }}
          />
          
          {post.media && post.media.length > 0 && (
            <div 
              ref={scrollRef}
              onMouseDown={handleMouseDown}
              onMouseLeave={handleMouseLeave}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
              className={cn(
                "mt-3 flex gap-2 overflow-x-auto overflow-y-hidden select-none -mr-4 pr-4",
                isDragging ? "cursor-grabbing" : "cursor-grab"
              )}
              style={{ 
                scrollbarWidth: 'none', 
                msOverflowStyle: 'none', 
                WebkitOverflowScrolling: 'touch',
                contain: 'content' 
              }}
            >
              {post.media.map((item, i) => renderMediaItem(item, i))}
            </div>
          )}
          
          <div className="flex items-center gap-1 mt-3 -ml-2">
            <ActionButton icon={Heart} count={post.likes} />
            <ActionButton icon={MessageCircle} count={post.comments} />
            <ActionButton icon={Repeat2} count={post.reposts} />
            <button className="ml-auto p-1.5 rounded-full text-primary hover:bg-primary/10 transition-colors">
              <Share className="w-4.5 h-4.5" />
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}

function ActionButton({ icon: Icon, count }: { icon: React.ComponentType<{ className?: string }>; count: number }) {
  return (
    <button className="flex items-center gap-1 px-2 py-1.5 rounded-full text-sm text-primary hover:bg-primary/10 transition-colors">
      <Icon className="w-4.5 h-4.5" />
      <span>{count}</span>
    </button>
  )
}