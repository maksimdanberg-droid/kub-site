"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { FileLock, Handshake, Rocket, TrendingUp, CheckCircle2 } from "lucide-react";

type Program = {
  icon: React.ElementType;
  name: string;
  amount: string;
  description: string;
  conditions: string[];
  highlight?: boolean;
};

const PROGRAMS: Program[] = [
  {
    icon: FileLock,
    name: "Микрогранты на патенты и прототипы",
    amount: "180 тыс. – 1,5 млн ₽",
    description: "Покрытие расходов на патентование, создание прототипов, закупку комплектующих и проведение испытаний.",
    conditions: [
      "Для МТК и компаний с выручкой <100 млн ₽/год",
      "Безвозмездно",
      "Срок рассмотрения: ~1 мес",
    ],
  },
  {
    icon: Handshake,
    name: "Возмещение инвестиций бизнес-ангелов",
    amount: "до 20 млн ₽",
    description: "Компенсация 50% инвестиций, привлечённых от физических лиц (бизнес-ангелов) в компанию-резидента.",
    conditions: [
      "Компенсация до 50% суммы инвестиций",
      "Инвестор — физическое лицо",
      "Требуется подтверждение перевода",
    ],
  },
  {
    icon: Rocket,
    name: "Гранты на показательные внедрения",
    amount: "до 10 млн ₽",
    description: "Апробация и интеграция продукта в бизнес-процессы заказчика, испытания в условиях опытно-промышленной эксплуатации.",
    conditions: [
      "На интеграцию в процессы заказчика",
      "Требуется письмо поддержки",
      "Возмещение до 100% затрат",
    ],
    highlight: true,
  },
  {
    icon: TrendingUp,
    name: "Гранты на доращивание",
    amount: "до 10 млн ₽",
    description: "Повышение готовности продукта (TRL) и внедрение у заказчика для выпускников акселерационных программ Сколково.",
    conditions: [
      "Только для выпускников акселераторов Сколково",
      "На доработку продукта или внедрение",
      "Приоритет: экспорт, импортозамещение",
    ],
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
};

// ✅ Функция для открытия модала с защитой от частых вызовов
let lastTriggerTime = 0;

const openConsultationModal = () => {
  if (typeof window !== "undefined") {
    const now = Date.now();
    // Открываем не чаще чем раз в 500ms (защита от дублей)
    if (now - lastTriggerTime > 500) {
      lastTriggerTime = now;
      window.dispatchEvent(new CustomEvent("openConsultationModal"));
    }
  }
};

export default function SkolkovoPrograms() {
  return (
    <section className="bg-white py-16 md:py-24">
      <Container>
        {/* Заголовок секции */}
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-5%" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-kub-navy tracking-tight mb-4">
            Программы{" "}
            <span className="text-kub-gold">финансирования</span>
          </h2>
          <p className="text-gray-600 text-lg">
            Выберите подходящий формат поддержки под стадию вашего проекта. 
            Помогаем подготовить заявку под любую программу.
          </p>
        </motion.div>

        {/* Сетка карточек программ */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-5%" }}
        >
          {PROGRAMS.map((program, index) => {
            const Icon = program.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -4, boxShadow: "0 20px 40px -10px rgba(10, 25, 47, 0.12)" }}
                className={`relative p-6 rounded-2xl border transition-all duration-300 cursor-pointer ${
                  program.highlight
                    ? "bg-kub-navy border-kub-gold/30 shadow-lg shadow-kub-gold/10"
                    : "bg-[#F8FAFC] border-gray-100 hover:border-kub-gold/30"
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  openConsultationModal();
                }}
              >
                {/* Бейдж "Популярно" для грантов на внедрения */}
                {program.highlight && (
                  <span className="absolute -top-3 right-4 px-3 py-1 bg-kub-gold text-kub-navy text-xs font-bold rounded-full">
                    Популярно
                  </span>
                )}

                {/* Иконка + Название + Сумма */}
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    program.highlight ? "bg-kub-gold/10" : "bg-kub-navy/5"
                  }`}>
                    <Icon className={`w-6 h-6 ${program.highlight ? "text-kub-gold" : "text-kub-gold"}`} />
                  </div>
                  <div>
                    <h3 className={`font-bold font-heading text-lg ${
                      program.highlight ? "text-white" : "text-kub-navy"
                    }`}>
                      {program.name}
                    </h3>
                    <div className={`text-2xl font-bold font-heading ${
                      program.highlight ? "text-kub-gold" : "text-kub-navy"
                    }`}>
                      {program.amount}
                    </div>
                  </div>
                </div>

                {/* Описание */}
                <p className={`text-sm leading-relaxed mb-4 ${
                  program.highlight ? "text-gray-300" : "text-gray-600"
                }`}>
                  {program.description}
                </p>

                {/* Условия */}
                <ul className="space-y-2">
                  {program.conditions.map((condition, i) => (
                    <li key={i} className={`flex items-start gap-2 text-xs ${
                      program.highlight ? "text-gray-400" : "text-gray-500"
                    }`}>
                      <CheckCircle2 className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                        program.highlight ? "text-kub-gold/70" : "text-kub-gold"
                      }`} />
                      <span>{condition}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA: при клике открывается модал консультации */}
                <div className={`inline-flex items-center gap-1 text-sm font-medium mt-4 ${
                  program.highlight ? "text-kub-gold" : "text-kub-navy"
                }`}>
                  <span>Подать заявку →</span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Микротекст внизу */}
        <motion.p 
          className="text-center text-xs text-gray-400 mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          Все суммы указаны до вычета налогов • Точный размер гранта определяется экспертизой
        </motion.p>
      </Container>
    </section>
  );
}