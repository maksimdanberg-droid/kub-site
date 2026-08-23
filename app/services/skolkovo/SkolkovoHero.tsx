"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Shield, Percent, Wallet } from "lucide-react";

export default function SkolkovoHero() {
  return (
    <section className="relative bg-kub-navy py-16 md:py-24 overflow-hidden">
      {/* Декоративная сетка */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none" />
      <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-kub-gold/5 rounded-full blur-[100px] pointer-events-none" />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Левая колонка: текст + кнопки */}
          <div>
            {/* Логотип Сколково (мобильный) */}
            <div className="lg:hidden mb-6 flex items-center gap-3">
              <div className="bg-white/10 text-white px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Фонд Сколково
              </div>
            </div>
            
            {/* Заголовок */}
            <motion.h1 
              className="text-4xl md:text-5xl font-bold font-heading text-white tracking-tight mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              Резидентство Сколково:{" "}
              <span className="text-kub-gold">статус, микрогранты</span>{" "}
              и защита технологий
            </motion.h1>

            {/* Основной текст */}
            <motion.p 
              className="text-gray-300 text-lg leading-relaxed max-w-2xl mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              Статус резидента обнуляет налоги на прибыль, имущество и НДС на 10 лет. 
              Снижает страховые взносы до 15%. Открывает доступ к целевому финансированию 
              на разработку, испытания и внедрение. Мы готовим полный пакет, проходим 
              экспертизы и сопровождаем вас до получения реестровой записи.
            </motion.p>
            
            {/* Кнопки */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-3 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Button 
                href="#check-criteria" 
                variant="primary"
                className="bg-kub-gold text-kub-navy font-semibold hover:bg-kub-gold/90"
              >
                Проверить соответствие критериям
              </Button>
              <Button 
                href="/services/skolkovo#tax-calculator"
                variant="outline" 
                className="border-2 border-white/30 text-white hover:bg-white/10 font-semibold"
              >
                Рассчитать экономию
              </Button>
            </motion.div>
            
            {/* Микротекст */}
            <motion.p 
              className="text-gray-400 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.45 }}
            >
              2,5–3 месяца до статуса • Гарантия переподачи • NDA до начала работы
            </motion.p>
          </div>
          
          {/* Правая колонка: инфографика + логотип (desktop) */}
          <div className="hidden lg:flex flex-col items-end gap-6">
            {/* Логотип Сколково (заглушка-бейдж) */}
            <div className="bg-white/10 text-white px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2 border border-white/10">
              <Shield className="w-5 h-5 text-kub-gold" />
              Фонд «Сколково»
            </div>
            
            {/* Инфографика */}
            <motion.div 
              className="space-y-4"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.15, delayChildren: 0.45 } },
              }}
            >
              {[
                { icon: Percent, value: "0%", label: "Налоги на прибыль, имущество, НДС" },
                { icon: Shield, value: "15%", label: "Страховые взносы" },
                { icon: Wallet, value: "до 30 млн ₽", label: "Гранты и микрогранты" }
              ].map((item, i) => (
                <motion.div 
                  key={i} 
                  variants={{
                    hidden: { opacity: 0, x: 20 },
                    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
                  }}
                  whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.08)" }}
                  className="bg-white/5 border border-white/10 rounded-xl p-4 text-center min-w-50 transition-colors"
                >
                  <item.icon className="w-6 h-6 text-kub-gold mx-auto mb-2" />
                  <div className="text-2xl font-bold text-kub-gold font-heading">{item.value}</div>
                  <div className="text-xs text-gray-400 mt-1">{item.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}