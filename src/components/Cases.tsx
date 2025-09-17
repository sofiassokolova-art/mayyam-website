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
      {/* Dark overlay for text readability - усиленный */}
      <div className="absolute inset-0 bg-black/35" />
      
      <div className="container-custom relative z-10">
        {/* Подпись к блоку - увеличенная и жирная */}
        <div className="text-center mb-16">
          <h2 
            className="text-white font-bold"
            style={{
              fontFamily: 'var(--font-raleway), sans-serif',
              fontSize: 'clamp(24px, 5vw, 40px)',
              fontWeight: 800
            }}
          >
            Более 50 готовых успешных кейсов
          </h2>
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
                {/* Плиточная карточка с прозрачным чёрным фоном */}
                <div className="text-center space-y-6 p-8 mx-2 backdrop-blur-sm" 
                     style={{
                       backgroundColor: 'rgba(0, 0, 0, 0.4)',
                       borderRadius: '16px',
                       border: '1px solid rgba(255, 255, 255, 0.1)'
                     }}>
                  
                  {/* Logo с подложкой */}
                  <div className="flex justify-center">
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                      <Image
                        src={caseItem.logo}
                        alt={`${caseItem.keyword} logo`}
                        width={80}
                        height={48}
                        className="md:w-[100px] md:h-[60px] object-contain filter brightness-0 invert"
                      />
                    </div>
                  </div>
                  
                  {/* Metrics - максимально крупные, белые, жирные */}
                  <h3 className="text-white font-extrabold uppercase leading-tight"
                      style={{
                        fontSize: 'clamp(24px, 6vw, 48px)',
                        fontWeight: 900,
                        textShadow: '0 2px 4px rgba(0,0,0,0.5)'
                      }}>
                    {caseItem.metrics}
                  </h3>
                  
                  {/* Niche - курсив, мелкий кегль, лаймовые акценты */}
                  <p className="text-neutral-200 font-serif italic"
                     style={{
                       fontSize: 'clamp(12px, 2.5vw, 16px)'
                     }}>
                    <span className="u-lime-underline text-lime">{caseItem.keyword}</span>
                    <span className="text-neutral-300">{caseItem.niche.replace(caseItem.keyword, '')}</span>
                  </p>
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
