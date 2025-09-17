"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const SimpleManifest = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const principles = [
    {
      title: "Стратегия",
      accent: "хаоса"
    },
    {
      title: "Системность", 
      accent: "случайности"
    },
    {
      title: "Рост",
      accent: "стагнации"
    }
  ];

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
    <section className="bg-paper py-20 md:py-32">
      <div className="container-custom">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.h2
            variants={itemVariants}
            className="text-ink text-2xl md:text-[36px] font-bold uppercase mb-20"
          >
            Манифест
          </motion.h2>

          <motion.div
            variants={containerVariants}
            className="space-y-12 md:space-y-16"
          >
            {principles.map((principle, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="text-center"
              >
                <h3 className="text-ink text-lg md:text-[18px] font-normal leading-[1.8]">
                  <span className="font-bold">{principle.title}</span>
                  {" вместо "}
                  <span className="font-serif italic text-base md:text-[16px] underline decoration-lime decoration-2 underline-offset-4">
                    {principle.accent}
                  </span>
                </h3>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default SimpleManifest;
