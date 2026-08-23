import { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import TaxHero from "./TaxHero";
import TaxStatuses from "./TaxStatuses";
import TaxFRP from "./TaxFRP";
import TaxFinalCTA from "./TaxFinalCTA"; 
import TaxFinalImpact from "@/components/ui/TaxFinalImpact";

// ✅ SEO Мета-теги (работает ТОЛЬКО в Server Component)
export const metadata: Metadata = {
  title: "Налоговые льготы — ООО «КУБ» | МТК, Сколково, ФРП, реестры 719/878",
  description: "Снижаем налоги легально: 0% прибыль, 15% взносы, займы от 3%. Статусы МТК, Сколково, реестры Минпромторга. Аудит за 1 день.",
  openGraph: {
    title: "Налоговые льготы — ООО «КУБ» | МТК, Сколково, ФРП, реестры 719/878",
    description: "Снижаем налоги легально: 0% прибыль, 15% взносы, займы от 3%. Статусы МТК, Сколково, реестры Минпромторга. Аудит за 1 день.",
    type: "website",
  },
};

export default function TaxPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <TaxHero />
        <TaxStatuses /> 
        <TaxFRP /> 
        <TaxFinalCTA />
        <TaxFinalImpact />
      </main>
    </>
  );
}