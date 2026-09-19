"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

type ChecklistItem = {
  id: number;
  scenario: string;
  service: string;
  href: string;
};

const CHECKLIST_ITEMS: ChecklistItem[] = [
  { id: 1, scenario: "Нужно снизить налоги прямо сейчас и закрыть риски проверок", service: "Налоговые льготы", href: "/services/tax" },
  { id: 2, scenario: "Разрабатываете продукт и хотите обнулить НДС/прибыль на 10 лет", service: "Резидентство Сколково", href: "/services/skolkovo" },
  { id: 3, scenario: "Требуются деньги на НИОКР, прототип или сертификацию", service: "Гранты и субсидии", href: "/services/grants" },
  { id: 4, scenario: "Готовите продукт к инвестициям или выходу на новые рынки", service: "Патентование и защита интеллектуальной собственности", href: "/services/patents" },
  { id: 5, scenario: "Заходите в госзакупки, торговые сети или экспорт", service: "Лицензирование и сертификация", href: "/services/licensing" },
];

export function ServicesChecklist() {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  return (
    <Section className="bg-[#F8FAFC]">
      <Container>
        {/* Заголовок + Прогресс-бар */}
        <div className="max-w-3xl mx-auto mb-10">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold font-heading text-kub-navy tracking-tight mb-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Как выбрать направление?{" "}
            <span className="text-kub-gold">Краткий чек-лист</span>
          </motion.h2>

          {/* Прогресс-бар */}
          <div className="flex items-center gap-3 mb-2">
            <span className="text-xs font-medium text-gray-500">Шаг 1 из 3</span>
            <div className="flex-1 h-1 bg-gray-200 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-kub-gold rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: "33%" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
            </div>
          </div>
          <p className="text-xs text-gray-400 text-center md:text-left">
            Выберите сценарий → получите персональную карту услуг
          </p>
        </div>

        {/* Список сценариев */}
        <div className="max-w-4xl mx-auto space-y-3 mb-10">
          {CHECKLIST_ITEMS.map((item, index) => {
            const isSelected = selectedId === item.id;
            
            return (
              <motion.button
                key={item.id}
                type="button"
                onClick={() => setSelectedId(isSelected ? null : item.id)}
                className={`w-full flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-4 md:p-5 rounded-xl border text-left transition-all duration-300 ${
                  isSelected
                    ? "bg-kub-navy text-white border-kub-gold shadow-lg scale-[1.01]"
                    : "bg-white text-gray-700 border-gray-200 hover:border-kub-gold/50 hover:shadow-md"
                } ${selectedId && !isSelected ? "opacity-40 hover:opacity-60" : "opacity-100"}`}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.99 }}
              >
                {/* Сценарий */}
                <span className={`text-sm md:text-base font-medium leading-relaxed ${isSelected ? "text-white" : "text-gray-700"}`}>
                  {item.scenario}
                </span>
                
                {/* Стрелка + Услуга */}
                <div className={`flex items-center gap-2 shrink-0 ${isSelected ? "text-kub-gold" : "text-kub-navy"}`}>
                  <ArrowRight size={16} className="hidden sm:block" />
                  <span className={`text-sm font-semibold ${isSelected ? "text-kub-gold" : "text-kub-navy"}`}>
                    {item.service}
                  </span>
                  <ArrowRight size={16} className="sm:hidden rotate-90" />
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* CTA + Микротекст */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Button 
            href="#audit-form" 
            variant="primary" 
            className="w-full sm:w-auto min-w-[280px]"
          >
            Пройти бесплатный аудит за 5 минут
          </Button>
          <p className="text-xs text-gray-400 mt-4">
            Ответы генерируются автоматически • Результат: персональная дорожная карта
          </p>
        </motion.div>
      </Container>
    </Section>
  );
}