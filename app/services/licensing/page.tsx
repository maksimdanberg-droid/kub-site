import { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import LicensingHero from "./LicensingHero";
import LicensingProcess from "./LicensingProcess";
import LicensingTypes from "./LicensingTypes"; 
import LicensingCertification from "./LicensingCertification";
import LicensingNav from "./LicensingNav";

// ✅ SEO Мета-теги с исправлениями
export const metadata: Metadata = {
  title: "Лицензирование и сертификация — ООО «НТЦ «КУБ» | 15+ видов лицензий",
  description: "Получаем лицензии и сертификаты для бизнеса. Медицина, промышленность, IT, спецразрешения. Аудит, документы, сопровождение. Гарантия результата.",
  metadataBase: new URL('https://kub-consult.ru'),
  alternates: {
    canonical: '/services/licensing/', 
  },
  
  openGraph: {
    title: "Лицензирование и сертификация — ООО «НТЦ «КУБ» | 15+ видов лицензий",
    description: "Получаем лицензии и сертификаты для бизнеса. Медицина, промышленность, IT, спецразрешения. Аудит, документы, сопровождение. Гарантия результата.",
    type: "website",
    url: 'https://kub-consult.ru/services/licensing/', 
  },
};

export default function LicensingPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen relative">
        <LicensingHero />
        <LicensingProcess />
        <div id="licenses-section">
          <LicensingTypes />
        </div>
        <div id="cert-section">
          <LicensingCertification />
        </div>
        <LicensingNav />
      </main>

    </>
  );
}