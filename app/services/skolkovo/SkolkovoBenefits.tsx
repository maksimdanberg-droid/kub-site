"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Scale, Building2, BadgeCheck, FileCheck } from "lucide-react";
import SkolkovoCalculator from "@/components/ui/SkolkovoCalculator";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

// ... импорты остаются без изменений ...

export default function SkolkovoBenefits() {
  return (
    <section className="bg-[#F8FAFC] py-16 md:py-24">
      <Container>
        {/* Заголовок + Бейдж */}
        <motion.div 
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-5%" }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-kub-navy font-heading">
            Налоговые льготы и сервисы резидента
          </h2>
          <div className="inline-flex items-center gap-2 bg-kub-gold/10 text-kub-gold text-xs font-bold px-3 py-1.5 rounded-full w-fit">
            <BadgeCheck size={14} /> Резидент Сколково
          </div>
        </motion.div>

        {/* Вводный текст */}
        <motion.p 
          className="text-gray-600 text-lg mb-8 max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Помимо финансирования, статус даёт правовую и инфраструктурную защиту:
        </motion.p>

        {/* ✅ СЕТКА: 1/3 текст + 2/3 калькулятор */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Левая часть: таблица льгот (1/3) */}
          <div className="lg:col-span-1">
            <motion.div 
              className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 space-y-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-5%" }}
            >
              {/* Налоги */}
              <motion.div variants={itemVariants} className="space-y-4">
                <h3 className="text-lg font-bold text-kub-navy font-heading mb-3 flex items-center gap-2">
                  <Scale className="w-5 h-5 text-kub-gold" /> Налоговые льготы
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-gray-600 text-sm leading-relaxed">
                    <span className="text-kub-gold font-bold text-lg shrink-0">0%</span>
                    <span>на прибыль, имущество, НДС</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-600 text-sm leading-relaxed">
                    <span className="text-kub-gold font-bold text-lg shrink-0">15%</span>
                    <span>страховые взносы (вместо 30%)</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-600 text-sm leading-relaxed">
                    <FileCheck className="w-5 h-5 text-kub-gold shrink-0 mt-0.5" />
                    <span>Таможня: возмещение платежей при импорте оборудования</span>
                  </li>
                </ul>
              </motion.div>

              {/* Инфраструктура */}
              <motion.div variants={itemVariants} className="space-y-4">
                <h3 className="text-lg font-bold text-kub-navy font-heading mb-3 flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-kub-gold" /> Инфраструктура
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-gray-600 text-sm leading-relaxed">
                    <BadgeCheck className="w-5 h-5 text-kub-gold shrink-0 mt-0.5" />
                    <span>Юридическое и патентное сопровождение, реестр ПО</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-600 text-sm leading-relaxed">
                    <Building2 className="w-5 h-5 text-kub-gold shrink-0 mt-0.5" />
                    <span>Льготная аренда офисов, лабораторий, жилья</span>
                  </li>
                </ul>
              </motion.div>
            </motion.div>
          </div>

          {/* ✅ Правая часть: калькулятор (2/3) — ДОБАВЛЕНО id="tax-calculator" */}
          <div id="tax-calculator" className="lg:col-span-2 scroll-mt-24">
            <SkolkovoCalculator />
          </div>
        </div>

        {/* Микротекст */}
        <motion.p 
          className="text-xs text-gray-400 mt-4 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          Актуально на 2026 год. Льготы закреплены в НК РФ.
        </motion.p>
      </Container>
    </section>
  );
}