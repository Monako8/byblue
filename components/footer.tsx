"use client"

import { useState } from "react"
import Link from "next/link"
import { Mail } from "lucide-react"
import type { TabType } from "./tabs-navigation"

interface FooterProps {
  onNavigate: (tab: TabType) => void
}

export function Footer({ onNavigate }: FooterProps) {
  const [formState, setFormState] = useState({
    name: "",
    contact: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Данные вашего Telegram-бота
    const TOKEN = "8449729367:AAH-G2GCPJEVyzRQ5N0_d9sTlohOszD62Xg"
    const CHAT_ID = "759208789"
    const URI_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`

    // Формируем сообщение
    const fullMessage = `<b>🚀 НОВЫЙ ЗАКАЗ!</b>\n\n👤 <b>Имя:</b> ${formState.name}\n📱 <b>Контакт:</b> ${formState.contact}\n📝 <b>Проект:</b> ${formState.message}`

    try {
      const response = await fetch(URI_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          parse_mode: "html",
          text: fullMessage,
        }),
      })

      if (response.ok) {
        setSubmitted(true)
        setFormState({ name: "", contact: "", message: "" })
        
        // Через 4 секунды возвращаем форму обратно, если клиент захочет написать ещё раз
        setTimeout(() => setSubmitted(false), 4000)
      } else {
        alert("❌ Ошибка. Убедитесь, что ваш бот запущен (нажмите /start в диалоге с ним).")
      }
    } catch (error) {
      alert("❌ Ошибка сети. Не удалось отправить сообщение.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <footer className="bg-gradient-to-br from-secondary to-secondary/50 border-t border-border">
      <div className="p-6 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="flex flex-col gap-3">
            <img
              src="/images/logobabyblue.webp"
              alt="byblue"
              className="h-12 w-auto object-contain object-left"
            />
            <img
              src="/images/onecat.webp"
              alt="Арт & Дизайн"
              className="w-auto max-w-[280px] object-contain object-left"
            />
            <div className="flex gap-3 mt-2">
              <a
                href="https://t.me/celestinabluee"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 bg-foreground text-background rounded-xl flex items-center justify-center text-sm font-semibold hover:opacity-80 hover:-translate-y-0.5 transition-all"
              >
                TG
              </a>
              <a
                href="https://instagram.com/celestinabluee"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 bg-foreground text-background rounded-xl flex items-center justify-center text-sm font-semibold hover:opacity-80 hover:-translate-y-0.5 transition-all"
              >
                IG
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 bg-foreground text-background rounded-xl flex items-center justify-center text-sm font-semibold hover:opacity-80 hover:-translate-y-0.5 transition-all"
              >
                YT
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-lg font-bold text-foreground mb-5">Навигация</h4>
            <ul className="flex flex-col gap-3.5">
              {[
                { id: "home" as const, label: "Главная" },
                { id: "art" as const, label: "Арт" },
                { id: "design" as const, label: "Дизайн" },
                { id: "web" as const, label: "Web" },
                { id: "animation" as const, label: "Анимация" },
                { id: "contacts" as const, label: "Контакты" },
              ].map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => onNavigate(item.id)}
                    className="text-[15px] text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
              <li>
                <Link
                  href="/shop"
                  className="text-[15px] text-muted-foreground hover:text-primary transition-colors"
                >
                  Магазин
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Form */}
          <div className="md:col-span-2 bg-background/80 backdrop-blur-md rounded-3xl p-6 border border-background/90 shadow-lg">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center">
                <Mail className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-bold text-foreground">Есть проект?</h3>
            </div>

            {submitted ? (
              <div className="text-center text-emerald-600 py-5 font-medium">
                {"✨ Магия сработала! Сообщение уже у меня."}
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Твоё имя"
                  required
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  className="w-full px-4 py-3 bg-background border border-border/50 rounded-xl text-[15px] placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                />
                <input
                  type="text"
                  placeholder="Email или ТГ"
                  required
                  value={formState.contact}
                  onChange={(e) => setFormState({ ...formState, contact: e.target.value })}
                  className="w-full px-4 py-3 bg-background border border-border/50 rounded-xl text-[15px] placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                />
                <textarea
                  placeholder="О чём проект?"
                  rows={2}
                  required
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  className="w-full px-4 py-3 bg-background border border-border/50 rounded-xl text-[15px] placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all resize-none md:col-span-2"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="md:col-span-2 py-3 bg-foreground text-background rounded-xl text-base font-semibold hover:opacity-90 hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Магия в пути..." : "Отправить магию"}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-sm text-muted-foreground mt-12 pt-6 border-t border-foreground/10">
          {"© 2026 Все права защищены. Сделано с 💗 и вдохновением."}
        </div>
      </div>
    </footer>
  )
}