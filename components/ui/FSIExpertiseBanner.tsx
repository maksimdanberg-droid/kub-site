"use client";

import { motion } from "framer-motion";
import { Check, X, TrendingUp, ShieldCheck, Calendar, ArrowRight } from "lucide-react";

type EligibilityRow = {
  program: string;
  physical: boolean;
  ip: boolean;
  legal: boolean;
  mtk: string;
};

const ELIGIBILITY_TABLE: EligibilityRow[] = [
  { program: "Старт-1", physical: true, ip: true, legal: true, mtk: "—" },
  { program: "Старт-2", physical: false, ip: true, legal: true, mtk: "✅ Да" },
  { program: "Бизнес-Старт", physical: false, ip: true, legal: true, mtk: "✅ Да" },
  { program: "Развитие", physical: false, ip: true, legal: true, mtk: "✅ Да (+баллы)" },
  { program: "Коммерциализация", physical: false, ip: true, legal: true, mtk: "✅ Да (ко-фин. 30%)" },
  { program: "Спецпрограммы", physical: false, ip: false, legal: true, mtk: "✅ Часто требуется" },
];

const EXPERTISE_POINTS = [
  {
    icon: Calendar,
    title: "Мониторинг регламентов",
    text: "Отслеживаем изменения правил ФСИ в реальном времени. Вы всегда подаёте заявку по актуальным требованиям.",
  },
  {
    icon: TrendingUp,
    title: "Точный подбор программы",
    text: "Анализируем вашу стадию, ОКВЭД и финансовые возможности. Подбираем программу с максимальной вероятностью одобрения.",
  },
  {
    icon: ShieldCheck,
    title: "Стратегия на 3–5 лет",
    text: "Строим дорожную карту от первой заявки до серийного производства. Каждая победа открывает доступ к следующим программам.",
  },
];

// Открытие модала консультации
const openConsultationModal = () => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("openConsultationModal"));
  }
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};

const rowVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
};

export default function FSIExpertiseBanner() {
  return (
    <section className="bg-white py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Заголовок */}
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold font-heading text-kub-navy tracking-tight mb-4">
            Кто может подавать заявки и почему важно{" "}
            <span className="text-kub-gold">не ошибиться</span>
          </h2>
        </motion.div>

        {/* Таблица элиджибилити */}
        <motion.div 
          className="overflow-x-auto mb-10 rounded-xl border border-gray-200"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left font-bold text-kub-navy py-3 px-4 border-b border-gray-200">Программа</th>
                <th className="text-center font-bold text-kub-navy py-3 px-4 border-b border-gray-200">Физ.лица</th>
                <th className="text-center font-bold text-kub-navy py-3 px-4 border-b border-gray-200">ИП</th>
                <th className="text-center font-bold text-kub-navy py-3 px-4 border-b border-gray-200">Юр.лица</th>
                <th className="text-center font-bold text-kub-navy py-3 px-4 border-b border-gray-200">МТК (приоритет)</th>
              </tr>
            </thead>
            <tbody variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              {ELIGIBILITY_TABLE.map((row, i) => (
                <motion.tr key={row.program} variants={rowVariants} className="hover:bg-gray-50/50 transition-colors">
                  <td className="font-medium text-kub-navy py-3 px-4 border-b border-gray-100">{row.program}</td>
                  <td className="text-center py-3 px-4 border-b border-gray-100">
                    {row.physical ? <Check className="w-5 h-5 text-green-600 mx-auto" /> : <X className="w-5 h-5 text-red-400 mx-auto" />}
                  </td>
                  <td className="text-center py-3 px-4 border-b border-gray-100">
                    {row.ip ? <Check className="w-5 h-5 text-green-600 mx-auto" /> : <X className="w-5 h-5 text-red-400 mx-auto" />}
                  </td>
                  <td className="text-center py-3 px-4 border-b border-gray-100">
                    {row.legal ? <Check className="w-5 h-5 text-green-600 mx-auto" /> : <X className="w-5 h-5 text-red-400 mx-auto" />}
                  </td>
                  <td className="text-center py-3 px-4 border-b border-gray-100">
                    <span className={`text-xs font-medium ${row.mtk !== "—" ? "text-green-700" : "text-gray-400"}`}>
                      {row.mtk}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* Текст-акцент */}
        <motion.p 
          className="text-gray-600 text-base leading-relaxed mb-10 max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Программы ФСИ ежегодно обновляются: меняются суммы, требования к ОКВЭД, критерии оценки. 
          Только постоянная работа с фондом позволяет быть в курсе изменений и подавать заявки, 
          которые проходят экспертизу с первого раза.
        </motion.p>

        {/* Наша экспертиза */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {EXPERTISE_POINTS.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 + 0.2 }}
                className="flex items-start gap-3 p-4 bg-[#F8FAFC] rounded-xl border border-gray-100"
              >
                <div className="w-10 h-10 rounded-lg bg-kub-navy/5 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-kub-gold" />
                </div>
                <div>
                  <h4 className="font-bold text-kub-navy font-heading mb-1 text-sm">{item.title}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.text}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA-кнопка */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <button
            onClick={openConsultationModal}
            className="max-w-xs mx-auto w-full bg-kub-gold text-kub-navy font-semibold py-3.5 px-6 rounded-xl hover:bg-[#D4AF37]/90 transition-all shadow-lg shadow-kub-gold/20 flex items-center justify-center gap-2"
          >
            Получить персональную дорожную карту <ArrowRight size={18} />
          </button>
          <p className="text-xs text-gray-400 mt-4">Бесплатно • 15 минут • без обязательств</p>
        </motion.div>
      </div>
    </section>
  );
}