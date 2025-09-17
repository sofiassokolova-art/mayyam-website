"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const WhoIHelp = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const directions = [
    "Стартапы и новые продукты",
    "Бренды и e-commerce", 
    "EdTech и образовательные проекты",
    "B2B и корпоративные клиенты",
    "Франшизы и сетевой бизнес"
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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
    <section className="bg-paper py-20 md:py-32">
      <div className="container-custom">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-3xl mx-auto text-center"
        >
          <motion.h2
            variants={itemVariants}
            className="text-ink text-3xl md:text-4xl font-extrabold uppercase mb-16"
          >
            Кому помогает Марьям
          </motion.h2>

          <motion.div
            variants={containerVariants}
            className="space-y-8"
          >
            {directions.map((direction, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="text-ink text-xl md:text-2xl font-normal leading-relaxed"
              >
                <span className="font-extrabold text-2xl md:text-3xl mr-4">
                  {index + 1}
                </span>
                {direction}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhoIHelp;
