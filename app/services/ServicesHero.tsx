"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Building2, Wallet, ShieldCheck } from "lucide-react";

export function ServicesHero() {
  return (
    <section className="relative py-32 md:py-40 overflow-hidden bg-kub-navy min-h-[60vh] flex items-center">
      
      {/* Фоновая сетка (такая же как на главной) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-kub-navy via-[#0F2440] to-kub-navy" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-kub-gold/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[100px]" />
      </div>

      {/* Декоративные иконки (белые с прозрачностью, как на главной) */}
      <Building2 className="absolute top-20 right-10 w-24 h-24 text-white/5 pointer-events-none hidden md:block" strokeWidth={0.5} />
      <Wallet className="absolute bottom-32 left-8 w-20 h-20 text-white/5 pointer-events-none hidden md:block" strokeWidth={0.5} />
      <ShieldCheck className="absolute top-1/2 right-20 w-16 h-16 text-white/5 pointer-events-none hidden lg:block" strokeWidth={0.5} />

      <Container className="relative z-10">
        <div className="max-w-4xl">
          
          {/* Заголовок */}
          <motion.h1 
            className="text-4xl md:text-6xl font-bold font-heading text-white tracking-tight mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Сопровождение инноваций{" "}
            <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-kub-gold via-[#E8C84A] to-[#F4D86F]">
              и снижение налоговой нагрузки
            </span>
          </motion.h1>

          {/* Основной текст */}
          <motion.p 
            className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Комплексное сопровождение от аудита технологии до сохранения статуса. 
            Фиксируем сроки, бюджет и финансовые результаты в договоре. Работаем с 5 направлениями, 
            которые закрывают весь цикл развития технологического бизнеса.
          </motion.p>

          {/* Кнопка */}
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Button href="#calculate" variant="primary" className="w-full sm:w-auto min-w-[200px]">
              Рассчитать экономию
            </Button>
          </motion.div>

          {/* Микротекст */}
          <motion.p 
            className="text-sm text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            5 направлений • Договор и NDA • Старт работы за 24 часа
          </motion.p>
        </div>
      </Container>
    </section>
  );
}