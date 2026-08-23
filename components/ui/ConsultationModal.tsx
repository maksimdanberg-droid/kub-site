"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, Check, Download, Calendar, Lock, Clock, FileText,
  Phone, Mail, ChevronDown, Send
} from "lucide-react";

type ConsultationModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

type ContactType = "phone" | "email";

type FormData = {
  name: string;
  contact: string;
  contactType: ContactType;
  direction: string;
  comment: string;
  consent: boolean;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

const DIRECTIONS = [
  { value: "", label: "Выберите направление" },
  { value: "skolkovo", label: "Резидентство Сколково" },
  { value: "grants", label: "Гранты и субсидии" },
  { value: "tax", label: "Налоговые льготы" },
  { value: "patents", label: "Патентование и защита ИП" },
  { value: "unsure", label: "Не определился" },
];

// Валидация email
const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// Валидация телефона: ровно 11 цифр, начинается с 7
const isValidPhone = (value: string) => {
  const digits = value.replace(/\D/g, "");
  return digits.length === 11 && digits.startsWith("7");
};

// Строгая маска: +7 (XXX) XXX-XX-XX
const formatPhone = (value: string) => {
  let digits = value.replace(/\D/g, "");
  if (digits.length > 0 && digits[0] === "8") digits = "7" + digits.slice(1);
  if (digits.length > 0 && digits[0] !== "7") digits = "7" + digits;
  digits = digits.slice(0, 11);

  let formatted = "+7";
  if (digits.length > 1) formatted += ` (${digits.slice(1, 4)}`;
  if (digits.length >= 5) formatted += `) ${digits.slice(4, 7)}`;
  if (digits.length >= 8) formatted += `-${digits.slice(7, 9)}`;
  if (digits.length >= 10) formatted += `-${digits.slice(9, 11)}`;
  return formatted;
};

export default function ConsultationModal({ isOpen, onClose }: ConsultationModalProps) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    contact: "",
    contactType: "phone",
    direction: "",
    comment: "",
    consent: true,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const modalRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const contactRef = useRef<HTMLInputElement>(null);

  // Блокировка скролла и фокус
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => nameRef.current?.focus(), 100);
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  // Закрытие по Esc
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  // Клик вне модала
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === "contact" && formData.contactType === "phone") {
      const formatted = formatPhone(value);
      setFormData((prev) => ({ ...prev, contact: formatted }));
      requestAnimationFrame(() => {
        if (contactRef.current) {
          const len = contactRef.current.value.length;
          contactRef.current.setSelectionRange(len, len);
        }
      });
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleContactTypeToggle = (type: ContactType) => {
    setFormData((prev) => ({ ...prev, contactType: type, contact: "" }));
    if (errors.contact) setErrors((prev) => ({ ...prev, contact: undefined }));
  };

  const isContactValid = formData.contactType === "phone"
    ? isValidPhone(formData.contact)
    : isValidEmail(formData.contact);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = "Введите имя";
    
    if (formData.contactType === "phone") {
      if (!isValidPhone(formData.contact)) {
        newErrors.contact = "Введите полный номер: +7 (XXX) XXX-XX-XX";
      }
    } else {
      if (!isValidEmail(formData.contact)) {
        newErrors.contact = "Введите корректный email";
      }
    }
    
    if (!formData.direction) newErrors.direction = "Выберите направление";
    if (!formData.consent) newErrors.consent = "Необходимо согласие";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleDownloadTemplate = () => {
    alert("📥 Шаблон финансовой модели будет отправлен на ваш контакт в течение 2 минут.");
  };

  const renderForm = () => (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Имя */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Ваше имя *</label>
        <input
          ref={nameRef}
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Иван Иванов"
          className={`w-full px-4 py-3 border rounded-lg text-base text-gray-900 bg-white placeholder-gray-400 transition-all outline-none ${
            errors.name ? "border-red-500 ring-2 ring-red-100" : "border-gray-300 focus:ring-2 focus:ring-kub-gold/20 focus:border-kub-gold"
          }`}
          autoComplete="name"
        />
        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
      </div>

      {/* Телефон / Email */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Контакты для связи *</label>
        <div className="flex gap-2 mb-2">
          <button type="button" onClick={() => handleContactTypeToggle("phone")}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              formData.contactType === "phone" ? "bg-kub-navy text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}>
            <Phone size={14} /> Телефон
          </button>
          <button type="button" onClick={() => handleContactTypeToggle("email")}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              formData.contactType === "email" ? "bg-kub-navy text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}>
            <Mail size={14} /> Email
          </button>
        </div>
        
        <input
          ref={contactRef}
          type={formData.contactType === "phone" ? "tel" : "email"}
          name="contact"
          value={formData.contact}
          onChange={handleChange}
          placeholder={formData.contactType === "phone" ? "+7 (___) ___-__-__" : "example@company.ru"}
          inputMode={formData.contactType === "phone" ? "numeric" : "email"}
          maxLength={formData.contactType === "phone" ? 18 : undefined}
          className={`w-full px-4 py-3 border rounded-lg text-base text-gray-900 bg-white placeholder-gray-400 transition-all outline-none ${
            errors.contact ? "border-red-500 ring-2 ring-red-100" : "border-gray-300 focus:ring-2 focus:ring-kub-gold/20 focus:border-kub-gold"
          }`}
          autoComplete={formData.contactType === "phone" ? "tel" : "email"}
        />
        {errors.contact && <p className="text-red-500 text-xs mt-1">{errors.contact}</p>}
      </div>

      {/* Направление */}
      <div>
        <label htmlFor="direction" className="block text-sm font-medium text-gray-700 mb-1">Интересующее направление</label>
        <div className="relative">
          <select
            id="direction"
            name="direction"
            value={formData.direction}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-lg text-base appearance-none bg-white text-gray-900 transition-all outline-none cursor-pointer ${
              errors.direction ? "border-red-500 ring-2 ring-red-100" : "border-gray-300 focus:ring-2 focus:ring-kub-gold/20 focus:border-kub-gold"
            }`}
          >
            {DIRECTIONS.map((opt) => (
              <option key={opt.value} value={opt.value} className="bg-white text-gray-900">{opt.label}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
        </div>
        {errors.direction && <p className="text-red-500 text-xs mt-1">{errors.direction}</p>}
      </div>

      {/* Комментарий */}
      <div>
        <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">Комментарий (необязательно)</label>
        <textarea
          id="comment"
          name="comment"
          value={formData.comment}
          onChange={handleChange}
          placeholder="Стадия проекта, ОКВЭД, примерный бюджет..."
          rows={3}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base text-gray-900 bg-white placeholder-gray-400 focus:ring-2 focus:ring-kub-gold/20 focus:border-kub-gold transition-all outline-none resize-none"
        />
      </div>

      {/* Согласие */}
      <label className="flex items-start gap-3 cursor-pointer group">
        <input type="checkbox" name="consent" checked={formData.consent}
          onChange={(e) => setFormData((prev) => ({ ...prev, consent: e.target.checked }))}
          className="mt-1 w-4 h-4 rounded border-gray-300 text-kub-gold focus:ring-kub-gold cursor-pointer" />
        <span className="text-xs text-gray-500 leading-relaxed">
          Согласен на обработку <a href="/privacy" target="_blank" rel="noopener noreferrer" className="text-kub-gold underline hover:text-[#D4AF37]">персональных данных</a> в соответствии с 152-ФЗ
        </span>
      </label>
      {errors.consent && <p className="text-red-500 text-xs -mt-3">{errors.consent}</p>}

      {/* Кнопка */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting || !formData.name.trim() || !isContactValid || !formData.direction || !formData.consent}
          className="w-full flex items-center justify-center gap-2 py-3.5 px-6 bg-kub-gold text-kub-navy rounded-xl font-semibold hover:bg-[#D4AF37]/90 transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-kub-gold/20"
        >
          {isSubmitting ? (
            <><span className="animate-spin h-5 w-5 border-2 border-kub-navy/30 border-t-kub-navy rounded-full" /><span>Отправка...</span></>
          ) : (
            <><Send size={18} /><span>Записаться на консультацию</span></>
          )}
        </button>
      </div>

      <div className="flex items-center justify-center gap-4 pt-2 text-xs text-gray-400">
        <span className="flex items-center gap-1"><Lock size={12} /> NDA</span>
        <span className="flex items-center gap-1"><Clock size={12} /> Ответ за 2 ч</span>
        <span className="flex items-center gap-1"><FileText size={12} /> Договор</span>
      </div>
    </form>
  );

  const renderSuccess = () => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="text-center py-4">
      <div className="mb-6">
        <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
          <span className="text-kub-gold font-medium">✓ Заявка получена</span><span>Выбор слота</span><span>Аудит</span>
        </div>
        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <motion.div className="h-full bg-kub-gold rounded-full" initial={{ width: "33%" }} animate={{ width: "66%" }} transition={{ duration: 0.8, delay: 0.3 }} />
        </div>
      </div>
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <Check className="w-8 h-8 text-green-600" />
      </div>
      <h3 className="text-xl font-bold text-kub-navy mb-2">Заявка принята!</h3>
      <p className="text-gray-600 mb-6">Менеджер свяжется с вами до 18:00 МСК.</p>
      <div className="space-y-3">
        <button onClick={() => alert("📅 Календарь будет доступен после подтверждения")} className="w-full flex items-center justify-center gap-2 py-3 px-6 bg-kub-navy text-white rounded-xl font-semibold hover:bg-[#162A47] transition-all">
          <Calendar size={18} /><span>Выбрать время в календаре</span>
        </button>
        <button onClick={handleDownloadTemplate} className="w-full flex items-center justify-center gap-2 py-3 px-6 border-2 border-kub-gold text-kub-gold rounded-xl font-semibold hover:bg-kub-gold hover:text-kub-navy transition-all">
          <Download size={18} /><span>Скачать шаблон финансовой модели</span>
        </button>
      </div>
      <p className="text-xs text-gray-400 mt-6">Файл будет отправлен на указанный вами контакт</p>
    </motion.div>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] md:block hidden" onClick={handleBackdropClick} aria-hidden="true" />
          <div className="fixed inset-0 z-[101] flex items-center justify-center md:p-4 pointer-events-none">
            <motion.div ref={modalRef} role="dialog" aria-modal="true" aria-labelledby="modal-title"
              initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} transition={{ duration: 0.3, ease: "easeOut" }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 md:mx-0 pointer-events-auto overflow-hidden">
              <div className="flex items-center justify-between p-5 border-b border-gray-100">
                <h2 id="modal-title" className="text-lg font-bold font-heading text-kub-navy">{isSubmitted ? "Заявка отправлена" : "Получить консультацию"}</h2>
                <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100 transition-colors" aria-label="Закрыть">
                  <X size={20} className="text-gray-400 hover:text-gray-600" />
                </button>
              </div>
              <div className="p-5 md:p-6">
                <AnimatePresence mode="wait">{isSubmitted ? renderSuccess() : renderForm()}</AnimatePresence>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}