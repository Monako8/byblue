"use client"

import { cn } from "@/lib/utils"

export type TabType = "home" | "art" | "design" | "web" | "animation" | "contacts"

interface TabsNavigationProps {
  activeTab: TabType
  onTabChange: (tab: TabType) => void
}

const tabs: { id: TabType; label: string }[] = [
  { id: "home", label: "Главная" },
  { id: "art", label: "Арт" },
  { id: "design", label: "Дизайн" },
  { id: "web", label: "Web" },
  { id: "animation", label: "Анимация" },
  { id: "contacts", label: "Контакты" },
]

export function TabsNavigation({ activeTab, onTabChange }: TabsNavigationProps) {
  return (
    <div className="flex border-b border-border overflow-x-auto bg-background">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={cn(
            "flex-1 min-w-[80px] text-center py-3 text-[15px] font-medium text-muted-foreground relative cursor-pointer transition-colors hover:text-foreground",
            activeTab === tab.id && "text-foreground"
          )}
        >
          {tab.label}
          {activeTab === tab.id && (
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-primary rounded-sm" />
          )}
        </button>
      ))}
    </div>
  )
}
