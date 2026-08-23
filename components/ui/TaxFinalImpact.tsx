"use client";

import { motion, useInView } from "framer-motion";
import { TrendingDown, TrendingUp, Calculator, ShieldCheck, Info, Lock, Users, FileWarning, Calendar } from "lucide-react";
import { useState, useRef, useEffect } from "react"; // ✅ Добавлен useEffect

// ✅ Вынесен за пределы компонента — решает ошибку "static-components"
type FormulaRowProps = {
  label: string;
  amount: number;
  rate: string;
  total: number;
  colorClass: string;
};

const FormulaRow = ({ label, amount, rate, total, colorClass }: FormulaRowProps) => (
  <div className="flex justify-between items-center text-sm py-2 border-b border-dashed border-gray-200 last:border-0">
    <span className="text-gray-500">{label}</span>
    <div className="text-right">
      <span className="text-gray-400 text-xs">{formatRub(amount)} × {rate}</span>
      <div className={`font-bold ${colorClass}`}>
        = {formatRub(total)}
      </div>
    </div>
  </div>
);

// Форматирование рублей
const formatRub = (value: number) => 
  new Intl.NumberFormat("ru-RU", { 
    style: "currency", 
    currency: "RUB", 
    maximumFractionDigits: 0 
  }).format(value);

// Форматирование млн/млрд
const formatMln = (v: number) => {
  if (v >= 1000) return `${(v / 1000).toFixed(1).replace('.0', '')} млрд ₽`;
  if (v >= 100) return `${v} млн ₽`;
  return `${v} млн ₽`;
};

