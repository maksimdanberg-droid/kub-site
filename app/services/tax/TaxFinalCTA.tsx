"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, ArrowRight, MessageCircle } from "lucide-react";

const PARTNERS = [
  { name: "Сколково", href: "https://sk.ru", alt: "Фонд Сколково" },
  { name: "Минэкономразвития", href: "https://economy.gov.ru", alt: "Минэкономразвития РФ" },
  { name: "ФРП", href: "https://frprf.ru", alt: "Фонд развития промышленности" },
  { name: "Минпромторг", href: "https://minpromtorg.gov.ru", alt: "Минпромторг РФ" },
  { name: "ФНС", href: "https://nalog.ru", alt: "ФНС России" },
];

// Открытие модала консультации
const openConsultationModal = () => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("openConsultationModal"));
  }
};

export default function TaxFinalCTA() {
  const [showSticky, setShowSticky] = useState(false);

  // Логика Sticky-бара (появляется после 600px скролла)
  useEffect(() => {
    const handleScroll = () => setShowSticky(window.scrollY > 600);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Основная секция */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Заголовок */}
          <motion.h2 
            className="text-3xl md:text-4xl font-bold font-heading text-kub-navy tracking-tight mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Как мы внедряем льготы{" "}
            <span className="text-kub-gold">без рисков</span> для бизнеса
          </motion.h2>

          {/* Текст + иконка */}
          <motion.div 
            className="flex items-start gap-4 mb-10 max-w-4xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <ShieldCheck className="w-6 h-6 text-kub-gold flex-shrink-0 mt-1" />
            <p className="text-gray-700 leading-relaxed">
              Переход на льготный режим требует корректной учётной политики и раздельного учёта операций. 
              Мы проводим аудит текущей модели, переводим на оптимальный режим, ставим учёт под требования ФНС. 
              Ежегодно готовим отчётность, мониторим изменения в постановлениях, предупреждаем о рисках за 30 дней 
              до дедлайнов. За 8 лет 0 претензий от ФНС по корректности применения наших рекомендаций.
            </p>
          </motion.div>

          {/* Партнёрская лента */}
          <motion.div 
            className="flex flex-wrap justify-center gap-6 md:gap-10 mt-10 opacity-60"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
          >
            {PARTNERS.map((partner) => (
              <motion.a
                key={partner.name}
                href={partner.href}
                target="_blank"
                rel="noopener noreferrer"
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 }
                }}
                whileHover={{ opacity: 1, scale: 1.05 }}
                className="grayscale hover:grayscale-0 transition-all duration-300 cursor-pointer flex items-center gap-2"
                aria-label={partner.alt}
              >
                {/* Текстовая заглушка логотипа */}
                <span className="bg-kub-navy/5 text-kub-navy px-3 py-1.5 rounded-lg text-xs font-medium border border-kub-navy/10">
                  {partner.name}
                </span>
              </motion.a>
            ))}
          </motion.div>

          {/* Финальные CTA кнопки */}
          {/* Микротекст */}
          <motion.p 
            className="text-xs text-gray-400 mt-6 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            Ответ в течение 2 рабочих часов. Консультация бесплатна. NDA подписываем до получения документов.
          </motion.p>
        </div>
      </section>

      {/* Плавающий Sticky-бар */}
      <AnimatePresence>
        {showSticky && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200 py-3 px-4 z-40 shadow-lg"
          >
            <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
              <span className="text-sm font-medium text-kub-navy hidden sm:block">
                Готовы снизить налоги легально?
              </span>
              <button
                onClick={openConsultationModal}
                className="w-full sm:w-auto bg-kub-gold text-kub-navy font-semibold px-6 py-2.5 rounded-lg hover:bg-kub-gold/90 transition-all flex items-center justify-center gap-2"
              >
                Записаться на аудит <ArrowRight size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}