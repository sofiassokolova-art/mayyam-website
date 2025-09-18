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
    <section className="relative bg-paper py-20 md:py-32 overflow-hidden">
      <div className="container-custom">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
        >
          {/* Левая колонка - Текст */}
          <motion.div variants={itemVariants} className="space-y-8">
            {/* Заголовок Манифест */}
            <h2
              className="text-ink font-bold leading-tight"
              style={{
                fontFamily: 'Georgia, serif',
                fontSize: 'clamp(24px, 4vw, 32px)',
                fontWeight: 700,
              }}
            >
              Манифест
            </h2>

            {/* Основной текст */}
            <div className="space-y-6">
              <p
                className="text-ink leading-relaxed"
                style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: 'clamp(18px, 2.5vw, 24px)',
                  lineHeight: 1.6,
                }}
              >
                Я создаю <span className="u-lime-highlight italic">системы роста</span>, которые работают
                вместо хаоса. Для меня важна только <span className="u-lime-highlight italic">выручка</span>,
                измеримая в цифрах. Каждый запуск — это
              </p>
              
              <p
                className="text-ink leading-relaxed"
                style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: 'clamp(18px, 2.5vw, 24px)',
                  lineHeight: 1.6,
                }}
              >
                <span className="u-lime-highlight italic">стратегия</span>, а не случайность. Я работаю с теми,
                кто готов масштабироваться.
              </p>
            </div>
          </motion.div>

          {/* Правая колонка - Изображение */}
          <motion.div variants={itemVariants} className="relative">
            <div className="aspect-[3/4] relative overflow-hidden max-w-sm mx-auto lg:mx-0">
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