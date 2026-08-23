"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { ChevronDown, Check, Info, ArrowRight } from "lucide-react";

type LicenseItem = {
  title: string;
  description: string;
  duration: string;
  tooltip?: string;
};

type LicenseCategory = {
  id: string;
  h2: string;
  description: string;
  items: LicenseItem[];
  cta: string;
  microtext: string;
};

const LICENSES: LicenseCategory[] = [
  {
    id: "industrial",
    h2: "Промышленные и производственные лицензии",
    description: "Для работы с опасными производствами, отходами, металлами и пожарными системами.",
    items: [
      { title: "Лицензии МЧС", description: "Монтаж и обслуживание систем пожарной безопасности, тушение пожаров.", duration: "Бессрочно" },
      { title: "Лицензия на лом металлов", description: "Заготовка, хранение, переработка лома черных и цветных металлов.", duration: "Бессрочно" },
      { title: "Лицензия Росприроднадзора", description: "Сбор, обработка, транспортировка, утилизация отходов I–IV классов опасности.", duration: "Бессрочно" },
      { title: "Лицензии Ростехнадзора", description: "Эксплуатация взрывопожароопасных и химически опасных объектов, работы с ядерными материалами.", duration: "3 года – бессрочно" }
    ],
    cta: "Получить консультацию",
    microtext: "Требуется площадка, оборудование, специалисты. Поможем с подготовкой."
  },
  {
    id: "medical",
    h2: "Медицинские и фармацевтические лицензии",
    description: "Для клиник, аптек, производителей медтехники и лекарственных средств.",
    items: [
      { title: "Медицинская лицензия", description: "Оказание медицинских услуг. Требуется помещение, оборудование, сертифицированные специалисты.", duration: "5 лет" },
      { title: "Фармацевтическая лицензия", description: "Оптовая и розничная торговля лекарствами, хранение и перевозка препаратов.", duration: "5 лет" },
      { title: "Лицензия на медтехнику", description: "Производство и техническое обслуживание медицинской техники.", duration: "Бессрочно" },
      { title: "Лицензия Роспотребнадзора (ИИИ)", description: "Работа с источниками ионизирующего излучения (генерирующими).", duration: "Бессрочно", tooltip: "Источники Ионизирующего Излучения" }
    ],
    cta: "Получить консультацию",
    microtext: "Помощь с подбором персонала и оборудования. Аренда помещений под требования."
  },
  {
    id: "it",
    h2: "Лицензии в сфере IT, связи и информации",
    description: "Для телеком-операторов, разработчиков ПО, СМИ и работы с гостайной.",
    items: [
      { title: "Лицензии Роскомнадзора (связь)", description: "Телефония, интернет, радиосвязь, телевидение, почтовая связь.", duration: "5–7 лет" },
      { title: "Регистрация СМИ", description: "Печатные, электронные издания, информационные агентства, радио/ТВ-программы.", duration: "Бессрочно" },
      { title: "Лицензия ФСБ (гостайна)", description: "Работы со сведениями, составляющими государственную тайну.", duration: "3–5 лет" },
      { title: "Лицензия ФСБ (криптография)", description: "Разработка и использование шифровальных средств, защита информации.", duration: "Бессрочно" }
    ],
    cta: "Получить консультацию",
    microtext: "Обязательна для участия в госзакупках и тендерах."
  },
  {
    id: "special",
    h2: "Специальные лицензии и разрешения",
    description: "Для реставрации, геодезии, картографии и оборота алкогольной продукции.",
    items: [
      { title: "Лицензия Минкультуры (реставрация)", description: "Работы по сохранению объектов культурного наследия.", duration: "Бессрочно" },
      { title: "Лицензия Росреестра (геодезия и картография)", description: "Геодезические и картографические работы, создание топографических карт.", duration: "Бессрочно" },
      { title: "Лицензия Росалкогольрегулирования", description: "Производство, хранение, оптовая и розничная торговля алкоголем.", duration: "5 лет" }
    ],
    cta: "Получить консультацию",
    microtext: "Строгие требования к помещению и оборудованию. Поможем с подготовкой."
  }
];

// Унифицированное открытие модала
const openConsultationModal = () => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("openConsultationModal"));
  }
};

export default function LicensingTypes() {
  return (
    <section className="bg-[#F8FAFC] py-16 md:py-24">
      <Container>
        <div className="max-w-3xl mx-auto space-y-16">
          {LICENSES.map((category, catIndex) => (
            <LicensingAccordion key={category.id} category={category} index={catIndex} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function LicensingAccordion({ category, index }: { category: LicenseCategory; index: number }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="space-y-6"
    >
      {/* Заголовок блока + текст */}
      <div className="text-center space-y-3">
        <h2 className="text-xl md:text-2xl font-bold text-kub-navy font-heading">
          {category.h2}
        </h2>
        <p className="text-gray-600 text-sm max-w-2xl mx-auto">
          {category.description}
        </p>
      </div>

      {/* Аккордеон */}
      <div className="space-y-3">
        {category.items.map((item, i) => (
          <div key={i} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            {/* Заголовок пункта */}
            <button
              onClick={() => toggle(i)}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors text-left cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Check size={18} className="text-kub-gold flex-shrink-0" />
                <span className="font-medium text-kub-navy text-sm md:text-base">{item.title}</span>
                {item.tooltip && (
                  <span className="group relative inline-flex items-center ml-1">
                    <Info size={14} className="text-gray-400 cursor-help" />
                    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-kub-navy text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-20 shadow-lg">
                      {item.tooltip}
                    </span>
                  </span>
                )}
              </div>
              <motion.div animate={{ rotate: openIndex === i ? 180 : 0 }} transition={{ duration: 0.3 }}>
                <ChevronDown size={20} className="text-gray-400" />
              </motion.div>
            </button>

            {/* Контент аккордеона */}
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

      {/* CTA кнопка */}
      <div className="flex justify-center pt-2">
        <button
          onClick={openConsultationModal}
          className="w-full md:w-auto px-6 py-3 border-2 border-kub-navy text-kub-navy font-semibold rounded-xl hover:bg-kub-navy hover:text-white transition-all flex items-center justify-center gap-2 text-sm"
        >
          {category.cta} <ArrowRight size={16} />
        </button>
      </div>

      {/* Микротекст */}
      <p className="text-xs text-gray-400 text-center">
        {category.microtext}
      </p>
    </motion.div>
  );
}