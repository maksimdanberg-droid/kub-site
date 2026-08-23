"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Shield, Clock, ArrowRight } from "lucide-react";

const GUARANTEES = [
  "Доводим заявку до договора (гарантия результата)",
  "Возврат 100% аванса при отказе по нашей зоне ответственности",
  "NDA до передачи данных и исходных кодов",
  "Прозрачная поэтапная оплата"
];

// Открытие модала консультации
const openConsultationModal = () => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("openConsultationModal"));
  }
};

export default function GrantsFinalCTA() {
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
          
          {/* Заголовок + Текст */}
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-5%" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-kub-navy tracking-tight mb-4">
              Сроки, этапы и финансовые гарантии
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Средний срок от аудита до первого транша: 3–6 месяцев. Мы не «ускоряем» комиссии искусственно, 
              но сокращаем время подготовки за счёт готовых шаблонов и прямой связи с экспертами. 
              Гарантируем доведение заявки до подписания договора. При отказе по нашей ошибке — возврат 100% аванса. 
              Конфиденциальность технологии фиксируется NDA до передачи данных.
            </p>
          </motion.div>

          {/* Блок гарантий (чек-марки) */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          >
            {GUARANTEES.map((text, i) => (
              <motion.div 
                key={i}
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                className="flex items-start gap-3 p-4 bg-[#F8FAFC] rounded-xl border border-gray-100"
              >
                <CheckCircle2 className="w-5 h-5 text-kub-gold flex-shrink-0 mt-0.5" />
                <span className="text-gray-700 text-sm leading-relaxed">{text}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Плашки доверия */}
          <motion.div 
            className="flex flex-wrap justify-center gap-4 mb-12"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center gap-2 bg-kub-navy/5 border border-kub-navy/10 rounded-lg px-4 py-2 text-xs font-medium text-kub-navy">
              <Shield size={14} /> Работаем по регламенту ФСИ
            </div>
            <div className="flex items-center gap-2 bg-kub-gold/10 border border-kub-gold/20 rounded-lg px-4 py-2 text-xs font-medium text-kub-navy">
              <Clock size={14} /> Постоплата до 40% опционально
            </div>
          </motion.div>

          {/* Микротекст */}
          <motion.p 
            className="text-xs text-gray-400 text-center mt-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            Оплата поэтапная или по факту получения аванса. Договор и смета утверждаются до старта.
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
                Бесплатный аудит проекта и расчёт гранта
              </span>
              <button
                onClick={openConsultationModal}
                className="w-full sm:w-auto bg-kub-gold text-kub-navy font-semibold px-6 py-2 rounded-lg hover:bg-[#D4AF37]/90 transition-all flex items-center justify-center gap-2"
              >
                Начать подготовку <ArrowRight size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}