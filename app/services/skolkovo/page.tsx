import { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SkolkovoHero from "./SkolkovoHero";
import SkolkovoPrograms from "./SkolkovoPrograms";
import SkolkovoGrants from "./SkolkovoGrants";
import SkolkovoBenefits from "./SkolkovoBenefits"; // ✅ Новый импорт
import SkolkovoCriteria from "./SkolkovoCriteria";
import SkolkovoWorkflow from "./SkolkovoWorkflow"; 

// ✅ SEO Мета-теги (работает ТОЛЬКО в Server Component)
export const metadata: Metadata = {
  title: "Резидентство Сколково — ООО «КУБ» | 0% налоги, гранты до 30 млн ₽",
  description: "Помогаем получить статус резидента Сколково: 0% на прибыль, НДС, имущество. Гранты, микрогранты, сопровождение. Сроки 2,5–3 месяца.",
  openGraph: {
    title: "Резидентство Сколково — ООО «КУБ» | 0% налоги, гранты до 30 млн ₽",
    description: "Помогаем получить статус резидента Сколково: 0% на прибыль, НДС, имущество. Гранты, микрогранты, сопровождение. Сроки 2,5–3 месяца.",
    type: "website",
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
        <SkolkovoBenefits /> {/* ✅ Вставлено после блока грантов */}
        <SkolkovoCriteria />
        <SkolkovoWorkflow />
       </main>
     
    </>
  );
}