"use client";

import { motion } from "framer-motion";
import { Building2, TrendingUp, Percent, FileLock, FileCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import Link from "next/link";

type ServiceCard = {
  icon: React.ElementType;
  title: string;
  subtitle?: string; // Опциональный подзаголовок/бейдж
  description: string;
  cta: string;
  microtext: string;
  href: string;
  highlights?: string[];
  badges?: string[]; // Дополнительные микро-бейджи
  timeline?: string;
};

const SERVICES: ServiceCard[] = [
  {
    icon: Building2,
    title: "Резидентство Сколково",
    description: "Обнуляем налог на прибыль и НДС на 10 лет. Снижаем страховые взносы до <highlight>15%</highlight>. Получаем статус от <highlight>2,5 мес</highlight>. Сопровождаем ежегодную отчётность, чтобы вы не потеряли льготы из-за бюрократических ошибок.",
    cta: "Условия и сроки →",
    microtext: "Экономия до 30% ФОТ • Доступ к грантам ФСИ • Гарантия переподачи",
    href: "/services/skolkovo",
    highlights: ["0%", "15%", "2,5 мес"],
  },
  {
    icon: TrendingUp,
    title: "Гранты и субсидии",
    subtitle: "Безвозмездно", // ✅ Главный акцент — под заголовком
    description: "Привлекаем безвозмездное финансирование от <highlight>1,5</highlight> до <highlight>50+ млн ₽</highlight> на НИОКР, прототипы и сертификацию. Работаем с ФСИ, Минпромторгом и региональными фондами. Оплата по факту одобрения или получения первого транша.",
    cta: "Программы и суммы →",
    microtext: "85% одобрений с 1-2 попытки • Success fee опционально",
    href: "/services/grants",
    badges: ["Старт-1: до 12 млн", "Старт-2: до 30 млн"], // ✅ Микро-бейджи вниз
    highlights: ["1,5", "30+ млн ₽"],
  },
  {
    icon: Percent,
    title: "Налоговые льготы",
    description: "Законно снижаем налоговую базу: <highlight>0%</highlight> на прибыль, региональные вычеты, оптимизация <span title='Упрощённая система налогообложения'>УСН</span>/<span title='Патентная система налогообложения'>ПСН</span>. Проводим аудит текущей модели, переводим на оптимальный режим, ставим учёт под требования ФНС без риска доначислений.",
    cta: "Виды льгот →",
    microtext: "Снижение нагрузки на 15–40%",
    href: "/services/tax",
    highlights: ["0%", "15–40%"],
  },
  {
    icon: FileLock,
    title: "Патентование и защита ИП",
    description: "Регистрируем патенты на изобретения, полезные модели, ПО и товарные знаки. Ускоряем экспертизу Роспатента. Создаём правовую основу для лицензирования, франчайзинга и оценки компании при инвестициях.",
    cta: "Виды охраны →",
    microtext: "От 3 месяцев до свидетельства • Защита от копирования • NDA до получения ТЗ",
    href: "/services/patents",
      },
  {
    icon: FileCheck,
    title: "Лицензирование и сертификация",
    subtitle: "Госзакупки • Экспорт • ЕАЭС", // ✅ Главный акцент — под заголовком
    description: "Получаем разрешительные документы для госзакупок, маркетплейсов и экспорта. Сопровождаем сертификацию програмного обеспечения, оборудования и медизделий. Сокращаем время выхода на рынок на <highlight>30%</highlight> за счёт готовых шаблонов и прямого контакта с аккредитованными центрами.",
    cta: "Перечень документов →",
    microtext: "Работаем с Росаккредитацией • Гарантия получения или доработка",
    href: "/services/licensing",
    highlights: ["30%"],
  },
];

// Вспомогательная функция для выделения цифр и ключевых значений
const highlightNumbers = (text: string, highlights?: string[]) => {
  let result = text;
  
  if (highlights) {
    highlights.forEach((val) => {
      const escaped = val.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      result = result.replace(
        new RegExp(`(${escaped})`, "g"),
        '<span class="font-mono font-bold text-kub-navy bg-kub-gold/10 px-1.5 py-0.5 rounded">$1</span>'
      );
    });
  }
  
  result = result.replace(
    /(\d+[\s,]*млн?\s*₽)/gi,
    '<span class="font-mono font-bold text-kub-navy bg-kub-gold/10 px-1.5 py-0.5 rounded">$1</span>'
  );
  
  return result;
};

export function ServicesGrid() {
  return (
    <Section id="services-list" className="bg-white">
      <Container>
        {/* Заголовок секции */}
        <motion.div 
          className="text-center max-w-2xl mx-auto mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-kub-navy tracking-tight mb-4">
            Наши направления
          </h2>
          <p className="text-gray-600 text-lg">
            Выбирайте решение под вашу задачу или закажите комплексный аудит
          </p>
        </motion.div>

        {/* Сетка карточек */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-5%" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12 } },
          }}
        >
          {SERVICES.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
                }}
                whileHover={{ y: -4 }}
                className="group relative bg-white rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-xl border border-gray-100 hover:border-kub-gold/30 transition-all duration-300 flex flex-col h-full"
              >
                {/* Иконка */}
                <div className="w-14 h-14 rounded-xl bg-kub-navy/5 flex items-center justify-center mb-5 transition-colors duration-300 group-hover:bg-kub-gold/10">
                  <Icon size={24} className="text-kub-gold" />
                </div>

                {/* Заголовок */}
                <h3 className="text-xl font-bold font-heading text-kub-navy mb-1">
                  {service.title}
                </h3>

                {/* ✅ Подзаголовок / Главный бейдж (сразу под заголовком) */}
                {service.subtitle && (
                  <div className="mb-3">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold bg-kub-gold/15 text-kub-gold border border-kub-gold/20">
                      {service.subtitle}
                    </span>
                  </div>
                )}

                {/* Описание с выделением цифр */}
                <p 
                  className="text-gray-600 text-sm leading-relaxed mb-5 flex-grow"
                  dangerouslySetInnerHTML={{ 
                    __html: highlightNumbers(service.description, service.highlights) 
                  }}
                />

                {/* Микро-бейджи (дополнительные, если есть) */}
                {service.badges && (
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {service.badges.map((badge, i) => (
                      <span 
                        key={i}
                        className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-gray-100 text-gray-600 border border-gray-200"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                )}

                {/* Таймлайн (если есть) */}
                {service.timeline && (
                  <div className="mb-4 p-3 bg-gray-50 rounded-lg border border-gray-100">
                    <p className="text-xs text-gray-500 font-mono">{service.timeline}</p>
                  </div>
                )}

                {/* CTA-ссылка */}
                <Link
                  href={service.href}
                  className="text-sm font-medium text-kub-navy hover:text-kub-gold transition-colors inline-flex items-center gap-1 group/link"
                >
                  {service.cta}
                  <span className="transition-transform duration-200 group-hover/link:translate-x-1">→</span>
                </Link>

                {/* Микротекст */}
                <p className="text-xs text-gray-400 mt-3 flex flex-wrap gap-2">
                  {service.microtext}
                </p>

                {/* Hover-акцент: золотая полоска снизу */}
                <div className="absolute bottom-0 left-0 w-0 h-1 bg-kub-gold rounded-b-2xl transition-all duration-300 group-hover:w-full" />
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </Section>
  );
}