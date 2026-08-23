"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Phone, Mail, MessageCircle, MapPin } from "lucide-react";

const CONTACTS = [
  {
    icon: Phone,
    label: "+7 (XXX) XXX-XX-XX",
    sublabel: "Пн–Пт, 9:00–18:00 МСК",
    href: "tel:+7XXXXXXXXXX",
  },
  {
    icon: Mail,
    label: "info@kub.ru",
    sublabel: "Отвечаем в течение 2 часов",
    href: "mailto:info@kub.ru",
  },
  {
    icon: MessageCircle,
    label: "Telegram / WhatsApp",
    sublabel: "Быстрые ответы, документы",
    href: "https://t.me/kub_consulting",
    external: true,
  },
  {
    icon: MapPin,
    label: "г. Санкт-Петербург, Софийская улица, 8к1с4",
    sublabel: "Вход по предварительной записи",
    href: "https://yandex.ru/maps/2/saint-petersburg/house/sofiyskaya_ulitsa_8k1s4/Z0kYdQ5gSEAHQFtjfXR5cnRgYw==/?ll=30.390149%2C59.883837&z=17.25",
    external: true,
  },
];

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export default function ContactsInfo() {
  return (
    <section className="bg-white py-16 md:py-24">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Левая колонка: Контакты */}
          <div>
            <motion.h2 
              className="text-3xl md:text-4xl font-bold font-heading text-kub-navy tracking-tight mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-5%" }}
              transition={{ duration: 0.5 }}
            >
              Контакты
            </motion.h2>

            <motion.div 
              className="space-y-3"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-5%" }}
            >
              {CONTACTS.map((contact, index) => {
                const Icon = contact.icon;
                return (
                  <motion.a
                    key={index}
                    href={contact.href}
                    target={contact.external ? "_blank" : undefined}
                    rel={contact.external ? "noopener noreferrer" : undefined}
                    variants={fadeInUp}
                    whileHover={{ x: 4, backgroundColor: "rgba(10, 25, 47, 0.03)" }}
                    className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-kub-navy/5 flex items-center justify-center flex-shrink-0 group-hover:bg-kub-gold/10 transition-colors">
                      <Icon className="w-5 h-5 text-kub-gold group-hover:scale-110 transition-transform" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-kub-navy font-medium group-hover:text-kub-gold transition-colors">
                        {contact.label}
                      </p>
                      <p className="text-gray-500 text-sm mt-0.5">
                        {contact.sublabel}
                      </p>
                    </div>
                  </motion.a>
                );
              })}
            </motion.div>

            <motion.p 
              className="text-xs text-gray-400 mt-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              Ответим в течение 2 рабочих часов
            </motion.p>
          </div>

          {/* Правая колонка: Карта (заглушка с ссылкой) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-5%" }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <a 
              href="https://yandex.ru/maps/2/saint-petersburg/house/sofiyskaya_ulitsa_8k1s4/Z0kYdQ5gSEAHQFtjfXR5cnRgYw==/?ll=30.390149%2C59.883837&z=17.25" 
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full h-64 lg:h-80 bg-gray-100 rounded-2xl flex items-center justify-center hover:bg-gray-200 transition-colors group border border-gray-200"
            >
              <div className="text-center px-6">
                <MapPin size={48} className="text-gray-400 mx-auto mb-3 group-hover:text-kub-gold transition-colors" />
                <span className="text-kub-navy font-medium group-hover:text-kub-gold transition-colors">
                  Открыть карту проезда →
                </span>
                <p className="text-gray-500 text-sm mt-2">
                  г. Санкт-Петербург, Софийская ул., 8к1с4
                </p>
              </div>
            </a>
            <p className="text-xs text-gray-400 text-center mt-3">
              Нажмите, чтобы открыть в Яндекс.Картах
            </p>
          </motion.div>

        </div>
      </Container>
    </section>
  );
}