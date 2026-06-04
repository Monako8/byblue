"use client"

import { useState, useCallback } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, ShoppingBag, X } from "lucide-react"
import { Lightbox } from "@/components/lightbox"
import { Footer } from "@/components/footer"
import type { MediaItem } from "@/components/post-card"

interface ShopItem {
  id: string
  title: string
  description: string
  price: string
  image: string
  category: string
  payUrl: string 
}

const shopItems: ShopItem[] = [
  {
    id: "1", // Unique ID
    title: "Векторные иконки (Звезды)",
    description: "9 иконок, ai, svg, png",
    price: "800₽",
    image: "/magazine/stars.webp",
    category: "Иконки",
    payUrl: "https://yoomoney.ru/quickpay/confirm.xml?receiver=4100116871003718&quickpay-form=shop&targets=%D0%9E%D0%BF%D0%BB%D0%B0%D1%82%D0%B0%3A%20%D0%9D%D0%B0%D0%B1%D0%BE%D1%80%20%D0%B2%D0%B5%D0%BA%D1%82%D0%BE%D1%80%D0%BD%D1%8B%D1%85%20%D0%B8%D0%BA%D0%BE%D0%BD%D0%BE%D0%BA&sum=800&need-email=true"
  },
{
    id: "2", // Changed to a unique ID
    title: "Векторные иконки (Фрезы)",
    description: "9 иконок, ai, svg, png",
    price: "800₽",
    image: "/magazine/sverla.webp",
    category: "Иконки",
    payUrl: "https://yoomoney.ru/quickpay/confirm.xml?receiver=4100116871003718&quickpay-form=shop&targets=%D0%9E%D0%BF%D0%BB%D0%B0%D1%82%D0%B0%3A%20%D0%9D%D0%B0%D0%B1%D0%BE%D1%80%20%D0%B2%D0%B5%D0%BA%D1%82%D0%BE%D1%80%D0%BD%D1%8B%D1%85%20%D0%B8%D0%BA%D0%BE%D0%BD%D0%BE%D0%BA&sum=800&need-email=true"
  },
  {
    id: "3", // Changed to a unique ID
    title: "Персонажи «BG»",
    description: "2 персонажа png, psd",
    price: "1500₽",
    image: "/magazine/girlboy.webp",
    category: "Персонажи",
    payUrl: "https://yoomoney.ru/quickpay/confirm.xml?receiver=4100116871003718&quickpay-form=shop&targets=%D0%9E%D0%BF%D0%BB%D0%B0%D1%82%D0%B0%3A%20%D0%9D%D0%B0%D0%B1%D0%BE%D1%80%20%D0%B2%D0%B5%D0%BA%D1%82%D0%BE%D1%80%D0%BD%D1%8B%D1%85%20%D0%B8%D0%BA%D0%BE%D0%BD%D0%BE%D0%BA&sum=1500&need-email=true"
  },
    {
    id: "4", // Changed to a unique ID
    title: "«Милые зарисовки»",
    description: "13 стикеров/иконок png",
    price: "800₽",
    image: "/magazine/сutesketches.webp",
    category: "Стикеры",
    payUrl: "https://yoomoney.ru/quickpay/confirm.xml?receiver=4100116871003718&quickpay-form=shop&targets=%D0%9E%D0%BF%D0%BB%D0%B0%D1%82%D0%B0%3A%20%D0%9D%D0%B0%D0%B1%D0%BE%D1%80%20%D0%B2%D0%B5%D0%BA%D1%82%D0%BE%D1%80%D0%BD%D1%8B%D1%85%20%D0%B8%D0%BA%D0%BE%D0%BD%D0%BE%D0%BA&sum=800&need-email=true"
  },
      {
    id: "5", // Changed to a unique ID
    title: "Узор «Канада»",
    description: "1 узор, png, ai, tiff(SMYK), pdf, svg",
    price: "750₽",
    image: "/magazine/pattern.webp",
    category: "Узор",
    payUrl: "https://yoomoney.ru/quickpay/confirm.xml?receiver=4100116871003718&quickpay-form=shop&targets=%D0%9E%D0%BF%D0%BB%D0%B0%D1%82%D0%B0%3A%20%D0%9D%D0%B0%D0%B1%D0%BE%D1%80%20%D0%B2%D0%B5%D0%BA%D1%82%D0%BE%D1%80%D0%BD%D1%8B%D1%85%20%D0%B8%D0%BA%D0%BE%D0%BD%D0%BE%D0%BA&sum=750&need-email=true"
  },
        {
    id: "6", // Changed to a unique ID
    title: "Узор «Фиол»",
    description: "1 узор, png, ai, tiff(SMYK), pdf, svg",
    price: "750₽",
    image: "/magazine/patternfiol.webp",
    category: "Узор",
    payUrl: "https://yoomoney.ru/quickpay/confirm.xml?receiver=4100116871003718&quickpay-form=shop&targets=%D0%9E%D0%BF%D0%BB%D0%B0%D1%82%D0%B0%3A%20%D0%9D%D0%B0%D0%B1%D0%BE%D1%80%20%D0%B2%D0%B5%D0%BA%D1%82%D0%BE%D1%80%D0%BD%D1%8B%D1%85%20%D0%B8%D0%BA%D0%BE%D0%BD%D0%BE%D0%BA&sum=750&need-email=true"
  },
          {
    id: "7", // Changed to a unique ID
    title: "Картина «Я никто»",
    description: "Холст 40x50, акрил,бумага,картон,доставка",
    price: "15000₽",
    image: "/magazine/kartina.webp",
    category: "Картина на холсте",
    payUrl: "https://yoomoney.ru/quickpay/confirm.xml?receiver=4100116871003718&quickpay-form=shop&targets=%D0%9E%D0%BF%D0%BB%D0%B0%D1%82%D0%B0%3A%20%D0%9D%D0%B0%D0%B1%D0%BE%D1%80%20%D0%B2%D0%B5%D0%BA%D1%82%D0%BE%D1%80%D0%BD%D1%8B%D1%85%20%D0%B8%D0%BA%D0%BE%D0%BD%D0%BE%D0%BA&sum=15000&need-email=true"
  },
]

