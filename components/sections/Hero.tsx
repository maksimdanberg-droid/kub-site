"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const STATS = [
  { value: "100+", label: "Оформленных проектов" },
  { value: "1.7 млрд ₽", label: "Экономии для клиентов" },
  { value: "90+%", label: "Успешных кейсов" },
];

export default function Hero() {
  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden bg-kub-navy pt-16 md:pt-20">
      {/* Background Layers */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-kub-navy via-[#0F2440] to-kub-navy" />
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-kub-gold/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[100px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black_80%)]" />
      </div>

      <Container className="relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-5%" }}
          className="max-w-4xl mx-auto text-center pt-8 pb-16 md:pt-12 md:pb-24"
        >
          {/* Badge */}
          <motion.div 
            variants={fadeInUp} 
            className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-lg shadow-black/20"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-kub-gold opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-kub-gold"></span>
            </span>
            <span className="text-sm font-medium text-gray-300 tracking-wide">Надежный партнер для вашего бизнеса</span>
          </motion.div>

          {/* Headline */}
          <motion.h1 
            variants={fadeInUp} 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.08] font-heading mb-6"
          >
            Получайте гранты и <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-kub-gold via-[#E8C84A] to-[#F4D86F]">
              налоговые льготы
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p 
            variants={fadeInUp} 
            className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed font-body"
          >
            Помогаем компаниям оформить резидентство в Сколково, получить федеральные субсидии 
            и оптимизировать налогообложение. От аудита до полного сопровождения.
          </motion.p>

          {/* CTAs */}
          <motion.div 
            variants={fadeInUp} 
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            {/* ✅ Изменён href: ведёт на /services/tax и прокручивает к #audit-form */}
            <Button 
              href="/services/tax#audit-form" 
              variant="primary" 
              className="min-w-[200px] shadow-lg shadow-kub-gold/15"
            >
              Рассчитать выгоду
            </Button>
            <Button 
              href="#services" 
              variant="outline" 
              className="min-w-[200px] border-white/20 text-white hover:bg-white/10 hover:text-white"
            >
              Наши услуги
            </Button>
          </motion.div>

          {/* Stats Divider */}
          <motion.div 
            variants={fadeInUp} 
            className="pt-10 border-t border-white/10 grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12"
          >
            {STATS.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-white font-heading tracking-tight">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400 mt-2 font-medium">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}