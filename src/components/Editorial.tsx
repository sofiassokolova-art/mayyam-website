"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const Editorial = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const editorialItems = [
    {
      number: "1",
      title: "Стартапы и новые продукты",
      description: "запуск с нуля, MVP, первые продажи и масштабирование"
    },
    {
      number: "2", 
      title: "Готовый бизнес",
      description: "оптимизация воронок, увеличение конверсии, рост выручки"
    },
    {
      number: "3",
      title: "E-commerce и инфопродукты",
      description: "комплексные стратегии продаж и маркетинга"
    },
    {
      number: "4",
      title: "B2B и корпоративные клиенты",
      description: "сложные воронки, длинные циклы продаж"
    },
    {
      number: "5",
      title: "Услуги и консалтинг",
      description: "позиционирование, упаковка экспертности, премиум-сегмент"
    },
    {
      number: "6",
      title: "Франшизы и сети",
      description: "системность процессов, масштабируемые решения"
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
    <section className="bg-paper py-20 md:py-32">
      <div className="container-custom">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-4xl mx-auto"
        >
          <div className="grid md:grid-cols-2 gap-x-16 gap-y-12">
            {editorialItems.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group"
              >
                <div className="flex items-start gap-6">
                  {/* Number */}
                  <div className="flex-shrink-0">
                    <span className="text-4xl md:text-5xl font-extrabold text-ink leading-none">
                      {item.number}
                    </span>
                    <span className="text-4xl md:text-5xl font-extrabold text-ink leading-none ml-1">
                      /
                    </span>
                  </div>
                  
                  {/* Content */}
                  <div className="pt-1">
                    <h3 className="font-serif italic text-xl md:text-2xl text-ink mb-3 leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-muted text-lg leading-[150%] font-normal">
                      {item.description}
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

export default Editorial;
