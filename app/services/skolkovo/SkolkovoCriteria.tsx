"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { CheckCircle2 } from "lucide-react";

const CRITERIA = [
  "Юрлицо или ИП, зарегистрированное в РФ",
  "Разработка в одной из 9 приоритетных областей (ИТ, биомед, энергоэффективность и др.)",
  "Выручка до 1 млрд ₽/год (для новых резидентов)",
  "Наличие прототипа, ТУ или патента (подтверждение инновационности)",
  "План коммерциализации на 3–5 лет",
  "Экспортный потенциал или импортозамещение (приоритет)",
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" as const} },
};

export default function SkolkovoCriteria() {
  return (
    // ✅ ДОБАВЛЕНО: id="check-criteria" и scroll-mt-24 (отступ под фиксированный хедер)
    <section 
      id="check-criteria" 
      className="scroll-mt-24 bg-white py-8 md:py-12"
    >
      <Container>
        {/* Заголовок + текст-лид */}
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-5%" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-kub-navy tracking-tight mb-4">
            Кто может стать резидентом{" "}
            <span className="text-kub-gold">Сколково</span>
          </h2>
          <p className="text-gray-600 text-lg">
            Статус доступен технологическим компаниям, которые разрабатывают и коммерциализируют инновационные решения в приоритетных направлениях Фонда.
          </p>
        </motion.div>

        {/* Чек-лист критериев */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-5%" }}
        >
          {CRITERIA.map((text, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
              className="flex items-start gap-3 p-4 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <CheckCircle2 className="w-6 h-6 text-kub-gold flex-shrink-0 mt-0.5" />
              <span className="text-gray-700 text-base leading-relaxed">{text}</span>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}