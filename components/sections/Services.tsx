"use client";

import { motion } from "framer-motion";
import { Building2, TrendingUp, Percent, FileLock, FileCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { staggerContainer } from "@/lib/animations";

const SERVICES = [
  {
    icon: Building2,
    title: "Резидентство Сколково",
    description: "Обнуляем налог на прибыль и НДС на 10 лет. Статус за 2,5 месяца.",
  },
  {
    icon: TrendingUp,
    title: "Включение в реестр МТК",
    description: "Получение статуса МТК для малого и среднего бизнеса",
  },
  {
    icon: TrendingUp,
    title: "Гранты и субсидии",
    description: "Сопровождаем заявки в различные фонды поддержки. Поможем вернуть до 100% затрат на R&D.",
  },
  {
    icon: Percent,
    title: "Налоговые льготы",
    description: "Снижение налоговой нагрузки на малый и средний бизнес. Уменьшаем страховые взносы",
  },
  {
    icon: FileLock,
    title: "Патентование и защита интеллектуальной собственности",
    description: "Регистрируем изобретения и программное обеспечение",
  },
  {
    icon: FileCheck,
    title: "Лицензирование и сертификация",
    description: "Получаем разрешительные документы для выхода на госзакупки.",
  },
];

export default function Services() {
  return (
    <Section id="services" className="bg-gray-50">
      <Container>
        {/* Заголовок секции */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-kub-navy font-heading mb-6 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Закрываем весь цикл <br className="hidden md:block" />
            <span className="text-kub-gold">Комплексное сопровождение</span>
          </motion.h2>
          <p className="text-gray-600 text-lg md:text-xl">
            от идеи до получения финансирования и льгот.
          </p>
        </div>

        {/* Сетка карточек */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-5%" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        >
          {SERVICES.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { 
                    opacity: 1, 
                    y: 0, 
                    transition: { duration: 0.5, ease: "easeOut" } 
                  },
                }}
                whileHover={{ y: -4 }}
                className="group relative bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300 flex flex-col h-full"
              >
                {/* Иконка */}
                <div className="mb-6 w-14 h-14 rounded-xl bg-kub-navy/5 text-kub-navy flex items-center justify-center transition-colors duration-300 group-hover:bg-kub-gold group-hover:text-white">
                  <Icon size={28} strokeWidth={1.5} />
                </div>

                {/* Текст */}
                <h3 className="text-xl font-bold text-kub-navy mb-3 font-heading tracking-tight">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed flex-grow">
                  {service.description}
                </p>

                {/* Hover акцент (полоска) */}
                <div className="absolute bottom-0 left-0 w-0 h-1 bg-kub-gold rounded-b-2xl transition-all duration-300 group-hover:w-full" />
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA */}
        <div className="text-center pt-4">
          <Button  variant="primary" 
  href="/services"
  className="bg-kub-navy text-white hover:bg-[#081426]"
>
  Посмотреть все услуги
          </Button>
        </div>
      </Container>
    </Section>
  );
}