"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { FileText, Stamp, ShieldCheck } from "lucide-react";

export default function LicensingHero() {
  return (
    <section className="relative bg-gradient-to-br from-kub-navy via-[#0F2545] to-kub-navy py-16 md:py-24 overflow-hidden">
      {/* Декоративная сетка */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] [background-size:40px_40px] pointer-events-none" />
      <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] bg-kub-gold/5 rounded-full blur-[120px] pointer-events-none" />
      
      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Левая колонка: текст */}
          <div>
            <motion.h1 
              className="text-white font-heading font-bold text-4xl md:text-5xl tracking-tight mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Лицензирование Сертификация и{" "}
              <span className="text-kub-gold">разрешительные документы</span>
            </motion.h1>

            <motion.p 
              className="text-gray-300 text-lg leading-relaxed max-w-2xl mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              Получаем лицензии и сертификаты для законного ведения бизнеса. 
              Сопровождаем весь процесс: от аудита требований до получения документа. 
              Работаем со всеми видами лицензируемой деятельности.
            </motion.p>

            <motion.p 
              className="text-gray-400 text-sm flex flex-wrap gap-x-4 gap-y-2"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <span>Сроки: 10–45 рабочих дней</span>
              <span className="text-gray-600">•</span>
              <span>Работаем по всей России</span>
              <span className="text-gray-600">•</span>
              <span>Гарантия результата</span>
            </motion.p>
          </div>
          
          {/* Правая колонка: абстрактная графика */}
          <div className="hidden lg:flex justify-center items-center relative">
            <motion.div 
              className="relative w-40 h-40 md:w-56 md:h-56"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              animate={{ y: [0, -8, 0] }}
              transition={{
                opacity: { duration: 0.6, delay: 0.4 },
                scale: { duration: 0.6, delay: 0.4 },
                y: { repeat: Infinity, duration: 5, ease: "easeInOut" }
              }}
            >
              {/* Размытый фон */}
              <div className="absolute inset-0 bg-kub-gold/10 rounded-full blur-3xl" />
              
              {/* Иконки */}
              <FileText className="w-32 h-32 text-white/10 absolute top-4 left-4" />
              <Stamp className="w-16 h-16 text-kub-gold/30 absolute bottom-8 right-8" />
              <ShieldCheck className="w-12 h-12 text-white/20 absolute top-0 right-12" />
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}