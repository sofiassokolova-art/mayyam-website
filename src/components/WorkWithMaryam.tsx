"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const WorkWithMaryam = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const services = [
    {
      title: "Стартапы и новые продукты",
      description: "Запуск с нуля, MVP, первые продажи и масштабирование"
    },
    {
      title: "Готовый бизнес",
      description: "Оптимизация воронок, увеличение конверсии, рост выручки"
    },
    {
      title: "E-commerce и инфопродукты",
      description: "Комплексные стратегии продаж и маркетинга"
    },
    {
      title: "B2B и корпоративные клиенты",
      description: "Сложные воронки, длинные циклы продаж"
    },
    {
      title: "Услуги и консалтинг",
      description: "Позиционирование, упаковка экспертности, премиум-сегмент"
    },
    {
      title: "Франшизы и сети",
      description: "Системность процессов, масштабируемые решения"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
    <section className="bg-paper section-spacing">
      <div className="container-custom">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-4xl mx-auto"
        >
          <motion.div
            variants={itemVariants}
            className="text-center mb-16"
          >
            <h2 className="text-ink text-4xl md:text-5xl font-extrabold uppercase mb-6">
              С чем работает Марьям
            </h2>
            <p className="text-muted text-lg md:text-xl max-w-2xl mx-auto">
              Помогаю бизнесу любого масштаба — от стартапов до корпораций
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            className="grid md:grid-cols-2 gap-8 space-y-0"
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="p-8 rounded-2xl border border-neutral-200 hover:border-neutral-400 hover:shadow-soft transition-all duration-300 group"
              >
                <h3 className="text-ink text-xl font-bold mb-4 transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-muted leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default WorkWithMaryam;
