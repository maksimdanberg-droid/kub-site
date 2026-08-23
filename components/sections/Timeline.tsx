"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { 
  FileSearch, Lightbulb, FileUp, SearchCheck, 
  BadgeCheck, Wallet, ShieldCheck, Trophy 
} from "lucide-react";
import { Container } from "@/components/ui/Container";

type Step = {
  icon: React.ElementType;
  step: string;
  title: string;
  description: string;
  isResult?: boolean;
};

const STEPS: Step[] = [
  { icon: FileSearch, step: "01", title: "Бесплатный аудит", description: "Анализируем технологию, ОКВЭД и финмодель. Вывод: шансы и план." },
  { icon: Lightbulb, step: "02", title: "Формирование концепции", description: "Упаковываем инновационность под требования Фондов." },
  { icon: FileUp, step: "03", title: "Подготовка и подача", description: "Пишем описание, собираем документы, заполняем порталы. 90% работы на нас." },
  { icon: SearchCheck, step: "04", title: "Экспертиза и защита", description: "Сопровождаем проект, на всех этапах рассмотрения заявок." },
  { icon: BadgeCheck, step: "05", title: "Получение результатов", description: "Заключение соглашений, настройка бухгалтерии, запуск и реализация проекта." },
  { icon: Wallet, step: "06", title: "Поиск дополнительных инвестиций", description: "Составление плана мероприятий поэтапного развития направления." },
  { icon: ShieldCheck, step: "07", title: "Долгосрочное сопровождение", description: "Отчётность, мониторинг изменений, защита от снятия статуса." , isResult: true},
];

// ⚙️ ТОЧНАЯ МАТЕМАТИКА
const CARD_WIDTH = 380;
const GAP = 32;
// Дистанция от центра 1-й карточки до центра последней (7-й)
// (7 шагов * (380 + 32)) = 2884px
const MAX_SCROLL_X = 2884; 

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // 🎯 Отслеживаем скролл по высоте всего блока (250vh)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"], 
  });

  // ⏱️ ЛОГИКА ЗАДЕРЖКИ (Keyframes)
  // [Прогресс скролла: 0%, 10%, 80%, 100%] -> [Сдвиг по X: 0, 0, -2884, -2884]
  // 1. Скролл от 0 до 10%: Карточки стоят на месте (первая по центру).
  // 2. Скролл от 10% до 80%: Карточки едут влево.
  // 3. Скролл от 80% до 100%: Карточки снова стоят (последняя по центру).
  const x = useTransform(scrollYProgress, [0, 0.1, 0.8, 1], [0, 0, -MAX_SCROLL_X, -MAX_SCROLL_X]);
  
  // Прогресс-линия тоже следует за этим графиком
  const progressWidth = useTransform(scrollYProgress, [0, 0.1, 0.8, 1], ["0%", "0%", "100%", "100%"]);

  return (
    // 📏 Высота 250vh дает достаточно пространства для долгого и плавного скролла
    <section ref={containerRef} className="relative bg-gray-50 py-8 md:py-12 min-h-[250vh]">
      <Container>
        <div className="text-center max-w-4xl mx-auto mb-6 md:mb-10">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-kub-navy font-heading tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Прозрачный процесс:{" "}
            <span className="text-kub-gold">от идеи до реализации</span>
          </motion.h2>
        </div>
      </Container>

      {/* Sticky контейнер занимает весь экран */}
      <div className="sticky top-0 h-screen flex items-center overflow-hidden hidden md:flex">
        
        {/* 🥇 Прогресс-линия: строго под карточками */}
        <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-gray-300 -translate-y-1/2 z-0" />
        <motion.div 
          style={{ width: progressWidth }}
          className="absolute top-1/2 left-0 h-[2px] bg-kub-gold -translate-y-1/2 z-0"
        />

        {/* Горизонтальный трек */}
        <motion.div style={{ x }} className="flex items-center w-full will-change-transform">
          <div 
            className="flex items-center"
            style={{ 
              // 🎯 Центрируем первую карточку при старте (x=0)
              paddingInline: `calc(50vw - ${CARD_WIDTH / 2}px)`,
              gap: `${GAP}px`,
            }}
          >
            {STEPS.map((step, index) => {
              const Icon = step.icon;
              
              return (
                <motion.div
                  key={index}
                  className="relative flex-shrink-0 z-10 group"
                  style={{ width: CARD_WIDTH }}
                  whileHover={{ 
                    scale: 1.04,
                    transition: { duration: 0.25, ease: "easeOut" }
                  }}
                >
                  {/* ✨ Золотое свечение при наведении */}
                  <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{
                      boxShadow: "0 0 40px 8px rgba(212, 175, 55, 0.35), 0 0 80px 20px rgba(212, 175, 55, 0.15)",
                      zIndex: -1,
                    }}
                  />
                  
                  <div className={`w-full h-[420px] rounded-3xl p-8 flex flex-col text-white shadow-2xl border-2 transition-all duration-300 ${
                    step.isResult 
                      ? "bg-gradient-to-br from-kub-navy to-[#0F2440] border-kub-gold/50" 
                      : "bg-kub-navy border-transparent group-hover:border-kub-gold/60"
                  }`}>
                    {/* 🔢 Номер: ярко-золотой */}
                    <span className="text-6xl font-bold font-heading tracking-tighter text-kub-gold drop-shadow-lg">
                      {step.step}
                    </span>

                    <div className={`mt-4 mb-6 w-16 h-16 rounded-2xl flex items-center justify-center transition-colors duration-300 ${
                      step.isResult ? "bg-kub-gold/20" : "bg-white/10 group-hover:bg-kub-gold/25"
                    }`}>
                      <Icon size={32} strokeWidth={1.5} className="text-kub-gold drop-shadow-sm" />
                    </div>

                    <h3 className="text-xl md:text-2xl font-bold font-heading mb-3 leading-tight group-hover:text-white transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-gray-300 text-sm md:text-base leading-relaxed flex-grow group-hover:text-gray-200 transition-colors">
                      {step.description}
                    </p>

                    {!step.isResult && (
                      <motion.div 
                        className="absolute bottom-6 right-6 w-3 h-3 rounded-full bg-kub-gold"
                        whileHover={{ 
                          scale: [1, 1.3, 1],
                          boxShadow: ["0 0 0 rgba(212,175,55,0)", "0 0 20px rgba(212,175,55,0.8)", "0 0 0 rgba(212,175,55,0)"]
                        }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Мобильная версия (без изменений) */}
      <Container className="md:hidden">
        <div className="space-y-4 pb-8">
          {STEPS.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ delay: index * 0.05 }}
                className={`rounded-2xl p-6 text-white relative overflow-hidden ${
                  step.isResult 
                    ? "bg-gradient-to-br from-kub-navy to-[#0F2440] border border-kub-gold/30" 
                    : "bg-kub-navy"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    step.isResult ? "bg-kub-gold/20" : "bg-white/10"
                  }`}>
                    <Icon size={24} className="text-kub-gold" />
                  </div>
                  <div className="flex-1">
                    <span className="text-kub-gold font-bold font-heading text-sm">{step.step}</span>
                    <h4 className="font-bold font-heading mt-1 mb-2 text-lg">{step.title}</h4>
                    <p className="text-gray-300 text-sm leading-relaxed">{step.description}</p>
                  </div>
                </div>
                {index < STEPS.length - 1 && !step.isResult && (
                  <div className="absolute left-[22px] top-16 bottom-[-16px] w-[2px] bg-white/10" />
                )}
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}