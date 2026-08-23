"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Info } from "lucide-react";

const ADVANTAGES = [
  {
    icon: "📊",
    title: "Подготовка ТЭО",
    text: "Рассчитываем бюджет, сроки окупаемости, риски и ожидаемый эффект. Формируем технически грамотное обоснование под требования комиссии.",
  },
  {
    icon: "🧮",
    title: "Расчёт бюджета",
    text: "Оптимизируем структуру затрат, подбираем допустимые статьи расходов, минимизируем риски отказа из-за финансовой неточности.",
  },
  {
    icon: "🛡️",
    title: "Защита проекта",
    text: "Готовим презентацию, проводим тренировочные питчи, сопровождаем на заседании экспертного совета и отвечаем на вопросы комиссии.",
  },
];

const TOOLTIPS: Record<string, string> = {
  TRL: "TRL (Technology Readiness Level) — шкала готовности технологии от 1 (идея) до 9 (серийное производство)",
  МТК: "МТК — малая технологическая компания: выручка <100 млн ₽, доля НИОКР >70%, приоритет в отборах ФСИ",
  ТЭО: "ТЭО — технико-экономическое обоснование: расчёт бюджета, сроков, рисков и ожидаемого эффекта проекта",
};

// Компонент тултипа с исправленным переносом текста
const TooltipTrigger = ({ term, tooltipKey, children }: { term: string; tooltipKey: string; children: React.ReactNode }) => {
  const [isActive, setIsActive] = useState(false);
  
  return (
    <span 
      className="relative inline-flex items-center gap-1 underline decoration-kub-gold/50 decoration-2 cursor-help font-medium text-kub-navy"
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
      onClick={() => setIsActive(!isActive)}
    >
      {children}
      <Info size={12} className="text-kub-gold/70 flex-shrink-0 mt-0.5" />
      
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            // ✅ Исправлено: добавил break-words, whitespace-normal, max-w-xs вместо w-80
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-120 bg-white border border-gray-200 rounded-xl p-4 text-sm text-gray-700 shadow-xl z-50 pointer-events-none leading-relaxed break-words whitespace-normal"
          >
            {TOOLTIPS[tooltipKey]}
            {/* Стрелочка вниз */}
            <div className="absolute left-1/2 -translate-x-1/2 top-full w-3 h-3 bg-white border-r border-b border-gray-200 rotate-45 -mt-1.5" />
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
};

export default function GrantsRequirements() {
  return (
    <section className="bg-[#F8FAFC] py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Шапка блока */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-10">
          <motion.h2 
            className="text-2xl md:text-3xl font-bold text-kub-navy font-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Как проходит отбор и что нужно для заявки
          </motion.h2>
          <div className="flex gap-3 flex-wrap">
            <span className="bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs font-medium flex items-center gap-2 text-gray-600 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> ФСИ
            </span>
            <span className="bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs font-medium flex items-center gap-2 text-gray-600 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" /> Минпромторг
            </span>
          </div>
        </div>

        {/* Основной текст с тултипами */}
        <motion.p 
          className="text-gray-600 text-lg leading-relaxed mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          Каждая программа требует подтверждения технологической готовности (
          <TooltipTrigger term="TRL" tooltipKey="TRL">TRL</TooltipTrigger>
          ), финансовой устойчивости и соответствия ОКВЭД. Мы берём на себя: расчёт бюджета, подготовку (
          <TooltipTrigger term="ТЭО" tooltipKey="ТЭО">ТЭО</TooltipTrigger>
          ), формирование ко-финансирования, защиту проекта перед комиссией. При статусе (
          <TooltipTrigger term="МТК" tooltipKey="МТК">МТК</TooltipTrigger>
          ) софинансирование по программе «Коммерциализация» снижается до 30%, отменяется выездной мониторинг.
        </motion.p>

        {/* Список преимуществ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {ADVANTAGES.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-kub-gold/30 transition-all duration-300 shadow-sm hover:shadow-lg cursor-default"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-kub-navy/5 to-kub-gold/5 flex items-center justify-center text-2xl mb-4">
                {item.icon}
              </div>
              <h3 className="font-bold text-kub-navy font-heading mb-2 text-lg">{item.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{item.text}</p>
            </motion.div>
          ))}
        </div>

        {/* Блок про МТК */}
        <motion.div 
          className="bg-green-50/60 border border-green-200/80 rounded-2xl p-5 flex items-start gap-4 max-w-3xl mx-auto md:mx-0"
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
            <ShieldCheck className="w-5 h-5 text-green-700" />
          </div>
          <div>
            <h4 className="font-bold text-green-900 mb-1">Приоритет для МТК</h4>
            <p className="text-sm text-green-800/80 leading-relaxed">
              Статус МТК даёт приоритет в отборах ФСИ и ускоренное получение патентов. Мы помогаем подтвердить соответствие критериям и оформить документы в сжатые сроки.
            </p>
          </div>
        </motion.div>

        {/* Микротекст */}
        <motion.p 
          className="text-xs text-gray-400 mt-10 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          Статус МТК даёт приоритет в отборах ФСИ и ускоренное получение патентов.
        </motion.p>
      </div>
    </section>
  );
}