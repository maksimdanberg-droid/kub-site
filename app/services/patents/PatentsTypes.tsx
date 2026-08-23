"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { ChevronDown, Check, Info, ArrowRight, Tag, Lightbulb, Database, FileSignature } from "lucide-react";

type PatentItem = {
  title: string;
  description: string;
  duration?: string;
  tooltip?: string;
  badge?: string;
};

type AccordionBlockProps = {
  title: string;
  description: string;
  items: PatentItem[];
  bg: "white" | "gray";
  icon: React.ElementType;
  cta: string;
  microtext: string;
  infoBox?: string; // Опциональный текст для блока "Плашка"
};

// Компонент тултипа
const Tooltip = ({ text }: { text: string }) => (
  <span className="group relative inline-block cursor-help border-b border-dashed border-gray-400 hover:border-kub-gold transition-colors ml-1">
    <Info size={14} className="text-gray-400 inline-block -mt-1" />
    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-kub-navy text-white text-xs px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20 text-center shadow-lg">
      {text}
    </span>
  </span>
);

// Компонент бейджа
const Badge = ({ text }: { text: string }) => (
  <span className="inline-flex items-center bg-kub-gold/10 text-kub-gold text-[10px] font-bold px-2 py-0.5 rounded-full ml-2">
    {text}
  </span>
);

