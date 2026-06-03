"use client"

import { useState, useEffect } from "react"

export function Preloader() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Имитируем ожидание загрузки (можно убрать таймер, если нужно)
    const timer = setTimeout(() => setLoading(false), 1200)
    return () => clearTimeout(timer)
  }, [])

  if (!loading) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <img
        src="/images/onecat.webp" // Путь к вашей картинке
        alt="Loading..."
        className="w-24 h-24 animate-spin" // Вращается бесконечно, пока загружается
      />
    </div>
  )
}