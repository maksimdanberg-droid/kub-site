"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Percent, CheckCircle2 } from "lucide-react";

// ✅ Стандартные варианты анимаций для единообразия
const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function CasesMTKRegistry() {
  return (
    <section className="bg-white py-16 md:py-24">
      <Container>
        <div className="max-w-5xl mx-auto">
          
          {/* Карточка кейса */}
          <motion.div 
            className="bg-[#F8FAFC] rounded-3xl p-6 md:p-10 border border-gray-100 shadow-sm"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-5%" }}
            transition={{ duration: 0.5 }}
          >
            
            {/* Заголовок кейса */}
            <motion.h2 
              className="text-2xl md:text-3xl font-bold text-kub-navy font-heading mb-6 flex items-center gap-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Percent className="w-7 h-7 text-kub-gold" />
              Промышленное оборудование → Реестр МТК (8% налог на прибыль)
            </motion.h2>

            {/* Блок "Задача" */}
            <motion.div 
              className="bg-white rounded-xl p-5 mb-8 border-l-4 border-kub-gold"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <p className="text-gray-700 leading-relaxed">
                <span className="font-semibold text-kub-navy">Задача:</span> Снизить ставку налога на прибыль с 25% до 8% для производственного предприятия (75 чел.) путем получения статуса Малой Технологической Компании.
              </p>
            </motion.div>

            {/* Блок "Что сделали" */}
            <motion.div 
              className="mb-8"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-bold text-kub-navy font-heading mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-kub-gold" />
                Что сделали
              </h3>
              <ul className="list-none space-y-3">
                {[
                  "Провели аудит соответствия критериям реестра и выявили дефицит прав на интеллектуальную деятельность",
                  "Оформили патент на разработку: патентные исследования, подача заявки и получение охранного документа",
                  "Сформировали доказательную базу технологического характера деятельности и подтвердили профиль компании",
                  "Подготовили комплект документов для включения в реестр и сопроводили внесение записи в ЕГРЮЛ"
                ].map((item, i) => (
                  <motion.li key={i} variants={fadeInUp} className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-kub-gold mt-2 shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Блок "Итог в цифрах" */}
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {[
                { value: "4,0 млн ₽", label: "Экономия за 1 пол. 2026" },
                { value: "8%", label: "Ставка налога на прибыль" },
                { value: "Патент", label: "Новый актив компании" }
              ].map((item, i) => (
                <motion.div 
                  key={i} 
                  variants={fadeInUp}
                  className="bg-kub-navy text-white rounded-xl p-5 text-center"
                >
                  <div className="text-3xl font-bold text-kub-gold font-heading">{item.value}</div>
                  <div className="text-sm text-gray-300 mt-1">{item.label}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* Таблица "До/После" */}
            <motion.div 
              className="overflow-x-auto my-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <table className="w-full text-sm bg-white rounded-xl border border-gray-100 overflow-hidden">
                <thead className="bg-gray-50">
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-gray-500 font-medium">Параметр</th>
                    <th className="text-left py-3 px-4 text-gray-500 font-medium">До</th>
                    <th className="text-left py-3 px-4 text-kub-gold font-medium">После</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-4">Ставка налога на прибыль</td>
                    <td className="py-3 px-4">25%</td>
                    <td className="py-3 px-4 font-bold text-kub-gold">8%</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-4">Налог за 1 пол. 2026</td>
                    <td className="py-3 px-4">5,88 млн ₽</td>
                    <td className="py-3 px-4 font-bold text-kub-gold">1,88 млн ₽</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">Интеллектуальная собственность</td>
                    <td className="py-3 px-4">Не оформлена</td>
                    <td className="py-3 px-4 font-bold text-kub-gold">Охранный документ (Патент)</td>
                  </tr>
                </tbody>
              </table>
            </motion.div>

            {/* Отзыв клиента (Адаптация блока "Результат") */}
            <motion.blockquote 
              className="bg-white rounded-2xl p-6 border-l-4 border-kub-gold/50 italic text-gray-600 my-8"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              «Компания включена в реестр МТК в декабре 2025 года. С начала 2026 года мы применяем пониженную ставку 8%, а патент стал новым нематериальным активом предприятия».
              <footer className="text-sm text-gray-400 mt-3 not-italic">
                — Финансовый директор, Производственное предприятие (г. Санкт-Петербург)
              </footer>
            </motion.blockquote>

            {/* Микротекст */}
            <motion.p 
              className="text-xs text-gray-400 text-right mt-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              Санкт-Петербург / Промышленное оборудование / Реестр МТК
            </motion.p>

          </motion.div>
        </div>
      </Container>
    </section>
  );
}