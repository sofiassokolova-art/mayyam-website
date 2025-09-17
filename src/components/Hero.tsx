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
          alt="Maryam"
          fill
          className="object-cover object-center object-top filter grayscale"
          priority
        />
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full">
        <div className="container-custom h-full">
          <div className="flex items-center justify-start h-full">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="max-w-2xl"
            >
              {/* Brand Name */}
              <motion.h1
                variants={itemVariants}
                className="font-brand text-[clamp(60px,15vw,180px)] text-white leading-[1] uppercase mb-8"
              >
                МАРЬЯМ
              </motion.h1>

              {/* Role */}
              <motion.h2
                variants={itemVariants}
                className="text-white text-xl md:text-2xl font-normal mb-6"
              >
                продюсер{" "}
                <span className="font-serif italic text-lg md:text-xl underline decoration-lime decoration-2 underline-offset-4">роста</span>{" "}
                <span className="font-normal">продаж</span>
              </motion.h2>

              {/* Subline */}
              <motion.p
                variants={itemVariants}
                className="text-neutral-400 text-sm md:text-base max-w-xl mb-8 leading-relaxed"
              >
                запуски, воронки, маркетинг и рост выручки под ключ
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-3 md:gap-4"
              >
                <button className="btn-capsule bg-white text-ink hover:bg-neutral-100 border-2 border-white">
                  НА СВЯЗЬ
                </button>
                <button className="btn-capsule border-2 border-white text-white hover:bg-white hover:text-ink bg-transparent">
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
