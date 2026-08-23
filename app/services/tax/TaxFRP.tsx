"use client";

import { motion } from "framer-motion";
import { Percent, Calendar, Banknote, Factory, ShieldCheck, FileText, ArrowRight } from "lucide-react";

const FRP_PARAMS = [
  {
    icon: Percent,
    label: "Ставка",
    value: "3% / 5%",
    subtext: "годовых",
  },
  {
    icon: Calendar,
    label: "Срок",
    value: "до 7 лет",
    subtext: "возможна отсрочка",
  },
  {
    icon: Banknote,
    label: "Лимит",
    value: "5 млн – 2 млрд ₽",
    subtext: "в зависимости от программы",
  },
  {
    icon: Factory,
    label: "Направления",
    value: "6 программ",
    subtext: "импортозамещение, лизинг и др.",
  },
];

const DIRECTIONS = [
  "Импортозамещение",
  "Лизинг оборудования",
  "Цифровизация",
  "Автокомпоненты",
  "Производительность труда",
  "Маркировка товаров",
];

// Открытие модала консультации
const openConsultationModal = () => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("openConsultationModal"));
  }
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export default function TaxFRP() {
  return (
    <section className="bg-[#F8FAFC] py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Шапка блока */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-8">
          <motion.h2 
            className="text-2xl md:text-3xl font-bold text-kub-navy font-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Льготное финансирование{" "}
            <span className="text-kub-gold">ФРП</span> и производственные программы
          </motion.h2>
          <motion.div 
            className="inline-flex items-center gap-2 bg-kub-navy/5 border border-kub-navy/10 rounded-full px-4 py-1.5 text-xs font-bold text-kub-navy w-fit"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <ShieldCheck size={14} /> Официальная программа ФРП
          </motion.div>
        </div>

        {/* Основной текст */}
        <motion.p 
          className="text-gray-600 text-lg leading-relaxed mb-10 max-w-4xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          ФРП предоставляет целевые займы под 3% и 5% годовых на срок до 7 лет (5 млн – 2 млрд ₽). 
          Направления: импортозамещение, лизинг оборудования, цифровизация, автокомпоненты, 
          производительность труда, маркировка товаров. При включении в Реестр российской 
          промышленной продукции (ПП 719) компания получает снижение ставки на 2 п.п. при заёмном 
          финансировании и приоритет в субсидиях на пополнение оборотных средств.
        </motion.p>

        {/* Таблица параметров ФРП */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-5%" }}
        >
          {FRP_PARAMS.map((param, i) => {
            const Icon = param.icon;
            return (
              <motion.div 
                key={i} 
                variants={itemVariants}
                className="flex flex-col items-center text-center p-4 border-r border-gray-100 last:border-0"
              >
                <div className="w-8 h-8 rounded-lg bg-kub-navy/5 flex items-center justify-center mb-3">
                  <Icon className="w-4 h-4 text-kub-gold" />
                </div>
                <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">{param.label}</div>
                <div className="text-lg font-bold text-kub-navy font-heading">{param.value}</div>
                <div className="text-[10px] text-gray-400 mt-1">{param.subtext}</div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Теги направлений */}
        <motion.div 
          className="flex flex-wrap gap-2 mt-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ visible: { transition: { staggerChildren: 0.05, delayChildren: 0.3 } } }}
        >
          {DIRECTIONS.map((dir, i) => (
            <motion.span
              key={i}
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 }
              }}
              className="bg-white border border-gray-200 text-gray-600 px-3 py-1.5 rounded-lg text-sm hover:border-kub-gold/30 hover:text-kub-navy transition-colors cursor-default"
            >
              {dir}
            </motion.span>
          ))}
        </motion.div>

        {/* Блок про Реестр 719 */}
        <motion.div 
          className="bg-kub-gold/5 border border-kub-gold/20 rounded-xl p-5 mt-8 flex items-start gap-4 max-w-4xl"
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <div className="w-10 h-10 rounded-lg bg-kub-gold/10 flex items-center justify-center flex-shrink-0">
            <FileText className="w-5 h-5 text-kub-gold" />
          </div>
          <div>
            <h4 className="font-bold text-kub-navy font-heading mb-1 text-sm">Реестр российской промышленной продукции (ПП 719)</h4>
            <p className="text-sm text-gray-700 leading-relaxed">
              При включении в реестр компания получает снижение ставки на 2 п.п. при заёмном финансировании 
              и приоритет в субсидиях на пополнение оборотных средств. Мы помогаем подготовить документы 
              и пройти экспертизу в сжатые сроки.
            </p>
          </div>
        </motion.div>

        {/* Кнопки */}

        {/* Микротекст */}
        <motion.p 
          className="text-xs text-gray-400 mt-6 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          Ставки фиксируются на момент подписания договора займа. Срок рассмотрения: 2–4 месяца.
        </motion.p>
      </div>
    </section>
  );
}