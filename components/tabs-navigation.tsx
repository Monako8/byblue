"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

export const TABS = [
  { id: "home", label: "Главная" },
  { id: "art", label: "Арт" },
  { id: "design", label: "Дизайн" },
  { id: "web", label: "Web" },
  { id: "animation", label: "Анимация" },
  { id: "contacts", label: "Контакты" },
] as const

export type TabType = typeof TABS[number]["id"]

export function TabsNavigation({ 
  activeTab, 
  onTabChange 
}: { 
  activeTab: TabType; 
  onTabChange: (tab: TabType) => void 
}) {
  return (
    <nav className="relative flex w-full border-b border-border bg-background overflow-x-auto scroll-smooth flex-nowrap no-scrollbar">
      {TABS.map((tab) => {
        const isActive = activeTab === tab.id
        
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "relative flex-shrink-0 md:flex-1 min-w-[85px] px-4 py-3 text-center text-[15px] font-medium text-muted-foreground transition-colors hover:text-foreground touch-pan-x",
              isActive && "text-foreground"
            )}
          >
            {tab.label}

            {isActive && (
              <motion.div
                className="pointer-events-none absolute -bottom-[4px] left-0 right-0 z-[60] flex justify-center will-change-transform"
                layoutId="activeTabIndicator"
                // layout: true помогает Framer Motion лучше отслеживать изменение размера родителя
                layout
                initial={false}
                transition={{ 
                  type: "spring", 
                  stiffness: 400, 
                  damping: 35 
                }}
              >
                <div className="h-2 w-2 rounded-full bg-foreground/30" />
              </motion.div>
            )}
          </button>
        )
      })}
    </nav>
  )
}