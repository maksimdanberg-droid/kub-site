import { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import ContactsHero from "./ContactsHero";
import ContactsInfo from "./ContactsInfo"; 

// ✅ SEO Мета-теги с исправлениями для корректной индексации
export const metadata: Metadata = {
  title: "Контакты — ООО «НТЦ «КУБ» | Консультация и аудит",
  description: "Свяжитесь с ООО «НТЦ «КУБ» для бесплатной консультации. Гранты, Сколково, налоговые льготы. Работаем по договору и NDA.",
  
  // ✅ 1. Базовый URL, от которого Next.js будет строить абсолютные ссылки
  metadataBase: new URL('https://kub-consult.ru'),
  
  // ✅ 2. Канонический адрес ИМЕННО этой страницы (со слэшем на конце!)
  alternates: {
    canonical: '/contacts/', 
  },
  
  openGraph: {
    title: "Контакты — ООО «НТЦ «КУБ» | Консультация и аудит",
    description: "Свяжитесь с ООО «НТЦ «КУБ» для бесплатной консультации. Гранты, Сколково, налоговые льготы. Работаем по договору и NDA.",
    type: "website",
    url: 'https://kub-consult.ru/contacts/', 
  },
};

export default function ContactsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <ContactsHero />
        <ContactsInfo /> 
      </main>
    </>
  );
}