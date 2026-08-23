import { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CasesHero from "./CasesHero";
import CasesMedTech from "./CasesMedTech";
import CasesIndustrial from "./CasesIndustrial";
import CasesEdtech from "./CasesEdtech";

// ✅ ИСПРАВЛЕНО: "metadata" (полное слово) + ":" перед типом
export const metadata: Metadata = {
  title: "Кейсы — ООО «КУБ» | Реальные результаты в цифрах",
  description: "Реальные кейсы ООО «КУБ»: резидентство Сколково, гранты ФСИ, налоговые льготы. Измеримая выгода для технологических компаний.",
  openGraph: {
    title: "Кейсы — ООО «КУБ» | Реальные результаты в цифрах",
    description: "Реальные кейсы ООО «КУБ»: резидентство Сколково, гранты ФСИ, налоговые льготы. Измеримая выгода для технологических компаний.",
    type: "website",
  },
};

export default function CasesPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <CasesHero />
        <CasesMedTech />
        <CasesIndustrial />
        <CasesEdtech /> 
        {/* Сюда потом добавим Кейс 2: Промышленная автоматизация */}
      </main>
    </>
  );
}