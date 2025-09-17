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
      title: "Beauty D2C",
      tag: "Beauty",
      metrics: "+182% ВЫРУЧКИ",
      image: "/images/5b9fdec4-2b86-46ce-b899-303f396b8440.png"
    },
    {
      id: 2,
      title: "EdTech Проект", 
      tag: "EdTech",
      metrics: "+500K ВЫРУЧКА",
      image: "/images/phones.png"
    },
    {
      id: 3,
      title: "SaaS Платформа",
      tag: "SaaS",
      metrics: "+60% LTV",
      image: "/images/portrait-overlay.png"
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
    <section className="relative section-spacing overflow-hidden bg-[url('/images/orange-texture-1.png')] bg-cover bg-center">
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/70" />
      
      <div className="container-custom relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <div className="space-y-0">
            {cases.map((caseItem, index) => (
              <motion.div
                key={caseItem.id}
                variants={itemVariants}
                className="relative w-full aspect-[16/9] md:h-[80vh] group cursor-pointer overflow-hidden"
              >
                <Image
                  src={caseItem.image}
                  alt={caseItem.title}
                  fill
                  className="object-cover object-center filter grayscale group-hover:filter-none transition-all duration-700"
                />
                <div className="absolute inset-0 bg-black/40" />
                
                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-between p-8 md:p-16">
                  {/* Top - Metrics */}
                  <div className="flex justify-start">
                    <h2 className="text-white text-4xl md:text-6xl lg:text-8xl font-extrabold uppercase tracking-tight leading-none">
                      {caseItem.metrics}
                    </h2>
                  </div>
                  
                  {/* Bottom - Title */}
                  <div className="flex justify-end">
                    <p className="text-sm text-neutral-300">
                      <span className="u-lime-underline">{caseItem.tag}</span> {caseItem.title.replace(caseItem.tag, '').trim()}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Cases;
