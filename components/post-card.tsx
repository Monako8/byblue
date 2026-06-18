"use client";

import { useRef, useState, useCallback, memo, useMemo } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

// --- ТИПЫ ---
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
  onMediaClick: (src: string, allMedia: MediaItem[], index: number) => void;
}

// --- ХУК ДЛЯ СКРОЛЛА ---
function useDragScroll() {
  const ref = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const onMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    startX.current = e.pageX - (ref.current?.offsetLeft || 0);
    scrollLeft.current = ref.current?.scrollLeft || 0;
  };

  const onMouseLeave = () => setIsDragging(false);
  const onMouseUp = () => setIsDragging(false);
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (ref.current?.offsetLeft || 0);
    const walk = (x - startX.current) * 1.5;
    if (ref.current) ref.current.scrollLeft = scrollLeft.current - walk;
  };

  return { ref, isDragging, onMouseDown, onMouseLeave, onMouseUp, onMouseMove };
}

// --- КОМПОНЕНТ ПРЕВЬЮ ---
const MediaThumbnail = memo(function MediaThumbnail({ item, onClick }: { item: MediaItem, onClick: () => void }) {
  return (
    <div
      className="relative flex-shrink-0 w-[180px] h-[240px] rounded-xl overflow-hidden cursor-pointer bg-muted border-4 border-white shadow-[0_0_0_1px_#b5b5b5] hover:scale-[1.02] transition-transform"
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      <Image
        src={item.preview || item.src}
        alt="media"
        fill
        sizes="180px"
        className="object-cover"
        draggable={false}
      />
    </div>
  );
});

// --- ОСНОВНОЙ КОМПОНЕНТ ---
export const PostCard = memo(function PostCard({ post, onMediaClick }: PostCardProps) {
  const { ref: scrollRef, isDragging, ...dragHandlers } = useDragScroll();
  const toolColors = useMemo(() => ["#93B8E6", "#8A97AC", "#A8A8C0", "#BCCBE0", "#99AACC"], []);

  return (
    <article className="p-8 rounded-3xl bg-card shadow-sm border border-foreground/20 mb-6">
      {post.headerImage && (
        <div className="mb-6 pl-4">
          <div className="relative w-full max-w-[180px] aspect-[4/1]">
            <Image src={post.headerImage} alt="header" fill className="object-contain" />
          </div>
        </div>
      )}

      <div className="flex-1">
        {/* Текст с поддержкой HTML-ссылок */}
        <div 
          className="text-[16px] leading-relaxed text-foreground mb-6 whitespace-pre-line"
          dangerouslySetInnerHTML={{ __html: post.text }}
        />

        {post.services?.map((service, i) => (
          <div key={i} className="flex items-center gap-3 mb-4">
            <div className="relative w-6 h-6">
              <Image src={service.icon} alt={service.title} fill className="object-contain" />
            </div>
            <p className="text-[16px] text-foreground"><span className="font-bold">{service.title}</span> {service.description}</p>
          </div>
        ))}

        {post.footerText && <p className="mt-4 mb-8 text-[16px] text-foreground">{post.footerText}</p>}

        {post.tools && (
          <div className="flex flex-wrap gap-2 mb-8">
            {post.tools.map((tool, i) => (
              <div 
                key={i} 
                className="px-4 py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-wider text-white shadow-sm hover:scale-105 hover:opacity-90 transition-all duration-200 cursor-default"
                style={{ backgroundColor: toolColors[i % toolColors.length] }}
              >
                {tool}
              </div>
            ))}
          </div>
        )}

        {post.media && post.media.length > 0 && (
          <div
            ref={scrollRef}
            {...dragHandlers}
            className={cn(
              "flex gap-4 overflow-x-auto pb-2 select-none", 
              isDragging ? "cursor-grabbing" : "cursor-grab"
            )}
            style={{ scrollbarWidth: "none" }}
          >
            {post.media.map((item, i) => (
              <MediaThumbnail
                key={i}
                item={item}
                onClick={() => onMediaClick(item.src, post.media!, i)}
              />
            ))}
          </div>
        )}
      </div>
    </article>
  );
});