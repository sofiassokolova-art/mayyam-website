"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const CTA = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const socialLinks = [
    { name: "Instagram", href: "#" },
    { name: "TikTok", href: "#" },
    { name: "LinkedIn", href: "#" },
    { name: "YouTube", href: "#" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2,
      },
    },
  };

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

  return (
    <section id="contact" className="relative min-h-screen flex items-center overflow-hidden" style={{ backgroundColor: '#FAFAFA' }}>
      <div className="w-full">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-2 gap-0 min-h-screen"
        >
          {/* Левая колонка - Изображение */}
          <motion.div variants={itemVariants} className="relative order-1 lg:order-1 flex items-center justify-center p-8">
            <div className="aspect-[3/2] relative overflow-hidden max-w-lg w-full">
              <Image
                src="/images/portrait-overlay.png"
                alt="Maryam portrait"
                fill
                className="object-cover grayscale"
                priority
              />
            </div>
          </motion.div>

          {/* Правая колонка - Контент */}
          <motion.div variants={itemVariants} className="flex flex-col justify-center space-y-12 order-2 lg:order-2 px-8 lg:px-16 py-20">
            {/* Заголовок Связаться */}
            <h3
              className="text-ink font-bold leading-tight uppercase"
              style={{
                fontFamily: 'var(--font-raleway), sans-serif',
                fontSize: 'clamp(32px, 6vw, 64px)',
                fontWeight: 800,
                letterSpacing: '0.05em',
              }}
            >
              СВЯЗАТЬСЯ
            </h3>

            {/* Социальные ссылки */}
            <div className="flex flex-wrap gap-6">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-ink border-b-2 border-lime hover:border-ink transition-colors duration-200"
                  style={{
                    fontFamily: 'Georgia, serif',
                    fontSize: 'clamp(16px, 2.5vw, 20px)',
                  }}
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Копирайт */}
            <p
              className="text-muted text-base md:text-[18px] leading-[1.8] font-normal"
              style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}
            >
              © ИП Биктимирова, 2025
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;