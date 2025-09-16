"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const Approach = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const steps = [
    {
      number: "01",
      title: "Анализ ниши и продукта",
      description: "Исследование целевой аудитории, конкурентов и рыночного потенциала для определения стратегии роста",
    },
    {
      number: "02",
      title: "Построение воронки продаж",
      description: "Создание многоэтапной воронки конверсии с автоматизацией и системой сквозной аналитики",
    },
    {
      number: "03",
      title: "Привлечение и удержание лидов",
      description: "Настройка рекламных кампаний, CRM-системы и стратегии увеличения LTV клиентов",
    },
  ];

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <section id="approach" className="bg-paper section-padding">
      <div className="container-custom">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-4xl"
        >
          <motion.h3
            variants={itemVariants}
            className="text-ink text-4xl md:text-5xl font-extrabold mb-16"
          >
            мой подход
          </motion.h3>

          <div className="space-y-12">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                variants={itemVariants}
                className={`flex items-start gap-8 ${
                  index < steps.length - 1 ? "border-t border-neutral-200 mt-6 pt-6" : ""
                }`}
              >
                <div className="text-lime text-[64px] md:text-[80px] font-extrabold leading-none min-w-[120px]">
                  {step.number}
                </div>
                <div className="flex-1">
                  <h4 className="text-ink text-2xl md:text-3xl font-bold mb-2">
                    {step.title}
                  </h4>
                  <p className="text-muted text-base md:text-lg leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Approach;
