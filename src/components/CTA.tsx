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
    <section id="contact" className="relative bg-paper py-20 md:py-32 overflow-hidden">
      <div className="container-custom">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
        >
          {/* Левая колонка - Изображение */}
          <motion.div variants={itemVariants} className="relative order-2 lg:order-1">
            <div className="aspect-[4/5] relative overflow-hidden">
              <Image
                src="/images/photo_2025-09-15 18.13.22.jpeg"
                alt="Maryam portrait"
                fill
                className="object-cover"
                priority
              />
            </div>
          </motion.div>

          {/* Правая колонка - Контент */}
          <motion.div variants={itemVariants} className="space-y-8 order-1 lg:order-2">
            {/* Заголовок Связаться */}
            <h3
              className="text-ink font-black leading-tight"
              style={{
                fontFamily: 'var(--font-raleway), sans-serif',
                fontSize: 'clamp(32px, 6vw, 64px)',
                letterSpacing: '0.02em',
              }}
            >
              Связаться
            </h3>

            {/* Социальные ссылки */}
            <div className="flex flex-wrap gap-6">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-ink hover:text-ink transition-colors duration-200 underline-lime"
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
              className="text-muted"
              style={{
                fontFamily: 'Georgia, serif',
                fontSize: 'clamp(14px, 2vw, 16px)',
              }}
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