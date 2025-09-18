"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const Footer = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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

  return (
    <section className="relative bg-ink py-20 md:py-32">
      <div className="container-custom">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-2xl"
        >
          <motion.h3
            variants={itemVariants}
            className="text-white mb-8"
            style={{
              fontFamily: 'var(--font-raleway), sans-serif',
              fontWeight: 700,
              fontSize: 'clamp(32px, 5vw, 56px)',
            }}
          >
            связаться
          </motion.h3>
          
          <motion.button
            variants={itemVariants}
            className="w-80 h-16 rounded-full bg-lime text-ink font-bold text-lg mb-8 transition-all duration-300 hover:shadow-[0_0_30px_rgba(198,255,0,0.5)] active:scale-[0.98]"
            style={{
              fontFamily: 'var(--font-raleway), sans-serif',
            }}
          >
            Записаться
          </motion.button>
          
          <motion.div variants={itemVariants} className="flex gap-6 mb-8">
            <a href="#" className="text-white hover:text-lime transition-colors duration-200 text-lg">
              Instagram
            </a>
            <a href="#" className="text-white hover:text-lime transition-colors duration-200 text-lg">
              TikTok
            </a>
            <a href="#" className="text-white hover:text-lime transition-colors duration-200 text-lg">
              LinkedIn
            </a>
            <a href="#" className="text-white hover:text-lime transition-colors duration-200 text-lg">
              YouTube
            </a>
          </motion.div>
          
          <motion.p
            variants={itemVariants}
            className="text-neutral-400 text-sm"
            style={{
              fontFamily: 'Helvetica Neue, Arial, sans-serif',
            }}
          >
            © ИП Биктимирова, 2025
          </motion.p>
        </motion.div>
      </div>
      
      {/* Фото-декор в фоне */}
      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-96 h-[600px] opacity-15 -z-10">
        <Image
          src="/images/photo_2025-09-15 18.13.22.jpeg"
          alt="фон CTA"
          width={384}
          height={600}
          className="w-full h-full object-cover object-center"
        />
      </div>
    </section>
  );
};

export default Footer;
