"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { FileText, Rocket } from "lucide-react";

export default function CasesHero() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="relative bg-kub-navy py-16 md:py-24 border-b border-white/10 overflow-hidden">
      {/* Сетка поверх фона */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
      
      {/* Декоративное свечение */}
      <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-kub-gold/5 rounded-full blur-[100px] pointer-events-none" />

      <Container className="relative z-10">
        {/* Flex-обёртка для текста и ракеты */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16">
          
          {/* Текстовый контент */}
          <div className="max-w-2xl md:max-w-3xl text-center md:text-left w-full">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold font-heading text-white tracking-tight mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              Реальные результаты{" "}
              <span className="text-kub-gold">измеримы в цифрах</span>
            </motion.h1>

            <motion.p 
              className="text-lg text-gray-300 leading-relaxed mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              Показываем реальные результаты. Каждый проект — это индивидуальная стратегия и измеримая выгода. Все суммы подтверждены выписками и реестрами. Названия изменены по NDA.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mb-6"
            >
              <a 
                href="/cases-download.pdf" 
                className="inline-flex items-center gap-2 px-6 py-3 bg-kub-gold text-kub-navy font-semibold rounded-xl hover:bg-[#D4AF37]/90 transition-colors shadow-lg shadow-black/20"
              >
                <FileText size={20} />
                Скачать подборку кейсов (PDF)
              </a>
            </motion.div>

            <motion.p 
              className="text-sm text-gray-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.45 }}
            >
              Обновлено: Q1 2026
            </motion.p>
          </div>

          {/* Анимированная ракета */}
          <motion.div
            className="relative text-kub-gold flex-shrink-0 cursor-pointer w-32 h-32 md:w-48 md:h-48"
            animate={{ 
              y: [0, -12, 0], 
              rotate: [0, 6, -6, 0] 
            }}
            transition={{ 
              duration: isHovered ? 1.5 : 4, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            whileHover={{ scale: 1.1, transition: { duration: 0.3 } }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Эффект тяги/огня снизу */}
            <motion.div 
              className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-6 h-10 bg-gradient-to-t from-orange-500/70 to-transparent rounded-full blur-md"
              animate={{ 
                opacity: isHovered ? 1 : 0, 
                scale: isHovered ? 1.3 : 0.7, 
                y: isHovered ? 2 : 8 
              }}
              transition={{ duration: 0.2 }}
            />
            
            <Rocket 
              strokeWidth={1.5} 
              className="w-full h-full relative z-10 drop-shadow-2xl" 
            />
          </motion.div>

        </div>
      </Container>
    </section>
  );
}