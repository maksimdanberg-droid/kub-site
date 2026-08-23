import { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ServicesHero } from "./ServicesHero";
import { ServicesGrid } from "./ServicesGrid";
import { ServicesFlow } from "./ServicesFlow";
import { ServicesFaq } from "./ServicesFaq"; // ✅ Новый импорт

export const metadata: Metadata = {
  title: "Услуги — ООО «КУБ» | Гранты, Сколково, налоги",
  description: "5 направлений консалтинга для технологических компаний: резидентство Сколково, гранты, налоговые льготы, патентование, лицензирование. Фиксированные сроки и цена.",
  openGraph: {
    title: "Услуги — ООО «КУБ» | Гранты, Сколково, налоги",
    description: "5 направлений консалтинга для технологических компаний: резидентство Сколково, гранты, налоговые льготы, патентование, лицензирование. Фиксированные сроки и цена.",
    type: "website",
  },
};

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#F8FAFC]">
        <ServicesHero />
        <ServicesGrid />
        <ServicesFlow />
        <ServicesFaq /> {/* ✅ Вставлено перед футером */}
      </main>
    </>
  );
}