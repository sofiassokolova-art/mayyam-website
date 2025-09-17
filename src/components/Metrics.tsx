"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const Metrics = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const metrics = [
    { value: "56+", label: "проектов" },
    { value: "10+", label: "ниш" },
    { value: "×3", label: "ROI до" },
    { value: "−20%", label: "CPL снижение" },
    { value: "+31%", label: "CR / email" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <section id="metrics" className="bg-paper section-spacing">
      <div className="container-custom">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-3 md:grid-cols-5 gap-12 md:gap-16 items-end"
        >
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`text-center ${
                index >= 3 ? "hidden md:block" : ""
              }`}
            >
              <div className="text-lime font-extrabold text-5xl md:text-6xl leading-none">
                {metric.value}
              </div>
              <p className="text-ink text-sm uppercase tracking-[0.12em] mt-2">
                {metric.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Metrics;
