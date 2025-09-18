"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const Manifest = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
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
    <section className="relative py-16 md:py-24 overflow-hidden" style={{ backgroundColor: '#FAFAFA' }}>
      <div className="container-custom">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-5xl mx-auto"
        >
          {/* Левая колонка - Текст */}
          <motion.div variants={itemVariants} className="space-y-8">
            {/* Заголовок Манифест */}
            <h2
              className="text-ink font-bold uppercase text-center mb-12"
              style={{
                fontFamily: 'var(--font-playfair), serif',
                fontWeight: 900,
                fontSize: 'clamp(36px, 6vw, 64px)',
                letterSpacing: '0.02em'
              }}
            >
              МАНИФЕСТ
            </h2>

            {/* Основной текст */}
            <div className="max-w-md mx-auto text-center">
              <p
                className="text-ink text-base md:text-[18px] leading-[1.8] font-normal"
                style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}
              >
                Я создаю <span className="font-serif italic px-2 py-1 rounded text-ink" style={{backgroundColor: 'rgba(198, 255, 0, 0.15)'}}>системы роста</span>, которые работают
                вместо хаоса. Для меня важна только <span className="font-serif italic px-2 py-1 rounded text-ink" style={{backgroundColor: 'rgba(198, 255, 0, 0.15)'}}>выручка</span>,
                измеримая в цифрах. Каждый запуск — это <span className="font-serif italic px-2 py-1 rounded text-ink" style={{backgroundColor: 'rgba(198, 255, 0, 0.15)'}}>стратегия</span>, а не случайность. Я работаю с теми,
                кто готов масштабироваться.
              </p>
            </div>
          </motion.div>

          {/* Правая колонка - Изображение */}
          <motion.div variants={itemVariants} className="relative">
            <div className="aspect-[2/3] relative overflow-hidden max-w-sm mx-auto">
              <Image
                src="/images/phones.png"
                alt="Maryam with phones"
                fill
                className="object-cover grayscale"
                priority
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Manifest;