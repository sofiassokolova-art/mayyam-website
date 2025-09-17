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
    <section id="contact" className="relative bg-ink section-spacing overflow-hidden">
      {/* Background portrait */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/portrait-overlay.png"
          alt="фон CTA"
          fill
          className="object-cover object-center filter grayscale"
          style={{ objectPosition: 'center 30%' }}
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
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
            className="text-white text-4xl md:text-6xl font-extrabold uppercase mb-12"
          >
            связаться
          </motion.h3>

          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-6 mb-8"
          >
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-white hover:text-neutral-300 transition-colors duration-200 text-lg"
              >
                {link.name}
              </a>
            ))}
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="text-neutral-400 text-sm"
          >
            © Марьям, 2025
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
