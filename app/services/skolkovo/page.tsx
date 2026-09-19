import { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import SkolkovoHero from "./SkolkovoHero";
import SkolkovoPrograms from "./SkolkovoPrograms";
import SkolkovoGrants from "./SkolkovoGrants";
import SkolkovoBenefits from "./SkolkovoBenefits"; 
import SkolkovoCriteria from "./SkolkovoCriteria";
import SkolkovoWorkflow from "./SkolkovoWorkflow"; 

// ✅ SEO Мета-теги с исправлениями
export const metadata: Metadata = {
  title: "Резидентство Сколково — ООО «НТЦ «КУБ» | 0% налоги, гранты до 30 млн ₽",
  description: "Помогаем получить статус резидента Сколково: 0% на прибыль, НДС, имущество. Гранты, микрогранты, сопровождение. Сроки 2,5–3 месяца.",

  metadataBase: new URL('https://kub-consult.ru'),
  alternates: {
    canonical: '/services/skolkovo/', 
  },
  
  openGraph: {
    title: "Резидентство Сколково — ООО «НТЦ «КУБ» | 0% налоги, гранты до 30 млн ₽",
    description: "Помогаем получить статус резидента Сколково: 0% на прибыль, НДС, имущество. Гранты, микрогранты, сопровождение. Сроки 2,5–3 месяца.",
    type: "website",
    url: 'https://kub-consult.ru/services/skolkovo/', 
  },
};

export default function SkolkovoPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <SkolkovoHero />
        <SkolkovoPrograms /> 
        <SkolkovoGrants />
        <SkolkovoBenefits /> 
        <SkolkovoCriteria />
        <SkolkovoWorkflow />
      </main>
    </>
  );
}