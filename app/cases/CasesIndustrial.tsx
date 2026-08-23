"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Factory, CheckCircle2 } from "lucide-react";

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function CasesIndustrial() {
  return (
    <section className="bg-white py-8 md:py-12">
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
            
            {/* Заголовок кейса + Бейдж */}
            <motion.div 
              className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold text-kub-navy font-heading flex items-center gap-3">
                <Factory className="w-7 h-7 text-kub-gold" />
                Промышленная автоматизация → Субсидия Минпромторга
              </h2>
              <span className="bg-kub-gold/10 text-kub-gold text-xs font-bold px-3 py-1.5 rounded-full w-fit">
                Импортозамещение
              </span>
            </motion.div>

            {/* Блок "Задача" */}
            <motion.div 
              className="bg-white rounded-xl p-5 mb-8 border-l-4 border-kub-gold"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <p className="text-gray-700 leading-relaxed">
                <span className="font-semibold text-kub-navy">Задача:</span> Вернуть затраты на НИОКР при разработке станка ЧПУ для импортозамещения.
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
                  "Сопоставили ТУ с программой Минпромторга",
                  "Подготовили расчёт мультипликативного эффекта",
                  "Согласовали софинансирование с региональным фондом",
                  "Прошли комиссию и оформили акты сдачи-приёмки"
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
                { value: "18.7 млн ₽", label: "Возврат на R&D" },
                { value: "0% НДС", label: "На закупку компонентов" },
                { value: "4.5 мес", label: "От заявки до выплаты" }
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

            {/* Отзыв клиента */}
            <motion.blockquote 
              className="bg-white rounded-2xl p-6 border-l-4 border-kub-gold/50 italic text-gray-600 my-8"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              «Чёткие дедлайны, понятные отчёты. Деньги поступили на расчётный счёт вовремя, без задержек».
              <footer className="text-sm text-gray-400 mt-3 not-italic">
                — Гендиректор, производственная компания
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
              Регион: Татарстан / Свердловская область
            </motion.p>

          </motion.div>
        </div>
      </Container>
    </section>
  );
}
