"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Download } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

type FaqItem = {
  question: string;
  answer: string;
};

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Можно ли заказать несколько направлений сразу?",
    answer: "Да. Комплексный пакет снижает стоимость на <span class='text-kub-gold font-semibold'>15–20%</span> и ускоряет сроки за счёт параллельной подготовки документов.",
  },
  {
    question: "Что входит в «сопровождение под ключ»?",
    answer: "Аудит, подготовка заявки, подача, ответы на запросы экспертизы, настройка учёта/бухгалтерии, ежеквартальная отчётность. Вы контролируете процесс в личном кабинете.",
  },
  {
    question: "Как рассчитывается стоимость?",
    answer: "Фиксированная цена в договоре зависит от сложности технологии, объёма данных и выбранной программы оплаты. Смета утверждается до заключения договора. Никаких <span class='text-kub-gold font-semibold'>скрытых доплат</span>.",
  },
  {
    question: "Работаете ли с регионами и удалённо?",
    answer: "Да. 80% процессов онлайн. Для подачи в региональные фонды или Роспатент используем ЭЦП и электронные каналы. Очные встречи — по согласованию.",
  },
];

export function ServicesFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-kub-navy py-16 md:py-24">
      <Container>
        <div className="max-w-4xl mx-auto">
          <motion.h2 
            className="text-white font-heading font-bold text-3xl md:text-4xl mb-10 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Часто задаваемые вопросы по услугам
          </motion.h2>

          <div className="space-y-0">
            {FAQ_ITEMS.map((item, index) => {
              const isOpen = openIndex === index;
              
              return (
                <motion.div
                  key={index}
                  className="border-b border-white/10"
                  layout
                >
                  <button
                    onClick={() => toggleItem(index)}
                    className="w-full flex justify-between items-center py-5 text-left focus:outline-none group"
                    aria-expanded={isOpen}
                  >
                    <span className="text-white/90 font-medium text-lg pr-4 group-hover:text-white transition-colors">
                      {item.question}
                    </span>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <ChevronDown className="text-kub-gold shrink-0" size={20} />
                    </motion.div>
                  </button>
                  
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div 
                          className="pb-5 text-gray-400 leading-relaxed"
                          dangerouslySetInnerHTML={{ __html: item.answer }}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          {/* CTA + Микротекст */}
          <motion.div 
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="text-gray-500 text-sm mt-6">
              Актуализировано: Апрель 2026 • Все цены без НДС, если не указано иное
            </p>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}