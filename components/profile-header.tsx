"use client"

import Link from "next/link"
import { MapPin, ShoppingBag, GalleryVertical } from "lucide-react"

export function ProfileHeader() {
  return (
    <div className="p-4">
      <div className="flex items-center justify-between flex-wrap gap-4">
        {/* Левая часть: Аватар и имя */}
        <div className="flex items-center gap-3">
          <img
            src="/images/avatars.webp"
            alt="Celestinablue avatar"
            className="w-14 h-14 rounded-full object-cover border-2 border-primary"
          />
          <div>
            <h1 className="text-lg font-bold text-foreground">Celestinablue</h1>
            <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
              <MapPin className="w-3.5 h-3.5" />
              <span>Saint Petersburg</span>
            </div>
          </div>
        </div>
        
        {/* Правая часть: Статистика и кнопки */}
        <div className="flex items-center gap-4">
          <div className="flex gap-4 text-sm text-muted-foreground">
            <span><strong className="text-foreground">890</strong> подписок</span>
            <span><strong className="text-foreground">12.5K</strong> подписчиков</span>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Кнопка 3D Галереи */}
            <Link
              href="/museum"
              className="flex items-center justify-center w-10 h-10 bg-secondary text-secondary-foreground rounded-xl shadow-sm hover:scale-105 hover:bg-secondary/80 transition-all"
              aria-label="3D Галерея"
            >
              <GalleryVertical className="w-5 h-5" />
            </Link>

            {/* Кнопка Магазин */}
            <Link
              href="/shop"
              className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-primary to-accent text-primary-foreground rounded-xl shadow-lg shadow-primary/40 hover:scale-105 transition-transform"
              aria-label="Магазин"
            >
              <ShoppingBag className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
      
      {/* Информация о графике */}
      <div className="mt-4 text-[15px] text-muted-foreground leading-relaxed space-y-1">
        <div>{"🕐 Пн-Сб: 09:00 - 20:00 (МСК)"}</div>
        <div>{"💬 Отвечаю в течение 1 часа"}</div>
        <div className="mt-1">{"🌸 Работаю с 2019 года"}</div>
      </div>
    </div>
  )
}