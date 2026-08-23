"use client";

import { motion } from "framer-motion";
import { Key, Building2, Wallet, Percent, ArrowRight, Download } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

type FlowStep = {
  icon: React.ElementType;
  title: string;
};

const FLOW_STEPS: FlowStep[] = [
  { icon: Key, title: "Патент" },
  { icon: Building2, title: "Сколково" },
  { icon: Wallet, title: "Грант" },
  { icon: Percent, title: "Налоги" },
];

export function ServicesFlow() {
  return (
    <Section className="bg-kub-navy overflow-hidden py-20 md:py-24">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Левая колонка: Текст */}
          <div className="lg:col-span-5 space-y-6">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold font-heading text-white tracking-tight leading-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Услуги работают{" "}
              <span className="text-kub-gold">в связке</span>.{" "}
              <br className="hidden md:block" />
              Мы настраиваем их вместе.
            </motion.h2>

            <motion.p 
              className="text-gray-300 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Раздельное сопровождение теряет 20–35% потенциальной выгоды. Мы строим единую дорожную карту: патентуем ядро технологии → получаем статус Сколково → подаём заявку на грант → оптимизируем налоги. Результат: комплексная правовая защита и максимальная капитализация проекта без дублирования работы юристов и бухгалтеров.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Button 
                href="#download-guide" 
                variant="primary" 
                className="bg-white text-kub-navy hover:bg-gray-100 shadow-lg shadow-black/20"
              >
                <Download className="w-4 h-4 mr-2" />
                Скачать схему интеграции услуг
              </Button>
              <p className="text-xs text-gray-500 mt-3">
                PDF-гайд на 4 страницы • Доступ сразу после отправки email
              </p>
            </motion.div>
          </div>

          {/* Правая колонка: Визуализация потока */}
          <div className="lg:col-span-7 flex items-center justify-center">
            
            {/* Desktop: Горизонтальный ряд с встроенными стрелками */}
            <div className="hidden md:flex items-center justify-center gap-4">
              {FLOW_STEPS.map((step, index) => (
                <div key={index} className="flex items-center gap-4">
                  <FlowCard step={step} index={index} />
                  {index < FLOW_STEPS.length - 1 && (
                    <ArrowRight className="text-kub-gold/40 shrink-0" size={24} />
                  )}
                </div>
              ))}
            </div>

            {/* Mobile: Вертикальный стек со стрелками вниз */}
            <div className="flex md:hidden flex-col items-center gap-3">
              {FLOW_STEPS.map((step, index) => (
                <div key={index} className="flex flex-col items-center gap-3">
                  <FlowCard step={step} index={index} mobile />
                  {index < FLOW_STEPS.length - 1 && (
                    <ArrowRight className="text-kub-gold/40 rotate-90" size={20} />
                  )}
                </div>
              ))}
            </div>

          </div>
        </div>
      </Container>
    </Section>
  );
}

// Компонент отдельной карточки потока
function FlowCard({ step, index, mobile }: { step: FlowStep; index: number; mobile?: boolean }) {
  const Icon = step.icon;
  
  return (
    <motion.div
      role="listitem"
      className={`relative flex flex-col items-center justify-center text-center 
                  p-4 md:p-5 rounded-xl border border-white/10 backdrop-blur-sm 
                  min-w-[120px] md:min-w-[140px] h-[110px] md:h-[120px]`}
      
      // 🟢 Появление: строго слева направо
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      
      // ✅ ОБЪЕДИНЁННЫЙ transition
      transition={{
        opacity: { duration: 0.6, ease: "easeOut" },
        x: { duration: 0.6, ease: "easeOut" },
        borderColor: {
          delay: index * 0.9,
          duration: 2.2,
          repeat: Infinity,
          repeatDelay: 1.0,
          ease: "easeInOut",
        },
        backgroundColor: {
          delay: index * 0.9,
          duration: 2.2,
          repeat: Infinity,
          repeatDelay: 1.0,
          ease: "easeInOut",
        },
        scale: {
          delay: index * 0.9,
          duration: 2.2,
          repeat: Infinity,
          repeatDelay: 1.0,
          ease: "easeInOut",
        },
      }}
      
      // 🌊 Волновая подсветка
      animate={{
        borderColor: ["rgba(255,255,255,0.15)", "rgba(212, 175, 55, 0.7)", "rgba(255,255,255,0.15)"],
        backgroundColor: ["rgba(255,255,255,0.06)", "rgba(212, 175, 55, 0.12)", "rgba(255,255,255,0.06)"],
        scale: [1, 1.025, 1],
      }}
    >
      <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-kub-gold/10 flex items-center justify-center mb-2 md:mb-3">
        <Icon size={mobile ? 20 : 22} className="text-kub-gold" />
      </div>
      <span className="text-white font-semibold font-heading text-sm md:text-base">
        {step.title}
      </span>
    </motion.div>
  );
}