export default function TaxFinalImpact() {
  const [loanAmount, setLoanAmount] = useState(10); // в млн ₽
  const [taxBase, setTaxBase] = useState(50); // налоговая база в млн ₽

  // ✅ Прямой расчёт вместо useEffect — решает ошибку "set-state-in-effect"
  const financingSavings = loanAmount * 0.30 * 1_000_000;
  const taxSavings = taxBase * 0.27 * 1_000_000;
  const totalSavings = financingSavings + taxSavings;

  const ref = useRef<HTMLDivElement>(null);

  // ✅ Прокрутка к элементу при наличии хэша #audit-form в URL
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash === "#audit-form") {
      // Небольшая задержка, чтобы контент успел отрендериться
      const timer = setTimeout(() => {
        ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 150);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    // ✅ Добавлен id="audit-form" к корневому элементу
    <motion.section 
      id="audit-form"
      ref={ref}
      // ✅ Использован канонический класс bg-linear-to-br вместо bg-gradient-to-br
      className="bg-linear-to-br from-kub-navy via-[#0F2545] to-kub-navy py-10 md:py-16 relative overflow-hidden"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
    >
      {/* Декоративные элементы */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[40px_40px] pointer-events-none" />
      {/* ✅ Использован канонический класс w-75 вместо w-[300px] */}
      <div className="absolute top-[-10%] left-[-5%] w-75 h-75 bg-kub-gold/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Заголовок */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <motion.h2 
            className="text-2xl md:text-3xl font-bold font-heading text-white tracking-tight mb-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Кредит под 35% или заём под 3%?{" "}
            <span className="text-kub-gold">Выбор за вами</span>
          </motion.h2>
        </div>

        {/* Сетка сравнения */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6 items-start mb-6">
          
          {/* Колонка 1: Без нашей помощи */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-xl p-5 shadow-xl border border-red-200/50 flex flex-col h-full"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-full bg-red-100 flex items-center justify-center">
                <TrendingDown className="w-3.5 h-3.5 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-kub-navy font-heading">Обычный путь</h3>
                <span className="text-[10px] text-red-500 font-medium uppercase tracking-wide">Коммерческий кредит + ОСН</span>
              </div>
            </div>

            {/* Минусы банковского кредита */}
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-50 text-red-700 text-[10px] font-medium rounded-md border border-red-100">
                <Lock size={10} /> Требуется залог
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-50 text-red-700 text-[10px] font-medium rounded-md border border-red-100">
                <Users size={10} /> Поручительство собственников
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-50 text-red-700 text-[10px] font-medium rounded-md border border-red-100">
                <FileWarning size={10} /> Жесткий график платежей
              </span>
            </div>
            
            {/* Детализация (Чек) */}
            <div className="bg-gray-50 rounded-lg p-3 mb-4">
              <div className="text-[10px] font-bold text-gray-400 uppercase mb-2 flex items-center gap-1">
                <Info size={10} /> Ежегодная нагрузка (срок до 7 лет)
              </div>
              <FormulaRow 
                label="Проценты по кредиту" 
                amount={loanAmount * 1_000_000} 
                rate="35%" 
                total={loanAmount * 350_000} 
                colorClass="text-red-600"
              />
              <FormulaRow 
                label="Налоги и взносы" 
                amount={taxBase * 1_000_000} 
                rate="42%" 
                total={taxBase * 420_000} 
                colorClass="text-red-600"
              />
              <div className="mt-2 pt-2 border-t border-gray-200 flex justify-between items-center">
                <span className="text-xs font-medium text-gray-500">Итого в год:</span>
                <span className="text-base font-bold text-red-700">
                  {formatRub(loanAmount * 350_000 + taxBase * 420_000)}
                </span>
              </div>
            </div>

            <div className="mt-auto pt-3 border-t border-red-100">
              <p className="text-xs text-gray-500 leading-relaxed">
                Высокая ставка съедает маржу. Требуются активы под залог и личные гарантии.
              </p>
            </div>
          </motion.div>

          {/* Колонка 2: После оптимизации */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="bg-white rounded-xl p-5 shadow-xl border border-green-200/50 relative flex flex-col h-full"
          >
            <span className="absolute -top-2 -right-2 bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
              Выгода 57%
            </span>
            
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-full bg-kub-gold/20 flex items-center justify-center">
                <TrendingUp className="w-3.5 h-3.5 text-kub-gold" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-kub-navy font-heading">С оптимизацией от нашей Команды</h3>
                <span className="text-[10px] text-kub-gold font-medium uppercase tracking-wide">Льготный заём ФРП + МТК</span>
              </div>
            </div>

            {/* Плюсы льготного финансирования */}
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-50 text-green-700 text-[10px] font-medium rounded-md border border-green-100">
                <ShieldCheck size={10} /> Без залога имущества
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-50 text-green-700 text-[10px] font-medium rounded-md border border-green-100">
                <Calendar size={10} /> Отсрочка платежа до 12 мес.
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-50 text-green-700 text-[10px] font-medium rounded-md border border-green-100">
                <TrendingUp size={10} /> Гибкий график
              </span>
            </div>
            
            {/* Детализация (Чек) */}
            <div className="bg-green-50/50 rounded-lg p-3 mb-4 border border-green-100">
              <div className="text-[10px] font-bold text-green-600/70 uppercase mb-2 flex items-center gap-1">
                <Info size={10} /> Ежегодная нагрузка (срок до 7 лет)
              </div>
              <FormulaRow 
                label="Проценты по займу" 
                amount={loanAmount * 1_000_000} 
                rate="5%" 
                total={loanAmount * 50_000} 
                colorClass="text-kub-gold"
              />
              <FormulaRow 
                label="Налоги и взносы" 
                amount={taxBase * 1_000_000} 
                rate="15%" 
                total={taxBase * 150_000} 
                colorClass="text-kub-gold"
              />
              <div className="mt-2 pt-2 border-t border-green-200 flex justify-between items-center">
                <span className="text-xs font-medium text-gray-500">Итого в год:</span>
                <span className="text-base font-bold text-green-700">
                  {formatRub(loanAmount * 50_000 + taxBase * 150_000)}
                </span>
              </div>
            </div>

            <div className="mt-auto pt-3 border-t border-green-100">
              <p className="text-xs text-gray-500 leading-relaxed">
                Льготная ставка + сниженные налоги. Капитал остается в обороте компании.
              </p>
            </div>
          </motion.div>

        </div>

        {/* Панель управления (Слайдеры + Итог) */}
        <motion.div 
          className="bg-white/10 backdrop-blur-md rounded-xl p-5 border border-white/20 shadow-2xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {/* Заголовок панели и слайдера */}
          <div className="flex items-center gap-3 mb-6 text-white">
            <Calculator className="w-5 h-5 text-kub-gold" />
            <h3 className="text-base font-bold">Калькулятор выгоды</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Ползунок 1 */}
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-white font-medium text-sm">Сумма займа <span className="text-gray-400 text-xs font-normal">(срок до 7 лет)</span></label>
                <span className="text-kub-gold font-bold">{formatMln(loanAmount)}</span>
              </div>
              <input
                type="range"
                min="1"
                max="100"
                step="1"
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="w-full accent-kub-gold h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-gray-500 mt-1">
                <span>1 млн</span>
                <span>100 млн</span>
              </div>
            </div>

            {/* Ползунок 2 */}
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-white font-medium text-sm">Налоговая база (год)</label>
                <span className="text-kub-gold font-bold">{formatMln(taxBase)}</span>
              </div>
              <input
                type="range"
                min="10"
                max="500"
                step="10"
                value={taxBase}
                onChange={(e) => setTaxBase(Number(e.target.value))}
                className="w-full accent-kub-gold h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-gray-500 mt-1">
                <span>10 млн</span>
                <span>500 млн</span>
              </div>
            </div>
          </div>

          {/* Итоговый блок */}
          <div className="bg-kub-gold/10 border border-kub-gold/30 rounded-lg p-4 flex flex-col md:flex-row items-center justify-between gap-3">
            <div className="text-center md:text-left">
              <div className="text-kub-gold text-xs font-bold uppercase tracking-wider mb-0.5">Чистая экономия в год</div>
              <div className="text-gray-300 text-[10px]">Разница между обычным и льготным режимом</div>
            </div>
            
            <motion.div 
              className="flex items-baseline gap-2"
              key={totalSavings}
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              <span className="text-2xl md:text-3xl font-bold text-white">
                {formatRub(totalSavings)}
              </span>
              <span className="text-white/60 text-xs font-medium">/ год</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Дисклеймер */}
        <p className="text-[10px] text-gray-500 text-center mt-4 max-w-2xl mx-auto leading-relaxed">
          * Расчёты носят оценочный характер. Точные условия зависят от выбранной программы ФРП, кредитной истории, региона регистрации и текущей ставки ЦБ. 
          Налоговые ставки указаны для общей системы налогообложения без учёта региональных понижающих коэффициентов.
        </p>

        {/* Микротекст */}
        <motion.p 
          className="text-[10px] text-gray-500 text-center mt-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
        >
          Бесплатно • 15 минут • без обязательств • NDA до старта
        </motion.p>
      </div>
    </motion.section>
  );
}