export default function ShopPage() {
  const router = useRouter()
  const [lightboxMedia, setLightboxMedia] = useState<MediaItem[]>([])
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  // Состояния для модального окна и выбранного товара
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<ShopItem | null>(null)
  const [email, setEmail] = useState("")
  const [telegram, setTelegram] = useState("")
  const [formError, setFormError] = useState("")

  const handleImageClick = useCallback((src: string) => {
    setLightboxMedia([{ src, type: "image" }])
    setLightboxIndex(0)
    setLightboxOpen(true)
  }, [])

  const handleFooterNavigate = () => {
    router.push("/")
  }

  const handlePurchaseClick = (item: ShopItem) => {
    setSelectedItem(item)
    setIsModalOpen(true)
  }

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Валидация Email
    if (!email.trim() || !email.includes("@")) {
      setFormError("Пожалуйста, введите корректный Email")
      return
    }

    // Валидация Telegram
    if (!telegram.trim()) {
      setFormError("Пожалуйста, укажите ваш Telegram")
      return
    }

    if (!selectedItem) return

    setFormError("")
    setIsModalOpen(false)

    // Твои настройки Telegram-бота
    const TOKEN = "8449729367:AAH-G2GCPJEVyzRQ5N0_d9sTlohOszD62Xg"
    const CHAT_ID = "759208789"
    const URI_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`

    // Форматируем юзернейм для генерации красивой ссылки на аккаунт в ТГ
    const cleanTg = telegram.startsWith("@") ? telegram.substring(1) : telegram

    // Оформляем сообщение для Telegram
    const tgMessage = `<b>🛍️ НОВЫЙ ЗАКАЗ В МАГАЗИНЕ</b>\n\n` +
                      `📦 <b>Товар:</b> ${selectedItem.title}\n` +
                      `💰 <b>Сумма:</b> ${selectedItem.price}\n\n` +
                      `👤 <b>Контакты покупателя:</b>\n` +
                      `✉️ <b>Email:</b> <code>${email}</code>\n` +
                      `📱 <b>Telegram:</b> <a href="https://t.me/${cleanTg}">@${cleanTg}</a>`

    // Отправляем уведомление в Telegram
    try {
      fetch(URI_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          parse_mode: "html",
          text: tgMessage,
        }),
      })
    } catch (error) {
      console.error("Не удалось отправить уведомление в TG:", error)
    }

    // Твоя защищенная ссылка возврата (поменяй домен на свой после деплоя на Vercel)
    const returnUrl = `https://твой-сайт.ru/success?token=secret_diplom_2026_verified&item=${selectedItem.id}`
    
    // Собираем ссылку ЮMoney с автозаполнением почты и редиректами успеха/ошибки
    const finalUrl = `${selectedItem.payUrl}` +
                     `&cps_email=${encodeURIComponent(email)}` +
                     `&shopFailURL=${encodeURIComponent(returnUrl)}` +
                     `&shopSuccessURL=${encodeURIComponent(returnUrl)}`
    
    // Сбрасываем поля и открываем платежную страницу
    setEmail("") 
    setTelegram("")
    window.open(finalUrl, "_blank", "noopener,noreferrer")
  }

