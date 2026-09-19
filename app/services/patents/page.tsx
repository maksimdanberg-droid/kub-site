import { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import PatentsHero from "./PatentsHero";
import PatentsProcess from "./PatentsProcess";
import PatentsTypes from "./PatentsTypes"; 

// ✅ SEO Мета-теги с исправлениями
export const metadata: Metadata = {
  title: "Патентование и защита интеллектуальной собственности|КУБ | Роспатент, товарные знаки, ПО",
  description: "Регистрируем патенты, товарные знаки, ПО. Ускоренная экспертиза Роспатента. Правовая основа для инвестиций и франчайзинга. Сроки от 3 месяцев.",
  metadataBase: new URL('https://kub-consult.ru'),
  alternates: {
    canonical: '/services/patents/', 
  },
  
  openGraph: {
    title: "Патентование и защита интеллектуальной собственности|КУБ|  Роспатент, товарные знаки, ПО",
    description: "Регистрируем патенты, товарные знаки, ПО. Ускоренная экспертиза Роспатента. Правовая основа для инвестиций и франчайзинга. Сроки от 3 месяцев.",
    type: "website",
    url: 'https://kub-consult.ru/services/patents/', 
  },
};

export default function PatentsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <PatentsHero />
        <PatentsProcess />
        <PatentsTypes />
      </main>
    </>
  );
}