"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function Page() {
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

  const facts = [
    { number: "56+", label: "проектов" },
    { number: "10+", label: "ниш" },
    { number: "ROI ×3", label: "результат" },
    { number: "+500k", label: "выручка" },
  ];

  const galleryItems = [
    {
      image: "/images/photo_2025-09-15 18.13.22.jpeg",
      caption: "Работаю на стыке маркетинга и продаж"
    },
    {
      image: "/images/portrait-overlay.png", 
      caption: "Верю в системы роста"
    },
    {
      image: "/images/phones.png",
      caption: "Главная метрика — результат"
    }
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* Кнопка "На главную" */}
      <div className="fixed top-8 left-8 z-50">
        <Link
          href="/"
          className="inline-flex items-center justify-center w-32 h-10 bg-white border-2 border-ink text-ink font-bold text-sm uppercase tracking-wider hover:bg-ink hover:text-white transition-all duration-200 rounded-full"
          style={{
            fontFamily: 'var(--font-raleway), sans-serif',
          }}
        >
          На главную
        </Link>
      </div>

      {/* Блок 1 - Заголовок + фото */}
      <section className="min-h-screen bg-white py-16">
        <div className="container-custom h-full flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 w-full items-center">
            {/* Левая часть - Горизонтальная картинка */}
            <div className="lg:col-span-2">
              <div className="aspect-[3/2] relative overflow-hidden">
                <Image
                  src="/images/about-me.jpg"
                  alt="Марьям Биктимирова"
                  fill
                  className="object-cover grayscale"
                  priority
                />
              </div>
            </div>

            {/* Правая часть - Заголовок */}
            <div className="lg:col-span-1 flex items-center justify-center lg:justify-start">
              <motion.h1
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="text-ink font-thin text-center lg:text-left"
                style={{
                  fontFamily: 'var(--font-raleway), sans-serif',
                  fontSize: 'clamp(28px, 5vw, 48px)',
                  letterSpacing: '0.05em',
                  lineHeight: 1.3,
                }}
              >
                Привет,<br />
                <span style={{ fontSize: '28px', fontWeight: 600 }}>я — </span>
                <span className="font-serif italic border-b-2" style={{ borderBottomColor: '#C6FF00', fontSize: '28px', fontWeight: 600 }}>Марьям</span>
              </motion.h1>
            </div>
          </div>
        </div>
      </section>

      {/* Блок 2 - Текст-статья */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-2xl mx-auto px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-8"
          >
            <motion.p
              variants={itemVariants}
              className="text-ink text-base md:text-[18px] leading-[1.8] font-normal text-justify"
              style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}
            >
              Работаю с бизнесом, который готов 
              масштабироваться и измерять результат в цифрах. За 8 лет помогла запустить более 
              50 проектов в разных нишах — от стартапов до корпоративных клиентов.
            </motion.p>

            <motion.blockquote
              variants={itemVariants}
              className="text-center py-8 border-l-4 pl-8"
              style={{ borderLeftColor: '#C6FF00' }}
            >
              <span 
                className="font-serif italic text-ink"
                style={{
                  fontSize: '28px',
                  fontWeight: 600,
                }}
              >
                «Моя метрика — выручка»
              </span>
            </motion.blockquote>

            <motion.p
              variants={itemVariants}
              className="text-ink text-base md:text-[18px] leading-[1.8] font-normal text-justify"
              style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}
            >
              Не верю в хаотичный маркетинг и случайные запуски. Строю систему роста под ключ: 
              от анализа ниши до автоматизации процессов. Каждое решение основано на данных, 
              каждый шаг измеряется конверсиями и ROI.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Блок 3 - Журнальные акценты (факты) */}
      <section className="py-16 bg-neutral-50">
        <div className="max-w-6xl mx-auto px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {facts.map((fact, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="text-center border-r border-neutral-300 last:border-r-0 pr-8 last:pr-0"
              >
                <div
                  className="text-lime font-black mb-2"
                  style={{
                    fontFamily: 'var(--font-raleway), sans-serif',
                    fontSize: 'clamp(32px, 4vw, 48px)',
                  }}
                >
                  {fact.number}
                </div>
                <p
                  className="text-ink uppercase tracking-wider"
                  style={{
                    fontFamily: 'var(--font-raleway), sans-serif',
                    fontSize: '12px',
                    fontWeight: 600,
                  }}
                >
                  {fact.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Блок 4 - Мини-галерея */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-6xl mx-auto px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-12"
          >
            {galleryItems.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="space-y-4"
              >
                <div className="aspect-[4/5] relative overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.caption}
                    fill
                    className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                <p
                  className="text-ink text-center leading-relaxed"
                  style={{
                    fontFamily: 'Georgia, serif',
                    fontSize: '14px',
                    fontStyle: 'italic',
                    lineHeight: 1.6,
                  }}
                >
                  {item.caption}
                </p>
                {/* Тонкая оранжевая черта под каждой картинкой */}
                <div className="w-16 h-0.5 mx-auto" style={{ backgroundColor: '#C6FF00' }}></div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Блок 5 - Call to action */}
      <section className="py-16 bg-white border-t border-neutral-200">
        <div className="max-w-2xl mx-auto text-center px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Link
              href="/#application"
              className="inline-flex items-center justify-center bg-white text-ink border-2 border-ink px-12 py-4 font-bold uppercase tracking-wider transition-all duration-200 rounded-full about-page-button"
              style={{
                fontFamily: 'var(--font-raleway), sans-serif',
                fontSize: '16px',
              }}
            >
              Заполнить анкету
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
