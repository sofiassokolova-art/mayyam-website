"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const Manifest = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <section className="relative bg-ink py-20 md:py-32 overflow-hidden">
      {/* Оранжевая текстура фона */}
      <div className="absolute inset-0 -z-10">
        <div 
          className="w-full h-full opacity-20"
          style={{
            background: 'url(/images/telegram-cloud-photo-size-2-5350554559984040323-y.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-orange-600/20 to-orange-800/20" />
      </div>
      
      <div className="container-custom">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-12 md:space-y-16 text-center"
        >
          <motion.h2
            variants={itemVariants}
            className="text-white font-black leading-tight"
            style={{
              fontFamily: 'var(--font-raleway), sans-serif',
              fontSize: 'clamp(32px, 6vw, 64px)',
            }}
          >
            Я строю систему роста под ключ.
          </motion.h2>

          <motion.h2
            variants={itemVariants}
            className="text-lime font-black leading-tight"
            style={{
              fontFamily: 'var(--font-raleway), sans-serif',
              fontSize: 'clamp(28px, 5vw, 56px)',
            }}
          >
            Стратегия вместо хаотичного маркетинга.
          </motion.h2>

          <motion.h2
            variants={itemVariants}
            className="text-white font-black leading-tight"
            style={{
              fontFamily: 'var(--font-raleway), sans-serif',
              fontSize: 'clamp(24px, 4.5vw, 48px)',
            }}
          >
            Выручка — мой главный KPI.
          </motion.h2>
        </motion.div>
      </div>
    </section>
  );
};

export default Manifest;