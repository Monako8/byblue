"use client"

import Link from "next/link"
import { MapPin } from "lucide-react"

export function ProfileHeader() {
  return (
    <div className="p-4">
      <div className="flex items-center justify-between flex-wrap gap-4">
        {/* Левая часть: Аватар и имя */}
        <div className="flex items-center gap-4">
          {/* Контейнер аватара с эффектом скрапбукинга и медленным поворотом */}
          <div className="group cursor-pointer"> 
            <img
              src="/images/onecat.webp"
              alt="Celestinablue avatar"
              className="w-17 h-auto object-contain drop-shadow-md rotate-[-3deg] transition-all duration-[2000ms] ease-in-out group-hover:rotate-[357deg]"
            />
          </div>
          
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
            <span><strong className="text-foreground"></strong> </span>
            <span><strong className="text-foreground"></strong> </span>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Кнопка 3D Галереи */}
            <Link
              href="/museum"
              className="w-17 h-17 flex items-center justify-center hover:scale-105 transition-transform"
              aria-label="3D Галерея"
            >
              <img 
                src="/gallerys.webp" 
                alt="Галерея" 
                className="w-full h-full object-contain"
              />
            </Link>

            {/* Кнопка Магазин */}
            <Link
              href="/shop"
              className="w-17 h-17 flex items-center justify-center hover:scale-105 transition-transform"
              aria-label="Магазин"
            >
              <img 
                src="/shops.webp" 
                alt="Магазин" 
                className="w-full h-full object-contain"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}