import { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import LicensingHero from "./LicensingHero";
import LicensingProcess from "./LicensingProcess";
import LicensingTypes from "./LicensingTypes"; // ✅ Убедись, что внутри есть id="licenses-section"
import LicensingCertification from "./LicensingCertification";
import LicensingNav from "./LicensingNav";

// ✅ SEO Мета-теги
export const metadata: Metadata = {
  title: "Лицензирование и сертификация — ООО «КУБ» | 15+ видов лицензий",
  description: "Получаем лицензии и сертификаты для бизнеса. Медицина, промышленность, IT, спецразрешения. Аудит, документы, сопровождение. Гарантия результата.",
  openGraph: {
    title: "Лицензирование и сертификация — ООО «КУБ» | 15+ видов лицензий",
    description: "Получаем лицензии и сертификаты для бизнеса. Медицина, промышленность, IT, спецразрешения. Аудит, документы, сопровождение. Гарантия результата.",
    type: "website",
  },
};

export default function LicensingPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen relative">
        <LicensingHero />
        <LicensingProcess />
        
        {/* ✅ Добавляем ID для навигации */}
        <div id="licenses-section">
          <LicensingTypes />
        </div>
        
        {/* ✅ Секция сертификации */}
        <div id="cert-section">
          <LicensingCertification />
        </div>
        
        {/* ✅ Навигация */}
        <LicensingNav />
      </main>
    </>
  );
}