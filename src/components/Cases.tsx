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
      metrics: "×5 РОСТ",
      niche: "Ритейл сеть",
      keyword: "Ритейл"
    },
    {
      id: 4,
      logo: "/logos/logo-placeholder.svg",
      metrics: "+500K ВЫРУЧКА",
      niche: "SaaS-платформа",
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
      metrics: "-45% CPL",
      niche: "B2B-продажи",
      keyword: "B2B"
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
    <section className="relative py-20 md:py-32 overflow-hidden bg-[url('/images/orange-texture-1.png')] bg-cover bg-center">
      {/* Усиленный overlay для читаемости */}
      <div className="absolute inset-0 bg-black/60" />

      <div className="container-custom relative z-10">
        {/* Заголовки блока */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className="text-white uppercase mb-4"
            style={{
              fontFamily: 'var(--font-raleway), sans-serif',
              fontSize: 'clamp(32px, 7vw, 56px)',
              fontWeight: 900,
              letterSpacing: '0.05em'
            }}
          >
            БОЛЕЕ 50 УСПЕШНЫХ КЕЙСОВ
          </motion.h2>
          
          <motion.p
            variants={itemVariants}
            className="text-white/80 italic"
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: 'clamp(16px, 3vw, 24px)',
              fontWeight: 300
            }}
          >
            Результаты, которые говорят сами за себя
          </motion.p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={itemVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="cases-swiper"
        >
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={40}
            slidesPerView={1}
            navigation={true}
            loop={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 32,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 40,
              },
              1280: {
                slidesPerView: 4,
                spaceBetween: 48,
              },
            }}
            className="pb-16"
          >
            {cases.map((caseItem) => (
              <SwiperSlide key={caseItem.id}>
                {/* Карточка с тёмным полупрозрачным градиентом и hover-эффектами */}
                <div 
                  className="relative p-8 mx-2 transition-all duration-300 hover:scale-105 group cursor-pointer"
                  style={{
                    minHeight: '320px',
                    background: 'linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.5) 100%)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '16px',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                  }}
                >
                  {/* Лёгкая подсветка при hover */}
                  <div 
                    className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
                  />
                  
                  <div className="relative z-10 text-center h-full flex flex-col justify-between">
                    
                    {/* Логотип сверху по центру */}
                    <div className="flex justify-center mb-6">
                      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                        <Image
                          src={caseItem.logo}
                          alt={`${caseItem.keyword} logo`}
                          width={40}
                          height={40}
                          className="object-contain filter brightness-0 invert opacity-80"
                        />
                      </div>
                    </div>
                    
                    {/* Крупная метрика - главный акцент */}
                    <div className="flex-grow flex items-center justify-center">
                      <h3 
                        className="text-white font-extrabold uppercase leading-tight"
                        style={{
                          fontSize: 'clamp(24px, 5vw, 40px)',
                          fontWeight: 900,
                          fontFamily: 'var(--font-raleway), sans-serif',
                          letterSpacing: '1px',
                          textShadow: '0 2px 8px rgba(0,0,0,0.7)'
                        }}
                      >
                        {caseItem.metrics}
                      </h3>
                    </div>
                    
                    {/* Подпись курсивом с лаймовым акцентом */}
                    <div className="mt-6">
                      <p 
                        className="text-white/80 font-serif italic"
                        style={{
                          fontSize: 'clamp(14px, 3vw, 18px)',
                          letterSpacing: '0.5px'
                        }}
                      >
                        <span className="u-lime-underline group-hover:text-lime transition-colors duration-300">
                          {caseItem.keyword}
                        </span>
                        <span className="text-white/60">
                          {caseItem.niche.replace(caseItem.keyword, '')}
                        </span>
                      </p>
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