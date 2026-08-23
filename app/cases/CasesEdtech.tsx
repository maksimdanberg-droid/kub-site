"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Code, CheckCircle2, TrendingUp } from "lucide-react";

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function CasesEdtech() {
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
            
            {/* Заголовок кейса */}
            <motion.h2 
              className="text-2xl md:text-3xl font-bold text-kub-navy font-heading mb-6 flex items-center gap-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Code className="w-7 h-7 text-kub-gold" />
              EdTech SaaS → Патенты на ядро + Резидентство
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
                <span className="font-semibold text-kub-navy">Задача:</span> Защитить алгоритмы адаптивного обучения и подготовить компанию к B2B-продажам госструктурам.
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
                  "Провели патентный поиск, сняли риски пересечения",
                  "Подали 2 заявки на изобретение и регистрацию ПО",
                  "Получили статус резидента для нулевой ставки НДС",
                  "Настроили учёт под требования госзакупок"
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
                { value: "3 патента", label: "Получено + статус резидента", icon: null },
                { 
                  value: (
                    <span className="flex items-center justify-center gap-1">
                      +12%
                      <TrendingUp className="w-4 h-4 text-kub-gold" />
                    </span>
                  ), 
                  label: "Рост маржи",
                  highlight: true 
                },
                { value: "2.5–4 мес", label: "Сроки до результата", icon: null }
              ].map((item, i) => (
                <motion.div 
                  key={i} 
                  variants={fadeInUp}
                  className="bg-kub-navy text-white rounded-xl p-5 text-center"
                >
                  <div className="text-3xl font-bold text-kub-gold font-heading flex items-center justify-center gap-1">
                    {item.value}
                  </div>
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
              «Патенты закрыли вопрос копирования. Статус Сколково ускорил вход в тендеры».
              <footer className="text-sm text-gray-400 mt-3 not-italic">
                — CEO, EdTech SaaS
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
              Модель: B2B SaaS, лицензирование
            </motion.p>

          </motion.div>

          {/* CTA кнопка внизу секции */}
          <motion.div 
            className="text-center mt-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            <Button 
              href="#" 
              variant="outline" 
              className="border-kub-gold text-kub-navy hover:bg-kub-gold hover:text-white font-semibold"
            >
              Смотреть все кейсы →
            </Button>
          </motion.div>

        </div>
      </Container>
    </section>
  );
}