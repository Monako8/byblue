"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import Image from "next/image"
import { useState, useLayoutEffect, useMemo } from "react"

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

  // useLayoutEffect срабатывает быстрее useEffect, до того как браузер отрисует экран.
  // Это критично для предотвращения "скачков" при первом рендере.
  useLayoutEffect(() => {
    if (document.readyState === 'complete') {
      setIsReady(true)
      return
    }

    const handleLoaded = () => setIsReady(true)
    window.addEventListener('loaderFinished', handleLoaded)
    return () => window.removeEventListener('loaderFinished', handleLoaded)
  }, [])

  // Мемоизируем стили, чтобы при каждом рендере не пересчитывать позиции
  const indicatorStyle = useMemo(() => {
    const index = TABS.findIndex(t => t.id === activeTab)
    return {
      left: `${(index / TABS.length) * 100}%`,
      width: `${100 / TABS.length}%`
    }
  }, [activeTab])

  // Рендерим пустой блок с теми же размерами, чтобы не было "прыжка" контента
  if (!isReady) return <div className="h-[47px] w-full border-b border-border" />

  return (
    <div className="relative flex w-full border-b border-border bg-background">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={cn(
            "relative flex-1 min-w-[80px] py-3 text-center text-[15px] font-medium text-muted-foreground transition-colors hover:text-foreground",
            activeTab === tab.id && "text-foreground"
          )}
        >
          {tab.label}
        </button>
      ))}

      <motion.div
        className="pointer-events-none absolute -bottom-[7px] z-[60] flex items-center justify-center"
        layoutId="activeTabIndicator"
        transition={{ type: "spring", stiffness: 400, damping: 35 }}
        style={indicatorStyle}
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
    </div>
  )
}