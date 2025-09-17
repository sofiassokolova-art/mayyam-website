"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
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
      metrics: "+182% ВЫРУЧКИ",
      niche: "Beauty D2C",
      keyword: "Beauty"
    },
    {
      id: 2,
      metrics: "×3 ROI",
      niche: "EdTech проект",
      keyword: "EdTech"
    },
    {
      id: 3,
      metrics: "-45% CPL",
      niche: "B2B-продажи",
      keyword: "B2B"
    },
    {
      id: 4,
      metrics: "+500K ВЫРУЧКА",
      niche: "SaaS платформа",
      keyword: "SaaS"
    },
    {
      id: 5,
      metrics: "+250% КОНВЕРСИЯ",
      niche: "Финтех стартап",
      keyword: "Финтех"
    },
    {
      id: 6,
      metrics: "×5 РОСТ",
      niche: "Ретейл сеть",
      keyword: "Ретейл"
    }
  ];

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
      {/* Усиленный overlay для читаемости ~60% */}
      <div className="absolute inset-0 bg-black/60" />

      <div className="container-custom relative z-10">
        {/* Журнальные заголовки */}
        <div className="text-center mb-16">
          <motion.h2
            variants={itemVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
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
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="text-white/80 italic"
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: 'clamp(16px, 3vw, 24px)',
              fontWeight: 300
            }}
          >
            Результаты, которые говорят сами за себя
          </motion.p>
        </div>

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
                {/* Журнальная карточка-факт без рамок */}
                <div 
                  className="text-center py-8 px-4 transition-all duration-300 hover:scale-105 group cursor-pointer"
                  style={{ minHeight: '280px' }}
                >
                  
                  {/* Монохромный логотип вверху */}
                  <div className="flex justify-center mb-6">
                    <div className="w-12 h-12 bg-white/20 flex items-center justify-center transition-opacity duration-300 group-hover:opacity-100" style={{ opacity: '0.6' }}>
                      <div className="w-6 h-6 bg-white/80 rounded-sm"></div>
                    </div>
                  </div>
                  
                  {/* Крупная акцентная метрика */}
                  <h3 
                    className="text-white font-extrabold uppercase leading-tight mb-6"
                    style={{
                      fontSize: 'clamp(28px, 6vw, 48px)',
                      fontWeight: 900,
                      fontFamily: 'var(--font-raleway), sans-serif',
                      letterSpacing: '1px',
                      textShadow: '0 2px 8px rgba(0,0,0,0.5)'
                    }}
                  >
                    {caseItem.metrics}
                  </h3>
                  
                  {/* Подпись курсивом с лаймовым акцентом */}
                  <div className="relative">
                    <p 
                      className="text-white/80 font-serif italic transition-all duration-300"
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
                    
                    {/* Тонкая лаймовая линия под подписью при hover */}
                    <div 
                      className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-lime transition-all duration-300 opacity-0 group-hover:opacity-100"
                      style={{ width: '60%' }}
                    />
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