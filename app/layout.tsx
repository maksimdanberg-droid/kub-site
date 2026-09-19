import type { Metadata } from "next";
import { Geist, Geist_Mono, Manrope, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ConsentBanner from "@/components/ui/ConsentBanner";
// ✅ 1. Импортируем компонент-привратник для аналитики
import AnalyticsScripts from "@/components/analytics/AnalyticsScripts";

// Подключение шрифтов
const geistSans = Geist({ subsets: ["latin", "cyrillic"], variable: "--font-geist-sans" });
const geistMono = Geist_Mono({ subsets: ["latin", "cyrillic"], variable: "--font-geist-mono" });
const manrope = Manrope({ subsets: ["latin", "cyrillic"], variable: "--font-manrope" });
const inter = Inter({ subsets: ["latin", "cyrillic"], variable: "--font-inter" });

export const metadata: Metadata = {
  // ✅ 2. Привели заголовок к единому юридическому названию
  title: "ООО «НТЦ «КУБ» — Гранты, Сколково, налоговые льготы",
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
  // ✅ 3. Исправленная структура адреса по стандарту Schema.org
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Софийская ул., д. 8 к. 1 стр. 1, помещ. 23-н офис 654/а",
    "addressLocality": "Санкт-Петербург",
    "postalCode": "192236",
    "addressCountry": "RU"
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
        {/* ✅ FAVICONS */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* ✅ JSON-LD для поисковиков */}
        <Script
          id="jsonld-organization"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
          strategy="afterInteractive"
        />

        {/* ❌ УДАЛЕНО: Прямые теги <Script> для Яндекс.Метрики и Google Analytics. 
            Теперь они управляются компонентом <AnalyticsScripts /> ниже */}
      </head>
      <body className="font-sans antialiased bg-white text-gray-900 dark:bg-kub-navy dark:text-white">
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        
        {/* ✅ 4. Условная загрузка аналитики (сработает только если в localStorage есть "true") */}
        <AnalyticsScripts />
        
        {/* ✅ 5. Баннер согласия */}
        <ConsentBanner />
      </body>
    </html>
  );
}