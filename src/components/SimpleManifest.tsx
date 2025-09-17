"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const SimpleManifest = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const manifestText = `Я создаю системы роста, которые работают вместо хаоса. Для меня важна только выручка, измеримая в цифрах. Каждый запуск — это стратегия, а не случайность. Я работаю с теми, кто готов масштабироваться.`;

  const accents = ["системы роста", "выручка", "стратегия"];

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

  const renderStyledText = () => {
    let result = manifestText;
    
    // Стилизация акцентных слов Georgia italic с лайм подчёркиванием
    accents.forEach(accent => {
      const regex = new RegExp(`(${accent})`, 'g');
      result = result.replace(regex, '<span class="font-serif italic u-lime-underline">$1</span>');
    });
    
    return result;
  };

  return (
    <section className="bg-paper" style={{ paddingTop: '120px', paddingBottom: '120px' }}>
      <div className="mx-auto max-w-[1200px] px-5 md:px-20">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 gap-12 md:gap-16 items-center"
        >
          {/* Left column - Text */}
          <motion.div
            variants={itemVariants}
            className="order-2 md:order-1"
          >
            <h2 
              className="text-ink font-bold uppercase mb-12"
              style={{ 
                fontFamily: 'var(--font-raleway), Helvetica Neue, Helvetica, Arial, sans-serif', 
                fontWeight: 600,
                fontSize: 'clamp(20px, 4vw, 28px)'
              }}
            >
              Манифест
            </h2>
            
            <div 
              className="text-ink text-base md:text-[20px] leading-[160%] text-left"
              style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}
              dangerouslySetInnerHTML={{ __html: renderStyledText() }}
            />
          </motion.div>

          {/* Right column - Image */}
          <motion.div
            variants={itemVariants}
            className="order-1 md:order-2 relative h-[400px] md:h-[600px]"
          >
            <Image
              src="/images/hero-main.jpg"
              alt="Maryam portrait"
              fill
              className="object-cover object-center filter grayscale"
              priority
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default SimpleManifest;
