"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { CheckCircle2, Lock, Clock, ChevronDown, AlertCircle, ShieldCheck, Download } from "lucide-react";

const ACTIVITIES = ["Медицина", "Промышленность", "IT и связь", "Торговля", "Другое"];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

export default function LicensingFinalCTA() {
  const [formData, setFormData] = useState({ name: "", contact: "", activity: "" });
  const [errors, setErrors] = useState<{ name?: string; contact?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!formData.name.trim()) newErrors.name = "Введите ваше имя";
    if (!formData.contact.trim()) {
      newErrors.contact = "Введите телефон или email";
    } else {
      const isPhone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(formData.contact);
      const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contact);
      if (!isPhone && !isEmail) newErrors.contact = "Некорректный формат телефона или email";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    // Имитация отправки
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
    }, 1200);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [e.target.name]: undefined }));
    }
  };

  return (
    <section className="bg-kub-navy py-16 md:py-24">
      <Container>
        <motion.div
          className="max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl p-6 md:p-8 relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Декоративный элемент фона */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-kub-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

          {success ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-10 relative z-10"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-kub-navy font-heading mb-2">Заявка принята!</h3>
              <p className="text-gray-600 max-w-sm mx-auto">
                Менеджер свяжется с вами в течение 2 часов для уточнения деталей и подготовки аудита.
              </p>
            </motion.div>
          ) : (
            <>
              <div className="text-center mb-6 relative z-10">
                <h2 className="text-2xl md:text-3xl font-bold text-kub-navy font-heading mb-3">
                  Определите, какие лицензии нужны вашему бизнесу
                </h2>
                <p className="text-gray-600 max-w-lg mx-auto text-sm md:text-base">
                  Бесплатный аудит: за 15 минут определим перечень необходимых лицензий, сроки получения и стоимость сопровождения. Не берем денег за консультацию.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="relative z-10">
                <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  {/* Имя */}
                  <motion.div variants={itemVariants} className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">Имя*</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Ваше имя"
                      className={`w-full px-4 py-3 border rounded-lg text-base focus:ring-2 focus:ring-kub-gold focus:border-transparent transition-all outline-none ${
                        errors.name ? "border-red-500 bg-red-50" : "border-gray-200"
                      }`}
                    />
                    {errors.name && <p className="text-red-500 text-xs flex items-center gap-1"><AlertCircle size={12}/> {errors.name}</p>}
                  </motion.div>

                  {/* Контакт */}
                  <motion.div variants={itemVariants} className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">Телефон или Email*</label>
                    <input
                      type="text"
                      name="contact"
                      value={formData.contact}
                      onChange={handleChange}
                      placeholder="+7 (___) ___-__-__ или example@mail.ru"
                      className={`w-full px-4 py-3 border rounded-lg text-base focus:ring-2 focus:ring-kub-gold focus:border-transparent transition-all outline-none ${
                        errors.contact ? "border-red-500 bg-red-50" : "border-gray-200"
                      }`}
                    />
                    {errors.contact && <p className="text-red-500 text-xs flex items-center gap-1"><AlertCircle size={12}/> {errors.contact}</p>}
                  </motion.div>
                </motion.div>

                {/* Вид деятельности */}
                <motion.div variants={itemVariants} initial="hidden" animate="visible" className="space-y-1 mb-5">
                  <label className="text-sm font-medium text-gray-700">Вид деятельности</label>
                  <div className="relative">
                    <select
                      name="activity"
                      value={formData.activity}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg text-base focus:ring-2 focus:ring-kub-gold focus:border-transparent transition-all outline-none appearance-none cursor-pointer pr-10 bg-white"
                    >
                      <option value="">Выберите сферу...</option>
                      {ACTIVITIES.map(act => <option key={act} value={act}>{act}</option>)}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  </div>
                </motion.div>

                {/* Кнопки */}
                <motion.div variants={itemVariants} initial="hidden" animate="visible" className="space-y-3">
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-kub-gold text-kub-navy font-semibold py-3.5 rounded-xl hover:bg-[#D4AF37]/90 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <span className="animate-spin h-5 w-5 border-2 border-kub-navy/30 border-t-kub-navy rounded-full" />
                    ) : (
                      "Пройти аудит"
                    )}
                  </motion.button>
                  <motion.button
                    type="button"
                    onClick={() => alert("📥 Чек-лист будет отправлен на ваш контакт")}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full border-2 border-kub-navy text-kub-navy font-medium py-3 rounded-xl hover:bg-kub-navy hover:text-white transition-all flex items-center justify-center gap-2"
                  >
                    <Download size={16} /> Скачать чек-лист лицензий
                  </motion.button>
                </motion.div>

                {/* Микротекст */}
                <p className="text-xs text-gray-400 text-center mt-4">
                  Ответ в течение 2 часов • NDA • Без обязательств
                </p>

                {/* Микро-доверие */}
                <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-gray-500 mt-3 pt-4 border-t border-gray-100">
                  <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-green-500"/> 200+ полученных лицензий</span>
                  <span className="flex items-center gap-1.5"><ShieldCheck size={14} className="text-kub-navy/50"/> 0 отказов по нашей вине</span>
                  <span className="flex items-center gap-1.5"><Lock size={14}/> Конфиденциально</span>
                  <span className="flex items-center gap-1.5"><Clock size={14}/> Ответ за 2 часа</span>
                </div>
              </form>
            </>
          )}
        </motion.div>
      </Container>
    </section>
  );
}