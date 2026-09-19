"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, ShieldCheck, X } from "lucide-react";
import Link from "next/link";

export default function ConsentBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const acceptBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setIsMounted(true);
    
    // Проверяем согласие только на клиенте
    if (typeof window !== "undefined") {
      const consent = localStorage.getItem("kub_consent_accepted");
      if (!consent) {
        // Показываем с задержкой, чтобы не мешать первому впечатлению
        const timer = setTimeout(() => setIsVisible(true), 2000);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  // Фокус на кнопке "Принять" при появлении
  useEffect(() => {
    if (isVisible && acceptBtnRef.current) {
      acceptBtnRef.current.focus();
    }
  }, [isVisible]);

  // Закрытие по Esc
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isVisible) {
        e.preventDefault();
        handleAccept();
      }
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isVisible]);

  const handleAccept = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("kub_consent_accepted", "true");
      localStorage.setItem("kub_consent_timestamp", new Date().toISOString());
      
      // TODO: Отправить событие в аналитику
      // if (typeof ym === 'function') {
      //   ym(XXXXXX, 'reachGoal', 'consent_accepted');
      // }
    }
    setIsVisible(false);
  };

  const handleMinimal = () => {
    // Для минимального согласия тоже сохраняем факт (но можно добавить флаг)
    if (typeof window !== "undefined") {
      localStorage.setItem("kub_consent_accepted", "minimal");
      localStorage.setItem("kub_consent_timestamp", new Date().toISOString());
    }
    setIsVisible(false);
  };

  if (!isMounted) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-0 left-0 right-0 bg-kub-navy text-white p-4 md:p-6 z-40 shadow-lg border-t border-white/10"
          role="alertdialog"
          aria-labelledby="consent-title"
          aria-describedby="consent-description"
        >
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
              
              {/* Иконка + Текст */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-0.5">
                    <ShieldCheck className="w-6 h-6 text-kub-gold" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <h3 id="consent-title" className="font-bold font-heading text-white mb-1 flex items-center gap-2">
                      <Cookie className="w-4 h-4 text-kub-gold" aria-hidden="true" />
                      Мы ценим вашу конфиденциальность
                    </h3>
                    <p id="consent-description" className="text-sm text-gray-300 leading-relaxed">
                      Этот сайт использует файлы cookie и обрабатывает персональные данные для улучшения работы и персонализации контента. Продолжая использовать сайт, вы соглашаетесь с нашей{" "}
                      <Link 
                        href="/privacy" 
                        className="text-kub-gold underline hover:text-[#D4AF37] transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Политикой конфиденциальности
                      </Link>
                      .
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      Вы можете отозвать согласие в любой момент, написав на{" "}
                      <a href="mailto:privacy@kub-consult.ru" className="text-kub-gold/80 hover:text-kub-gold underline">
                        privacy@kub-consult.ru
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              {/* Кнопки */}
              <div className="flex flex-col sm:flex-row gap-3 md:gap-2 flex-shrink-0">
                <button
                  ref={acceptBtnRef}
                  onClick={handleAccept}
                  className="w-full sm:w-auto px-5 py-2.5 bg-kub-gold text-kub-navy font-semibold rounded-lg hover:bg-[#D4AF37]/90 transition-all focus:outline-none focus:ring-2 focus:ring-kub-gold focus:ring-offset-2 focus:ring-offset-kub-navy"
                >
                  Принять
                </button>
                <button
                  onClick={handleMinimal}
                  className="w-full sm:w-auto px-5 py-2.5 border border-white/30 text-white font-medium rounded-lg hover:bg-white/10 transition-all focus:outline-none focus:ring-2 focus:ring-white/50"
                >
                  Только необходимые
                </button>
              </div>

              {/* Кнопка закрытия (для мобильных) */}
              <button
                onClick={handleAccept}
                className="md:hidden absolute top-3 right-3 p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                aria-label="Закрыть уведомление"
              >
                <X size={18} className="text-gray-400" />
              </button>

            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}