"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Info, Building2, FileText, ShoppingCart } from "lucide-react";

type TaxStatus = {
  id: string;
  title: string;
  org: string;
  orgIcon: React.ElementType;
  benefits: string[];
  taxBefore: string;
  taxAfter: string;
  highlight?: string;
  tooltipTerm: string;
  tooltipText: string;
};

const STATUSES: TaxStatus[] = [
  {
    id: "skolkovo",
    title: "Резидентство Сколково",
    org: "Фонд «Сколково»",
    orgIcon: Building2,
    benefits: [
      "0% на прибыль, имущество, НДС",
      "Страховые взносы 15% (вместо 30%)",
      "Возмещение таможенных платежей",
    ],
    taxBefore: "20% прибыль + 2.2% имущество + 20% НДС + 30% взносы",
    taxAfter: "0% + 0% + 0% + 15%",
    highlight: "Экономия до 52.2%",
    tooltipTerm: "НТИ",
    tooltipText: "Национальная технологическая инициатива: приоритетные направления для господдержки",
  },
  {
    id: "mtk",
    title: "Статус МТК",
    org: "Минэкономразвития",
    orgIcon: FileText,
    benefits: [
      "Региональные льготы по налогу на прибыль (до 0% в отдельных регионах)",
      "Сниженная ставка (-2 п.п.) для промышленной ипотеки",
      "Ускоренное получение статусов Сколково и НТИ без экспертизы",
    ],
    taxBefore: "20% налог на прибыль",
    taxAfter: "0–12.5% (в зависимости от региона) + приоритет в отборах",
    tooltipTerm: "МТК",
    tooltipText: "Малая технологическая компания: выручка <100 млн ₽, доля НИОКР >70%, приоритет в отборах ФСИ",
  },
  {
    id: "registers",
    title: "Реестры 719/878",
    org: "Минпромторг",
    orgIcon: ShoppingCart,
    benefits: [
      "Преференции в госзакупках (приоритет российской продукции)",
      "Компенсация разницы стоимости для покупателей до 100%",
      "Субсидии на оборотные средства и кредиты",
    ],
    taxBefore: "Участие в закупках на общих условиях",
    taxAfter: "Приоритет + компенсация до 100% + субсидии",
    tooltipTerm: "ПП РФ 719/878",
    tooltipText: "Постановления Правительства РФ, определяющие критерии отечественной промышленной продукции и преференции в закупках",
  },
];

const TOOLTIPS: Record<string, string> = {
  "НТИ": "Национальная технологическая инициатива: приоритетные направления для господдержки",
  "МТК": "Малая технологическая компания: выручка <100 млн ₽, доля НИОКР >70%, приоритет в отборах ФСИ",
  "ПП РФ 719/878": "Постановления Правительства РФ, определяющие критерии отечественной промышленной продукции и преференции в закупках",
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

// Открытие модала консультации
const openConsultationModal = () => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("openConsultationModal"));
  }
};

// Компонент тултипа
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
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 max-w-xs bg-white border border-gray-200 rounded-xl p-4 text-sm text-gray-700 shadow-xl z-50 pointer-events-none leading-relaxed break-words whitespace-normal"
          >
            {TOOLTIPS[tooltipKey]}
            <div className="absolute left-1/2 -translate-x-1/2 top-full w-3 h-3 bg-white border-r border-b border-gray-200 rotate-45 -mt-1.5" />
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
};

export default function TaxStatuses() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Заголовок секции */}
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-5%" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-kub-navy tracking-tight mb-4">
            Статусы, которые меняют{" "}
            <span className="text-kub-gold">налоговую модель</span>
          </h2>
        </motion.div>

        {/* Сетка карточек */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-5%" }}
        >
          {STATUSES.map((status) => (
            <StatusCard key={status.id} status={status} />
          ))}
        </motion.div>

        {/* ✅ Вынесенная строка "До/После" — выровнена как в таблице */}
        <motion.div 
          className="hidden md:grid grid-cols-3 gap-6 mt-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {STATUSES.map((status) => (
            <TaxComparisonRow key={status.id} status={status} />
          ))}
        </motion.div>

        {/* Микротекст */}
        <motion.p 
          className="text-xs text-gray-400 mt-8 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          Статусы не суммируются автоматически. Мы выбираем оптимальный сценарий под вашу финмодель.
        </motion.p>
      </div>
    </section>
  );
}

