"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Search, FileText, CheckCircle2, MessageCircle } from "lucide-react";
import { useModalStore } from "@/lib/useModalStore";

const STEPS = [
  {
    icon: Search,
    title: "Аудит",
    text: "Определяем точный перечень лицензий под ваш ОКВЭД и масштаб бизнеса.",
  },
  {
    icon: FileText,
    title: "Подготовка",
    text: "Формируем пакет документов, устраняем несоответствия, сопровождаем проверки.",
  },
  {
    icon: CheckCircle2,
    title: "Получение",
    text: "Подаём заявки, контролируем сроки, вручаем готовое разрешение.",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export default function LicensingProcess() {
  const { openConsultationModal } = useModalStore();
  
  return (
    <section className="bg-white py-16 md:py-24">
      <Container>
        {/* Заголовок + текст */}
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-kub-navy tracking-tight mb-4">
            Комплексное сопровождение лицензирования
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            Определяем, какие лицензии нужны вашему бизнесу. Готовим пакет документов, проходим проверки, получаем разрешения. Работаем с 15+ видами лицензий: от медицинских до промышленных. Если лицензия уже была запрошена или получен отказ — исправляем ошибки и доводим до результата.
          </p>
        </motion.div>

        {/* Сетка карточек */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {STEPS.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div 
                key={index} 
                variants={itemVariants}
                className="bg-[#F8FAFC] rounded-2xl p-6 border border-gray-100 hover:border-kub-gold/30 hover:-translate-y-1 hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-kub-navy/5 flex items-center justify-center mb-4 text-kub-navy">
                  <Icon size={24} />
                </div>
                <h3 className="text-lg font-bold text-kub-navy font-heading mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{step.text}</p>
              </motion.div>
            );
          })}
        </motion.div>


        {/* Микротекст */}
        <motion.p 
          className="text-xs text-gray-400 text-center mt-4 flex flex-wrap justify-center gap-x-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <span>Бесплатный аудит требований</span>
          <span>•</span>
          <span>Подготовка документов</span>
          <span>•</span>
          <span>Сопровождение проверок</span>
        </motion.p>
      </Container>
    </section>
  );
}