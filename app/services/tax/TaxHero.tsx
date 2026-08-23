"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Percent, ShieldCheck } from "lucide-react";

export default function TaxHero() {
  // Открытие модала консультации
  const openConsultationModal = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("openConsultationModal"));
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-kub-navy via-[#0F2545] to-[#1a3a5c] py-16 md:py-24 overflow-hidden">
      {/* Декоративные элементы */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] [background-size:40px_40px] pointer-events-none" />
      <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] bg-kub-gold/5 rounded-full blur-[120px] pointer-events-none" />
      
      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Левая колонка: текст + кнопки + логотипы */}
          <div>
            {/* Заголовок */}
            <motion.h1 
              className="text-4xl md:text-5xl font-bold font-heading text-white tracking-tight mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              Налоговые льготы и{" "}
              <span className="text-kub-gold">Льготные займы</span>{" "}
              для технологических компаний
            </motion.h1>

            {/* Основной текст */}
            <motion.p 
              className="text-gray-300 text-lg leading-relaxed max-w-2xl mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              Снижаем налоговую нагрузку и стоимость капитала легально. Настраиваем учёт под требования ФНС, 
              получаем федеральные и региональные статусы. Экономия на налогах — от 15% до 100%. 
              Стоимость заёмных средств — от 3% годовых.
            </motion.p>
            
            {/* Облако логотипов */}
            <motion.div 
              className="flex flex-wrap items-center justify-center md:justify-start gap-3 md:gap-6 mb-8"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
              }}
              initial="hidden"
              animate="visible"
            >
              {[
                { name: "Минэкономразвития", href: "https://economy.gov.ru" },
                { name: "ФРП", href: "https://frprf.ru" },
                { name: "Минпромторг", href: "https://minpromtorg.gov.ru" },
              ].map((org) => (
                <motion.a
                  key={org.name}
                  href={org.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-2"
                >
                  {org.name}
                </motion.a>
              ))}
            </motion.div>
            
            {/* Кнопки */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-3 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Button 
                onClick={openConsultationModal}
                variant="outline" 
                className="border-2 border-white/30 text-white hover:bg-white/10 font-semibold"
              >
                Подать на статус МТК и не только
              </Button>
            </motion.div>
            
            {/* Микротекст */}
            <motion.p 
              className="text-gray-400 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.45 }}
            >
              Аудит за 1 рабочий день • Снижение нагрузки фиксируется в договоре • 0 риск доначислений
            </motion.p>
          </div>
          
          {/* Правая колонка: инфографика "До/После" (только desktop) */}
          <motion.div 
            className="hidden lg:flex flex-col items-center justify-center"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
          >
            <div className="flex items-center gap-4">
              {/* Карточка "До" */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center flex-1">
                <div className="text-xs text-gray-400 uppercase tracking-wide mb-2">Обычный режим</div>
                <div className="text-2xl font-bold text-gray-300 line-through">20–42%</div>
                <div className="text-[10px] text-gray-500">Налоги + взносы</div>
              </div>
              
              {/* Стрелка */}
              <ArrowRight className="w-6 h-6 text-kub-gold flex-shrink-0" />
              
              {/* Карточка "После" */}
              <div className="bg-kub-gold/10 border border-kub-gold/30 rounded-xl p-4 text-center flex-1 relative">
                <span className="absolute -top-2 -right-2 bg-kub-gold text-kub-navy text-[10px] font-bold px-2 py-0.5 rounded-full">Выгода</span>
                <div className="text-xs text-kub-gold uppercase tracking-wide mb-2">Льготный режим</div>
                <div className="text-2xl font-bold text-kub-gold font-heading">0–15%</div>
                <div className="text-[10px] text-gray-400">Налоги + взносы</div>
              </div>
            </div>
            
            {/* Подпись под инфографикой */}
            <p className="text-xs text-gray-400 mt-4 text-center max-w-xs">
              Экономия достигается легально через статусы МТК, Сколково, реестры Минпромторга
            </p>
          </motion.div>
        </div>
        
        {/* Упрощённая инфографика для мобильной версии */}
        <div className="lg:hidden mt-8 grid grid-cols-3 gap-3">
          <div className="bg-white/5 rounded-lg p-3 text-center">
            <div className="text-xs text-gray-400">Обычный</div>
            <div className="text-lg font-bold text-gray-300 line-through">42%</div>
          </div>
          <div className="bg-kub-gold/10 rounded-lg p-3 text-center border border-kub-gold/30">
            <div className="text-xs text-kub-gold">Льготный</div>
            <div className="text-lg font-bold text-kub-gold">0–15%</div>
          </div>
          <div className="bg-white/5 rounded-lg p-3 text-center">
            <div className="text-xs text-gray-400">Займы</div>
            <div className="text-lg font-bold text-gray-300">от 3%</div>
          </div>
        </div>
      </Container>
    </section>
  );
}