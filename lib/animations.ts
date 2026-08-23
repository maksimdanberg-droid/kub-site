import { Variants } from "framer-motion";

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40, filter: "blur(4px)" },
  visible: { 
    opacity: 1, 
    y: 0, 
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } 
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

export const hoverScale: Variants = {
  hover: { 
    scale: 1.03, 
    transition: { duration: 0.3, ease: "easeInOut" } 
  },
  tap: { 
    scale: 0.98, 
    transition: { duration: 0.15 } 
  },
};