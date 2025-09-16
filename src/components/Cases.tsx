"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const Cases = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const cases = [
    {
      id: 1,
      title: "Beauty D2C",
      metric: "+182%",
      description: "выручка за 60 дней",
      image: "/images/case-1.jpg",
    },
    {
      id: 2,
      title: "EdTech",
      metric: "ROAS ×2.7",
      description: "CPL −28%, LTV +36%",
      image: "/images/case-2.jpg",
    },
    {
      id: 3,
      title: "Retail",
      metric: "CR 31%",
      description: "email 25%",
      image: "/images/case-3.jpg",
    },
    {
      id: 4,
      title: "Accessories",
      metric: "+31%",
      description: "выручка",
      image: "/images/case-4.jpg",
    },
    {
      id: 5,
      title: "Cosmetics",
      metric: "AOV +14%",
      description: "средний чек",
      image: "/images/case-5.jpg",
    },
  ];

  return (
    <section id="cases" className="relative section-padding overflow-hidden">
      {/* Orange texture background */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/orange-texture-1.jpg"
          alt="фон кейсов"
          fill
          className="object-cover bg-center"
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-white text-4xl md:text-5xl font-extrabold uppercase">
            кейсы
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Swiper
            modules={[Autoplay, Navigation]}
            spaceBetween={16}
            slidesPerView={1.05}
            breakpoints={{
              640: {
                slidesPerView: 2.2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 3.2,
                spaceBetween: 24,
              },
            }}
            loop={true}
            autoplay={{
              delay: 2600,
              reverseDirection: true,
              disableOnInteraction: false,
            }}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            className="cases-swiper"
          >
            {cases.map((caseItem) => (
              <SwiperSlide key={caseItem.id}>
                <div className="bg-[#111] rounded-2xl p-5 md:p-6 shadow-soft text-white hover:shadow-lg transition-all duration-300">
                  <div className="aspect-[16/9] w-full mb-4 rounded-xl overflow-hidden">
                    <Image
                      src={caseItem.image}
                      alt={caseItem.title}
                      width={400}
                      height={225}
                      className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-300"
                    />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-2">
                    {caseItem.title}
                  </h3>
                  <div className="text-lime text-3xl md:text-4xl font-extrabold mt-2">
                    {caseItem.metric}
                  </div>
                  <p className="text-sm text-neutral-300 leading-relaxed">
                    {caseItem.description}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation buttons */}
          <div className="flex justify-center gap-4 mt-8">
            <button className="swiper-button-prev w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all duration-200">
              ←
            </button>
            <button className="swiper-button-next w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all duration-200">
              →
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Cases;
