"use client";

import { Phone, Mail, MapPin, Send } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

// VK Icon as custom SVG (not in lucide-react)
const VKIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
    aria-hidden="true"
  >
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 13.36c-.32.48-.72.64-1.2.64-.4 0-.72-.16-1.04-.48-.32-.4-.48-.88-.48-1.36 0-.56.16-1.04.48-1.44.32-.4.72-.64 1.2-.64.4 0 .72.16.96.48.24.32.4.72.4 1.2 0 .56-.16 1.04-.48 1.44-.24.32-.56.48-.96.48h-.08zm-5.28 0c-.32.48-.72.64-1.2.64-.4 0-.72-.16-1.04-.48-.32-.4-.48-.88-.48-1.36 0-.56.16-1.04.48-1.44.32-.4.72-.64 1.2-.64.4 0 .72.16.96.48.24.32.4.72.4 1.2 0 .56-.16 1.04-.48 1.44-.24.32-.56.48-.96.48h-.08zm-1.92-7.2c.24-.32.56-.48.96-.48.48 0 .88.16 1.2.48.32.32.48.72.48 1.2 0 .56-.16 1.04-.48 1.44-.32.4-.72.64-1.2.64-.4 0-.72-.16-.96-.48-.24-.32-.4-.72-.4-1.2 0-.56.16-1.04.48-1.44.24-.32.56-.48.96-.48h-.04zm5.28 0c.24-.32.56-.48.96-.48.48 0 .88.16 1.2.48.32.32.48.72.48 1.2 0 .56-.16 1.04-.48 1.44-.32.4-.72.64-1.2.64-.4 0-.72-.16-.96-.48-.24-.32-.4-.72-.4-1.2 0-.56.16-1.04.48-1.44.24-.32.56-.48.96-.48h-.04z"/>
  </svg>
);

const NAV_LINKS = [
  { label: "Услуги", href: "/services" },
  { label: "О компании", href: "/about" },
  { label: "Кейсы", href: "/cases" },
  { label: "Контакты", href: "/contacts" },
  { label: "Политика конфиденциальности", href: "/privacy" },
];

export default function Footer() {
  return (
    <>
      {/* JSON-LD микроразметка для SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "ООО «КУБ»",
            "legalName": "Общество с ограниченной ответственностью «КУБ»",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Санкт-Петербург",
              "addressCountry": "RU"
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+7-XXX-XXX-XX-XX",
              "contactType": "customer service",
              "email": "info@kub.ru"
            },
            "sameAs": [
              "https://t.me/kub_consulting",
              "https://vk.com/kub_consulting"
            ]
          })
        }}
      />

      <motion.footer
        className="bg-kub-navy text-gray-400"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        role="contentinfo"
      >
        {/* Верхняя часть: 3 колонки */}
        <div className="py-12 md:py-16 border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
              
              {/* Колонка 1: Логотип + Описание + Соцсети (30%) */}
              <div className="md:col-span-4 lg:col-span-3 space-y-5">
                <Link 
                  href="/" 
                  className="inline-block text-2xl font-bold text-white font-heading tracking-tight hover:opacity-80 transition-opacity"
                  aria-label="На главную страницу"
                >
                  КУБ<span className="text-kub-gold">.</span>
                </Link>
                
                <p className="text-sm leading-relaxed">
                  Консалтинг по грантам, резидентству Сколково и налоговым льготам для технологических компаний.
                </p>
                
                {/* Соцсети */}
                <div className="flex items-center gap-3 pt-2">
                  <a
                    href="https://t.me/kub_consulting"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Telegram канал КУБ"
                    className="p-2 rounded-lg text-gray-400 hover:text-white hover:scale-110 transition-all duration-200 hover:shadow-[0_0_0_2px_rgba(212,175,55,0.5)]"
                  >
                    <Send size={20} />
                  </a>
                  <a
                    href="https://vk.com/kub_consulting"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="ВКонтакте КУБ"
                    className="p-2 rounded-lg text-gray-400 hover:text-white hover:scale-110 transition-all duration-200 hover:shadow-[0_0_0_2px_rgba(212,175,55,0.5)]"
                  >
                    <VKIcon className="w-5 h-5" />
                  </a>
                </div>
              </div>

              {/* Колонка 2: Навигация (40%) */}
              <div className="md:col-span-4 lg:col-span-5">
                <p className="text-white font-heading font-semibold mb-4">Навигация</p>
                <nav className="grid grid-cols-1 sm:grid-cols-2 gap-3" aria-label="Основная навигация футера">
                  {NAV_LINKS.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-white transition-colors duration-200 py-1"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </div>

              {/* Колонка 3: Контакты (30%) */}
              <div className="md:col-span-4 lg:col-span-4">
                <p className="text-white font-heading font-semibold mb-4">Контакты</p>
                <address className="not-italic space-y-3 text-sm">
                  <a
                    href="tel:+7XXXXXXXXXX"
                    className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors duration-200 group"
                    aria-label="Позвонить: +7 (XXX) XXX-XX-XX"
                  >
                    <Phone size={16} className="text-kub-gold group-hover:scale-110 transition-transform" />
                    <span>+7 (XXX) XXX-XX-XX</span>
                  </a>
                  
                  <a
                    href="mailto:info@kub.ru"
                    className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors duration-200 group"
                    aria-label="Написать на info@kub.ru"
                  >
                    <Mail size={16} className="text-kub-gold group-hover:scale-110 transition-transform" />
                    <span>info@kub.ru</span>
                  </a>
                  
                  <div className="flex items-start gap-3 text-gray-400">
                    <MapPin size={16} className="text-kub-gold mt-0.5 flex-shrink-0" />
                    <span>г. Санкт-Петербург</span>
                  </div>
                </address>
              </div>

            </div>
          </div>
        </div>

        {/* Нижняя полоса: Юридическая информация */}
        <div className="py-5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-xs">
              
              {/* ИНН / ОГРН */}
              <div className="text-gray-500">
                ООО «КУБ» | ИНН 77XXXXXXXX | ОГРН 1XXXXXXXXXXXXX
              </div>
              
              {/* Копирайт */}
              <div className="text-gray-500 text-center md:text-right">
                © ООО «КУБ», 2026. Все права защищены. Не является офертой.
              </div>
              
            </div>
          </div>
        </div>
      </motion.footer>
    </>
  );
}