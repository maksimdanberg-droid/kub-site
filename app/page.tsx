import type { Metadata } from "next"; // ✅ 1. Добавляем этот импорт

// ✅ 2. Добавляем этот блок с метаданными для ГЛАВНОЙ страницы
export const metadata: Metadata = {
  title: "Гранты, Сколково, налоговые льготы|КУБ",
  description: "Помогаем получить резидентство Сколково, гранты до 30 млн ₽ и снизить налоговую нагрузку. Комплексное сопровождение инновационных проектов.",
  metadataBase: new URL('https://kub-consult.ru'),
  alternates: {
    canonical: '/', // ✅ Canonical для главной - это просто слэш
  },
  openGraph: {
    title: "Гранты, Сколково, налоговые льготы|КУБ",
    description: "Помогаем получить резидентство Сколково, гранты до 30 млн ₽ и снизить налоговую нагрузку.",
    url: 'https://kub-consult.ru/',
    siteName: 'ООО «НТЦ «КУБ»',
    locale: 'ru_RU',
    type: 'website',
    images: [{ url: '/og-default.jpg', width: 1200, height: 630, alt: 'ООО «НТЦ «КУБ»' }],
  },
};

// ✅ 3. Ваш существующий код остается без изменений!
import { Header } from "@/components/layout/Header";
import Hero from "@/components/sections/Hero";
import Services from '@/components/sections/Services';
import Timeline from '@/components/sections/Timeline';
import AboutTeaser from "@/components/sections/AboutTeaser";
import FAQ from "@/components/sections/FAQ";

export default function Home() {
  return ( 
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <Timeline />
        <AboutTeaser />
        <FAQ />
      </main>
    </>
  );
}