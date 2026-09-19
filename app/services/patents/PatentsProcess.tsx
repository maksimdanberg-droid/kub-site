"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Search, FileText, Shield, MessageCircle } from "lucide-react";

const STEPS = [
  {
    icon: Search,
    title: "Поиск",
    text: "Проводим патентный поиск, оцениваем новизну и патентоспособность вашего решения.",
  },
  {
    icon: FileText,
    title: "Оформление",
    text: "Готовим заявку, формулируем формулу изобретения, подаём в Роспатент/ВОИС.",
  },
  {
    icon: Shield,
    title: "Защита",
    text: "Сопровождаем экспертизу, отвечаем на запросы, получаем охранный документ.",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
};

// ✅ Унифицированное открытие модала
const openConsultationModal = () => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("openConsultationModal"));
  }
};

export default function PatentsProcess() {
  return (
    <section className="bg-white py-16 md:py-24">
      <Container>
        {/* Заголовок + текст */}
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-kub-navy tracking-tight mb-4">
            Комплексная защита ваших технологий
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            Определяем, какие объекты ИС нужно защитить. Проводим патентный поиск, готовим заявки, 
            сопровождаем экспертизу, получаем охранные документы. Работаем с Роспатентом, ВОИС, 
            Евразийским ведомством. Если получен отказ — анализируем причины, дорабатываем заявку, 
            подаём повторно.
          </p>
        </motion.div>

        {/* Сетка карточек */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {STEPS.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div 
                key={index} 
                variants={itemVariants}
                className="bg-[#F8FAFC] rounded-2xl p-6 border border-gray-100 hover:border-kub-gold/30 hover:-translate-y-1 hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-kub-navy/5 flex items-center justify-center mb-4 text-kub-navy">
                  <Icon size={24} />
                </div>
                <h3 className="text-lg font-bold text-kub-navy font-heading mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{step.text}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Кнопки */}
        {/* Микротекст */}
        <motion.p 
          className="text-xs text-gray-400 text-center mt-4 flex flex-wrap justify-center gap-x-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <span>Бесплатный предварительный поиск</span>
          <span>•</span>
          <span>Подготовка документов</span>
          <span>•</span>
          <span>Сопровождение до свидетельства</span>
        </motion.p>
      </Container>
    </section>
  );
}