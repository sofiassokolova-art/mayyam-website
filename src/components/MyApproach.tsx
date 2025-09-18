"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const MyApproach = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2,
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
    <section id="approach" className="bg-paper" style={{ paddingTop: '100px', paddingBottom: '120px' }}>
      <div className="container-custom">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-4xl mx-auto"
        >
          <motion.h2
            variants={itemVariants}
            className="text-ink font-bold uppercase mb-12 text-center"
            style={{
              fontFamily: 'var(--font-playfair), serif',
              fontWeight: 900,
              fontSize: 'clamp(36px, 6vw, 64px)',
              letterSpacing: '0.02em'
            }}
          >
            Мой подход
          </motion.h2>

          <div className="space-y-8 md:space-y-12 text-center">
            <motion.p
              variants={itemVariants}
              className="text-ink text-base md:text-[18px] leading-[1.8] font-normal text-justify"
              style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}
            >
              Начинаю с глубокого <span className="font-serif italic px-2 py-1 rounded" style={{backgroundColor: 'rgba(198, 255, 0, 0.15)'}}>анализа</span> вашего бизнеса. Изучаю текущие процессы, выявляю узкие места и точки роста. 
              Не работаю по шаблонам — каждое решение строится под конкретные задачи и особенности ниши.
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-ink text-base md:text-[18px] leading-[1.8] font-normal text-justify"
              style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}
            >
              Внедряю изменения поэтапно. Сначала запускаем минимальные изменения и тестируем результат. 
              Затем масштабируем успешные решения и корректируем неработающие. Каждый шаг измеряем <span className="font-serif italic px-2 py-1 rounded" style={{backgroundColor: 'rgba(198, 255, 0, 0.15)'}}>метриками</span>.
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-ink text-base md:text-[18px] leading-[1.8] font-normal text-justify"
              style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}
            >
              Строю системы, которые работают без вашего постоянного участия. Автоматизирую процессы, 
              выстраиваю воронки, внедряю инструменты аналитики. Результат — предсказуемый <span className="font-serif italic px-2 py-1 rounded" style={{backgroundColor: 'rgba(198, 255, 0, 0.15)'}}>рост выручки</span> месяц за месяцем.
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MyApproach;
