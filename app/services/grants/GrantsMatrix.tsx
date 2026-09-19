"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Info, ChevronDown, Building2, CheckCircle2 } from "lucide-react";

type Program = {
  id: string;
  fund: "ФСИ" | "Минпромторг" | "АТР" | "ЦПИИ";
  title: string;
  amount: string;
  cofinancing: string;
  stage: string;
  okved?: string[];
  badge: { text: string; color: string };
  description?: string;
};

const PROGRAMS: Program[] = [
  // ✅ ФСИ — 6 программ (добавлены Старт-2 и Бизнес-Старт)
  {
    id: "fsie-start",
    fund: "ФСИ",
    title: "ФСИ «Старт»",
    amount: "до 5 млн ₽",
    cofinancing: "0%",
    stage: "Ранние стадии, прототипы",
    okved: ["72.19", "62.01", "26.xx"],
    badge: { text: "0% коф.", color: "bg-green-100 text-green-700" },
    description: "Поддержка стартапов на ранних стадиях. Области: станкостроение, промышленность, электроника, НТИ, ИИ, цифровые технологии, медизделия.",
  },
  {
    id: "fsie-start-2",
    fund: "ФСИ",
    title: "ФСИ «Старт-2»",
    amount: "до 10 млн ₽",
    cofinancing: "не менее 15%",
    stage: "После «Старт-1», переход к продукту",
    badge: { text: "12-18 мес", color: "bg-blue-100 text-blue-700" },
    description: "Для тех, кто успешно прошёл «Старт-1». Дальнейшие НИОКР для перехода от прототипа к полнофункциональному продукту и начала первых продаж.",
  },
  {
    id: "fsie-business-start",
    fund: "ФСИ",
    title: "ФСИ «Бизнес-Старт»",
    amount: "до 18 млн ₽",
    cofinancing: "не менее 30%",
    stage: "Масштабирование, вывод на рынок",
    badge: { text: "Коммерция", color: "bg-orange-100 text-orange-700" },
    description: "Нацелен на коммерциализацию. Масштабирование производства и вывод продукта на рынок. Фокус смещён с науки на бизнес.",
  },
  {
    id: "fsie-development",
    fund: "ФСИ",
    title: "ФСИ «Развитие»",
    amount: "15–30 млн ₽",
    cofinancing: "15%",
    stage: "Компании с опытом разработки и продаж",
    badge: { text: "15% коф.", color: "bg-blue-100 text-blue-700" },
    description: "Для компаний, имеющих опыт разработки и продаж наукоемкой продукции.",
  },
  {
    id: "fsie-commercialization",
    fund: "ФСИ",
    title: "ФСИ «Коммерциализация»",
    amount: "до 50 млн ₽",
    cofinancing: "50%",
    stage: "Завершённые НИОКР, запуск производства",
    badge: { text: "50% коф.", color: "bg-yellow-100 text-yellow-700" },
    description: "Для предприятий, завершивших НИОКР и планирующих создание/расширение производства инновационной продукции.",
  },
  {
    id: "fsie-internationalization",
    fund: "ФСИ",
    title: "ФСИ «Интернационализация»",
    amount: "до 30 млн ₽",
    cofinancing: "15%",
    stage: "Выход на экспорт, международное сотрудничество",
    badge: { text: "Экспорт", color: "bg-purple-100 text-purple-700" },
    description: "Поддержка проектов по разработке несырьевой экспортно-ориентированной продукции.",
  },
  
  // Минпромторг
  {
    id: "minprom-niokr",
    fund: "Минпромторг",
    title: "Минпромторг «НИОКР»",
    amount: "до 250 млн ₽",
    cofinancing: "до 70% возмещения",
    stage: "НИОКР до 3 лет",
    badge: { text: "До 70%", color: "bg-green-100 text-green-700" },
  },
  {
    id: "minprom-electronics",
    fund: "Минпромторг",
    title: "Минпромторг «Электроника»",
    amount: "до 2 500 млн ₽",
    cofinancing: "10%",
    stage: "Средства производства, САПР",
    badge: { text: "Корп. заказчик", color: "bg-indigo-100 text-indigo-700" },
  },
  
  // АТР
  {
    id: "atr-reverse",
    fund: "АТР",
    title: "АТР «Обратный инжиниринг»",
    amount: "100–150 млн ₽",
    cofinancing: "80–100%",
    stage: "КД для серийного выпуска",
    badge: { text: "До 100%", color: "bg-green-100 text-green-700" },
  },
  
  // ЦПИИ
  {
    id: "cpii-growth",
    fund: "ЦПИИ",
    title: "ЦПИИ «Доращивание»",
    amount: "25–250 млн ₽",
    cofinancing: "50%",
    stage: "При наличии корпорации-заказчика",
    badge: { text: "Корп. заказчик", color: "bg-indigo-100 text-indigo-700" },
  },
];

