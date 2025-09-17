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
    <section className="relative overflow-hidden bg-[url('/images/orange-texture-1.png')] bg-cover bg-center" style={{ paddingTop: '80px', paddingBottom: '100px' }}>
      {/* Fashion-журнальный overlay - усиленный для контраста */}
      <div className="absolute inset-0 bg-black/45" />
      
      <div className="container-custom relative z-10">
        {/* Fashion-журнальный заголовок */}
        <div className="text-center mb-20">
          <h2 
            className="text-white font-bold uppercase"
            style={{
              fontFamily: 'var(--font-playfair), serif',
              fontSize: 'clamp(28px, 6vw, 48px)',
              fontWeight: 900,
              letterSpacing: '4px', // журнальный межбуквенный интервал
              lineHeight: '1.2'
            }}
          >
            ПОРТФОЛИО
          </h2>
          <p 
            className="text-white/80 mt-4 italic"
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: 'clamp(14px, 2.5vw, 18px)',
              letterSpacing: '1px'
            }}
          >
            Более 50 готовых успешных кейсов
          </p>
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
                {/* Fashion-журнальная карточка-обложка */}
                <div className="relative h-80 md:h-96 mx-2" 
                     style={{
                       background: 'linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.6) 100%)',
                       backdropFilter: 'blur(10px)'
                     }}>
                  
                  {/* Минималистичный контент */}
                  <div className="absolute inset-0 p-8 flex flex-col justify-between">
                    
                    {/* Метрика - главный журнальный акцент */}
                    <div className="text-left">
                      <h3 className="text-white font-extrabold uppercase leading-none mb-2"
                          style={{
                            fontSize: 'clamp(28px, 7vw, 56px)',
                            fontWeight: 900,
                            fontFamily: 'var(--font-playfair), serif',
                            letterSpacing: '1px'
                          }}>
                        {caseItem.metrics}
                      </h3>
                    </div>
                    
                    {/* Ниша и логотип внизу */}
                    <div className="text-left">
                      <p className="text-white/70 font-serif italic mb-3"
                         style={{
                           fontSize: 'clamp(12px, 2.5vw, 16px)',
                           letterSpacing: '0.5px'
                         }}>
                        <span className="text-lime">{caseItem.keyword}</span>
                        <span className="text-white/60">{caseItem.niche.replace(caseItem.keyword, '')}</span>
                      </p>
                      
                      {/* Минимальный логотип внизу слева */}
                      <div className="w-12 h-12 bg-white/10 backdrop-blur-sm flex items-center justify-center">
                        <div className="w-6 h-6 bg-white/60 rounded-full"></div>
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
