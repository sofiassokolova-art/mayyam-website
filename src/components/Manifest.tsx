"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const Manifest = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const principles = [
    {
      title: "СТРАТЕГИЯ",
      subtitle: "хаоса",
      description: "Каждое действие основано на данных и четком понимании целей"
    },
    {
      title: "РЕЗУЛЬТАТ",
      subtitle: "активности",
      description: "Измеряем эффективность каждого шага и фокусируемся на ROI"
    },
    {
      title: "СИСТЕМНОСТЬ",
      subtitle: "случайности",
      description: "Строим процессы, которые работают без постоянного контроля"
    },
    {
      title: "РОСТ",
      subtitle: "стагнации",
      description: "Постоянное масштабирование и поиск новых точек роста"
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
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const,
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 30 },
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
    <section className="relative bg-ink section-spacing overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 opacity-10 bg-[url('/images/orange-texture-1.jpg')] bg-cover bg-center mix-blend-overlay" />
      
      <div className="container-custom relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-6xl mx-auto"
        >
          <motion.div
            variants={titleVariants}
            className="text-center mb-20"
          >
            <h2 className="text-white text-4xl md:text-6xl font-extrabold uppercase mb-6">
              Манифест <span className="font-serif italic">роста</span>
            </h2>
            <p className="text-neutral-300 text-lg md:text-xl max-w-2xl mx-auto">
              Принципы, которые определяют мой подход к бизнесу
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            {principles.map((principle, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group"
              >
                <div className="relative">
                  {/* Accent line */}
                  <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-white via-white/50 to-transparent group-hover:w-2 transition-all duration-300" />
                  
                  <div className="pl-8">
                    <div className="mb-6">
                      <h3 className="text-white text-3xl md:text-5xl font-extrabold uppercase tracking-tight leading-none mb-4">
                        {principle.title}
                      </h3>
                      <p className="text-white/70 text-xl">
                        вместо <span className="font-serif italic text-neutral-400">{principle.subtitle}</span>
                      </p>
                    </div>
                    
                    <p className="text-neutral-300 leading-relaxed text-lg group-hover:text-white transition-colors duration-300">
                      {principle.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            variants={titleVariants}
            className="text-center mt-20"
          >
            <p className="text-neutral-400 text-lg mb-8">
              Готовы применить эти принципы к вашему бизнесу?
            </p>
            <button className="btn-capsule bg-white text-ink hover:bg-neutral-200 px-12">
              Начать работу
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Manifest;
