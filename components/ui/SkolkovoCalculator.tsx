"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, ShieldCheck, Info, ChevronDown, AlertCircle, CheckCircle2 } from "lucide-react";

type CalculatorData = {
  revenue: string;
  profit: string;
  payroll: string;
  property: string;
  isImport: boolean;
  importValue: string;
};

type CalculatorErrors = Partial<Record<keyof CalculatorData, string>>;

export default function SkolkovoCalculator() {
  const [data, setData] = useState<CalculatorData>({
    revenue: "",
    profit: "",
    payroll: "",
    property: "",
    isImport: false,
    importValue: ""
  });
  const [errors, setErrors] = useState<CalculatorErrors>({});
  const [showWarning, setShowWarning] = useState(false);

  const formatRub = (value: number) => 
    new Intl.NumberFormat("ru-RU", { 
      style: "currency", 
      currency: "RUB", 
      maximumFractionDigits: 0 
    }).format(value);

  const formatWithSpaces = (value: string) => {
    const num = value.replace(/\s/g, "").replace(/[^0-9]/g, "");
    return num.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  // ✅ ИСПРАВЛЕНО: useMemo предотвращает бесконечный ре-рендер
  const results = useMemo(() => {
    const num = (v: string) => parseFloat(v.replace(/\s/g, "")) || 0;
    
    const revenue = num(data.revenue);
    const profit = num(data.profit);
    const payroll = num(data.payroll);
    const property = num(data.property);
    const importVal = data.isImport ? num(data.importValue) : 0;

    // Проверка лимитов Сколково
    if (revenue > 1_000_000_000 || profit > 300_000_000) {
      setShowWarning(true);
      return null;
    }
    setShowWarning(false);

    // Формулы расчёта (ориентировочные)
    const vat = revenue * 0.22; // НДС 22%
    const profitTax = profit * 0.20; // Налог на прибыль 20%
    const propertyTax = property * 0.022; // Налог на имущество ~2.2%
    const payrollSavings = payroll * 0.15 * 0.7; // Экономия на взносах
    const customs = data.isImport ? importVal * 0.30 : 0; // Таможня ~30%
    
    const totalYear = vat + profitTax + propertyTax + payrollSavings + customs;
    const total10 = totalYear * 10;

    return { 
      vat, 
      profitTax, 
      propertyTax, 
      payrollSavings, 
      customs, 
      totalYear, 
      total10 
    };
  }, [data.revenue, data.profit, data.payroll, data.property, data.isImport, data.importValue]);

  const handleChange = (field: keyof CalculatorData, value: string | boolean) => {
    if (typeof value === "string") {
      const formatted = formatWithSpaces(value);
      setData(prev => ({ ...prev, [field]: formatted }));
    } else {
      setData(prev => ({ ...prev, [field]: value }));
    }
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const hasData = data.revenue || data.profit || data.payroll || data.property;

  return (
    <motion.div 
      id="tax-calculator"
      className="bg-[#F8FAFC] rounded-2xl p-6 border border-gray-100 shadow-sm sticky top-24"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {/* Заголовок */}
      <div className="flex items-center gap-2 mb-5">
        <Calculator className="w-5 h-5 text-kub-gold" />
        <h3 className="font-bold text-kub-navy font-heading">Калькулятор выгоды</h3>
      </div>

      {/* Сетка: поля слева, результаты справа */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Левая колонка: поля ввода */}
        <div className="space-y-4">
          {[
            { id: "revenue", label: "Годовая выручка (₽)", placeholder: "50 000 000", hint: "Сумма без НДС" },
            { id: "profit", label: "Годовая прибыль (₽)", placeholder: "10 000 000" },
            { id: "payroll", label: "Годовой ФОТ (₽)", placeholder: "20 000 000" },
            { id: "property", label: "Стоимость имущества (₽)", placeholder: "5 000 000" },
          ].map((field) => (
            <div key={field.id}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {field.label}
              </label>
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={data[field.id as keyof CalculatorData] as string}
                onChange={(e) => handleChange(field.id as keyof CalculatorData, e.target.value)}
                placeholder={field.placeholder}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg text-base text-gray-900 placeholder-gray-400 bg-white focus:ring-2 focus:ring-kub-gold/20 focus:border-kub-gold transition-all outline-none"
              />
              {field.hint && (
                <p className="text-xs text-gray-400 mt-1">{field.hint}</p>
              )}
            </div>
          ))}

          {/* Переключатель импорта */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Импортируете оборудование?
            </label>
            <div className="flex gap-4">
              {["yes", "no"].map((val) => (
                <label key={val} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="import"
                    checked={data.isImport === (val === "yes")}
                    onChange={() => handleChange("isImport", val === "yes")}
                    className="w-4 h-4 text-kub-gold border-gray-300 focus:ring-kub-gold"
                  />
                  <span className="text-sm text-gray-700">
                    {val === "yes" ? "Да" : "Нет"}
                  </span>
                </label>
              ))}
            </div>
            <AnimatePresence>
              {data.isImport && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden mt-3"
                >
                  <input
                    type="text"
                    inputMode="numeric"
                    value={data.importValue}
                    onChange={(e) => handleChange("importValue", e.target.value)}
                    placeholder="Стоимость импорта (₽)"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg text-base text-gray-900 placeholder-gray-400 bg-white focus:ring-2 focus:ring-kub-gold/20 focus:border-kub-gold transition-all outline-none"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Правая колонка: результаты */}
        <div className="lg:border-l lg:border-gray-200 lg:pl-6">
          <AnimatePresence mode="wait">
            {!hasData ? (
              <motion.div 
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center h-full text-center py-8"
              >
                <Calculator className="w-12 h-12 text-gray-300 mb-3" />
                <p className="text-sm text-gray-400">
                  Введите данные для расчёта экономии
                </p>
              </motion.div>
            ) : showWarning ? (
              <motion.div
                key="warning"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm flex items-start gap-2"
              >
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>
                  Превышен лимит выручки (&gt;1 млрд ₽) или прибыли (&gt;300 млн ₽). 
                  Льготы Сколково не применимы.
                </span>
              </motion.div>
            ) : results ? (
              <motion.div
                key="results"
                id="calc-results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-3"
              >
                <h4 className="font-bold text-kub-navy font-heading mb-4 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-kub-gold" />
                  Ваша экономия
                </h4>
                
                <div className="space-y-3 text-sm">
                  {[
                    { label: "НДС (22%)", value: results.vat },
                    { label: "Налог на прибыль (20%)", value: results.profitTax },
                    { label: "Налог на имущество (~2.2%)", value: results.propertyTax },
                    { label: "Взносы (экономия ~10.5%)", value: results.payrollSavings },
                    { label: "Таможня (~30%)", value: results.customs, conditional: true },
                  ].map((item, i) => (
                    item.conditional && item.value === 0 ? null : (
                      <div key={i} className="flex justify-between py-2 border-b border-gray-100 last:border-0">
                        <span className="text-gray-600">{item.label}</span>
                        <span className="font-medium text-kub-navy">
                          {formatRub(item.value)}
                        </span>
                      </div>
                    )
                  ))}
                  
                  <div className="flex justify-between py-3 border-t-2 border-kub-gold/30 mt-2">
                    <span className="font-bold text-kub-navy">ИТОГО в год</span>
                    <span className="text-lg font-bold text-kub-gold font-heading">
                      {formatRub(results.totalYear)}
                    </span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="font-bold text-kub-navy">ИТОГО за 10 лет</span>
                    <span className="text-base font-bold text-kub-gold font-heading">
                      {formatRub(results.total10)}
                    </span>
                  </div>
                </div>

                {/* Аккордеон: Инфраструктура */}
                <details className="mt-6 border border-gray-200 rounded-lg overflow-hidden group">
                  <summary className="flex items-center justify-between p-3 bg-gray-50 cursor-pointer text-sm font-medium text-kub-navy list-none">
                    <span className="flex items-center gap-2">
                      <Info size={14} /> Инфраструктура
                    </span>
                    <ChevronDown className="w-4 h-4 transition-transform duration-200 group-open:rotate-180" />
                  </summary>
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <ul className="p-3 space-y-2 text-xs text-gray-600">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3 h-3 text-kub-gold mt-0.5 shrink-0" /> 
                        Льготная аренда в технопарке
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3 h-3 text-kub-gold mt-0.5 shrink-0" /> 
                        Упрощённый ввоз оборудования
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3 h-3 text-kub-gold mt-0.5 shrink-0" /> 
                        Визовая и релокационная поддержка
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3 h-3 text-kub-gold mt-0.5 shrink-0" /> 
                        Доступ к акселераторам и пилотам
                      </li>
                    </ul>
                  </motion.div>
                </details>

                <p className="text-[10px] text-gray-400 mt-4 text-center">
                  ⚠️ Ориентировочный расчёт. Для точной оценки обратитесь к консультанту.
                </p>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}