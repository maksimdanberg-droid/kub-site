import { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import CasesHero from "./CasesHero";
import CasesMedTech from "./CasesMedTech";
import CasesIndustrial from "./CasesIndustrial";
import CasesEdtech from "./CasesEdtech";
import CasesLaserPAC from "./CasesLaserPAC";
import CasesDeburringMachine from "./CasesDeburringMachine";
import CasesComputingModule from "./CasesComputingModule";
import CasesAIDesignSystem from "./CasesAIDesignSystem"; 
import CasesFeedComplex from "./CasesFeedComplex";
import CasesCosmeceutical from "./CasesCosmeceutical";
import CasesMedicalContainers from "./CasesMedicalContainers";
import CasesBridgeDampers from "./CasesBridgeDampers";
import CasesMTKRegistry from "./CasesMTKRegistry";

export const metadata: Metadata = {
  title: "Кейсы команды КУБ | Реальные результаты в цифрах",
  description: "Реальные кейсы ООО «НТЦ «КУБ»: резидентство Сколково, гранты ФСИ, налоговые льготы. Измеримая выгода для технологических компаний.",
  
  metadataBase: new URL('https://kub-consult.ru'),
  alternates: {
    canonical: '/cases/', 
  },
  
  openGraph: {
    title: "Кейсы команды КУБ | Реальные результаты в цифрах",
    description: "Реальные кейсы ООО «НТЦ «КУБ»: резидентство Сколково, гранты ФСИ, налоговые льготы. Измеримая выгода для технологических компаний.",
    type: "website",
    url: 'https://kub-consult.ru/cases/',
  },
};

export default function CasesPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <CasesHero />
        <CasesMedTech />
        <CasesLaserPAC />
        <CasesDeburringMachine /> 
        <CasesComputingModule /> 
        <CasesAIDesignSystem /> 
        <CasesFeedComplex />
        <CasesCosmeceutical />
        <CasesMedicalContainers />
        <CasesBridgeDampers />
        <CasesIndustrial />
        <CasesEdtech /> 
        <CasesMTKRegistry /> 
      </main>
    </>
  );
}