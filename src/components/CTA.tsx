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
    <section id="contact" className="bg-gradient-to-b from-neutral-50 to-white py-20 md:py-32">
      <div className="container-custom">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left column - Image */}
          <motion.div
            ref={ref}
            variants={itemVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="relative h-[400px] md:h-[500px] overflow-hidden shadow-soft order-2 md:order-1"
          >
            <Image
              src="/images/portrait-overlay.png"
              alt="Maryam portrait"
              fill
              className="object-cover object-center filter grayscale"
            />
          </motion.div>

          {/* Right column - Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="max-w-xl order-1 md:order-2"
          >
            <motion.h3
              variants={itemVariants}
              className="text-ink uppercase mb-8"
              style={{
                fontFamily: 'var(--font-raleway), sans-serif',
                fontWeight: 800,
                fontSize: 'clamp(32px, 6vw, 48px)'
              }}
            >
              Связаться
            </motion.h3>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-6 mb-8"
            >
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-ink hover:text-neutral-600 transition-colors duration-200 text-lg u-lime-underline"
                >
                  {link.name}
                </a>
              ))}
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-neutral-600 text-sm"
            >
              © Марьям, 2025
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
