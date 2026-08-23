"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Shield, Stamp, ArrowUp } from "lucide-react";

export default function LicensingNav() {
  const [activeSection, setActiveSection] = useState("hero");
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
      
      // Простая логика определения секции
      const certSection = document.getElementById("cert-section");
      const certTop = certSection?.getBoundingClientRect().top || 0;
      
      if (certTop < window.innerHeight / 2) {
        setActiveSection("cert");
      } else {
        setActiveSection("licenses");
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const scrollToCert = () => document.getElementById("cert-cta")?.scrollIntoView({ behavior: "smooth" });

  return (
    <>
      {/* Desktop Side Nav */}
      <div className="fixed left-4 top-32 hidden lg:flex flex-col gap-4 z-30">
        <a 
          href="#licenses-section" 
          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${activeSection === "licenses" ? "bg-kub-gold text-kub-navy shadow-md" : "text-gray-500 hover:bg-white/50"}`}
        >
          <Shield size={16} /> Лицензии
        </a>
        <a 
          href="#cert-section" 
          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${activeSection === "cert" ? "bg-kub-gold text-kub-navy shadow-md" : "text-gray-500 hover:bg-white/50"}`}
        >
          <Stamp size={16} /> Сертификаты
        </a>
      </div>

      {/* Mobile Sticky Bar */}
      <motion.div 
        className="fixed bottom-0 left-0 right-0 bg-kub-navy text-white py-3 px-4 z-40 md:hidden shadow-[0_-4px_20px_rgba(0,0,0,0.15)]"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 1 }}
      >
        <div className="flex items-center justify-between gap-4">
          <span className="text-sm font-medium">Нужны документы?</span>
          <button 
            onClick={scrollToCert}
            className="bg-kub-gold text-kub-navy font-bold px-4 py-2 rounded-lg hover:bg-[#D4AF37]/90 transition-colors flex items-center gap-2 text-sm whitespace-nowrap"
          >
            Подобрать <ArrowUp size={14} className="rotate-90" />
          </button>
        </div>
      </motion.div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button 
          onClick={scrollToTop}
          className="fixed bottom-20 right-4 md:bottom-8 md:right-8 w-10 h-10 bg-white border border-gray-200 rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-kub-navy z-40"
        >
          <ArrowUp size={18} />
        </button>
      )}
    </>
  );
}