import type { Metadata } from "next";
import { Geist, Geist_Mono, Manrope, Inter } from "next/font/google";
import Script from "next/script"; // ✅ Добавлен импорт Script
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
  title: "ООО «КУБ» — Гранты, Сколково, налоговые льготы",
  description: "Помогаем получить резидентство Сколково, гранты до 30 млн ₽ и снизить налоговую нагрузку. Комплексное сопровождение инновационных проектов.",
  metadataBase: new URL('https://kub-site.ru'),
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    siteName: 'ООО «КУБ»',
    images: [{ url: '/og-default.jpg', width: 1200, height: 630, alt: 'ООО «КУБ»' }],
  },
};

// ✅ Данные для JSON-LD (Organization)
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "ООО «КУБ»",
  "url": "https://kub-site.ru",
  "logo": "https://kub-site.ru/logo.png",
  "sameAs": [
    "https://vk.com/kub_consulting",
    "https://t.me/kub_consulting"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+7-XXX-XXX-XX-XX",
    "contactType": "customer service",
    "areaServed": "RU",
    "availableLanguage": "Russian"
  },
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "RU",
    "addressLocality": "Санкт-Петербург"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${geistSans.variable} ${geistMono.variable} ${manrope.variable} ${inter.variable}`}>
      <head>
        {/* ✅ JSON-LD для организации */}
        <Script
          id="jsonld-organization"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
          strategy="afterInteractive"
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