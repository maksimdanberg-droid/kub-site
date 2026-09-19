'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, ShieldCheck, X } from 'lucide-react';
import Link from 'next/link';

export default function ConsentBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const acceptBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setIsMounted(true);
    
    if (typeof window !== 'undefined') {
      // Показываем баннер ТОЛЬКО если записи о согласии ещё нет
      const consent = localStorage.getItem('kub_consent_accepted');
      if (!consent) {
        const timer = setTimeout(() => setIsVisible(true), 1500); // 1.5 сек задержка
        return () => clearTimeout(timer);
      }
    }
  }, []);

  useEffect(() => {
    if (isVisible && acceptBtnRef.current) {
      acceptBtnRef.current.focus();
    }
  }, [isVisible]);

  const handleAccept = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('kub_consent_accepted', 'true');
      localStorage.setItem('kub_consent_timestamp', new Date().toISOString());
      
      // ✅ ДОБАВЛЕНО: Сообщаем AnalyticsScripts, что можно грузить скрипты
      window.dispatchEvent(new Event('consentUpdated'));
    }
    setIsVisible(false);
  };

  const handleMinimal = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('kub_consent_accepted', 'minimal');
      localStorage.setItem('kub_consent_timestamp', new Date().toISOString());
      
      // ✅ ДОБАВЛЕНО: Сообщаем AnalyticsScripts, что выбор сделан (останется в режиме блокировки)
      window.dispatchEvent(new Event('consentUpdated'));
    }
    setIsVisible(false);
  };

  if (!isMounted) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed bottom-0 left-0 right-0 bg-kub-navy text-white p-4 md:p-6 z-50 shadow-lg border-t border-white/10"
          role="alertdialog"
          aria-labelledby="consent-title"
          aria-describedby="consent-description"
        >
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
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
                      Этот сайт использует файлы cookie и обрабатывает персональные данные для улучшения работы. 
                      Продолжая использовать сайт, вы соглашаетесь с нашей{' '}
                      <Link href="/privacy" className="text-kub-gold underline hover:text-[#D4AF37] transition-colors">
                        Политикой конфиденциальности
                      </Link>.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 md:gap-2 flex-shrink-0">
                <button
                  ref={acceptBtnRef}
                  onClick={handleAccept}
                  className="w-full sm:w-auto px-5 py-2.5 bg-kub-gold text-kub-navy font-semibold rounded-lg hover:bg-[#D4AF37]/90 transition-all focus:outline-none focus:ring-2 focus:ring-kub-gold"
                >
                  Принять все
                </button>
                <button
                  onClick={handleMinimal}
                  className="w-full sm:w-auto px-5 py-2.5 border border-white/30 text-white font-medium rounded-lg hover:bg-white/10 transition-all focus:outline-none focus:ring-2 focus:ring-white/50"
                >
                  Только необходимые
                </button>
              </div>

              <button
                onClick={handleMinimal} // Закрытие по крестику приравниваем к "minimal"
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