// Компонент одного пункта аккордеона
const AccordionItem = ({ item }: { item: PatentItem }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm mb-3">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors text-left cursor-pointer"
      >
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-medium text-kub-navy text-sm md:text-base">{item.title}</span>
          {item.badge && <Badge text={item.badge} />}
          {item.tooltip && <Tooltip text={item.tooltip} />}
        </div>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
          <ChevronDown size={20} className="text-gray-400 flex-shrink-0" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="p-5 pt-2 space-y-4 border-t border-gray-100">
              <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
              {item.duration && (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400">Срок:</span>
                  <span className="font-mono font-bold text-kub-gold text-sm">{item.duration}</span>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Основной компонент блока
function AccordionBlock({ title, description, items, bg, icon: Icon, cta, microtext, infoBox }: AccordionBlockProps) {
  return (
    <div className={`py-16 ${bg === "gray" ? "bg-[#F8FAFC]" : "bg-white"}`}>
      <Container>
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Заголовок и описание */}
          <div className="text-center space-y-4">
            <div className="w-12 h-12 rounded-xl bg-kub-navy/5 flex items-center justify-center mx-auto text-kub-navy">
              <Icon size={24} />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-kub-navy font-heading">{title}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">{description}</p>
          </div>

          {/* Аккордеоны */}
          <div className="space-y-3">
            {items.map((item, i) => (
              <AccordionItem key={i} item={item} />
            ))}
          </div>

          {/* Плашка с доп. информацией (если есть) */}
          {infoBox && (
            <div className="bg-kub-navy/5 border border-kub-navy/10 rounded-xl p-4 text-center">
              <p className="text-sm text-kub-navy font-medium">{infoBox}</p>
            </div>
          )}

          {/* CTA */}
          <div className="text-center space-y-4 pt-4">
            <button 
              onClick={() => window.dispatchEvent(new CustomEvent("openConsultationModal"))}
              className="w-full md:w-auto px-8 py-3 border-2 border-kub-navy text-kub-navy font-semibold rounded-xl hover:bg-kub-navy hover:text-white transition-all flex items-center justify-center gap-2 mx-auto"
            >
              {cta} <ArrowRight size={18} />
            </button>
            <p className="text-xs text-gray-400">{microtext}</p>
          </div>
        </div>
      </Container>
    </div>
  );
}

// Данные для блоков
const BLOCKS: AccordionBlockProps[] = [
  {
    title: "Товарные знаки и бренды",
    description: "Защита названия, логотипа, слогана. Нужно для маркетплейсов, франшиз, защиты от копирования.",
    bg: "gray",
    icon: Tag,
    items: [
      { title: "Регистрация товарного знака в РФ", description: "Защита обозначения на территории России.", duration: "6–8 месяцев" },
      { title: "Международная регистрация (Мадридская система)", description: "Охрана в 130+ странах через одну заявку.", duration: "12–18 месяцев" },
      { title: "Внесение в ТРОИС", description: "Блокировка контрафакта на таможне.", duration: "3 месяца", tooltip: "ТРОИС — Таможенный реестр объектов интеллектуальной собственности" },
      { title: "Продление и восстановление прав", description: "Поддержка охраны после 10 лет использования." }
    ],
    cta: "Получить консультацию",
    microtext: "Проверка на сходство до подачи • Гарантия переподачи при отказе"
  },
  {
    title: "Патенты на изобретения и полезные модели",
    description: "Защита технических решений, алгоритмов, конструкций. Нужно для инвестиций, грантов и защиты от копирования.",
    bg: "white",
    icon: Lightbulb,
    items: [
      { title: "Патент на изобретение", description: "Защита нового технического решения.", duration: "8–12 мес (ускор: 2-4)" },
      { title: "Патент на полезную модель", description: "Защита конструктивных улучшений.", duration: "5–7 месяцев" },
      { title: "Патент на промышленный образец", description: "Защита дизайна и внешнего вида.", duration: "3–6 месяцев" },
      { title: "Патент на ПО и алгоритмы", description: "Защита программного кода и методов обработки данных.", duration: "6–9 месяцев" }
    ],
    infoBox: "Ускоренная экспертиза доступна при наличии оснований",
    cta: "Получить консультацию",
    microtext: "Ускоренная экспертиза по ходатайству • Патентный поиск включён"
  },
  {
    title: "Программы, базы данных и коммерческая тайна",
    description: "Защита цифровых активов и внутренней документации. Нужно для реестра Минцифры, госзакупок, защиты от утечек.",
    bg: "gray",
    icon: Database,
    items: [
      { title: "Регистрация программы для ЭВМ", description: "Внесение в реестр Роспатента.", duration: "до 2 месяцев", tooltip: "ЭВМ — Электронная Вычислительная Машина" },
      { title: "Регистрация базы данных", description: "Охрана структуры и содержания данных.", duration: "1 месяц" },
      { title: "Внесение в реестр отечественного ПО", description: "Преференции в госзакупках и налоговые льготы.", duration: "1,5 месяца", badge: "Госзакупки" },
      { title: "Оформление коммерческой тайны (ноу-хау)", description: "Защита внутренних процессов и алгоритмов.", duration: "5 дней" },
      { title: "Депонирование авторских прав", description: "Фиксация авторства на контент, методики, дизайн." }
    ],
    cta: "Получить консультацию",
    microtext: "Реестр Минцифры — обязательное условие для ИТ-льгот"
  },
  {
    title: "Лицензионные договоры и передача прав",
    description: "Оформление прав на использование ваших технологий третьими лицами. Нужно для франчайзинга и монетизации ИС.",
    bg: "white",
    icon: FileSignature,
    items: [
      { title: "Лицензионный договор", description: "Право использования вашего объекта ИС на определённых условиях.", duration: "Рег: 1–2 мес" },
      { title: "Договор отчуждения (продажи прав)", description: "Полная передача исключительных прав.", duration: "Рег: 1 мес" },
      { title: "Договор коммерческой концессии (франшиза)", description: "Комплексная передача бренда и технологий.", duration: "Рег: 1–2 мес" },
      { title: "Авторский договор / договор подряда", description: "Фиксация прав на результаты работ с исполнителями." },
      { title: "Соглашение о неразглашении (NDA)", description: "Защита информации на этапе переговоров." }
    ],
    cta: "Получить консультацию",
    microtext: "Регистрация договора обязательна для защиты прав перед третьими лицами"
  }
];

export default function PatentsTypes() {
  return (
    <div>
      {BLOCKS.map((block, index) => (
        <AccordionBlock key={index} {...block} />
      ))}
    </div>
  );
}