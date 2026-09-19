'use client'; // ✅ Необходим для AnimatePresence, состояния открытия и обработки кликов

import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Phone, Mail, ShieldCheck, Clock, FileText, Lock, CheckCircle2, ChevronRight 
} from 'lucide-react';
import Link from 'next/link';

type ConsultationModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

// ✅ Константы вынесены: защита от пересоздания при ререндерах, удобство редактирования
const CONTACTS = {
  phone: {
    label: 'Телефон',
    display: '+7 927 064 21 71',
    href: 'tel:+79270642171', // ✅ Формат без пробелов для 100% совместимости с iOS/Android
  },
  email: {
    label: 'Электронная почта',
    display: 'info@kub-consult.ru',
    href: 'mailto:info@kub-consult.ru',
  },
} as const;

const TRUST_ITEMS = [
  { icon: Lock, text: 'NDA по запросу' },
  { icon: Clock, text: 'Ответ в течение 2 часов' },
  { icon: FileText, text: 'Работаем по договору' },
  { icon: ShieldCheck, text: 'Данные не сохраняются' },
] as const;

/**
 * ConsultationModal — модальное окно с безопасным контактным блоком.
 * Не собирает ПДн (нет форм), снижает риски по 152-ФЗ.
 */
export default function ConsultationModal({ isOpen, onClose }: ConsultationModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* ✅ Backdrop: fixed + inset-0 гарантируют перекрытие всего экрана, z-50 держит поверх хедера */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose} // ✅ Закрытие по клику на затемнённый фон
            aria-hidden="true"
          />
          
          {/* ✅ Контейнер центрирования: flex + items-center + justify-center */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              // ✅ pointer-events-auto возвращает кликабельность самой модалке
              className="w-full max-w-2xl rounded-[32px] bg-white p-6 shadow-2xl pointer-events-auto md:p-8"
            >
              {/* Шапка модалки */}
              <div className="mb-6 flex items-start justify-between">
                <div>
                  <div className="mb-2 flex flex-wrap items-center gap-3">
                    <h2 id="modal-title" className="text-2xl font-bold text-slate-900 md:text-3xl">
                      Свяжитесь с нами
                    </h2>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700 ring-1 ring-emerald-200">
                      <ShieldCheck size={12} />
                      Безопасно
                    </span>
                  </div>
                  <p className="max-w-md text-sm leading-relaxed text-slate-600 md:text-base">
                    До подписания договора мы{' '}
                    <span className="font-semibold text-slate-900">
                      не запрашиваем, не храним и не обрабатываем персональные данные.
                    </span>{' '}
                    Для консультации просто позвоните или напишите нам.
                  </p>
                </div>
                
                {/* ✅ Кнопка закрытия */}
                <button
                  onClick={onClose}
                  className="shrink-0 rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
                  aria-label="Закрыть окно"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Карточки контактов */}
              <div className="mb-6 grid gap-3 md:grid-cols-2">
                {Object.entries(CONTACTS).map(([key, contact]) => {
                  const Icon = key === 'phone' ? Phone : Mail;
                  return (
                    <a
                      key={key}
                      href={contact.href}
                      onClick={onClose} // ✅ Закрываем модалку при переходе к звонку/письму
                      className="group flex items-center gap-4 rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-100 transition-all hover:bg-white hover:shadow-md hover:ring-slate-200"
                    >
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-900 text-white transition-colors group-hover:bg-slate-800">
                        <Icon size={20} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-medium text-slate-500">{contact.label}</p>
                        <p className="truncate break-all text-base font-semibold text-slate-900">
                          {contact.display}
                        </p>
                      </div>
                    </a>
                  );
                })}
              </div>

              {/* CTA кнопки */}
              <div className="mb-6 flex flex-col gap-3 sm:flex-row">
                <a
                  href={CONTACTS.phone.href}
                  onClick={onClose}
                  className="flex-1 rounded-xl bg-slate-900 px-6 py-3.5 text-center font-semibold text-white shadow-lg shadow-slate-900/20 transition-all hover:bg-slate-800"
                >
                  Позвонить сейчас
                </a>
                <a
                  href={CONTACTS.email.href}
                  onClick={onClose}
                  className="flex-1 rounded-xl border-2 border-slate-900 px-6 py-3.5 text-center font-semibold text-slate-900 transition-all hover:bg-slate-900 hover:text-white"
                >
                  Написать письмо
                </a>
              </div>

              {/* Блок доверия */}
              <div className="mb-6 grid gap-3 rounded-2xl bg-sky-50 p-4 ring-1 ring-sky-100 sm:grid-cols-2 md:grid-cols-4">
                {TRUST_ITEMS.map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="shrink-0 text-sky-700" />
                    <span className="text-xs font-medium text-slate-700 md:text-sm">{text}</span>
                  </div>
                ))}
              </div>

              {/* Юридический футер */}
              <div className="flex flex-col gap-3 border-t border-slate-100 pt-4 text-xs md:flex-row md:items-center md:justify-between md:text-sm">
                <p className="flex items-start gap-2 text-slate-500">
                  <ShieldCheck size={14} className="mt-0.5 shrink-0 text-slate-400" />
                  Персональные данные обрабатываются только после заключения договора (152-ФЗ).
                </p>
                <Link
                  href="/privacy"
                  onClick={onClose}
                  className="inline-flex items-center gap-1 font-medium text-slate-900 underline-offset-4 hover:underline"
                >
                  Политика конфиденциальности
                  <ChevronRight size={14} />
                </Link>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}