"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
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
    <section className="relative h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-main.png"
          alt="Maryam"
          fill
          className="object-cover filter grayscale"
          style={{ objectPosition: '30% center' }}
          priority
        />
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full">
        <div className="container-custom h-full">
          <div className="flex items-end justify-start h-full pb-20">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="max-w-2xl"
            >
              {/* Main title */}
              <motion.h1
                variants={itemVariants}
                className="text-white leading-[0.9] mb-4 md:mb-6"
                style={{
                  fontFamily: 'var(--font-raleway), sans-serif',
                  fontWeight: 800,
                  fontSize: 'clamp(40px,8vw,120px)'
                }}
              >
                Марьям
              </motion.h1>

              {/* Subtitle with role */}
              <motion.h2
                variants={itemVariants}
                className="text-white leading-[1.2] mb-4 md:mb-6 ml-4"
                style={{ 
                  fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
                  fontSize: 'clamp(16px, 3vw, 40px)',
                  fontWeight: 300
                }}
              >
                / продюсер{" "}
                <span className="font-serif italic u-lime-underline">роста</span>{" "}
                продаж /
              </motion.h2>

              {/* Last name */}
              <motion.h1
                variants={itemVariants}
                className="text-white leading-[0.9] mb-6"
                style={{
                  fontFamily: 'var(--font-raleway), sans-serif',
                  fontWeight: 800,
                  fontSize: 'clamp(40px,8vw,120px)'
                }}
              >
                Биктимирова
              </motion.h1>

              {/* Subline - мелкий журнальный комментарий */}
              <motion.p
                variants={itemVariants}
                className="text-neutral-300 mb-8 leading-relaxed max-w-lg"
                style={{ 
                  fontSize: 'clamp(14px, 2.5vw, 18px)',
                  fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif'
                }}
              >
                запуски, воронки, маркетинг и рост выручки под ключ
              </motion.p>

              {/* CTA Buttons - минималистичные */}
              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-3 md:gap-4"
              >
                <button 
                  className="btn-capsule bg-white text-ink hover:bg-neutral-100 border-2 border-white font-medium"
                  style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}
                >
                  НА СВЯЗЬ
                </button>
                <button 
                  className="btn-capsule border-2 border-white text-white hover:bg-white hover:text-ink bg-transparent font-medium"
                  style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}
                >
                  МОЙ ПОДХОД
                </button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
