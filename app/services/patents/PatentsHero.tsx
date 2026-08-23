"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Key, ShieldCheck, Code } from "lucide-react";

export default function PatentsHero() {
  // ✅ Унифицированное открытие модала
  const openConsultationModal = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("openConsultationModal"));
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-kub-navy via-[#0F2545] to-kub-navy py-16 md:py-24 overflow-hidden">
      {/* Сетка фона */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] [background-size:40px_40px] pointer-events-none" />
      {/* Декоративное размытие */}
      <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] bg-kub-gold/5 rounded-full blur-[120px] pointer-events-none" />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Левая колонка: текст и кнопки */}
          <div>
            <motion.h1 
              className="text-white font-heading font-bold text-4xl md:text-5xl tracking-tight mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Патентование и защита{" "}
              <span className="text-kub-gold">интеллектуальной собственности</span>
            </motion.h1>

            <motion.p 
              className="text-gray-300 text-lg leading-relaxed max-w-2xl mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              Регистрируем патенты на изобретения, полезные модели, ПО и товарные знаки. Ускоряем экспертизу Роспатента. Создаём правовую основу для лицензирования, франчайзинга и оценки компании при инвестициях.
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Button 
                onClick={openConsultationModal}
                className="bg-kub-gold text-kub-navy font-semibold hover:bg-kub-gold/90 transition-all"
              >
                Проверить патентную чистоту
              </Button>
            </motion.div>

            <motion.p 
              className="text-gray-400 text-sm mt-6 flex flex-wrap gap-x-4 gap-y-2"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.45 }}
            >
              <span>Сроки: от 3 месяцев</span>
              <span className="text-gray-600">•</span>
              <span>Ускоренная экспертиза</span>
              <span className="text-gray-600">•</span>
              <span>Гарантия подачи</span>
            </motion.p>
          </div>
          
          {/* Правая колонка: абстрактная графика */}
          <div className="hidden lg:flex justify-center items-center relative">
            <motion.div 
              className="relative w-56 h-56"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              animate={{ y: [0, -10, 0] }}
              transition={{ 
                duration: 6, 
                ease: "easeInOut", 
                repeat: Infinity 
              }}
            >
              {/* Размытый фон */}
              <div className="absolute inset-0 bg-kub-gold/10 rounded-full blur-3xl" />
              
              {/* Иконки "цепочки" (светлые для тёмного фона) */}
              <Key className="w-24 h-24 text-white/15 absolute top-6 left-8 rotate-12" />
              <ShieldCheck className="w-16 h-16 text-kub-gold/40 absolute bottom-12 right-10 -rotate-6" />
              <Code className="w-12 h-12 text-white/20 absolute top-16 right-4" />
            </motion.div>
          </div>

        </div>
      </Container>
    </section>
  );
}