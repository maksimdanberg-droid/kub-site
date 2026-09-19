import type { Metadata } from "next";
import { Geist, Geist_Mono, Manrope, Inter } from "next/font/google";
import Script from "next/script"; // ✅ Импорт компонента Script
import "./globals.css";
import { Header } from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ConsentBanner from "@/components/ui/ConsentBanner";

// Подключение шрифтов
const geistSans = Geist({ subsets: ["latin", "cyrillic"], variable: "--font-geist-sans" });
const geistMono = Geist_Mono({ subsets: ["latin", "cyrillic"], variable: "--font-geist-mono" });
const manrope = Manrope({ subsets: ["latin", "cyrillic"], variable: "--font-manrope" });
const inter = Inter({ subsets: ["latin", "cyrillic"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Гранты, Сколково, налоговые льготы|КУБ",
  description: "Помогаем получить резидентство Сколково, гранты до 30 млн ₽ и снизить налоговую нагрузку. Комплексное сопровождение инновационных проектов.",
  metadataBase: new URL('https://kub-consult.ru'),

  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    siteName: 'ООО «НТЦ «КУБ»',
    images: [{ url: '/og-default.jpg', width: 1200, height: 630, alt: 'ООО «НТЦ «КУБ»' }],
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "ООО «НТЦ «КУБ»",
  "url": "https://kub-consult.ru",
  "logo": "https://kub-consult.ru/logo.png",
  "sameAs": [
    "https://vk.com/kub_consulting",
    "https://t.me/kub_consulting"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+7-927-064-21-71",
    "contactType": "customer service",
    "areaServed": "RU",
    "availableLanguage": "Russian"
  },
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "RU",
    "addressLocality": "192236, город Санкт-Петербург, Софийская ул., д. 8 к. 1 стр. 1, помещ. 23-н офис 654/а"
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={`${geistSans.variable} ${geistMono.variable} ${manrope.variable} ${inter.variable}`}>
      <head>
        {/* ✅ 1. FAVICONS */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* ✅ 2. JSON-LD для поисковиков */}
        <Script
          id="jsonld-organization"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
          strategy="afterInteractive"
        />

        {/* ✅ 3. ЯНДЕКС.МЕТРИКА */}
        <Script
          id="yandex-metrika"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(m,e,t,r,i,k,a){
                  m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                  m[i].l=1*new Date();
                  for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
                  k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
              })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=112784493', 'ym');

              ym(112784493, 'init', {
                ssr: true, 
                webvisor: true, 
                clickmap: true, 
                ecommerce: "dataLayer", 
                referrer: document.referrer, 
                url: location.href, 
                accurateTrackBounce: true, 
                trackLinks: true
              });
            `
          }}
        />
        
        <noscript>
          <div>
            <img src="https://mc.yandex.ru/watch/112784493" style={{ position: 'absolute', left: '-9999px' }} alt="Yandex Metrika" />
          </div>
        </noscript>

        {/* ✅ 4. GOOGLE ANALYTICS (GA4) */}
        {/* Часть А: Загрузка библиотеки gtag.js */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-Z783WV1XKZ"
          strategy="afterInteractive"
        />
        {/* Часть Б: Инициализация и настройка */}
        <Script
          id="google-analytics-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-Z783WV1XKZ', {
                page_path: window.location.pathname,
              });
            `
          }}
        />
      </head>
      <body className="font-sans antialiased bg-white text-gray-900 dark:bg-kub-navy dark:text-white">
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <ConsentBanner />
      </body>
    </html>
  );
}