"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Container } from "@/components/ui/Container";
import {
  Settings, Eye, CheckCircle2, User, Brain, Scale,
  FileText, Users, ShieldCheck
} from "lucide-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

const viewportConfig = { once: true, margin: "-5%" };

export default function AboutContent() {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 300], [0, 50]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0.7]);

  return (
    <main className="min-h-screen">
      
      {/* 1. Секция: Миссия / Ценности (ТЁМНАЯ, как на главной) */}
      <section className="relative pt-24 md:pt-32 pb-12 md:pb-20 bg-kub-navy overflow-hidden">
        {/* Фоновая сетка */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-kub-navy via-[#0F2440] to-kub-navy" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
          <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-kub-gold/5 rounded-full blur-[120px]" />
        </div>

        <Container>
          {/* ✅ Контент с правильным z-index и простой анимацией */}
          <div className="relative z-10">
            <motion.h1 
              className="text-3xl md:text-4xl font-bold font-heading text-white tracking-tight mb-10 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              Экспертиза, прозрачность,{" "}
              <span className="text-kub-gold">результат</span>
            </motion.h1>

            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
              }}
            >
              {[
                { icon: Settings, title: "Комплексный подход", text: "всё под ключ: от аудита технологии до сохранения статуса на 10 лет. Никаких смежных подрядчиков, только единая команда." },
                { icon: Eye, title: "Прозрачность", text: "честные сроки: 2,5–3 месяца. Фиксированная цена в договоре. Никаких скрытых доплат." },
                { icon: CheckCircle2, title: "Результат", text: "90% успеха. Если комиссия отказывает, дорабатываем и подаём повторно без доплат." }
              ].map((item, i) => (
                <motion.div 
                  key={i} 
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                  }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className={`p-6 md:p-8 flex flex-col rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm ${
                    i < 2 ? 'md:border-r md:border-white/10' : ''
                  } border-b md:border-b-0 border-white/10 last:border-b-0 transition-all duration-300`}
                >
                  <motion.div 
                    className="w-8 h-8 text-kub-gold mb-4"
                    animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
                  >
                    <item.icon className="w-full h-full" />
                  </motion.div>
                  <h3 className="text-xl font-bold font-heading text-white mb-2">{item.title}</h3>
                  <p className="text-gray-300 leading-relaxed grow">{item.text}</p>
                </motion.div>
              ))}
            </motion.div>

            <motion.p 
              className="text-xs text-gray-500 text-center mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              Регламент работы доступен по запросу
            </motion.p>
          </div>
        </Container>
      </section>

      {/* 2. Секция: Руководитель */}
      <section className="py-12 md:py-20 bg-[#F8FAFC]">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
            {/* Фото-заглушка (без текста) */}
            <motion.div 
  className="rounded-2xl overflow-hidden border-2 border-kub-gold/20 shadow-lg"
  initial={{ opacity: 0, x: -20 }}
  whileInView={{ opacity: 1, x: 0 }}
  viewport={viewportConfig}
  transition={{ duration: 0.5 }}
  whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
