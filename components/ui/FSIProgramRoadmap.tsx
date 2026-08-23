"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, ArrowRight, Info } from "lucide-react";

type Program = {
  id: string;
  name: string;
  amount: string;
  eligible: string[];
  description: string;
  next?: string[];
  isSpecial?: boolean;
};

const FSI_ROADMAP: Program[] = [
  { 
    id: "idea", 
    name: "💡 Идея", 
    amount: "Старт пути", 
    eligible: ["Все"],
    description: "Начальная стадия: есть концепция, но пока нет прототипа или ТЭО",
    isSpecial: true
  },
  { 
    id: "start1", 
    name: "Старт-1", 
    amount: "до 5 млн ₽", 
    eligible: ["Физ.лица", "ИП", "Юр.лица"],
    description: "Первый грант на создание прототипа и проведение НИОКР. Поддержка ранних стадий разработки.",
    next: ["start2", "business-start"]
  },
  { 
    id: "start2", 
    name: "Старт-2", 
    amount: "до 12 млн ₽", 
    eligible: ["ИП", "Юр.лица", "МТК"],
    description: "Для тех, кто успешно прошёл Старт-1. Дальнейшие НИОКР для перехода от прототипа к продукту.",
    next: ["development"]
  },
  { 
    id: "business-start", 
    name: "Бизнес-Старт", 
    amount: "до 30 млн ₽", 
    eligible: ["ИП", "Юр.лица", "МТК"],
    description: "Коммерциализация: масштабирование производства и вывод продукта на рынок.",
    next: ["development"]
  },
  { 
    id: "development", 
    name: "Развитие", 
    amount: "15–30 млн ₽", 
    eligible: ["ИП", "Юр.лица", "МТК (+баллы)"],
    description: "Для компаний с опытом продаж. Создание/расширение производства инновационной продукции.",
    next: ["commercialization"]
  },
  { 
    id: "commercialization", 
    name: "Коммерциализация", 
    amount: "до 50 млн ₽", 
    eligible: ["ИП", "Юр.лица", "МТК (ко-фин. 30%)"],
    description: "Завершение НИОКР и запуск серийного производства. МТК получают сниженное софинансирование.",
    next: ["internationalization"]
  },
  { 
    id: "internationalization", 
    name: "Интернационализация", 
    amount: "до 30 млн ₽", 
    eligible: ["Юр.лица", "МТК"],
    description: "Выход на экспорт. Поддержка проектов по разработке несырьевой экспортно-ориентированной продукции.",
  },
  { 
    id: "special", 
    name: "Спецпрограммы", 
    amount: "до 2.5 млрд ₽", 
    eligible: ["Юр.лица (по приглашению)"],
    description: "Развитие станкостроения, электроника, НТИ, цифровые платформы, медизделия, искусственный интеллект и другие приоритетные направления.",
    isSpecial: true
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2, delayChildren: 0.3 } },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { duration: 0.5, ease: "easeOut" }
  },
};

