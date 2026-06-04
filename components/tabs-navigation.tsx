"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import Image from "next/image"
import { useState, useLayoutEffect } from "react"

export const TABS = [
  { id: "home", label: "Главная" },
  { id: "art", label: "Арт" },
  { id: "design", label: "Дизайн" },
  { id: "web", label: "Web" },
  { id: "animation", label: "Анимация" },
  { id: "contacts", label: "Контакты" },
] as const

export type TabType = typeof TABS[number]["id"]

export function TabsNavigation({ activeTab, onTabChange }: { activeTab: TabType; onTabChange: (tab: TabType) => void }) {
  const [isReady, setIsReady] = useState(false)

  useLayoutEffect(() => {
    if (document.readyState === 'complete') {
      setIsReady(true)
      return
    }
    const handleLoaded = () => setIsReady(true)
    window.addEventListener('loaderFinished', handleLoaded)
    return () => window.removeEventListener('loaderFinished', handleLoaded)
  }, [])

  if (!isReady) return <div className="h-[47px] w-full border-b border-border" />

  return (
    // Добавили md:flex-1, чтобы на ПК контейнер вел себя иначе
    <div className="relative flex w-full border-b border-border bg-background overflow-x-auto scroll-smooth flex-nowrap [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      {TABS.map((tab) => {
        const isActive = activeTab === tab.id
        
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            /* flex-shrink-0: на мобильных (по умолчанию) кнопка не сжимается
               md:flex-1: на ПК (от 768px+) кнопка растягивается на всю ширину
            */
            className={cn(
              "relative flex-shrink-0 md:flex-1 min-w-[85px] px-4 py-3 text-center text-[15px] font-medium text-muted-foreground transition-colors hover:text-foreground touch-pan-x",
              isActive && "text-foreground"
            )}
          >
            {tab.label}

            {isActive && (
              <motion.div
                className="pointer-events-none absolute -bottom-[7px] left-0 right-0 z-[60] flex items-center justify-center"
                layoutId="activeTabIndicator"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <div className="relative h-3.5 w-3.5">
                  <Image 
                    src="/vajno.webp" 
                    alt="" 
                    fill 
                    className="object-contain"
                    priority
                  />
                </div>
              </motion.div>
            )}
          </button>
        )
      })}
    </div>
  )
}