// Компонент отдельной карточки статуса (без переключателя)
function StatusCard({ status }: { status: TaxStatus }) {
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const OrgIcon = status.orgIcon;

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -4, boxShadow: "0 20px 40px -10px rgba(10, 25, 47, 0.12)" }}
      className="bg-[#F8FAFC] rounded-2xl p-6 border border-gray-100 hover:border-kub-gold/30 transition-all relative cursor-default group flex flex-col"
    >
      {/* Логотип организации */}
      <div className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-kub-navy/5 flex items-center justify-center">
        <OrgIcon className="w-4 h-4 text-kub-gold" />
      </div>

      {/* Заголовок */}
      <h3 className="text-lg font-bold text-kub-navy font-heading mb-4 mt-2 pr-10">
        {status.title}
      </h3>

      {/* Список преимуществ */}
      <ul className="space-y-2 mb-4 flex-grow">
        {status.benefits.map((benefit, i) => (
          <li key={i} className="flex items-start gap-2 text-gray-600 text-sm">
            <CheckCircle2 className="w-4 h-4 text-kub-gold flex-shrink-0 mt-0.5" />
            <span>{benefit}</span>
          </li>
        ))}
      </ul>

      {/* Тултип */}
      <div 
        className="relative inline-flex items-center gap-1 mt-auto text-xs text-gray-400 cursor-help"
        onMouseEnter={() => setTooltipVisible(true)}
        onMouseLeave={() => setTooltipVisible(false)}
      >
        <Info className="w-3 h-3" />
        <TooltipTrigger term={status.tooltipTerm} tooltipKey={status.tooltipTerm}>
          {status.tooltipTerm}
        </TooltipTrigger>
      </div>
    </motion.div>
  );
}

// ✅ Отдельный компонент для строки сравнения "До/После" (улучшенный)
function TaxComparisonRow({ status }: { status: TaxStatus }) {
  const [view, setView] = useState<"before" | "after">("before"); // ✅ По умолчанию "До"

  return (
    <div className="bg-white rounded-xl p-4 border border-gray-200 flex flex-col items-center text-center">
      {/* Переключатель */}
      <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1 mb-3 relative">
        <button
          onClick={() => setView("before")}
          className={`relative z-10 px-3 py-1 text-xs font-medium rounded-md transition-all duration-300 ${
            view === "before" 
              ? "bg-white text-kub-navy shadow-sm scale-105" 
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          До
        </button>
        <button
          onClick={() => setView("after")}
          className={`relative z-10 px-3 py-1 text-xs font-medium rounded-md transition-all duration-300 overflow-hidden ${
            view === "after" 
              ? "bg-white text-kub-navy shadow-sm scale-105" 
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          {/* ✨ Анимированный золотой блик для привлечения внимания */}
          {view !== "after" && (
            <motion.span
              className="absolute inset-0 opacity-50"
              style={{
                background: "linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.4), transparent)",
                backgroundSize: "200% 100%",
              }}
              animate={{ 
                backgroundPosition: ["200% 0%", "-200% 0%"] 
              }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity, 
                ease: "linear" 
              }}
            />
          )}
          <span className="relative z-10">После</span>
        </button>
      </div>

      {/* Значение */}
      <AnimatePresence mode="wait">
        {view === "before" ? (
          <motion.span
            key="before"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            // ✅ Красный текст вместо серого зачёркнутого
            className="text-red-500 font-medium text-sm"
          >
            {status.taxBefore}
          </motion.span>
        ) : (
          <motion.div
            key="after"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center"
          >
            <span className="text-kub-gold font-bold text-sm block">{status.taxAfter}</span>
            {status.highlight && (
              <span className="text-[10px] text-green-600 font-medium mt-0.5 inline-block">
                {status.highlight}
              </span>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}