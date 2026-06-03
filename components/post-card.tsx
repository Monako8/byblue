"use client";

import { useRef, useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

export interface MediaItem {
  src: string;
  type: "image" | "video" | "gif";
  poster?: string;
  preview?: string;
}

export interface ServiceItem {
  icon: string;
  title: string;
  description: string;
}

export interface PostData {
  id: string;
  author: string;
  avatar: string;
  time: string;
  text: string;
  services?: ServiceItem[];
  footerText?: string;
  headerImage?: string;
  tools?: string[];
  media?: MediaItem[];
  likes: number;
  comments: number;
  reposts: number;
  pinned?: boolean;
  category?: "art" | "design" | "web" | "animation";
}

interface PostCardProps {
  post: PostData;
  onMediaClick: (src: string, allMedia: MediaItem[]) => void;
}

export function PostCard({ post, onMediaClick }: PostCardProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [hasDragged, setHasDragged] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setHasDragged(false);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  }, []);
  
  const handleMouseLeave = useCallback(() => setIsDragging(false), []);
  const handleMouseUp = useCallback(() => setIsDragging(false), []);
  
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    if (Math.abs(walk) > 5) setHasDragged(true);
    scrollRef.current.scrollLeft = scrollLeft - walk;
  }, [isDragging, scrollLeft, startX]);

  const handleMediaItemClick = (item: MediaItem) => {
    if (!hasDragged && post.media) {
      onMediaClick(item.src, post.media);
    }
  };

  return (
    <article 
      className="relative z-20 p-8 rounded-3xl bg-card shadow-sm border border-foreground/20 overflow-hidden"
      style={{ 
        contentVisibility: 'auto',
        backgroundImage: "linear-gradient(45deg, hsl(var(--foreground)/0.03) 25%, transparent 25%, transparent 75%, hsl(var(--foreground)/0.03) 75%, hsl(var(--foreground)/0.03)), linear-gradient(45deg, hsl(var(--foreground)/0.03) 25%, transparent 25%, transparent 75%, hsl(var(--foreground)/0.03) 75%, hsl(var(--foreground)/0.03))",
        backgroundSize: "20px 20px",
        backgroundPosition: "0 0, 10px 10px"
      }}
    >
      {post.headerImage && (
        <div className="flex justify-start mb-6 pl-4">
          <div className="relative w-full max-w-[180px] aspect-[4/1] overflow-hidden">
            <Image src={post.headerImage} alt="header" fill className="object-contain" priority />
          </div>
        </div>
      )}
      
      <div className="flex-1 min-w-0 relative z-10">
        {/* ИСПРАВЛЕННЫЙ БЛОК: вывод текста с поддержкой HTML-ссылок */}
        <div 
          className="text-[16px] leading-relaxed text-foreground mb-6 font-sans"
          dangerouslySetInnerHTML={{ 
            __html: post.text.replace(/\n/g, '<br/>') 
          }}
        />

        {post.services && (
          <div className="space-y-4 mb-6">
            {post.services.map((service, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="relative w-6 h-6 flex-shrink-0">
                  <Image src={service.icon} alt={service.title} fill className="object-contain" />
                </div>
                <p className="text-[16px] text-foreground">
                  <span>{service.title}</span> {service.description}
                </p>
              </div>
            ))}
          </div>
        )}

        {post.footerText && (
          <p className="mt-4 mb-8 text-[16px] text-foreground">
            {post.footerText}
          </p>
        )}

        {post.tools && (
          <div className="flex flex-wrap gap-2 mb-8">
            {post.tools.map((tool, i) => {
              const colors = ["#93B8E6", "#8A97AC", "#A8A8C0", "#BCCBE0", "#99AACC"];
              return (
                <div key={i} className="px-4 py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-wider text-white shadow-sm hover:scale-[1.02] transition-transform select-none" style={{ backgroundColor: colors[i % colors.length] }}>
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
            {post.media.map((item, i) => (
              <div key={i} className="relative flex-shrink-0 w-[180px] h-[240px] rounded-xl overflow-hidden cursor-pointer hover:scale-[1.02] transition-transform bg-muted border-4 border-white shadow-[0_0_0_1px_#b5b5b5]" onClick={() => handleMediaItemClick(item)}>
                <Image src={item.preview || item.src} alt="media" fill sizes="180px" className="object-cover" draggable={false} />
              </div>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}