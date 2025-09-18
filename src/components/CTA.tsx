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
    <section 
      id="contact" 
      className="relative py-20 md:py-32 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #F5F5F5 0%, #FFFFFF 100%)'
      }}
    >
      <div className="container-custom">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-20 items-start"
        >
          {/* Левая колонка - Контент */}
          <motion.div variants={itemVariants} className="lg:col-span-2 space-y-8">
            {/* Заголовок СВЯЗАТЬСЯ */}
            <h3
              className="text-ink font-black leading-tight"
              style={{
                fontFamily: 'var(--font-raleway), sans-serif',
                fontSize: '48px',
                fontWeight: 900,
                letterSpacing: '0.02em',
              }}
            >
              СВЯЗАТЬСЯ
            </h3>

            {/* Социальные ссылки в одну линию */}
            <div className="flex flex-wrap gap-8">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-ink hover:text-ink transition-all duration-200 relative group"
                  style={{
                    fontFamily: 'Georgia, serif',
                    fontSize: '18px',
                  }}
                >
                  {link.name}
                  {/* Лаймовое подчеркивание при наведении */}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-lime transition-all duration-200 group-hover:w-full"></span>
                </a>
              ))}
            </div>

            {/* Копирайт */}
            <p
              className="text-muted"
              style={{
                fontFamily: 'Georgia, serif',
                fontSize: '14px',
              }}
            >
              © ИП Биктимирова, 2025
            </p>
          </motion.div>

          {/* Правая колонка - Изображение */}
          <motion.div variants={itemVariants} className="relative lg:col-span-1">
            <div className="aspect-[3/4] relative overflow-hidden">
              <Image
                src="/images/photo_2025-09-15 18.13.22.jpeg"
                alt="Марьям"
                fill
                className="object-cover grayscale"
                priority
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;