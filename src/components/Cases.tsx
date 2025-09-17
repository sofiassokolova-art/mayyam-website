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
      title: "E-commerce стартап",
      description: "Увеличили конверсию на 340% за 3 месяца",
      metrics: "ROI 280%",
      image: "/images/case-1.jpg"
    },
    {
      id: 2,
      title: "IT-консалтинг",
      description: "Построили воронку B2B продаж с нуля",
      metrics: "CPL -45%",
      image: "/images/case-2.jpg"
    },
    {
      id: 3,
      title: "Образовательный проект",
      description: "Запустили инфопродукт и вышли на 500К в месяц",
      metrics: "+500K выручка",
      image: "/images/case-3.jpg"
    },
    {
      id: 4,
      title: "Франшиза красоты",
      description: "Системность процессов и рост сети в 3 раза",
      metrics: "×3 рост сети",
      image: "/images/case-4.jpg"
    },
    {
      id: 5,
      title: "SaaS платформа",
      description: "Оптимизировали customer journey и LTV",
      metrics: "LTV +60%",
      image: "/images/case-5.jpg"
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
    <section className="relative section-spacing overflow-hidden bg-[url('/images/orange-texture-1.jpg')] bg-cover bg-center">
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/70" />
      
      <div className="container-custom relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div
            variants={itemVariants}
            className="cases-swiper"
          >
            <Swiper
              modules={[Navigation, Autoplay]}
              spaceBetween={24}
              slidesPerView={1}
              navigation={true}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
              }}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 3,
                },
              }}
              className="pb-16"
            >
              {cases.map((caseItem) => (
                <SwiperSlide key={caseItem.id}>
                  <div className="relative group cursor-pointer">
                    <div className="relative h-[250px] md:h-[500px] rounded-2xl overflow-hidden">
                      <Image
                        src={caseItem.image}
                        alt={caseItem.title}
                        fill
                        className="object-cover object-center transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      
                      {/* Content */}
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <div className="text-white text-sm font-bold mb-2 uppercase tracking-wider">
                          {caseItem.metrics}
                        </div>
                        <h3 className="text-white text-xl font-bold mb-3">
                          {caseItem.title}
                        </h3>
                        <p className="text-neutral-300 text-sm leading-relaxed">
                          {caseItem.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Cases;
