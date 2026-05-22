"use client"

import { ArrowUpRight } from "lucide-react"

const contactLinks = [
  {
    id: "telegram",
    name: "Telegram",
    handle: "@celestinabluee",
    href: "https://t.me/Monakoo8",
    icon: "TG",
  },
  {
    id: "email",
    name: "Email",
    handle: "thekristen3443@gmail.com",
    href: "mailto:thekristen3443@gmail.com",
    icon: "EM",
  },
  {
    id: "website",
    name: "tiktok",
    handle: "babyblue",
    href: "https://www.tiktok.com/@celestinabluue",
    icon: "TT",
  },
  {
    id: "instagram",
    name: "Instagram",
    handle: "@celestinabluee",
    href: "https://instagram.com/celestinabluee",
    icon: "IG",
  },
    {
    id: "thr",
    name: "threads",
    handle: "@celestinabluee",
    href: "https://www.threads.com/@celestinabluee",
    icon: "TH",
  },
]

const pricing = [
  { service: "Иллюстрация", price: "от 4 000 ₽", time: "3–7 дней" },
  { service: "Логотип", price: " 5 000 ₽", time: "3-4 дня" },
  { service: "Айдентика", price: "от 9 500 ₽", time: "7–12 дней" },
  { service: "UI/UX дизайн", price: "по запросу", time: "обсуждается" },
  { service: "Концепт-арт", price: "6 000 ₽", time: "5–7 дней" },
  { service: "Стикер (за шт.)", price: "550 ₽", time: "2 дня" },
  { service: "10 иллюстраций оптом", price: "14 500 ₽", time: "12 дней" },
  { service: "3D анимация / моделирование", price: "по запросу", time: "обсуждается" },
  { service: "Разработка персонажа / Маскот", price: " 3 500 ₽", time: "3 дня" },
  { service: "Оформление соцсетей (аватар, баннер)", price: "от 3 000 ₽", time: "3-5 дней" },
  { service: "Разработка бейджей / Иконок (за шт.)", price: "500 ₽", time: "1-2 дня" },
  { service: "Пак из 10 стикеров для Telegram", price: "4 500 ₽", time: "5-7 дней" },
  { service: "Обложка (для трека / книги / YouTube)", price: "от 3 500 ₽", time: "4-6 дней" },
  { service: "Дизайн Landing Page (Одностраничник)", price: "от 12 000 ₽", time: "5-7 дней" },
  { service: "Дизайн многостраничного сайта", price: "от 25 000 ₽", time: "10-15 дней" },
  { service: "Дизайн мобильного приложения (за экран)", price: "от 1 500 ₽", time: "обсуждается" },
  { service: "Редизайн текущего сайта", price: "от 10 000 ₽", time: "5-10 дней" },
  { service: "Разработка сайта HTML(под ключ)", price: "от 20 000 ₽", time: "7-14 дней" },
  { service: "Покадровая 2D анимация (за 1 сек.)", price: "от 3 000 ₽", time: "обсуждается" },
  { service: "Анимированный стикер (Telegram / GIF)", price: "от 1 500 ₽", time: "2-4 дня" },
  { service: "Покадровая анимация персонажа (цикл)", price: "от 5 000 ₽", time: "4-7 дней" },
  { service: "Анимированная иллюстрация (заставка)", price: "от 8 000 ₽", time: "5-10 дней" },
  
]

const processSteps = [
  { num: "01", title: "Бриф", desc: "Вы описываете задачу, референсы и срок." },
  { num: "02", title: "Оценка", desc: "Я рассматриваю проект и называю стоимость." },
  { num: "03", title: "Предоплата", desc: "50% перед началом работы." },
  { num: "04", title: "Результат", desc: "Итоговые файлы + правки включены." },
]

export function ContactsPage() {
  return (
    <div className="p-4">
      {/* Status Badge */}
      <div className="flex items-center gap-2 p-3 px-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-600 text-sm mb-6">
        <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse-slow" />
        <span>{" Комиссии открыты · Свободна для проектов"}</span>
      </div>
      
      {/* Contact Links */}
      <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3">Связаться</h3>
      <div className="flex flex-col gap-2.5 mb-6">
        {contactLinks.map((link) => (
          <a
            key={link.id}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3.5 px-4 bg-gradient-to-r from-secondary to-secondary/50 border border-border rounded-xl hover:scale-[1.02] transition-transform"
          >
            <div className="w-10 h-10 bg-foreground rounded-lg flex items-center justify-center text-background text-sm font-semibold">
              {link.icon}
            </div>
            <div className="flex-1">
              <div className="font-semibold text-foreground text-[15px]">{link.name}</div>
              <div className="text-sm text-muted-foreground">{link.handle}</div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-primary" />
          </a>
        ))}
      </div>
      
      {/* Pricing */}
      <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3">Услуги и цены</h3>
      <div className="border border-border rounded-xl overflow-hidden mb-6">
        {pricing.map((item, i) => (
          <div
            key={item.service}
            className={`flex justify-between items-center p-4 ${i < pricing.length - 1 ? "border-b border-border" : ""}`}
          >
            <span className="text-foreground">{item.service}</span>
            <div className="text-right">
              <div className="font-semibold text-foreground">{item.price}</div>
              <div className="text-xs text-muted-foreground">{item.time}</div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Process */}
      <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3">Как это работает</h3>
      <div className="flex flex-col gap-4">
        {processSteps.map((step) => (
          <div key={step.num} className="flex gap-4">
            <span className="font-mono font-bold text-primary min-w-6">{step.num}</span>
            <div>
              <h4 className="font-semibold text-foreground mb-1">{step.title}</h4>
              <p className="text-sm text-muted-foreground">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
