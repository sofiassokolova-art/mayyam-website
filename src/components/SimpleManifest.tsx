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
    
    // Стилизация акцентных слов Georgia italic с прозрачным лаймовым выделением
    accents.forEach(accent => {
      const regex = new RegExp(`(${accent})`, 'g');
      result = result.replace(regex, '<span class="font-serif italic px-2 py-1 rounded" style="background-color: rgba(198, 255, 0, 0.15);">$1</span>');
    });
    
    return result;
  };

  return (
    <section className="relative bg-neutral-50" style={{ paddingTop: '120px', paddingBottom: '120px' }}>
      {/* Цветная полоса сбоку */}
      <div className="absolute left-0 top-0 w-1 h-full bg-lime"></div>
      
      <div className="mx-auto max-w-[1200px] px-5 md:px-20">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 gap-16 items-center"
        >
          {/* Left column - Text */}
          <motion.div
            variants={itemVariants}
            className="order-2 md:order-1 max-w-[500px]"
          >
            <h2 
              className="text-ink uppercase mb-10"
              style={{
                fontFamily: 'var(--font-raleway), sans-serif',
                fontWeight: 800,
                fontSize: 'clamp(32px, 6vw, 48px)',
                letterSpacing: '0.5px'
              }}
            >
              Манифест
            </h2>
            
            <div 
              className="text-ink text-base md:text-[20px] leading-[1.8] text-left max-w-[500px]"
              style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}
              dangerouslySetInnerHTML={{ __html: renderStyledText() }}
            />
          </motion.div>

          {/* Right column - Image */}
          <motion.div
            variants={itemVariants}
            className="order-1 md:order-2 relative h-[400px] md:h-[600px] max-w-[500px] ml-auto"
            style={{ marginLeft: '60px' }}
          >
            <Image
              src="/images/phones.png"
              alt="Maryam with phones"
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