return (
    <div className="max-w-[800px] mx-auto border-x border-border min-h-screen bg-background flex flex-col justify-between relative">
      <div>
        <header className="sticky top-0 z-20 bg-background/95 backdrop-blur-md border-b border-border">
          <div className="flex items-center gap-4 p-4">
            <Link href="/" className="p-2 -ml-2 rounded-full hover:bg-secondary transition-colors">
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </Link>
            <div className="flex items-center gap-2">
              <Link href="/shop" className="w-9 h-9 flex items-center justify-center hover:scale-105 transition-transform" aria-label="Магазин">
                <img src="/shops.webp" alt="Магазин" className="w-full h-full object-contain" />
              </Link>
              <h1 className="text-xl font-bold text-foreground">Магазин</h1>
            </div>
          </div>
        </header>

        <main className="p-4">
          <div className="mb-6"><p className="text-muted-foreground">Готовые цифровые продукты и авторская живопись</p></div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {shopItems.map((item) => (
              <div key={item.id} className="group bg-secondary/30 rounded-2xl overflow-hidden border border-border hover:border-primary/50 transition-all">
                <div className="aspect-square relative overflow-hidden">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 cursor-pointer" onClick={() => handleImageClick(item.image)} />
                  <span className="absolute top-2 left-2 px-2 py-1 bg-background/90 backdrop-blur-sm rounded-lg text-xs text-muted-foreground">{item.category}</span>
                </div>
                <div className="p-3">
                  <h3 className="font-semibold text-sm text-foreground line-clamp-1">{item.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{item.description}</p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-primary font-bold">{item.price}</span>
                    <button 
                      onClick={() => handlePurchaseClick(item)}
                      style={{ backgroundColor: '#ECECEC' }}
                      className="px-3 py-1.5 text-black text-xs font-medium rounded-lg hover:opacity-80 transition-opacity"
                    >
                      Купить
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-4 bg-secondary/30 rounded-2xl border border-border">
            <h3 className="font-semibold text-foreground mb-2">Как это работает?</h3>
            <ul className="text-sm text-muted-foreground space-y-1.5">
              <li>1. Выберите товар и нажмите «Купить»</li>
              <li>2. Введите вашу почту и аккаунт Telegram</li>
              <li>3. Получите доступ к файлам сразу после оплаты</li>
            </ul>
          </div>

          <div className="mt-6 mb-8 text-center">
            <Link href="/" className="text-primary hover:underline text-sm">← Вернуться на главную</Link>
          </div>
        </main>
      </div>

      {isModalOpen && selectedItem && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div style={{ maxWidth: '380px', width: '100%' }} className="bg-background border border-border rounded-2xl p-6 shadow-2xl relative flex flex-col gap-5 animate-in fade-in zoom-in-95 duration-200">
            <button onClick={() => { setIsModalOpen(false); setFormError(""); }} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors p-1.5 rounded-xl hover:bg-secondary">
              <X className="w-4 h-4" />
            </button>
            <div className="text-left">
              <h3 className="text-lg font-bold text-foreground tracking-tight">Оформление заказа</h3>
              <p className="text-xs text-muted-foreground mt-1 leading-normal">Контакты необходимы для отправки и открытия защищенного доступа к архиву после платежа.</p>
            </div>
            <div className="bg-secondary/40 p-4 rounded-xl border border-border/60 flex flex-col gap-1 text-left">
              <span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">Вы заказываете:</span>
              <p className="font-semibold text-sm text-foreground leading-tight line-clamp-2">{selectedItem.title}</p>
              <p className="text-primary font-bold text-base mt-1">{selectedItem.price}</p>
            </div>
            <form onSubmit={handlePaymentSubmit} className="flex flex-col gap-4 text-left">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-foreground/80 pl-1">Электронная почта</label>
                <input type="email" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2.5 border border-input rounded-xl text-sm bg-background text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm" required />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-foreground/80 pl-1">Ваш Telegram</label>
                <input type="text" placeholder="@username" value={telegram} onChange={(e) => setTelegram(e.target.value)} className="w-full px-4 py-2.5 border border-input rounded-xl text-sm bg-background text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm" required />
              </div>
              {formError && <p className="text-xs text-destructive font-medium pl-1">{formError}</p>}
              <button
                type="submit"
                style={{ backgroundColor: '#ECECEC' }}
                className="w-full text-black font-semibold py-3 rounded-xl text-sm hover:opacity-80 active:scale-[0.98] transition-all shadow-md mt-1"
              >
                Перейти к оплате через ЮMoney
              </button>
            </form>
          </div>
        </div>
      )}

      <Footer onNavigate={handleFooterNavigate} />
      <Lightbox
        media={lightboxMedia}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNext={() => setLightboxIndex((lightboxIndex + 1) % lightboxMedia.length)}
        onPrev={() => setLightboxIndex((lightboxIndex - 1 + lightboxMedia.length) % lightboxMedia.length)}
      />
    </div>
  )
}