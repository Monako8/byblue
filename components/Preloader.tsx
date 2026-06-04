"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function Preloader() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      // Отправляем сигнал, что пора проявлять навигацию
      window.dispatchEvent(new Event('loaderFinished'))
      setLoading(false)
    }, 1200)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }} // Плавное исчезновение 0.5с
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
        >
          <img
            src="/images/onecat.webp"
            alt="Loading..."
            className="h-24 w-24 animate-spin"
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}