"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const Cases = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const cases = [
    {
      id: 1,
      logo: "/logos/logo-placeholder.svg",
      metrics: "+182% ВЫРУЧКИ",
      niche: "Beauty D2C",
      keyword: "Beauty"
    },
    {
      id: 2,
      logo: "/logos/logo-placeholder.svg",
      metrics: "×3 ROI",
      niche: "EdTech проект",
      keyword: "EdTech"
    },
    {
      id: 3,
      logo: "/logos/logo-placeholder.svg",
      metrics: "-45% CPL",
      niche: "B2B-продажи",
      keyword: "B2B"
    },
    {
      id: 4,
      logo: "/logos/logo-placeholder.svg",
      metrics: "+500K ВЫРУЧКА",
      niche: "SaaS платформа",
      keyword: "SaaS"
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
    <section className="relative overflow-hidden bg-[url('/images/orange-texture-1.png')] bg-cover bg-center" style={{ paddingTop: '60px', paddingBottom: '80px' }}>
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/20" />
      
      <div className="container-custom relative z-10">
        {/* Подпись к блоку */}
        <div className="text-center mb-16">
          <h2 
            className="text-white font-semibold"
            style={{
              fontFamily: 'var(--font-raleway), sans-serif',
              fontSize: 'clamp(20px, 4vw, 32px)'
            }}
          >
            Более 50 готовых успешных кейсов
          </h2>
        </div>
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-12"
        >
          {cases.map((caseItem) => (
            <motion.div
              key={caseItem.id}
              variants={itemVariants}
              className="text-center space-y-6"
            >
              {/* Logo */}
              <div className="flex justify-center">
                <Image
                  src={caseItem.logo}
                  alt={`${caseItem.keyword} logo`}
                  width={80}
                  height={48}
                  className="md:w-[100px] md:h-[60px] object-contain"
                />
              </div>
              
              {/* Metrics */}
              <h3 className="text-white text-xl md:text-[28px] lg:text-[32px] font-extrabold uppercase leading-tight">
                {caseItem.metrics}
              </h3>
              
              {/* Niche with keyword highlight */}
              <p className="text-white text-sm md:text-base lg:text-[18px] font-serif italic">
                <span className="u-lime-underline">{caseItem.keyword}</span>
                {caseItem.niche.replace(caseItem.keyword, '')}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Cases;
