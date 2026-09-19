"use client";

import { motion, useAnimation } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Search, BarChart3, Upload, MessageSquare, CheckCircle2, ShieldCheck, FileCheck, FileText, PieChart, TrendingUp } from "lucide-react";
import { useEffect, useState, useRef } from "react";

const STEPS = [
  { icon: Search, label: "Аудит" },
  { icon: BarChart3, label: "ТЭО и упаковка" },
  { icon: Upload, label: "Подача в ЛК" },
  { icon: MessageSquare, label: "Экспертиза" },
  { icon: CheckCircle2, label: "Статус" },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const} },
};

// Прогресс с этапами появления документов (замедленный)
const PROGRESS_STAGES = [
  { percent: 5, docs: [false, false, false] },
  { percent: 15, docs: [false, false, false] },
  { percent: 20, docs: [true, false, false] }, // ТЭО готово
  { percent: 30, docs: [true, false, false] },
  { percent: 40, docs: [true, false, false] },
  { percent: 50, docs: [true, true, false] }, // Финмодель готова
  { percent: 60, docs: [true, true, false] },
  { percent: 70, docs: [true, true, false] },
  { percent: 80, docs: [true, true, true] }, // Заявка подана
  { percent: 85, docs: [true, true, true] },
  { percent: 90, docs: [true, true, true] },
  { percent: 95, docs: [true, true, true] },
  { percent: 100, docs: [true, true, true] },
];