>
  <img 
    src="/images/founder.png" 
    alt="Основатель ООО «КУБ»" 
    className="w-full h-auto object-cover"
    loading="lazy"
  />
            </motion.div>

                        <div>
              {/* Заголовок */}
              <motion.h2 
                className="text-3xl md:text-4xl font-bold font-heading text-kub-navy tracking-tight mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportConfig}
              >
                Основатель и ведущий эксперт<br/>ООО «НТЦ «КУБ»
              </motion.h2>

              {/* Вводный текст */}
              <motion.p 
                className="text-gray-600 leading-relaxed mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportConfig}
                transition={{ delay: 0.1 }}
              >
                Высшее техническое образование. Проектный менеджер и консультант по государственной поддержке технологических проектов.
              </motion.p>

              {/* Блок "Результат" (Акцент) */}
              <motion.div 
                className="bg-kub-gold/10 border border-kub-gold/20 rounded-lg p-4 mb-6"
                initial={{ opacity: 0, x: 10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={viewportConfig}
                transition={{ delay: 0.2 }}
              >
                <span className="font-bold text-kub-navy">Результат: </span>
                <span className="text-kub-navy">4 из 5 подготовленных заявок в ФСИ получают финансирование (80% успеха).</span>
              </motion.div>

              {/* Заголовок списка */}
              <h3 className="font-bold text-kub-navy mb-3 text-sm uppercase tracking-wide">
                Полный цикл инструментов поддержки:
              </h3>

              {/* Список услуг */}
              <motion.ul 
                className="space-y-2 mb-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={viewportConfig}
                transition={{ delay: 0.3 }}
              >
                {[
                  "Гранты ФСИ: «Старт», «Развитие», «Бизнес-Старт», «Коммерциализация»",
                  "Программа «доращивания» ЦПИИ для поставщиков корпораций",
                  "Субсидии Минпромторга на НИОКР и электронную промышленность",
                  "Льготные займы ФРП (3–5% годовых)",
                  "Статус резидента «Сколково» и включение в реестр МТК",
                  "Подтверждение производства по ПП РФ №719 для преференций в госзакупках"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-600 text-sm leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-kub-gold shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </motion.ul>

              {/* Отраслевая экспертиза */}
              <p className="text-xs text-gray-500 mb-6 italic">
                Отраслевая экспертиза: станкостроение, микроэлектроника, ПО и ИИ, металлургия, биотехнологии, медицинские изделия, полимерные материалы, нефтегазовый сектор.
              </p>

              {/* Теги (Метрики) */}
              <motion.div 
                className="flex flex-wrap gap-3"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportConfig}
                transition={{ delay: 0.4 }}
              >
                {["10+ лет", "240 кейсов", "12 публикаций"].map((badge, i) => (
                  <motion.span 
                    key={badge} 
                    className="bg-white border border-gray-200 px-3 py-1.5 rounded-lg text-sm font-medium text-kub-navy shadow-sm"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={viewportConfig}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    whileHover={{ scale: 1.05, borderColor: "var(--color-kub-gold)", transition: { duration: 0.2 } }}
                  >
                    {badge}
                  </motion.span>
                ))}
              </motion.div>
            </div>
          </div>
        </Container>
      </section>

      {/* 3. Секция: Команда */}
      <section className="py-12 md:py-20 bg-white">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10 gap-4">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold font-heading text-kub-navy tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportConfig}
            >
              Структура команды: только профильные специалисты
            </motion.h2>
            <motion.span 
              className="bg-kub-gold/10 text-kub-gold text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap w-fit"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={viewportConfig}
              animate={{ boxShadow: ["0 0 0px rgba(212,175,55,0)", "0 0 20px rgba(212,175,55,0.3)", "0 0 0px rgba(212,175,55,0)"] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              🔒 Без аутсорсинга
            </motion.span>
          </div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            {[
              { icon: Brain, role: "Аналитики", desc: "декомпозируют технологии, пишут описания для комиссий, готовят ТЭ." },
              { icon: Scale, role: "Юристы", desc: "сопровождают подачу, контролируют соответствие ОКВЭД и уставу, готовят отчётность для Фонда." },
              { icon: FileText, role: "Технические писатели", desc: "переводят инженерные решения в регламентированные формулировки, работают с чертежами и спецификациями." },
              { icon: Users, role: "Менеджеры проектов", desc: "единая точка контакта, контроль дедлайнов, отчёты клиенту каждую пятницу." }
            ].map((item, i) => (
              <motion.div 
                key={i} 
                variants={fadeInUp}
                whileHover={{ y: -4, boxShadow: "0 20px 40px -10px rgba(10, 25, 47, 0.15)", transition: { duration: 0.2 } }}
                className="p-6 bg-[#F8FAFC] rounded-xl border border-gray-100 flex gap-4 items-start cursor-default"
              >
                <motion.div 
                  className="w-12 h-12 bg-kub-navy/5 rounded-lg flex items-center justify-center shrink-0"
                  whileHover={{ rotate: 360, transition: { duration: 0.5 } }}
                >
                  <item.icon className="w-6 h-6 text-kub-gold" />
                </motion.div>
                <div>
                  <h4 className="font-bold font-heading text-kub-navy mb-1">{item.role}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* 4. Секция: Достижения / Сертификаты */}
      <section className="py-12 md:py-20 bg-kub-navy">
        <Container>
          <motion.h2 
            className="text-3xl md:text-4xl font-bold font-heading text-white tracking-tight mb-10 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportConfig}
          >
            Подтверждённые результаты
          </motion.h2>

          <div className="max-w-3xl mx-auto space-y-4 mb-10">
            {[
              "340+ успешных проектов в реестрах Фонда",
              "1.2 млрд ₽ привлечённых грантов и субсидий",
              "0 претензий от ФНС по корректности применения льгот",
              "Партнёрство с региональными центрами кластерного развития",
              "Аккредитация в системе ЕИСУЗ (оператор грантовых программ)"
            ].map((item, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={viewportConfig}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                whileHover={{ x: 8, backgroundColor: "rgba(255,255,255,0.12)", transition: { duration: 0.2 } }}
                className="flex items-start gap-4 p-4 bg-white/5 rounded-xl border border-white/10 transition-colors duration-300 cursor-default"
              >
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                >
                  <ShieldCheck className="w-6 h-6 text-kub-gold shrink-0 mt-0.5" />
                </motion.div>
                <span className="text-gray-200 text-lg font-medium">{item}</span>
              </motion.div>
            ))}
          </div>

          <p className="text-gray-400 text-sm text-center mb-10">Скан-копии аккредитаций доступны по запросу</p>
          
          {/* Лента партнёров с параллакс-эффектом */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-4xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={viewportConfig}
          >
            {[1, 2, 3, 4, 5].map((i) => (
              <motion.div 
                key={i} 
                className="h-12 w-full bg-white/10 rounded-lg hover:bg-white/20 transition-colors duration-300 cursor-default"
                whileHover={{ scale: 1.05, y: -2 }}
                aria-label={`Партнёр ${i}`}
              />
            ))}
          </motion.div>
        </Container>
      </section>

    </main>
  );
}