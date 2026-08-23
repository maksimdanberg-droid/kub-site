"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";

export default function ContactsHero() {
  return (
    <section className="relative bg-kub-navy py-16 md:py-24 border-b border-white/10 overflow-hidden">
      {/* Сетка поверх фона */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
      
      {/* Декоративные пятна света (для премиум-эффекта) */}
      <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-kub-gold/5 rounded-full blur-[100px] pointer-events-none" />

      <Container className="relative z-10">
        <div className="max-w-3xl">
          {/* Заголовок */}
          <motion.h1 
            className="text-4xl md:text-5xl font-bold font-heading text-white tracking-tight mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            Свяжитесь с нами
          </motion.h1>

          {/* Подзаголовок */}
          <motion.p 
            className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            Бесплатная консультация и аудит вашего проекта. Разбираемся в деталях, считаем экономику, фиксируем план.
          </motion.p>

          {/* Микротекст */}
          <motion.p 
            className="text-sm text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Работаем по договору и NDA. Конфиденциально.
          </motion.p>
        </div>
      </Container>
    </section>
  );
}