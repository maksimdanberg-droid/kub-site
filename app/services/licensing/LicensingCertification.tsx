"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { ChevronDown, Check, Info, ArrowRight, ArrowLeftRight, Award, ShieldCheck, FileCheck } from "lucide-react";

type CertItem = {
  title: string;
  description: string;
  duration: string;
  badge?: string;
  tooltip?: string;
};

type CertCategory = {
  id: string;
  items: CertItem[];
  cta: string;
  microtext: string;
};

const CERT_DATA: CertCategory[] = [
  {
    id: "tr-ts",
    items: [
      { title: "Сертификаты ТР ТС (ЕАЭС)", description: "Обязательное подтверждение соответствия техническим регламентам Таможенного союза.", duration: "1–5 лет", badge: "Обязательно" },
      { title: "Декларации ТР ТС", description: "Регистрация декларации о соответствии продукции требованиям регламентов.", duration: "1–5 лет" },
      { title: "Сертификаты ГОСТ Р", description: "Добровольное подтверждение качества для участия в тендерах и повышения доверия.", duration: "1–3 года" },
      { title: "Отказное письмо", description: "Документ, подтверждающий, что продукция не подлежит обязательной сертификации.", duration: "1 день" },
    ],
    cta: "Получить консультацию",
    microtext: "Обязательно для маркетплейсов, госзакупок, таможни"
  },
  {
    id: "fire-med",
    items: [
      { title: "Пожарный сертификат", description: "Подтверждение соответствия требованиям пожарной безопасности.", duration: "1–5 лет" },
      { title: "Санитарно-эпидемиологическое заключение (СГР)", description: "Государственная регистрация продукции, представляющей потенциальную опасность.", duration: "1–5 лет", tooltip: "СГР — государственная регистрация продукции" },
      { title: "Сертификат ИСО (ISO)", description: "Добровольная сертификация систем менеджмента качества.", duration: "3 года" },
      { title: "Ветеринарные сертификаты", description: "Оформление для продукции животного происхождения.", duration: "1–5 дней" },
    ],
    cta: "Получить консультацию",
    microtext: "Требуется для импорта, производства, продаж"
  },
  {
    id: "industry",
    items: [
      { title: "FSC сертификация", description: "Подтверждение ответственного лесопользования для деревянной продукции и бумаги.", duration: "1–2 месяца" },
      { title: "Халяль сертификат", description: "Соответствие продукции исламским стандартам.", duration: "2–4 недели" },
      { title: "Органик сертификат", description: "Подтверждение органического происхождения продукции.", duration: "1–3 месяца" },
      { title: "CE маркировка", description: "Соответствие европейским стандартам для экспорта в ЕС.", duration: "2–6 недель", badge: "Экспорт" },
      { title: "Сертификат происхождения (СТ-1, Form A)", description: "Подтверждение российского происхождения для экспорта.", duration: "1–3 дня", badge: "Экспорт" },
    ],
    cta: "Получить консультацию",
    microtext: "Необходимо для экспорта и работы с определенными рынками"
  }
];

// Унифицированное открытие модала
const openConsultationModal = () => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("openConsultationModal"));
  }
};

export default function LicensingCertification() {
  return (
    <section className="bg-white py-16 md:py-24">
      <Container>
        <div className="max-w-3xl mx-auto space-y-16">
          
          {/* Вводный блок сертификации */}


          {/* Аккордеоны сертификации */}
          {CERT_DATA.map((category, catIndex) => (
            <LicensingAccordion key={category.id} category={category} index={catIndex} />
          ))}

          {/* ✅ Блок доверия (без формы) */}
          <motion.div 
            className="bg-[#F8FAFC] rounded-2xl p-6 md:p-8 border border-gray-100 text-center space-y-4"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex justify-center gap-3 mb-2 opacity-80">
              <Award className="w-7 h-7 text-kub-gold" />
              <ShieldCheck className="w-7 h-7 text-kub-navy/40" />
              <FileCheck className="w-7 h-7 text-kub-gold/60" />
            </div>
            <h3 className="text-xl font-bold text-kub-navy font-heading">
              Помогаем бизнесу работать легально
            </h3>
            <p className="text-gray-600 text-sm max-w-lg mx-auto">
              Хотя сертификация не является нашим основным профилем, мы успешно закрываем потребности клиентов в разрешительной документации через проверенных партнёров.
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <span className="text-3xl md:text-4xl font-bold text-kub-gold font-heading">500+</span>
              <span className="text-gray-500 text-sm md:text-base text-left leading-tight">
                полученных лицензий<br/>и сертификатов для клиентов
              </span>
            </div>
            <p className="text-xs text-gray-400 pt-2">
              Аккредитованные органы • Полное сопровождение • Гарантия результата
            </p>
          </motion.div>

        </div>
      </Container>
    </section>
  );
}

// Компонент аккордеона (без изменений)
function LicensingAccordion({ category, index }: { category: CertCategory; index: number }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="space-y-3">
        {category.items.map((item, i) => (
          <div key={i} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            <button
              onClick={() => toggle(i)}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors text-left cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Check size={18} className="text-kub-gold flex-shrink-0" />
                <span className="font-medium text-kub-navy text-sm md:text-base">{item.title}</span>
                {item.badge && (
                  <span className="bg-red-100 text-red-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                    {item.badge}
                  </span>
                )}
                {item.tooltip && (
                  <span className="group relative inline-flex items-center ml-1">
                    <Info size={14} className="text-gray-400 cursor-help" />
                    <span className="absolute bottom-full left-0 mb-2 bg-kub-navy text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-20 shadow-lg">
                      {item.tooltip}
                    </span>
                  </span>
                )}
              </div>
              <motion.div animate={{ rotate: openIndex === i ? 180 : 0 }} transition={{ duration: 0.3 }}>
                <ChevronDown size={20} className="text-gray-400" />
              </motion.div>
            </button>

            <AnimatePresence initial={false}>
              {openIndex === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-4 pt-1 border-t border-gray-100 space-y-3">
                    <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">Срок действия:</span>
                      <span className="font-semibold text-kub-gold text-sm bg-kub-gold/10 px-2 py-0.5 rounded-md">
                        {item.duration}
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      <div className="flex justify-center pt-2">
        <button onClick={openConsultationModal} className="px-6 py-3 border-2 border-kub-navy text-kub-navy font-semibold rounded-xl hover:bg-kub-navy hover:text-white transition-all flex items-center justify-center gap-2 text-sm">
          {category.cta} <ArrowRight size={16} />
        </button>
      </div>
      <p className="text-xs text-gray-400 text-center">{category.microtext}</p>
    </motion.div>
  );
}