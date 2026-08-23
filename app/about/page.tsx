import { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AboutContent from "./AboutContent";

// ✅ ПРАВИЛЬНЫЙ СИНТАКСИС:
// 1. "metadata" - одно слово, строчными
// 2. ":" - двоеточие перед типом
// 3. "Metadata" - тип с большой буквы
export const metadata: Metadata = {
  title: "О компании — ООО «КУБ» | Экспертиза в грантах и Сколково",
  description: "Команда ООО «КУБ»: патентные поверенные, юристы и аналитики. 10+ лет опыта, 340+ проектов, прозрачные условия.",
  openGraph: {
    title: "О компании — ООО «КУБ» | Экспертиза в грантах и Сколково",
    description: "Команда ООО «КУБ»: патентные поверенные, юристы и аналитики. 10+ лет опыта, 340+ проектов, прозрачные условия.",
    type: "website",
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