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
    <section className="relative overflow-hidden" style={{ backgroundColor: '#FAFAFA', paddingTop: '120px', paddingBottom: '120px' }}>
      <div className="container-custom">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col lg:flex-row items-start"
        >
          {/* Левая колонка - Текст */}
          <motion.div variants={itemVariants} className="flex-1" style={{ marginRight: '60px' }}>
            {/* Заголовок МАНИФЕСТ */}
            <h2
              className="text-ink font-black leading-tight uppercase"
              style={{
                fontFamily: 'var(--font-raleway), sans-serif',
                fontSize: '48px',
                fontWeight: 900,
                marginBottom: '40px',
                letterSpacing: '0.02em',
              }}
            >
              МАНИФЕСТ
            </h2>

            {/* Основной текст */}
            <div 
              className="text-ink"
              style={{
                maxWidth: '500px',
                fontFamily: 'Georgia, serif',
                fontSize: '18px',
                lineHeight: 1.8,
              }}
            >
              <p className="mb-6">
                Я создаю <span className="italic underline-lime">системы роста</span>, которые работают
                вместо хаоса. Для меня важна только <span className="italic underline-lime">выручка</span>,
                измеримая в цифрах. Каждый запуск — это
              </p>
              
              <p>
                <span className="italic underline-lime">стратегия</span>, а не случайность. Я работаю с теми,
                кто готов масштабироваться.
              </p>
            </div>
          </motion.div>

          {/* Правая колонка - Изображение */}
          <motion.div variants={itemVariants} className="relative lg:flex-shrink-0 mt-8 lg:mt-0">
            <div 
              className="relative overflow-hidden"
              style={{
                maxWidth: '500px',
                aspectRatio: '4/5',
              }}
            >
              <Image
                src="/images/phones.png"
                alt="Марьям с телефонами"
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