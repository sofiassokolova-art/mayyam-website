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
          src="/images/hero-phones.jpg"
          alt="Марьям"
          fill
          className="object-cover filter grayscale"
          priority
        />
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full">
        <div className="container-custom h-full">
          <div className="grid lg:grid-cols-12 items-center h-full">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="lg:col-span-7"
            >
              {/* Brand Name */}
              <motion.h1
                variants={itemVariants}
                className="text-[clamp(72px,10vw,160px)] text-white font-extrabold leading-none uppercase tracking-[-0.02em] mb-6"
              >
                МАРЬЯМ
              </motion.h1>

              {/* Role */}
              <motion.h2
                variants={itemVariants}
                className="text-white text-2xl md:text-3xl font-bold mb-6"
              >
                продюсер{" "}
                <span className="font-serif italic">роста</span>{" "}
                <span className="font-script">продаж</span>
              </motion.h2>

              {/* Subline */}
              <motion.p
                variants={itemVariants}
                className="text-muted text-base md:text-lg max-w-xl mb-8"
              >
                Запуски, воронки, маркетинг и рост выручки под ключ
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-3 md:gap-4"
              >
                <button className="btn-capsule bg-ink text-white hover:bg-neutral-800 border-2 border-ink">
                  НА СВЯЗЬ
                </button>
                <button className="btn-capsule border-2 border-white text-white hover:bg-white hover:text-ink">
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