export default function SkolkovoWorkflow() {
  const [progress, setProgress] = useState(0);
  const [docChecks, setDocChecks] = useState([false, false, false]);
  const [hasStarted, setHasStarted] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Анимация прогресса при появлении на экране
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
          runAnimation();
        }
      },
      { threshold: 0.3, rootMargin: "0px" }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasStarted]);

  const runAnimation = async () => {
    let stageIndex = 0;
    
    while (stageIndex < PROGRESS_STAGES.length) {
      const stage = PROGRESS_STAGES[stageIndex];
      setProgress(stage.percent);
      setDocChecks(stage.docs);
      stageIndex++;
      // Замедлили с 400ms до 900ms
      await new Promise(resolve => setTimeout(resolve, 900));
    }
  };

  return (
    <section className="bg-white py-16 md:py-24" ref={sectionRef}>
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Левая колонка: контент */}
          <div>
            {/* Заголовок + Бейдж доверия */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">
              <motion.h2 
                className="text-3xl md:text-4xl font-bold font-heading text-kub-navy tracking-tight"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-5%" }}
                transition={{ duration: 0.5 }}
              >
                Как мы работаем с вашим проектом
              </motion.h2>
            </div>

            {/* Основной текст */}
            <motion.p 
              className="text-gray-600 text-lg leading-relaxed mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              80% работы берём на себя: аудит ОКВЭД, расчёт ТЭО, упаковка инновационности, подача в ЛК, ответы на экспертизы. От вас — базовые данные и доступ к финмодели. Сроки: 60–90 дней до статуса. Если комиссия отказывает по нашей зоне ответственности — дорабатываем и подаём повторно без доплат. Фиксируем условия в договоре.
            </motion.p>

            {/* Таймлайн (5 шагов) */}
            <div className="relative mb-12">
              {/* Пунктирная линия (только десктоп) */}
              <div className="hidden md:block absolute top-12 left-4 right-4 h-px border-t-2 border-dashed border-gray-200 -z-10" />
              
              <motion.div 
                className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 md:gap-4"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-10%" }}
              >
                {STEPS.map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <motion.div 
                      key={index} 
                      variants={itemVariants}
                      className="flex flex-col items-center text-center p-3 md:p-4 bg-white md:bg-transparent relative z-10"
                    >
                      <div className="w-12 h-12 rounded-full bg-kub-navy/5 border border-gray-100 flex items-center justify-center mb-3 shadow-sm">
                        <Icon size={20} className="text-kub-navy" />
                      </div>
                      <span className="text-sm font-medium text-gray-700">{step.label}</span>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>

            {/* Блок гарантий */}
            <motion.div 
              className="bg-green-50/60 border border-green-200 rounded-2xl p-6 flex items-start gap-4"
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <ShieldCheck className="w-6 h-6 text-green-600 mt-0.5 flex-shrink-0" />
              <p className="text-gray-700 text-sm leading-relaxed">
                Если комиссия отказывает по нашей зоне ответственности — дорабатываем материалы и подаём заявку повторно <strong>без дополнительных оплат</strong>. Все условия, дедлайны и финансовые обязательства фиксируем в договоре до начала работы.
              </p>
            </motion.div>

            {/* Микротекст */}
            <motion.p 
              className="text-xs text-gray-400 mt-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              Статус несовместим с ИТ-аккредитацией. Просчитываем оптимальный сценарий до подачи.
            </motion.p>
          </div>

          {/* Правая колонка: визуализация с прогрессом */}
          <div className="hidden lg:block relative">
            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Фоновая карточка с документами */}
              <div className="relative bg-gradient-to-br from-kub-navy to-[#1a3a5c] rounded-3xl p-8 shadow-2xl">
                {/* Декоративные элементы */}
                <div className="absolute top-4 right-4 w-20 h-20 bg-kub-gold/10 rounded-full blur-xl" />
                <div className="absolute bottom-4 left-4 w-16 h-16 bg-white/5 rounded-full blur-lg" />
                
                {/* Заголовок карточки */}
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-lg bg-kub-gold/20 flex items-center justify-center">
                    <FileCheck className="w-5 h-5 text-kub-gold" />
                  </div>
                  <div>
                    <div className="text-white font-bold text-lg">Ваш проект</div>
                    <div className="text-gray-400 text-xs">Статус: в работе</div>
                  </div>
                </div>

                {/* Анимированные документы (исправленный порядок) */}
                <div className="space-y-3 mb-6">
                  {[
                    { icon: TrendingUp, label: "ТЭО проекта", checkIndex: 0 },
                    { icon: PieChart, label: "Финансовая модель", checkIndex: 1 },
                    { icon: FileText, label: "Заявка в Фонд", checkIndex: 2 },
                  ].map((doc, i) => (
                    <motion.div
                      key={i}
                      animate={{ 
                        x: docChecks[i] ? [0, 4, 0] : 0,
                        backgroundColor: docChecks[i] ? "rgba(212, 175, 55, 0.1)" : "rgba(255,255,255,0.05)"
                      }}
                      transition={{ duration: 0.4 }}
                      className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10"
                    >
                      <doc.icon className="w-4 h-4 text-kub-gold" />
                      <span className="text-gray-300 text-sm flex-1">{doc.label}</span>
                      <motion.div
                        initial={false}
                        animate={{ scale: docChecks[i] ? 1 : 0 }}
                        transition={{ duration: 0.3, type: "spring" }}
                      >
                        <CheckCircle2 className="w-4 h-4 text-green-400" />
                      </motion.div>
                    </motion.div>
                  ))}
                </div>

                {/* Прогресс-бар с анимацией чисел */}
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <div className="flex justify-between text-xs mb-2">
                    <span className="text-gray-400">Прогресс подготовки</span>
                    <motion.span 
                      className="text-kub-gold font-bold text-lg"
                      key={progress}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {progress}%
                    </motion.span>
                  </div>
                  <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-kub-gold to-yellow-300 rounded-full"
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    />
                  </div>
                  {/* Точки на прогресс-баре */}
                  <div className="flex justify-between mt-2">
                    {[0, 20, 50, 80, 100].map((mark) => (
                      <div 
                        key={mark} 
                        className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                          progress >= mark ? "bg-kub-gold" : "bg-white/20"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Бейдж */}
                <motion.div 
                  className="absolute -bottom-4 -right-4 bg-kub-gold text-kub-navy px-4 py-2 rounded-xl font-bold text-sm shadow-lg"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 2, duration: 0.4 }}
                >
                  60-90 дней
                </motion.div>
              </div>

              {/* Плавающие элементы */}
              <motion.div 
                className="absolute -top-6 -left-6 w-16 h-16 bg-kub-gold/10 rounded-2xl flex items-center justify-center border border-kub-gold/20"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <ShieldCheck className="w-8 h-8 text-kub-gold" />
              </motion.div>

              <motion.div 
                className="absolute -bottom-3 -left-8 w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center border border-white/10"
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              >
                <FileCheck className="w-6 h-6 text-gray-400" />
              </motion.div>
            </motion.div>
          </div>

        </div>
      </Container>
    </section>
  );
}