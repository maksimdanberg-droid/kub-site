"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Coins, Rocket, TrendingUp, Handshake, Download } from "lucide-react";

const GRANTS = [
  {
    icon: Coins,
    title: "Микрогранты",
    amount: "180 тыс. – 1,5 млн ₽",
    purpose: "Патентование, сборку прототипов, испытания",
    condition: "Доступно для МТК и компаний с выручкой <100 млн ₽",
    badge: "МТК",
    tooltip: "Малая технологическая компания: выручка <100 млн ₽, доля НИОКР >70%",
  },
  {
    icon: Rocket,
    title: "Показательные внедрения",
    amount: "до 10 млн ₽",
    purpose: "Апробацию продукта в бизнес-процессах заказчика",
    condition: null,
    badge: "Пилотный проект",
    tooltip: null,
  },
  {
    icon: TrendingUp,
    title: "Доращивание",
    amount: "до 10 млн ₽",
    purpose: "Для выпускников акселерации и консалтинговых программ",
    condition: null,
    badge: "После акселератора",
    tooltip: null,
  },
  {
    icon: Handshake,
    title: "Возмещение инвестиций",
    amount: "50% компенсации, до 20 млн ₽",
    purpose: "Возврат части инвестиций от бизнес-ангелов",
    condition: null,
    badge: "Партнёрская программа",
    tooltip: null,
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
};

const openConsultationModal = () => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("openConsultationModal"));
  }
};

export default function SkolkovoGrants() {
  return (
    <section className="bg-white py-16 md:py-24">
      <Container>
        {/* Заголовок + Бейдж Сколково */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold font-heading text-kub-navy tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-5%" }}
            transition={{ duration: 0.5 }}
          >
            Гранты и микрогранты Фонда «Сколково»
          </motion.h2>
          <div className="bg-kub-navy/5 text-kub-navy px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-2 w-fit md:w-auto">
            <span>Фонд «Сколково»</span>
          </div>
        </div>

        {/* Вводный текст */}
        <motion.p 
          className="text-gray-600 text-lg mb-10 max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Статус разблокирует 4 линии финансирования Фонда:
        </motion.p>

        {/* Сетка карточек */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-5%" }}
        >
          {GRANTS.map((grant, i) => {
            const Icon = grant.icon;
            return (
              <motion.div
                key={i}
                variants={itemVariants}
                className="relative bg-[#F8FAFC] rounded-2xl p-6 border border-gray-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-kub-gold/30 group"
              >
                {/* Бейдж */}
                <div 
                  className="absolute top-4 right-4 inline-flex items-center bg-kub-gold/10 text-kub-gold text-[10px] font-bold px-2 py-0.5 rounded-full cursor-help"
                  title={grant.tooltip || undefined}
                >
                  {grant.badge}
                </div>

                {/* Иконка */}
                <div className="w-12 h-12 rounded-xl bg-kub-navy/5 flex items-center justify-center mb-4 text-kub-gold">
                  <Icon size={24} />
                </div>

                {/* Заголовок и сумма */}
                <h3 className="text-lg font-bold text-kub-navy font-heading mb-1">{grant.title}</h3>
                <div className="text-2xl font-bold text-kub-gold font-heading mb-3">{grant.amount}</div>

                {/* На что */}
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  <span className="text-gray-400 font-medium">На что:</span> {grant.purpose}
                </p>

                {/* Условия (если есть) */}
                {grant.condition && (
                  <div className="text-xs text-gray-400 bg-white/50 rounded-lg px-3 py-2 border border-gray-100">
                    {grant.condition}
                  </div>
                )}
              </motion.div>
            );
          })}
        </motion.div>

        {/* Микротекст */}
        <motion.p 
          className="text-center text-xs text-gray-400 mt-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          Суммы индексируются Фондом ежегодно. Условия фиксируются на дату подачи.
        </motion.p>
      </Container>
    </section>
  );
}