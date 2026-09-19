"use client";

import { motion } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";

type Program = {
  id: string;
  name: string;
  amount: string;
  eligible: string[];
  next?: string[];
  isSpecial?: boolean;
};

const FSI_ROADMAP: Program[] = [
  { 
    id: "idea", 
    name: "💡 Идея", 
    amount: "Старт пути", 
    eligible: ["Все"],
    isSpecial: true
  },
  { 
    id: "start1", 
    name: "Старт-1", 
    amount: "до 4 млн ₽", 
    eligible: ["Физ.лица", "ИП", "Юр.лица"],
    next: ["start2", "business-start"]
  },
  { 
    id: "start2", 
    name: "Старт-2", 
    amount: "до 12 млн ₽", 
    eligible: ["ИП", "Юр.лица", "МТК"],
    next: ["development"]
  },
  { 
    id: "business-start", 
    name: "Бизнес-Старт", 
    amount: "до 30 млн ₽", 
    eligible: ["ИП", "Юр.лица", "МТК"],
    next: ["development"]
  },
  { 
    id: "development", 
    name: "Развитие", 
    amount: "15–30 млн ₽", 
    eligible: ["ИП", "Юр.лица", "МТК (+баллы)"],
    next: ["commercialization"]
  },
  { 
    id: "commercialization", 
    name: "Коммерциализация", 
    amount: "до 50 млн ₽", 
    eligible: ["ИП", "Юр.лица", "МТК (ко-фин. 30%)"],
    next: ["internationalization"]
  },
  { 
    id: "internationalization", 
    name: "Интернационализация", 
    amount: "до 30 млн ₽", 
    eligible: ["Юр.лица", "МТК"],
  },
  { 
    id: "special", 
    name: "Спецпрограммы", 
    amount: "до 2.5 млрд ₽", 
    eligible: ["Юр.лица (по приглашению)"],
    isSpecial: true
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

// ✅ ИСПРАВЛЕНО: добавлено "as const" для типобезопасности ease
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.4, ease: "easeOut" as const } 
  },
};

export default function FSIProgramRoadmap() {
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
                    transition={{ delay: 0.3 }}
                  >
                    <ArrowDown size={20} />
                  </motion.div>
                )}
                
                {/* Карточка программы */}
                <motion.div
                  whileHover={{ scale: 1.03, borderColor: "rgba(212, 175, 55, 0.3)" }}
                  className={`bg-white rounded-xl p-4 border border-gray-100 shadow-sm text-center relative z-10 min-w-[140px] transition-all ${
                    program.isSpecial ? "border-kub-gold/30 bg-kub-gold/5" : ""
                  }`}
                >
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
                    transition={{ duration: 0.4, delay: index * 0.1 + 0.3 }}
                  >
                    <ArrowRight size={16} className="ml-2" />
                  </motion.div>
                )}
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
                  whileHover={{ scale: 1.02, borderColor: "rgba(212, 175, 55, 0.3)" }}
                  className={`bg-white rounded-xl p-4 border border-gray-100 shadow-sm text-center relative z-10 w-full transition-all ${
                    program.isSpecial ? "border-kub-gold/30 bg-kub-gold/5" : ""
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
                </motion.div>

                {/* Стрелка вниз между карточками */}
                {index < FSI_ROADMAP.length - 1 && (
                  <motion.div 
                    className="text-gray-300 my-2"
                    initial={{ opacity: 0, y: -10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.2 }}
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