"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle, AlertCircle, MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

type FormData = {
  name: string;
  phone: string;
  type: string;
};

type FormErrors = Partial<FormData>;

export function ServicesAuditForm() {
  const [formData, setFormData] = useState<FormData>({ name: "", phone: "", type: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Сброс ошибки при вводе
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = "Введите имя";
    if (!formData.phone.trim()) newErrors.phone = "Введите телефон";
    if (!formData.type) newErrors.type = "Выберите тип проекта";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    
    // Имитация отправки
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  return (
    <Section className="bg-[#F8FAFC]">
      <Container>
        <motion.div
          className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2">
            
            {/* Левая часть: Контент */}
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <div className="inline-flex w-max bg-kub-gold/10 text-kub-gold text-xs font-bold uppercase tracking-wide px-3 py-1.5 rounded-full mb-6">
                120+ аудитов в месяц • 0 ₽ за первичную оценку
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold font-heading text-kub-navy mb-4 leading-tight">
                Определите точку роста{" "}
                <span className="text-kub-gold">вашего проекта</span>
              </h2>
              
              <p className="text-gray-600 leading-relaxed mb-6">
                Не тратим время на общие консультации. За 15 минут разбираем вашу технологию, 
                финмодель и ОКВЭД. Выдаём конкретный план: какие льготы доступны, сроки, 
                бюджет и ожидаемая экономия. Фиксируем условия в договоре до начала работ.
              </p>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-kub-gold" />
                  <span>Формат: Zoom/Офис</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-kub-gold" />
                  <span>Результат: дорожная карта</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-kub-gold" />
                  <span>NDA до старта</span>
                </div>
              </div>
            </div>

            {/* Правая часть: Форма */}
            <div className="bg-gray-50/80 p-8 md:p-12 border-t md:border-t-0 md:border-l border-gray-100">
              {isSuccess ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center"
                >
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-kub-navy mb-2">Заявка принята!</h3>
                  <p className="text-gray-600">
                    Мы свяжемся с вами в течение 15 минут для согласования времени аудита.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                  {/* Поле Имя */}
                  <div>
                    <input
                      type="text"
                      name="name"
                      placeholder="Ваше имя"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg border bg-white transition-all outline-none ${
                        errors.name 
                          ? "border-red-500 ring-2 ring-red-100" 
                          : "border-gray-200 focus:ring-2 focus:ring-kub-gold/20 focus:border-kub-gold"
                      }`}
                    />
                    {errors.name && (
                      <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                        <AlertCircle size={12} /> {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Поле Телефон */}
                  <div>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Телефон"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg border bg-white transition-all outline-none ${
                        errors.phone 
                          ? "border-red-500 ring-2 ring-red-100" 
                          : "border-gray-200 focus:ring-2 focus:ring-kub-gold/20 focus:border-kub-gold"
                      }`}
                    />
                    {errors.phone && (
                      <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                        <AlertCircle size={12} /> {errors.phone}
                      </p>
                    )}
                  </div>

                  {/* Выбор типа */}
                  <div>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg border bg-white transition-all outline-none appearance-none ${
                        errors.type 
                          ? "border-red-500 ring-2 ring-red-100" 
                          : "border-gray-200 focus:ring-2 focus:ring-kub-gold/20 focus:border-kub-gold text-gray-600"
                      }`}
                    >
                      <option value="" disabled>Тип проекта</option>
                      <option value="skolkovo">Резидентство Сколково</option>
                      <option value="grants">Гранты и субсидии</option>
                      <option value="tax">Налоговые льготы</option>
                      <option value="patents">Патентование</option>
                      <option value="other">Другое</option>
                    </select>
                    {errors.type && (
                      <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                        <AlertCircle size={12} /> {errors.type}
                      </p>
                    )}
                  </div>

                  {/* Кнопка отправки */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 py-3.5 px-6 bg-kub-navy text-white rounded-lg font-semibold hover:bg-[#162A47] transition-all disabled:opacity-70 disabled:cursor-not-allowed mt-2"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="animate-spin h-5 w-5 border-2 border-white/30 border-t-white rounded-full"></span>
                        <span>Отправка...</span>
                      </>
                    ) : (
                      <>
                        <span>Записаться на аудит</span>
                        <Send size={18} />
                      </>
                    )}
                  </button>

                  {/* Telegram Link */}
                  <div className="pt-2 text-center">
                    <a 
                      href="https://t.me/kub_consulting" 
                      target="_blank" 
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-kub-navy transition-colors group"
                    >
                      <MessageCircle size={16} className="group-hover:text-[#229ED9]" />
                      <span>Или напишите нам в Telegram</span>
                    </a>
                  </div>
                </form>
              )}
            </div>

          </div>
        </motion.div>
      </Container>
    </Section>
  );
}