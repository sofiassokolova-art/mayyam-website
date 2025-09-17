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
    <section className="bg-paper py-20 md:py-32">
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
            className="text-ink text-3xl md:text-4xl font-extrabold uppercase mb-16 text-center"
          >
            Мой подход
          </motion.h2>

          <div className="space-y-8 md:space-y-12">
            <motion.p
              variants={itemVariants}
              className="text-ink text-xl md:text-2xl leading-[1.6] font-normal"
            >
              Начинаю с глубокого анализа вашего бизнеса. Изучаю текущие процессы, выявляю узкие места и точки роста. 
              Не работаю по шаблонам — каждое решение строится под конкретные задачи и особенности ниши.
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-ink text-xl md:text-2xl leading-[1.6] font-normal"
            >
              Внедряю изменения поэтапно. Сначала запускаем минимальные изменения и тестируем результат. 
              Затем масштабируем успешные решения и корректируем неработающие. Каждый шаг измеряем метриками.
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-ink text-xl md:text-2xl leading-[1.6] font-normal"
            >
              Строю системы, которые работают без вашего постоянного участия. Автоматизирую процессы, 
              выстраиваю воронки, внедряю инструменты аналитики. Результат — предсказуемый рост выручки месяц за месяцем.
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MyApproach;
