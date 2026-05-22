import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import Script from 'next/script'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Babyblue - Art Design Web Concept',
  description: 'Арт-дирекшн, графический дизайн, иллюстрация, web-дизайн',
  generator: 'app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru" className="bg-background">
      <body className={`${_geist.className} font-sans antialiased`}>
        
        {/* Скрытый технический контейнер для Google */}
        <div id="google_translate_element" style={{ display: 'none' }}></div>

        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}

        {/* Скрипт для отладки белого экрана (поможет увидеть ошибку прямо в браузере) */}
        <Script id="debug-error" strategy="beforeInteractive">
          {`window.onerror = function(msg, url, line) { console.error('Error: ' + msg + ' at ' + line); };`}
        </Script>

        {/* Настройка переводчика с защитой */}
        <Script id="google-translate-init" strategy="afterInteractive">
          {`
            function googleTranslateElementInit() {
              new google.translate.TranslateElement({
                pageLanguage: 'ru',
                includedLanguages: 'en,ru',
                autoDisplay: false
              }, 'google_translate_element');
            }

            // Безопасная функция для переключения языка
            window.changeLanguage = function(langCode) {
              var select = document.querySelector('.goog-te-combo');
              if (select) {
                select.value = langCode;
                select.dispatchEvent(new Event('change'));
              } else {
                console.warn("Google Translate еще не загрузился или недоступен.");
              }
            }
          `}
        </Script>

        <Script 
          src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit" 
          strategy="afterInteractive" 
        />
      </body>
    </html>
  )
}