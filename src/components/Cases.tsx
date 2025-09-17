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
    <section className="relative overflow-hidden bg-[url('/images/orange-texture-1.png')] bg-cover bg-center">
      {/* Белые карточки на оранжевом фоне */}
      <div className="py-20 md:py-32">
        <div className="container-custom">
                      {/* Расширенный контейнер для стрелок */}
                      <div className="relative px-24 md:px-32">
            <motion.div
              ref={ref}
              variants={itemVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="cases-swiper"
            >
            <Swiper
              modules={[Navigation, Autoplay]}
              spaceBetween={24}
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
                  {/* Белая журнальная карточка */}
                  <div 
                    className="bg-white p-8 mx-2 transition-all duration-300 hover:scale-105 hover:shadow-xl group cursor-pointer"
                    style={{
                      minHeight: '280px',
                      borderRadius: '0px', // строго прямоугольная
                      boxShadow: '0 8px 24px rgba(0,0,0,0.15)'
                    }}
                  >
                    <div className="text-center h-full flex flex-col justify-between">
                      
                      {/* Логотип сверху по центру */}
                      <div className="flex justify-center mb-6">
                        <Image
                          src={caseItem.logo}
                          alt={`${caseItem.keyword} logo`}
                          width={60}
                          height={60}
                          className="object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                        />
                      </div>
                      
                      {/* Крупная метрика - главный акцент */}
                      <div className="flex-grow flex items-center justify-center">
                        <h3 
                          className="text-ink font-extrabold uppercase leading-tight"
                          style={{
                            fontSize: 'clamp(20px, 4vw, 32px)',
                            fontWeight: 900,
                            fontFamily: 'var(--font-raleway), sans-serif',
                            letterSpacing: '0.5px'
                          }}
                        >
                          {caseItem.metrics}
                        </h3>
                      </div>
                      
                      {/* Подпись курсивом с лаймовым акцентом */}
                      <div className="mt-6">
                        <p 
                          className="text-neutral-600 font-serif italic"
                          style={{
                            fontSize: 'clamp(14px, 2.5vw, 16px)',
                            letterSpacing: '0.3px'
                          }}
                        >
                          <span className="u-lime-underline text-neutral-800">
                            {caseItem.keyword}
                          </span>
                          <span className="text-neutral-500">
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
        </div>
      </div>
    </section>
  );
};

export default Cases;