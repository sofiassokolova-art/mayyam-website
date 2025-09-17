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
      title: "Анализ и стратегия",
      description: "Глубокое погружение в бизнес, анализ текущих процессов, выявление точек роста и построение стратегии развития."
    },
    {
      number: "02", 
      title: "Внедрение и оптимизация",
      description: "Пошаговая реализация решений, настройка воронок, запуск рекламы, тестирование и оптимизация всех процессов."
    },
    {
      number: "03",
      title: "Масштабирование и рост",
      description: "Автоматизация процессов, масштабирование успешных решений, построение системы устойчивого роста выручки."
    }
  ];

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

  const numberVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <section className="bg-paper section-spacing">
      <div className="container-custom">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-6xl mx-auto"
        >
          <motion.div
            variants={itemVariants}
            className="text-center mb-20"
          >
            <h2 className="text-ink text-4xl md:text-5xl font-extrabold mb-6">
              Мой <span className="font-script text-lime">подход</span>
            </h2>
            <p className="text-muted text-lg md:text-xl max-w-2xl mx-auto">
              Системный подход к росту продаж в три этапа
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-12">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative group"
              >
                {/* Connecting line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-16 left-full w-12 h-0.5 bg-gradient-to-r from-lime/50 to-transparent transform translate-x-0 z-0" />
                )}
                
                <div className="relative z-10 text-center">
                  {/* Number */}
                  <motion.div
                    variants={numberVariants}
                    className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-lime text-ink font-extrabold text-2xl mb-8 group-hover:shadow-glow transition-all duration-300"
                  >
                    {step.number}
                  </motion.div>
                  
                  {/* Content */}
                  <div>
                    <h3 className="text-ink text-2xl font-bold mb-6 group-hover:text-lime transition-colors duration-300">
                      {step.title}
                    </h3>
                    <p className="text-muted leading-relaxed text-lg">
                      {step.description}
                    </p>
                  </div>
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
