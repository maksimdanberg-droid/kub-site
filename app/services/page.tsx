import { Metadata } from "next";
import { Header } from "@/components/layout/Header"; 
import { ServicesHero } from "./ServicesHero";
import { ServicesGrid } from "./ServicesGrid";
import { ServicesFlow } from "./ServicesFlow";
import { ServicesFaq } from "./ServicesFaq"; 

// ✅ SEO Мета-теги с добавленными metadataBase и canonical
export const metadata: Metadata = {
  title: "Услуги — ООО «НТЦ «КУБ» | Гранты, Сколково, налоги",
  description: "5 направлений консалтинга для технологических компаний: резидентство Сколково, гранты, налоговые льготы, патентование, лицензирование. Фиксированные сроки и цена.",
  metadataBase: new URL('https://kub-consult.ru'),
  alternates: {
    canonical: '/services/', 
  },
  
  openGraph: {
    title: "Услуги — ООО «НТЦ «КУБ» | Гранты, Сколково, налоги",
    description: "5 направлений консалтинга для технологических компаний: резидентство Сколково, гранты, налоговые льготы, патентование, лицензирование. Фиксированные сроки и цена.",
    type: "website",
    url: 'https://kub-consult.ru/services/', 
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
        <ServicesFaq /> 
      </main>
    </>
  );
}