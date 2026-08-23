"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronDown, FileText, Lock, CreditCard, 
  LayoutDashboard, Info, Send, FileSignature 
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

type FAQItem = {
  question: string;
  answer: string; // Теперь здесь будет HTML-строка
};

// Вспомогательная функция для выделения цифр
const highlightNumbers = (text: string) => {
  return text
    // Рубли
    .replace(/(\d+[\s,]*₽)/g, '<span class="font-mono font-bold text-kub-navy bg-kub-gold/10 px-1.5 py-0.5 rounded">$1</span>')
    // Проценты
    .replace(/(\d+)%/g, '<span class="font-mono font-bold text-kub-navy bg-kub-gold/10 px-1.5 py-0.5 rounded">$1%</span>')
    .replace(/(\d+)\s*(год|года|лет)/g, '<span class="font-mono font-bold text-kub-navy bg-kub-gold/10 px-1.5 py-0.5 rounded">$1 $2</span>');
};

const FAQ_ITEMS: FAQItem[] = [
  {
    question: "А если комиссия откажет?",
    answer: "Решение принимает независимая экспертиза, 100% одобрений не существует. Мы гарантируем качество материалов: если отказ связан с нашей зоной ответственности (упаковка инновационности, финмодель, соответствие ОКВЭД), дорабатываем заявку и подаём повторно за наш счёт. В договоре фиксируем критерии «брака» и порядок бесплатной переподготовки.",
  },
  {
    question: "Сколько реально стоит сопровождение?",
    answer: highlightNumbers("Фикс от 190000 ₽ за направление. Смета утверждается до старта: в неё входят подготовка, подача, до 3 раундов ответов экспертам, настройка учётной политики. Доплаты возможны только при расширении ТЗ (например, добавление второго гранта или патентный поиск по ЕАЭС). Все изменения согласовываем письменно до выполнения работ."),
  },
  {
    question: "Можете ли вы дать 100% гарантию?",
    answer: highlightNumbers("Честно: нет. Фирмы, обещающие 100%, либо берут только «проходные» проекты, либо маскируют риски. Наша статистика: 92% заявок получают статус или финансирование с первой/второй подачи. Перед стартом проводим бесплатный аудит и озвучиваем точные шансы. Если они ниже 70% — говорим прямо, предлагаем альтернативу (другая программа, смена юридической формы, доработка ТЭО) или не берёмся."),
  },
  {
    question: "Что если мы потеряем статус резидента позже?",
    answer: highlightNumbers("Статус снимают не за «ошибки в заявке», а за нарушение условий: смена ОКВЭД, превышение лимита выручки, пропуск ежегодной отчётности. Мы берём контроль на себя: готовим отчёты, мониторим изменения в постановлениях, отправляем уведомления за 30 дней до дедлайнов. За 8 лет только 2 клиента потеряли статус по нашей зоне ответственности — оба случая восстановлены через апелляцию в течение 21 дня."),
  },
  {
    question: "Кто фактически работает над проектом?",
    answer: "В договоре указываем состав команды: старший менеджер, профильный аналитик, юрист по госрегулированию, технический писатель. Мы не передаём материалы на аутсорс и не меняем специалистов без вашего согласования. С первого дня предоставляем доступ к личному кабинету с трекингом этапов, сроками и версиями документов.",
  },
  {
    question: "Как защищена конфиденциальность технологии и финансов?",
    answer: highlightNumbers("NDA подписываем до получения любых материалов. Данные хранятся на защищённых серверах с 2FA и шифрованием AES-256. Доступ имеют только сотрудники проекта."),
  },
  {
    question: "Актуально ли Сколково в 2026? Не отменят ли льготы?",
    answer: "Программа утверждена до 2028 года с возможностью пролонгации. Льготы по налогу на прибыль и страховым взносам закреплены в НК РФ и не отменялись. Важно: статус нельзя совмещать с ИТ-аккредитацией. Мы заранее просчитываем экономическую модель по обоим сценариям и фиксируем в договоре пункт: если законодательство изменится в процессе работы, предлагаем адаптацию стратегии или возврат неизрасходованного аванса пропорционально выполненным этапам.",
  },
];

const GUARANTEES = [
  { icon: FileSignature, label: "Договор с чёткими критериями" },
  { icon: Lock, label: "NDA до передачи материалов" },
  { icon: CreditCard, label: "Фиксированная смета" },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-gray-50 py-16 md:py-24">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Левая колонка: Аккордеон */}
          <div className="lg:col-span-8">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-kub-navy font-heading tracking-tight mb-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Гарантии, которые прописаны{" "}
              <span className="text-kub-gold">в договоре, а не на словах</span>
            </motion.h2>

            <div className="space-y-3">
              {FAQ_ITEMS.map((item, index) => {
                const isOpen = openIndex === index;
                
                return (
                  <motion.div
                    key={index}
                    className={`rounded-xl border transition-all duration-300 ${
                      isOpen 
                        ? "border-l-4 border-kub-gold bg-white shadow-sm" 
                        : "border-gray-200 bg-white hover:border-gray-300"
                    }`}
                    layout
                  >
                    <button
                      onClick={() => toggleItem(index)}
                      className="w-full flex justify-between items-center py-4 px-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-kub-gold rounded-xl"
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${index}`}
                    >
                      <span className="font-heading font-bold text-kub-navy text-lg pr-4">
                        {item.question}
                      </span>
                      <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                      >
                        <ChevronDown 
                          size={20} 
                          className={`flex-shrink-0 ${isOpen ? "text-kub-gold" : "text-gray-400"}`} 
                        />
                      </motion.div>
                    </button>
                    
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          id={`faq-answer-${index}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div 
                            className="px-5 pb-5 text-gray-600 leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: item.answer }}
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
        
            {/* Микротекст */}
            <p className="text-xs text-gray-400 mt-4 flex items-center gap-1">
              <Info size={12} />
              Актуализировано: Август 2026 • Все гарантии имеют юридическую силу после подписания NDA и договора
            </p>
          </div>

          {/* Правая колонка: Sticky-панель гарантий */}
          <div className="lg:col-span-4">
            {/* Desktop: sticky панель */}
            <div className="hidden lg:block sticky top-24">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="font-heading font-bold text-kub-navy text-lg mb-5 pb-4 border-b border-gray-100">
                  Как зафиксированы гарантии
                </h3>
                <ul className="space-y-4">
                  {GUARANTEES.map((item, i) => {
                    const Icon = item.icon;
                    return (
                      <li key={i} className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-kub-gold/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Icon size={16} className="text-kub-gold" />
                        </div>
                        <span className="text-sm text-gray-600 leading-relaxed">{item.label}</span>
                      </li>
                    );
                  })}
                </ul>
                
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <Lock size={12} />
                    <span>Все документы шифруются и хранятся 10 лет</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile: компактная сетка 2x2 */}
            <div className="lg:hidden">
              <h3 className="font-heading font-bold text-kub-navy text-lg mb-4">
                Гарантии в договоре
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {GUARANTEES.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div 
                      key={i}
                      className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm"
                    >
                      <Icon size={18} className="text-kub-gold mb-2" />
                      <span className="text-xs text-gray-600 leading-snug">{item.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}