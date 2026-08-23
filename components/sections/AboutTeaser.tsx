"use client";

import { motion } from "framer-motion";
import { ArrowRight, UserCircle, Building2, Scale, FileText, Shield } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const PARTNERS = [
  { name: "Сколково", icon: Building2 },
  { name: "ФСИ", icon: Scale },
  { name: "Роспатент", icon: FileText },
  { name: "ТПП", icon: Shield },
];

export default function AboutTeaser() {
  return (
    <section className="bg-white py-16 md:py-24">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-center">
          
          {/* Левая колонка: Текст (55%) */}
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            className="md:col-span-7 space-y-6"
          >
            {/* Заголовок */}
            <motion.h2 
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-bold text-kub-navy font-heading tracking-tight"
            >
              Экспертиза вместо обещаний
            </motion.h2>

            {/* Абзацы */}
            <motion.p variants={fadeInUp} className="text-gray-600 leading-relaxed">
              ООО «КУБ» — консалтинг для технологических компаний. Мы не продаём воздух: строим финансовую и правовую защиту ваших разработок. Смета утверждается до заключения договора: в неё ввходит подготовка проекта, подача, настройка учетной политик. Все изменения согласовывываем письменно до выполнения работ.
            </motion.p>
            
            <motion.p variants={fadeInUp} className="text-gray-600 leading-relaxed">
              В штате 12 профильных специалистов: профильные аналитики, патентные поверенные, юристы по госрегулированию, технический писатель. Мы не передаём материалы на аутсорс и не меняем специалистов без вашего согласования. С первого дня предоставляем доступ к личому кабинету с трекингом этапов, сроками и версиями документов.
            </motion.p>
            
            <motion.p variants={fadeInUp} className="text-gray-600 leading-relaxed mb-8">
              Работаем по регламенту, фиксируем сроки в договоре, отвечаем за результат.
            </motion.p>

            {/* CTA */}
            <motion.div variants={fadeInUp}>
              <Button href="/about" variant="primary" className="group">
                Узнать больше о нас
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>

            {/* Микротекст */}
            <motion.p 
              variants={fadeInUp}
              className="text-sm text-gray-400 pt-2 border-t border-gray-100"
            >
              Работаем с 2018 года | Договор и NDA с первого контакта
            </motion.p>

            {/* Партнёры / Аккредитации */}
            <motion.div 
              variants={fadeInUp}
              className="flex flex-wrap items-center gap-6 pt-4"
            >
              {PARTNERS.map((partner) => {
                const Icon = partner.icon;
                return (
                  <motion.div
                    key={partner.name}
                    className="flex items-center gap-2 text-gray-400 opacity-50 hover:opacity-100 hover:text-kub-navy transition-all duration-300 cursor-default"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Icon size={20} strokeWidth={1.5} />
                    <span className="text-sm font-medium">{partner.name}</span>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>

          {/* Правая колонка: Визуал (45%) */}
          <motion.div 
            className="md:col-span-5"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border-2 border-kub-gold/30 bg-gradient-to-br from-kub-navy/5 to-kub-gold/10">
              {/* Заглушка под изображение */}
              <div className="absolute inset-0 flex items-center justify-center">
                <UserCircle className="w-24 h-24 text-kub-navy/20" strokeWidth={1} />
              </div>
              
              {/* Декоративные элементы */}
              <div className="absolute top-6 right-6 w-20 h-20 rounded-full bg-kub-gold/10 blur-2xl" />
              <div className="absolute bottom-8 left-8 w-16 h-16 rounded-full bg-kub-navy/10 blur-xl" />
              
              {/* Подпись / лейбл */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-gray-100 shadow-lg">
                  <p className="text-[10px] text-gray-500 uppercase tracking-wider font-medium">Команда КУБ</p>
                  <p className="text-sm font-semibold text-kub-navy mt-1">12 экспертов в штате</p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </Container>
    </section>
  );
}