"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const WhoIHelp = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const fullText = `1 / Стартапы и новые продукты — запуск с нуля, MVP, первые продажи и масштабирование. 2 / Бренды и e-commerce — рост выручки через воронки и CRM. 3 / EdTech и услуги — разработка решений и оптимизация LTV. 4 / B2B и корпоративные клиенты — сложные воронки, длинные циклы продаж. 5 / Франшизы и сети — системность процессов, масштабируемые решения.`;

  const keywords = ["Стартапы", "Бренды", "EdTech", "B2B", "Франшизы"];

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

  const renderStyledText = () => {
    let result = fullText;
    
    // Стилизация нумерации с Raleway Heavy
    result = result.replace(/(\d+)\s*\/\s*/g, '<span style="font-family: var(--font-raleway), sans-serif; font-weight: 900;">$1 /</span> ');
    
    // Стилизация ключевых слов Georgia italic с лайм подчёркиванием
    keywords.forEach(keyword => {
      const regex = new RegExp(`(${keyword})`, 'g');
      result = result.replace(regex, '<span class="font-serif italic u-lime-underline">$1</span>');
    });
    
    return result;
  };

  return (
    <section className="bg-paper py-20 md:py-32">
      <div className="container-custom">
        <motion.div
          ref={ref}
          variants={itemVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-4xl mx-auto"
        >
          {/* Заголовок */}
          <h2 
            className="text-ink uppercase mb-16 text-center"
            style={{
              fontFamily: 'var(--font-raleway), sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(32px, 6vw, 48px)',
              letterSpacing: '0.5px'
            }}
          >
            С кем я работаю?
          </h2>
          
          {/* Журнальный текст */}
          <div className="mx-auto max-w-[900px]">
            <p 
              className="text-ink text-base md:text-[18px] leading-[1.8] text-left md:text-justify font-normal"
              style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}
              dangerouslySetInnerHTML={{ __html: renderStyledText() }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhoIHelp;
