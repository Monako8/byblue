import * as React from 'react'

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  // Инициализируем состояние сразу при загрузке, чтобы избежать undefined
  const [isMobile, setIsMobile] = React.useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`).matches
    }
    return false
  })

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    
    const onChange = () => {
      setIsMobile(mql.matches)
    }

    // Добавляем слушатель изменений
    mql.addEventListener('change', onChange)
    
    // Устанавливаем актуальное состояние
    setIsMobile(mql.matches)
    
    // Очистка слушателя при размонтировании
    return () => mql.removeEventListener('change', onChange)
  }, [])

  return isMobile
}