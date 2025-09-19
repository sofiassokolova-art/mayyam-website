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
          className="object-cover filter grayscale md:hover:scale-105 transition-transform duration-700"
          style={{ objectPosition: '40% center' }} // сдвиг правее для мобильной версии
          priority
        />
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full">
        <div className="container-custom h-full px-6 md:px-4">
          <div className="flex items-end justify-start h-full pb-24 md:pb-20">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="max-w-2xl"
            >
              {/* Main title */}
              <motion.h1
                variants={itemVariants}
                className="text-white leading-[0.9] mb-4 md:mb-2 text-left" // выравнивание по левому краю
                style={{
                  fontFamily: 'var(--font-raleway), sans-serif',
                  fontWeight: 800,
                  fontSize: 'clamp(50px,12.6vw,126px)' // увеличен на 5%
                }}
              >
                Марьям
              </motion.h1>

              {/* Last name */}
              <motion.h1
                variants={itemVariants}
                className="text-white leading-[0.9] mb-2 text-left" // выравнивание по левому краю
                style={{
                  fontFamily: 'var(--font-raleway), sans-serif',
                  fontWeight: 800,
                  fontSize: 'clamp(50px,12.6vw,126px)' // увеличен на 5%
                }}
              >
                Биктимирова
              </motion.h1>

              {/* Subtitle with role - перенесен после имени */}
              <motion.h2
                variants={itemVariants}
                className="text-white leading-[1.2] mb-4 text-left" // выравнивание по левому краю
                style={{ 
                  fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
                  fontSize: 'clamp(22px, 5vw, 50px)', // увеличен еще больше
                  fontWeight: 300
                }}
              >
                / продюсер{" "}
                <span className="font-serif italic u-lime-underline">роста</span>{" "}
                продаж /
              </motion.h2>

              {/* Subline - скрыт на мобильных */}
              <motion.p
                variants={itemVariants}
                className="text-neutral-300 mb-8 leading-relaxed max-w-lg hidden md:block"
                style={{ 
                  fontSize: 'clamp(16px, 3vw, 18px)',
                  fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif'
                }}
              >
                запуски, воронки, маркетинг и рост выручки под ключ
              </motion.p>

              {/* CTA Buttons - скрыты на мобильных */}
              <motion.div
                variants={itemVariants}
                className="hidden md:flex flex-col sm:flex-row gap-4 md:gap-4 w-full sm:w-auto"
              >
                <a
                  href="#application"
                  className="btn-capsule bg-white text-ink hover:bg-lime hover:text-ink border-2 border-white transition-all duration-300"
                  style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}
                >
                  НА СВЯЗЬ
                </a>
                <a
                  href="#approach"
                  className="btn-capsule border-2 border-white text-white hover:bg-white hover:text-ink bg-transparent transition-all duration-300"
                  style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}
                >
                  МОЙ ПОДХОД
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
