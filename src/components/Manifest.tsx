"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const Manifest = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const manifestTexts = [
    {
      text: "Я строю систему роста под ключ.",
      isAccent: false,
    },
    {
      text: "СТРАТЕГИЯ вместо хаоса.",
      isAccent: true,
      accentWord: "СТРАТЕГИЯ",
    },
    {
      text: "Выручка — мой главный KPI.",
      isAccent: false,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
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
    <section id="manifest" className="relative bg-black section-padding overflow-hidden">
      {/* Orange texture background */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/orange-texture-2.jpg"
          alt="фон манифеста"
          className="object-cover opacity-20"
          fill
        />
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-orange-600/20" />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center space-y-16"
        >
          {manifestTexts.map((item, index) => (
            <motion.p
              key={index}
              variants={itemVariants}
              className="text-white text-3xl md:text-5xl font-extrabold leading-tight"
            >
              {item.isAccent && item.accentWord ? (
                <>
                  <span className="text-[#C6FF00] font-serif italic">
                    {item.accentWord}
                  </span>{" "}
                  {item.text.replace(item.accentWord, "").trim()}
                </>
              ) : (
                item.text
              )}
            </motion.p>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Manifest;
