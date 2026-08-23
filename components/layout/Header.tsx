"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform, useMotionTemplate } from "framer-motion";
import { ChevronDown, Building2, TrendingUp, Percent, FileLock, FileCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import ConsultationModal from "@/components/ui/ConsultationModal";

// ✅ Ссылки ведут на отдельные страницы
const MAIN_LINKS = [
  { label: "Кейсы", href: "/cases" },
  { label: "О компании", href: "/about" },
  { label: "Контакты", href: "/contacts" },
];

const SERVICES_DROPDOWN = [
  { label: "Резидентство Сколково", href: "/services/skolkovo", icon: Building2, description: "Налоги 0%, гранты до 30 млн ₽" },
  { label: "Гранты и субсидии", href: "/services/grants", icon: TrendingUp, description: "Возврат до 100% затрат на R&D" },
  { label: "Займы и Налоговые льготы", href: "/services/tax", icon: Percent, description: "0% на прибыль, займы под 3%" },
  { label: "Патентование и защита ИП", href: "/services/patents", icon: FileLock, description: "Регистрация изобретений за 3 мес." },
  { label: "Лицензирование и сертификация", href: "/services/licensing", icon: FileCheck, description: "Выход на госзакупки" },
];

export function Header() {
  // ✅ ХУКИ ВНУТРИ КОМПОНЕНТА
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // ✅ Модал

  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const servicesButtonRef = useRef<HTMLButtonElement>(null);

  // 🎨 UX: Плавный визуальный переход
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 120], [0, 0.95]);
  const blurAmount = useTransform(scrollY, [0, 120], [0, 16]);
  const borderOpacity = useTransform(scrollY, [0, 120], [0, 0.08]);
  const shadowOpacity = useTransform(scrollY, [0, 120], [0, 0.06]);

  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    return scrollY.on("change", (latest) => setIsScrolled(latest > 90));
  }, [scrollY]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // ✅ Слушатель кастомного события для открытия модала из других компонентов
  useEffect(() => {
    let lastOpenTime = 0;
    
    const handleOpenModal = () => {
      const now = Date.now();
      // Открываем не чаще чем раз в 400ms
      if (now - lastOpenTime > 400) {
        lastOpenTime = now;
        setIsModalOpen(true);
      }
    };
    
    window.addEventListener("openConsultationModal", handleOpenModal as EventListener);
    return () => window.removeEventListener("openConsultationModal", handleOpenModal as EventListener);
  }, []);

  // ✅ Hover логика для десктопа (ВОССТАНОВЛЕНО)
  const handleServicesMouseEnter = () => {
    if (isMobile) return;
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = setTimeout(() => setIsServicesDropdownOpen(true), 200);
  };

  const handleServicesMouseLeave = () => {
    if (isMobile) return;
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = setTimeout(() => setIsServicesDropdownOpen(false), 150);
  };

  const handleServicesClick = (e: React.MouseEvent) => {
    if (isMobile) { e.preventDefault(); setIsServicesDropdownOpen((prev) => !prev); }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node) &&
          servicesButtonRef.current && !servicesButtonRef.current.contains(e.target as Node)) {
        setIsServicesDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = "unset"; };
    }
    document.body.style.overflow = "unset";
  }, [isMobileMenuOpen]);

  const handleServicesKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") { setIsServicesDropdownOpen(false); servicesButtonRef.current?.focus(); }
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); if (isMobile) setIsServicesDropdownOpen((prev) => !prev); }
  };

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 will-change-[background-color,backdrop-filter,border-color,box-shadow]"
        style={{
          backgroundColor: useMotionTemplate`rgba(255, 255, 255, ${bgOpacity})`,
          backdropFilter: useMotionTemplate`blur(${blurAmount}px)`,
          WebkitBackdropFilter: useMotionTemplate`blur(${blurAmount}px)`,
          borderBottomColor: useMotionTemplate`rgba(0, 0, 0, ${borderOpacity})`,
          boxShadow: useMotionTemplate`0 4px 24px rgba(0, 0, 0, ${shadowOpacity})`,
        }}
        role="banner"
      >
        <Container>
          <div className="flex items-center justify-between h-16 md:h-20">
            
            {/* Логотип с анимированной золотой точкой */}
            <Link 
              href="/" 
              className={`relative z-50 text-xl md:text-2xl font-bold tracking-tight font-heading transition-colors duration-500 ${
                isScrolled ? "text-kub-navy" : "text-white"
              }`}
              aria-label="На главную"
            >
              <span className="inline-block transition-opacity duration-500 hover:opacity-60">
                КУБ
              </span>
              {/* ✨ Анимация точки: перелив золота (shimmer) + микро-вращение */}
              <motion.span 
                className="inline-block"
                style={{
                  background: 'linear-gradient(90deg, #B8962E 0%, #F4D87A 45%, #B8962E 55%, #F4D87A 100%)',
                  backgroundSize: '200% 100%',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent',
                  WebkitTextFillColor: 'transparent',
                  display: 'inline-block',
                }}
                animate={{ 
                  backgroundPosition: ['200% 50%', '-200% 50%'],
                  rotate: [0, 0.5, -0.5, 0]
                }}
                transition={{ 
                  backgroundPosition: { duration: 2.5, repeat: Infinity, ease: "linear" },
                  rotate: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                }}
              >
                .
              </motion.span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8" aria-label="Основная навигация">
              <div ref={dropdownRef} className="relative" onMouseEnter={handleServicesMouseEnter} onMouseLeave={handleServicesMouseLeave}>
                <button
                  ref={servicesButtonRef}
                  onClick={handleServicesClick}
                  onKeyDown={handleServicesKeyDown}
                  className={`flex items-center gap-1 text-sm font-medium transition-colors duration-500 py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-kub-gold rounded-lg ${
                    isScrolled ? "text-gray-600 hover:text-kub-navy" : "text-white/80 hover:text-white"
                  }`}
                  aria-haspopup="true"
                  aria-expanded={isServicesDropdownOpen}
                >
                  <span>Услуги</span>
                  <ChevronDown size={16} className={`transition-transform duration-300 ${isServicesDropdownOpen ? "rotate-180" : ""}`} />
                </button>

                <AnimatePresence>
                  {isServicesDropdownOpen && !isMobile && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.98 }}
                      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute top-full left-0 mt-3 w-[280px] bg-white rounded-xl shadow-xl border border-gray-100/60 py-3 z-50"
                    >
                      {SERVICES_DROPDOWN.map((service) => {
                        const Icon = service.icon;
                        return (
                          <Link key={service.href} href={service.href} className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-kub-gold/5 hover:text-kub-navy transition-colors" onClick={() => setIsServicesDropdownOpen(false)}>
                            <Icon size={18} className="text-kub-gold shrink-0" />
                            <div>
                              <div className="font-medium">{service.label}</div>
                              <div className="text-xs text-gray-400 mt-0.5">{service.description}</div>
                            </div>
                          </Link>
                        );
                      })}
                      <div className="my-2 border-t border-gray-100" />
                      <Link href="/services" className="block px-4 py-2 text-sm text-kub-navy font-medium hover:bg-kub-gold/5 transition-colors" onClick={() => setIsServicesDropdownOpen(false)}>
                        Все услуги →
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {MAIN_LINKS.map((link) => (
                <Link key={link.href} href={link.href} className={`text-sm font-medium transition-colors duration-500 relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-kub-gold hover:after:w-full after:transition-all after:duration-300 ${
                  isScrolled ? "text-gray-600 hover:text-kub-navy" : "text-white/80 hover:text-white"
                }`}>
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* CTA & Mobile Toggle */}
            <div className="flex items-center gap-4">
              {/* ✅ Кнопка открывает модал */}
              <button
                onClick={() => setIsModalOpen(true)}
                className="hidden md:inline-flex items-center justify-center px-5 py-2.5 bg-kub-gold text-kub-navy font-semibold rounded-xl hover:bg-[#D4AF37]/90 transition-all shadow-lg shadow-kub-gold/20 cursor-pointer"
              >
                Консультация
              </button>
              
              <button
                onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                className={`md:hidden relative z-50 p-2 -m-2 rounded-lg transition-colors duration-300 ${
                  isScrolled ? "text-kub-navy hover:bg-gray-100" : "text-white hover:bg-white/10"
                }`}
                aria-expanded={isMobileMenuOpen}
                aria-label={isMobileMenuOpen ? "Закрыть меню" : "Открыть меню"}
              >
                <AnimatePresence mode="wait">
                  <motion.svg key={isMobileMenuOpen ? "close" : "menu"} initial={{ opacity: 0, rotate: -15 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 15 }} transition={{ duration: 0.2 }} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {isMobileMenuOpen ? (<><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>) : (<><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></>)}
                  </motion.svg>
                </AnimatePresence>
              </button>
            </div>
          </div>
        </Container>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }} 
              animate={{ height: "auto", opacity: 1 }} 
              exit={{ height: 0, opacity: 0 }} 
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }} 
              className="md:hidden overflow-hidden bg-white border-t border-gray-100"
            >
              <Container className="py-6 flex flex-col gap-2">
                <div className="border-b border-gray-100 pb-4">
                  <button onClick={() => setIsServicesDropdownOpen((prev) => !prev)} className="w-full flex items-center justify-between text-lg font-medium text-kub-navy py-2" aria-expanded={isServicesDropdownOpen}>
                    <span>Услуги</span>
                    <ChevronDown size={20} className={`transition-transform duration-200 ${isServicesDropdownOpen ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence>
                    {isServicesDropdownOpen && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
                        <div className="pt-3 space-y-1 pl-2">
                          {SERVICES_DROPDOWN.map((s) => (
                            <Link key={s.href} href={s.href} onClick={() => { setIsServicesDropdownOpen(false); setIsMobileMenuOpen(false); }} className="block py-2 text-sm text-gray-600 hover:text-kub-gold transition-colors">
                              {s.label}
                            </Link>
                          ))}
                          <Link href="/services" onClick={() => { setIsServicesDropdownOpen(false); setIsMobileMenuOpen(false); }} className="block py-2 text-sm font-medium text-kub-navy">
                            Все услуги →
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                {MAIN_LINKS.map((link) => (
                  <Link key={link.href} href={link.href} onClick={() => setIsMobileMenuOpen(false)} className="block text-lg font-medium text-kub-navy py-3 hover:text-kub-gold transition-colors">
                    {link.label}
                  </Link>
                ))}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  {/* ✅ Мобильная кнопка тоже открывает модал */}
                  <button
                    onClick={() => { setIsModalOpen(true); setIsMobileMenuOpen(false); }}
                    className="w-full py-3 bg-kub-gold text-kub-navy font-semibold rounded-xl hover:bg-[#D4AF37]/90 transition-all"
                  >
                    Бесплатная консультация
                  </button>
                </div>
              </Container>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* ✅ Модал консультации */}
      <ConsultationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}