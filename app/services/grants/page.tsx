import { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import GrantsHero from "./GrantsHero";
import GrantsMatrix from "./GrantsMatrix"; 
import FSIProgramRoadmap from "@/components/ui/FSIProgramRoadmap"; 
import FSIExpertiseBanner from "@/components/ui/FSIExpertiseBanner"; 
import GrantsRequirements from "./GrantsRequirements";
import GrantsFinalCTA from "./GrantsFinalCTA"; 

// ✅ SEO Мета-теги (работает ТОЛЬКО в Server Component)
export const metadata: Metadata = {
  title: "Гранты и субсидии — ООО «КУБ» | ФСИ, Минпромторг, АТР",
  description: "Помогаем получить гранты на НИОКР и коммерциализацию: ФСИ до 50 млн ₽, Минпромторг до 250 млн ₽. Сопровождение заявок, 85% одобрений.",
  openGraph: {
    title: "Гранты и субсидии — ООО «КУБ» | ФСИ, Минпромторг, АТР",
    description: "Помогаем получить гранты на НИОКР и коммерциализацию: ФСИ до 50 млн ₽, Минпромторг до 250 млн ₽. Сопровождение заявок, 85% одобрений.",
    type: "website",
  },
};

export default function GrantsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <GrantsHero />
        <GrantsMatrix /> 
        <FSIProgramRoadmap />
        <FSIExpertiseBanner />
        <GrantsRequirements />
        <GrantsFinalCTA /> 
        </main>
       </>
  );
}