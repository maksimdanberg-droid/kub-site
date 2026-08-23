"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function GrantsHero() {
  const [projectStage, setProjectStage] = useState<string>("");
  
  // ✅ Логика рекомендаций вычисляется напрямую, без useEffect
  const getRecommendedProgram = (stage: string) => {
    const mapping: Record<string, string> = {
      "idea": "ФСИ «Старт-1» — до 4 млн ₽",
      "prototype": "ФСИ «Старт-2» — до 12 млн ₽",
      "pilot": "ФСИ «Развитие» или Минпромторг НИОКР",
      "series": "Минпромторг «Электроника» или ЦПИИ",
      "unsure": "Бесплатный аудит подберёт программу"
    };
    return mapping[stage] || "";
  };
  
  const recommendedProgram = getRecommendedProgram(projectStage);

  // Открытие модала консультации
  const openConsultationModal = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("openConsultationModal"));
    }
  };
  
  return (
    <section className="relative bg-linear-to-br from-kub-navy via-[#0F2545] to-kub-navy py-16 md:py-24 overflow-hidden">
      {/* Декоративные элементы */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[40px_40px] pointer-events-none" />
      <div className="absolute top-[-10%] right-[-5%] w-100 h-100 bg-kub-gold/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
              Гранты и субсидии:{" "}
              <span className="text-kub-gold">финансирование НИОКР</span>{" "}
              и коммерциализации
            </motion.h1>

            {/* Основной текст */}
            <motion.p 
              className="text-gray-300 text-lg leading-relaxed max-w-2xl mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              Подбираем программу под стадию проекта, ОКВЭД и готовность технологии. 
              Сопровождаем заявки в ФСИ, Минпромторг, АТР и ЦПИИ. Возвращаем до 100% 
              затрат на разработку, испытания и запуск в серию. Работаем по success-fee 
              или поэтапно.
            </motion.p>
            
            {/* Логотипы организаций */}
            <motion.div 
              className="flex flex-wrap items-center gap-3 md:gap-6 mb-8"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
              }}
              initial="hidden"
              animate="visible"
            >
              {[
                { name: "ФСИ", href: "https://fasie.ru" },
                { name: "Минпромторг", href: "https://minpromtorg.gov.ru" },
                { name: "АТР", href: "https://atr.gov.ru/" },
                { name: "ЦПИИ", href: "https://inno-sc.ru/" }
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
                  <ArrowRight size={12} className="opacity-50" />
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
                variant="primary"
                className="bg-kub-gold text-kub-navy font-semibold hover:bg-kub-gold/90"
              >
                Подобрать программу
              </Button>
            </motion.div>
            
            {/* Микротекст */}
            <motion.p 
              className="text-gray-400 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.45 }}
            >
              85% одобренных заявок с первой/второй подачи • Сроки: 3–6 месяцев до первого транша
            </motion.p>
          </div>
          
          {/* Правая колонка: интерактивный фильтр (только desktop) */}
          <motion.div 
            className="hidden lg:block"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
          >
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Стадия проекта
              </label>
              <select
                value={projectStage}
                onChange={(e) => setProjectStage(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-kub-gold focus:border-transparent outline-none appearance-none cursor-pointer"
              >
                <option value="" className="bg-kub-navy text-gray-300">Выберите стадию...</option>
                <option value="idea" className="bg-kub-navy text-gray-300">💡 Идея / Концепция</option>
                <option value="prototype" className="bg-kub-navy text-gray-300">🔬 Прототип / Лабораторный образец</option>
                <option value="pilot" className="bg-kub-navy text-gray-300">🚀 Пилотный запуск</option>
                <option value="series" className="bg-kub-navy text-gray-300">🏭 Серийное производство</option>
                <option value="unsure" className="bg-kub-navy text-gray-300">🤔 Не определился</option>
              </select>
              
              <AnimatePresence>
                {recommendedProgram && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 pt-4 border-t border-white/10"
                  >
                    <div className="flex items-start gap-2 text-sm text-gray-300">
                      <CheckCircle2 className="w-4 h-4 text-kub-gold shrink-0 mt-0.5" />
                      <span>
                        Рекомендуемая программа:<br/>
                        <strong className="text-white">{recommendedProgram}</strong>
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
        
        {/* Фильтр для мобильной версии (под кнопками) */}
        <div className="lg:hidden mt-8">
          <select
            value={projectStage}
            onChange={(e) => setProjectStage(e.target.value)}
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-kub-gold outline-none appearance-none"
          >
            <option value="" className="bg-kub-navy text-gray-300">🔍 Подобрать программу по стадии...</option>
            <option value="idea" className="bg-kub-navy text-gray-300">💡 Идея / Концепция</option>
            <option value="prototype" className="bg-kub-navy text-gray-300">🔬 Прототип</option>
            <option value="pilot" className="bg-kub-navy text-gray-300">🚀 Пилотный запуск</option>
            <option value="series" className="bg-kub-navy text-gray-300">🏭 Серийное производство</option>
            <option value="unsure" className="bg-kub-navy text-gray-300">🤔 Не определился</option>
          </select>
          <AnimatePresence>
            {recommendedProgram && (
              <motion.p 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-3 text-sm text-gray-400 flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4 text-kub-gold shrink-0" />
                {recommendedProgram}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}