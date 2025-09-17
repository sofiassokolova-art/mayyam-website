"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const Editorial = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const editorialText = `1 / Стартапы и новые продукты — запуск с нуля, MVP, первые продажи и масштабирование. 2 / Бренды и e-commerce — рост выручки через воронки и CRM. 3 / EdTech и услуги — разработка решений и оптимизация LTV. 4 / B2B и корпоративные клиенты — сложные воронки, длинные циклы продаж. 5 / Франшизы и сети — системность процессов, масштабируемые решения.`;

  const keywords = ["Стартапы", "Бренды", "EdTech", "B2B", "Франшизы"];

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

  const renderEditorialText = () => {
    let result = editorialText;
    
    // Подсветка нумерации
    result = result.replace(/(\d+)\s*\/\s*/g, '<span class="font-bold text-xl">$1 /</span> ');
    
    // Подсветка ключевых слов
    keywords.forEach(keyword => {
      const regex = new RegExp(`(${keyword})`, 'g');
      result = result.replace(regex, '<span class="font-serif italic underline decoration-lime decoration-2 underline-offset-4">$1</span>');
    });
    
    return result;
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
          <motion.div
            variants={itemVariants}
            className="prose prose-xl max-w-none"
          >
            <p 
              className="text-ink text-xl md:text-2xl leading-[150%] font-normal"
              dangerouslySetInnerHTML={{ __html: renderEditorialText() }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Editorial;
