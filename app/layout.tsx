import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import Script from 'next/script';
import './globals.css';

// 1. Системные шрифты
const _geist = Geist({ subsets: ["latin"], variable: '--font-geist' });
const _geistMono = Geist_Mono({ subsets: ["latin"], variable: '--font-geist-mono' });

export const metadata: Metadata = {
  title: 'Babyblue - Art Design Web Concept',
  description: 'Арт-дирекшн, графический дизайн, иллюстрация, web-дизайн',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Удалили ${babyBlue.variable} из className
    <html lang="ru" className={`bg-background ${_geist.variable} ${_geistMono.variable}`}>
      <body className="font-sans antialiased">
        
        {/* Технический контейнер для Google Translate */}
        <div id="google_translate_element" style={{ display: 'none' }}></div>

        {children}
        
        {process.env.NODE_ENV === 'production' && <Analytics />}

        {/* Скрипты */}
        <Script id="debug-error" strategy="beforeInteractive">
          {`window.onerror = function(msg, url, line) { console.error('Error: ' + msg + ' at ' + line); };`}
        </Script>

        <Script id="google-translate-init" strategy="afterInteractive">
          {`
            function googleTranslateElementInit() {
              new google.translate.TranslateElement({
                pageLanguage: 'ru',
                includedLanguages: 'en,ru',
                autoDisplay: false
              }, 'google_translate_element');
            }
            window.changeLanguage = function(langCode) {
              var select = document.querySelector('.goog-te-combo');
              if (select) {
                select.value = langCode;
                select.dispatchEvent(new Event('change'));
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
  );
}