const FUNDS = [
  { id: "all", label: "Все фонды" },
  { id: "ФСИ", label: "ФСИ" },
  { id: "Минпромторг", label: "Минпромторг" },
  { id: "АТР", label: "АТР" },
  { id: "ЦПИИ", label: "ЦПИИ" },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const} },
};

// Открытие модала консультации
const openConsultationModal = () => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("openConsultationModal"));
  }
};

export default function GrantsMatrix() {
  const [selectedFund, setSelectedFund] = useState<string>("all");
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [tooltipVisible, setTooltipVisible] = useState<string | null>(null);

  // Фильтрация по фонду
  const filteredPrograms = selectedFund === "all" 
    ? PROGRAMS 
    : PROGRAMS.filter((p) => p.fund === selectedFund);

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Заголовок секции */}
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-5%" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-kub-navy tracking-tight mb-4">
            Доступные программы{" "}
            <span className="text-kub-gold">финансирования</span>
          </h2>
          <p className="text-gray-600 text-lg">
            Финансирование субъектов малого предпринимательства на разных этапах развития проектов.
          </p>
        </motion.div>

        {/* Фильтр по фондам (выпадающий список) */}
        <motion.div 
          className="flex justify-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <div className="relative w-full max-w-xs">
            <select
              value={selectedFund}
              onChange={(e) => setSelectedFund(e.target.value)}
              className="w-full appearance-none px-4 py-3 pr-10 bg-[#F8FAFC] border border-gray-200 rounded-xl text-sm font-medium text-kub-navy focus:ring-2 focus:ring-kub-gold/20 focus:border-kub-gold outline-none cursor-pointer"
            >
              {FUNDS.map((fund) => (
                <option key={fund.id} value={fund.id} className="bg-white">
                  {fund.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>
        </motion.div>

        {/* Сетка карточек (desktop) */}
        <motion.div 
          className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-5%" }}
        >
          <AnimatePresence mode="popLayout">
            {filteredPrograms.map((program) => (
              <motion.div
                key={program.id}
                layout
                variants={itemVariants}
                whileHover={{ y: -4, boxShadow: "0 20px 40px -10px rgba(10, 25, 47, 0.12)" }}
                className="relative bg-[#F8FAFC] rounded-2xl p-5 border border-gray-100 transition-all duration-300 hover:border-kub-gold/30 cursor-pointer group"
                onClick={() => openConsultationModal()}
              >
                {/* Бейдж */}
                <span className={`absolute top-4 right-4 inline-flex items-center ${program.badge.color} text-[10px] font-bold px-2 py-0.5 rounded-full`}>
                  {program.badge.text}
                </span>

                {/* Логотип фонда */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-kub-navy/5 flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-4 h-4 text-kub-gold" />
                  </div>
                  <span className="text-xs font-medium text-gray-500">{program.fund}</span>
                </div>

                {/* Заголовок и сумма */}
                <h3 className="text-base font-bold text-kub-navy font-heading mb-1">{program.title}</h3>
                <div className="text-xl font-bold text-kub-gold font-heading mb-1">{program.amount}</div>
                
                {/* Софинансирование */}
                <p className="text-sm text-gray-500 mb-3">
                  <span className="text-gray-400">Софинансирование:</span> {program.cofinancing}
                </p>
                
                {/* Стадия */}
                <p className="text-xs text-gray-400 mb-2">{program.stage}</p>

                {/* Описание (показываем при ховере на десктопе) */}
                {program.description && (
                  <p className="text-xs text-gray-500 hidden group-hover:block mt-2 pt-2 border-t border-gray-100">
                    {program.description}
                  </p>
                )}

                {/* Тултип ОКВЭД */}
                {program.okved && (
                  <div 
                    className="relative inline-flex items-center gap-1 text-xs text-gray-400 cursor-help mt-2"
                    onMouseEnter={() => setTooltipVisible(program.id)}
                    onMouseLeave={() => setTooltipVisible(null)}
                  >
                    <Info className="w-3 h-3" />
                    <span>ОКВЭД</span>
                    
                    <AnimatePresence>
                      {tooltipVisible === program.id && (
                        <motion.div
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 5 }}
                          className="absolute bottom-full left-0 mb-2 w-48 bg-white border border-gray-200 rounded-lg p-3 text-xs text-gray-600 shadow-lg z-20"
                        >
                          <p className="font-medium text-gray-700 mb-1">Подходящие ОКВЭД:</p>
                          <ul className="space-y-0.5">
                            {program.okved.map((code) => (
                              <li key={code} className="flex items-center gap-1">
                                <ChevronDown className="w-3 h-3 rotate-90 text-kub-gold" />
                                {code}
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Аккордеон (mobile) */}
        <div className="md:hidden space-y-3">
          <AnimatePresence mode="popLayout">
            {filteredPrograms.map((program) => (
              <motion.div
                key={program.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-[#F8FAFC] rounded-xl border border-gray-100 overflow-hidden"
              >
                <button
                  onClick={() => setExpandedCard(expandedCard === program.id ? null : program.id)}
                  className="w-full flex items-center justify-between p-4 text-left"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`inline-flex items-center ${program.badge.color} text-[10px] font-bold px-2 py-0.5 rounded-full`}>
                        {program.badge.text}
                      </span>
                      <span className="text-xs text-gray-500">{program.fund}</span>
                    </div>
                    <h3 className="text-base font-bold text-kub-navy font-heading">{program.title}</h3>
                    <div className="text-lg font-bold text-kub-gold font-heading">{program.amount}</div>
                  </div>
                  <ChevronDown 
                    className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                      expandedCard === program.id ? "rotate-180" : ""
                    }`} 
                  />
                </button>
                
                <AnimatePresence>
                  {expandedCard === program.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4 space-y-3 border-t border-gray-100 pt-3">
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Софинансирование:</span> {program.cofinancing}
                        </p>
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Стадия:</span> {program.stage}
                        </p>
                        {program.description && (
                          <p className="text-sm text-gray-500">{program.description}</p>
                        )}
                        {program.okved && (
                          <p className="text-xs text-gray-400">
                            <span className="font-medium">ОКВЭД:</span> {program.okved.join(", ")}
                          </p>
                        )}
                        <button
                          onClick={(e) => { e.stopPropagation(); openConsultationModal(); }}
                          className="w-full py-2 bg-kub-gold text-kub-navy text-sm font-semibold rounded-lg hover:bg-kub-gold/90 transition-colors flex items-center justify-center gap-2"
                        >
                          <CheckCircle2 size={14} />
                          Подать заявку
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Микротекст */}
        <motion.p 
          className="text-xs text-gray-400 mt-8 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          Условия могут меняться по итогам конкурсных отборов. Фиксируем актуальные параметры на дату подачи.
        </motion.p>
      </div>
    </section>
  );
}