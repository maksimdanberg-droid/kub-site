import { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PatentsHero from "./PatentsHero";
import PatentsProcess from "./PatentsProcess";
import PatentsTypes from "./PatentsTypes"; 

// ✅ SEO Мета-теги (работает ТОЛЬКО в Server Component)
export const metadata: Metadata = {
  title: "Патентование и защита ИП — ООО «КУБ» | Роспатент, товарные знаки, ПО",
  description: "Регистрируем патенты, товарные знаки, ПО. Ускоренная экспертиза Роспатента. Правовая основа для инвестиций и франчайзинга. Сроки от 3 месяцев.",
  openGraph: {
    title: "Патентование и защита ИП — ООО «КУБ» | Роспатент, товарные знаки, ПО",
    description: "Регистрируем патенты, товарные знаки, ПО. Ускоренная экспертиза Роспатента. Правовая основа для инвестиций и франчайзинга. Сроки от 3 месяцев.",
    type: "website",
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