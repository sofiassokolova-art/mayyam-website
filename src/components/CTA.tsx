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
    hidden: { opacity: 0, y: 20 },
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
    <section id="contact" className="relative bg-ink py-20 md:py-32 overflow-hidden">
      {/* Фото-декор справа */}
      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-96 h-[600px] opacity-15 -z-10">
        <Image
          src="/images/photo_2025-09-15 18.13.22.jpeg"
          alt="фон CTA"
          fill
          className="object-cover object-center"
        />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-2xl"
        >
          <motion.h3
            variants={itemVariants}
            className="text-white text-4xl md:text-6xl font-extrabold mb-8"
            style={{
              fontFamily: 'var(--font-raleway), sans-serif',
            }}
          >
            связаться
          </motion.h3>

          <motion.button
            variants={itemVariants}
            className="btn-capsule bg-lime text-ink h-14 md:h-16 px-10 hover:shadow-glow mb-8"
          >
            Записаться
          </motion.button>

          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-6 mb-8"
          >
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-white hover:text-lime transition-colors duration-200 text-lg"
              >
                {link.name}
              </a>
            ))}
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="text-neutral-400 text-sm"
          >
            © ИП Биктимирова, 2025
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
