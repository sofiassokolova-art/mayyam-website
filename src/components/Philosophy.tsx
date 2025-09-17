"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const Philosophy = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.2,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <section className="bg-ink py-32 md:py-40">
      <div className="container-custom">
        <motion.div
          ref={ref}
          variants={itemVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-4xl mx-auto text-center"
        >
          <blockquote className="text-white text-3xl md:text-5xl lg:text-6xl font-bold leading-[1.2] tracking-tight">
            «Я строю системы роста.{" "}
            <span className="block mt-4">
              Моя метрика — выручка»
            </span>
          </blockquote>
          
          <div className="mt-12 md:mt-16">
            <div className="w-24 h-0.5 bg-lime mx-auto mb-6"></div>
            <p className="text-neutral-400 text-lg md:text-xl font-normal">
              Марьям
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Philosophy;
