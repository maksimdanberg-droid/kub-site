"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";
import { ReactNode } from "react";

export interface SectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
  delay?: number;
}

export function Section({ children, id, className = "", delay = 0 }: SectionProps) {
  return (
    <motion.section
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-5%" }}
      variants={fadeInUp}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`py-16 md:py-24 ${className}`}
    >
      {children}
    </motion.section>
  );
}