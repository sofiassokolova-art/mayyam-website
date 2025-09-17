"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

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
    },
    {
      id: 5,
      logo: "/logos/logo-placeholder.svg",
      metrics: "+250% КОНВЕРСИЯ",
      niche: "Финтех стартап",
      keyword: "Финтех"
    },
    {
      id: 6,
      logo: "/logos/logo-placeholder.svg",
      metrics: "×5 РОСТ",
      niche: "Ретейл сеть",
      keyword: "Ретейл"
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
      {/* Мягкий overlay для мобиле, усиленный для десктопа */}
      <div className="absolute inset-0 bg-black/20 md:bg-black/45" />
      
      <div className="container-custom relative z-10">
        <motion.div
          ref={ref}
          variants={itemVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="cases-swiper"
        >
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={32}
            slidesPerView={1}
            navigation={true}
            loop={true}
            autoplay={{
              delay: 4500,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 24,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 32,
              },
              1280: {
                slidesPerView: 4,
                spaceBetween: 40,
              },
            }}
            className="pb-16"
          >
            {cases.map((caseItem) => (
              <SwiperSlide key={caseItem.id}>
                {/* Чистая карточка без прозрачности для мобиле */}
                <div className="relative bg-white/95 backdrop-blur-sm rounded-lg mx-2 h-48 md:h-80 md:w-80" 
                     style={{
                       boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                     }}>
                  
                  {/* Минималистичный контент */}
                  <div className="p-6 h-full flex flex-col justify-between text-center">
                    
                    {/* Метрика */}
                    <div>
                      <h3 className="text-ink font-extrabold uppercase leading-tight mb-4"
                          style={{
                            fontSize: 'clamp(18px, 4vw, 28px)',
                            fontWeight: 900,
                            fontFamily: 'var(--font-raleway), sans-serif',
                            letterSpacing: '0.5px'
                          }}>
                        {caseItem.metrics}
                      </h3>
                    </div>
                    
                    {/* Ниша с иконкой под названием */}
                    <div>
                      <p className="text-neutral-600 font-serif italic mb-3 text-sm"
                         style={{
                           letterSpacing: '0.3px'
                         }}>
                        <span className="u-lime-underline text-lime">{caseItem.keyword}</span>
                        <span className="text-neutral-500">{caseItem.niche.replace(caseItem.keyword, '')}</span>
                      </p>
                      
                      {/* Мини-иконка логотипа под названием */}
                      <div className="flex justify-center">
                        <div className="w-6 h-6 bg-neutral-200 rounded-sm flex items-center justify-center">
                          <div className="w-3 h-3 bg-neutral-400 rounded-sm"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
};

export default Cases;
