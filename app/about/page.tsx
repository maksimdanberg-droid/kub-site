import { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AboutContent from "./AboutContent";

// ✅ ОБНОВЛЕННЫЙ БЛОК METADATA
export const metadata: Metadata = {
  title: "О компании — ООО «НТЦ «КУБ» | Экспертиза в грантах и Сколково",
  description: "Команда ООО «НТЦ «КУБ»: патентные поверенные, юристы и аналитики. 10+ лет опыта, 340+ проектов, прозрачные условия.",
      metadataBase: new URL('https://kub-consult.ru'),
      alternates: {
      canonical: '/about/', 
  },

  openGraph: {
    title: "О компании — ООО «НТЦ «КУБ» | Экспертиза в грантах и Сколково",
    description: "Команда ООО «НТЦ «КУБ»: патентные поверенные, юристы и аналитики. 10+ лет опыта, 340+ проектов, прозрачные условия.",
    type: "website",
    url: 'https://kub-consult.ru/about/', 
  },
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <AboutContent />
    </>
  );
}