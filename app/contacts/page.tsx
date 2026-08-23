import { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ContactsHero from "./ContactsHero";
import ContactsInfo from "./ContactsInfo"; // ✅ Новый импорт

// ✅ SEO Мета-теги
export const metadata: Metadata = {
  title: "Контакты — ООО «КУБ» | Консультация и аудит",
  description: "Свяжитесь с ООО «КУБ» для бесплатной консультации. Гранты, Сколково, налоговые льготы. Работаем по договору и NDA.",
  openGraph: {
    title: "Контакты — ООО «КУБ» | Консультация и аудит",
    description: "Свяжитесь с ООО «КУБ» для бесплатной консультации. Гранты, Сколково, налоговые льготы. Работаем по договору и NDA.",
    type: "website",
  },
};

export default function ContactsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <ContactsHero />
        <ContactsInfo /> 
        {/* Сюда потом добавим блок с картой, телефоном и формой */}
      </main>
    </>
  );
}