export default function FSIProgramRoadmap() {
  const [activeProgram, setActiveProgram] = useState<string | null>(null);
  const [hoveredProgram, setHoveredProgram] = useState<string | null>(null);

  return (
    <section className="bg-[#F8FAFC] py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Заголовок + вводный текст */}
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold font-heading text-kub-navy tracking-tight mb-4">
            Как расти вместе с{" "}
            <span className="text-kub-gold">Фондом содействия инновациям</span>
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            Программы ФСИ выстроены как лестница: каждая следующая ступень открывает новые возможности 
            и суммы финансирования. Мы поможем определить вашу текущую позицию и спланировать путь 
            до серийного производства.
          </p>
        </motion.div>

        {/* Схема прогрессии */}
        <div className="relative">
          {/* Горизонтальная линия-соединитель (desktop) */}
          <div className="hidden lg:block absolute top-20 left-0 right-0 h-0.5 bg-gray-200 -z-10" />
          
          {/* Вертикальная линия (mobile) */}
          <div className="lg:hidden absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gray-200 -z-10" />

          {/* Desktop: горизонтальная схема */}
          <motion.div 
            className="hidden lg:flex items-start justify-between gap-2"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
          >
            {FSI_ROADMAP.map((program, index) => (
              <motion.div key={program.id} variants={itemVariants} className="flex flex-col items-center relative">
                {/* Стрелка вниз от "Идеи" */}
                {program.id === "start1" && (
                  <motion.div 
                    className="absolute -top-10 text-gray-300"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <ArrowDown size={20} />
                  </motion.div>
                )}
                
                {/* Карточка программы с подсветкой */}
                <motion.div
                  animate={{ 
                    scale: activeProgram === program.id ? 1.05 : 1,
                    borderColor: activeProgram === program.id ? "rgba(212, 175, 55, 0.6)" : "rgba(229, 231, 235, 1)",
                    boxShadow: activeProgram === program.id ? "0 10px 40px -10px rgba(212, 175, 55, 0.3)" : "0 1px 3px rgba(0,0,0,0.1)"
                  }}
                  whileHover={{ 
                    scale: 1.03, 
                    borderColor: "rgba(212, 175, 55, 0.6)",
                    y: -5
                  }}
                  onHoverStart={() => setHoveredProgram(program.id)}
                  onHoverEnd={() => setHoveredProgram(null)}
                  className={`bg-white rounded-xl p-4 border-2 shadow-sm text-center relative z-10 min-w-[140px] transition-all cursor-pointer ${
                    program.isSpecial ? "border-kub-gold/50 bg-kub-gold/5" : ""
                  } ${activeProgram === program.id ? "ring-2 ring-kub-gold/30" : ""}`}
                >
                  {/* Иконка Info при наведении */}
                  <div className="absolute top-2 right-2 opacity-0 hover:opacity-100 transition-opacity">
                    <Info size={14} className="text-kub-gold" />
                  </div>

                  {/* Бейдж элиджибилити */}
                  <div className="absolute -top-2 -right-2 flex flex-wrap justify-end gap-1">
                    {program.eligible.slice(0, 2).map((el, i) => (
                      <span 
                        key={i} 
                        className="bg-green-100 text-green-700 text-[10px] px-2 py-0.5 rounded-full whitespace-nowrap"
                      >
                        {el}
                      </span>
                    ))}
                  </div>
                  
                  <div className={`text-sm font-bold text-kub-navy font-heading mb-1 ${program.isSpecial ? "text-kub-gold" : ""}`}>
                    {program.name}
                  </div>
                  <div className={`text-lg font-bold font-heading ${program.isSpecial ? "text-kub-navy" : "text-kub-gold"}`}>
                    {program.amount}
                  </div>
                </motion.div>

                {/* Стрелка-соединитель между карточками */}
                {index < FSI_ROADMAP.length - 1 && (
                  <motion.div 
                    className="absolute top-1/2 -translate-y-1/2 left-full w-8 text-gray-300 -z-10"
                    initial={{ scaleX: 0, opacity: 0 }}
                    whileInView={{ scaleX: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.2 + 0.5 }}
                  >
                    <ArrowRight size={16} className="ml-2" />
                  </motion.div>
                )}

                {/* Тултип с описанием программы */}
                <AnimatePresence>
                  {hoveredProgram === program.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-64 bg-white border border-gray-200 rounded-xl p-4 text-sm text-gray-700 shadow-2xl z-30 pointer-events-none"
                    >
                      <p className="leading-relaxed">{program.description}</p>
                      <div className="absolute left-1/2 -translate-x-1/2 top-full w-3 h-3 bg-white border-r border-b border-gray-200 rotate-45 -mt-1.5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>

          {/* Mobile: вертикальная схема */}
          <motion.div 
            className="lg:hidden flex flex-col items-center gap-6 py-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {FSI_ROADMAP.map((program, index) => (
              <motion.div key={program.id} variants={itemVariants} className="flex flex-col items-center relative w-full max-w-xs">
                {/* Карточка программы */}
                <motion.div
                  animate={{ 
                    scale: activeProgram === program.id ? 1.03 : 1,
                    borderColor: activeProgram === program.id ? "rgba(212, 175, 55, 0.6)" : "rgba(229, 231, 235, 1)",
                  }}
                  whileHover={{ 
                    scale: 1.02, 
                    borderColor: "rgba(212, 175, 55, 0.6)"
                  }}
                  onHoverStart={() => setHoveredProgram(program.id)}
                  onHoverEnd={() => setHoveredProgram(null)}
                  className={`bg-white rounded-xl p-4 border-2 border-gray-100 shadow-sm text-center relative z-10 w-full transition-all cursor-pointer ${
                    program.isSpecial ? "border-kub-gold/50 bg-kub-gold/5" : ""
                  }`}
                >
                  {/* Бейдж элиджибилити (под суммой на мобильном) */}
                  <div className="flex flex-wrap justify-center gap-1 mb-2">
                    {program.eligible.map((el, i) => (
                      <span 
                        key={i} 
                        className="bg-green-100 text-green-700 text-[10px] px-2 py-0.5 rounded-full whitespace-nowrap"
                      >
                        {el}
                      </span>
                    ))}
                  </div>
                  
                  <div className={`text-sm font-bold text-kub-navy font-heading mb-1 ${program.isSpecial ? "text-kub-gold" : ""}`}>
                    {program.name}
                  </div>
                  <div className={`text-lg font-bold font-heading ${program.isSpecial ? "text-kub-navy" : "text-kub-gold"}`}>
                    {program.amount}
                  </div>

                  {/* Тултип на мобильном */}
                  <AnimatePresence>
                    {hoveredProgram === program.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-3 pt-3 border-t border-gray-100 text-xs text-gray-600 leading-relaxed"
                      >
                        {program.description}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Стрелка вниз между карточками */}
                {index < FSI_ROADMAP.length - 1 && (
                  <motion.div 
                    className="text-gray-300 my-2"
                    initial={{ opacity: 0, y: -10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 + 0.3 }}
                  >
                    <ArrowDown size={20} />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Микротекст под схемой */}
        <motion.p 
          className="text-xs text-gray-400 mt-10 text-center max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          После победы в «Старт-1» вы получаете приоритет при рассмотрении заявки на «Старт-2». 
          Участие в «Развитии» даёт дополнительные баллы в «Коммерциализации». Мы отслеживаем все 
          изменения регламентов и помогаем выстроить стратегию на 3–5 лет вперёд.
        </motion.p>
      </div>
    </section>
  );
}