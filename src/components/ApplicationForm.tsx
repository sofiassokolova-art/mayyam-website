"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";

const ApplicationForm = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [formData, setFormData] = useState({
    name: "",
    business: "",
    request: "",
    budget: "",
    contacts: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <section 
      id="application" 
      className="bg-white py-24 md:py-32"
      style={{ 
        paddingTop: '120px',
        paddingBottom: '120px'
      }}
    >
      <div className="container-custom">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="relative max-w-4xl mx-auto"
        >
          {/* Fashion-журнальная толстая рамка-контейнер */}
          <div 
            className="relative"
            style={{
              background: 'url(/images/orange-texture-1.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              padding: '60px 60px 80px 60px', // больше снизу для fashion-эффекта
              minHeight: '600px'
            }}
          >
            {/* Белый внутренний контейнер */}
            <div className="bg-white h-full p-12 md:p-16" style={{ minHeight: '480px' }}>
              {/* Fashion-журнальный заголовок */}
              <motion.h3
                variants={itemVariants}
                className="text-ink uppercase text-center mb-3"
                style={{ 
                  fontFamily: 'var(--font-playfair), serif',
                  fontSize: 'clamp(32px, 5vw, 56px)',
                  fontWeight: 900,
                  letterSpacing: '3px',
                  lineHeight: '1.1'
                }}
              >
                АНКЕТА
              </motion.h3>
              
              {/* Подзаголовок как в fashion-журналах */}
              <motion.p
                variants={itemVariants}
                className="text-neutral-600 text-center mb-16 italic"
                style={{ 
                  fontFamily: 'Georgia, serif',
                  fontSize: 'clamp(14px, 2.5vw, 18px)',
                  letterSpacing: '1px'
                }}
              >
                Кастинг на сотрудничество
              </motion.p>

              <motion.form
                variants={itemVariants}
                onSubmit={handleSubmit}
                className="space-y-8"
              >
                {/* Fashion-модульная сетка */}
                
                {/* Поле: Имя */}
                <div>
                  <label htmlFor="name" className="block text-xs font-medium text-neutral-500 mb-3 uppercase tracking-wider">
                    Имя
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-white text-ink border-0 border-b-2 border-neutral-200 px-0 py-4 focus:outline-none focus:border-lime transition-all duration-300 text-lg"
                    style={{ 
                      fontFamily: 'Helvetica Neue, Arial, sans-serif',
                      borderRadius: '0px' // строго прямоугольно
                    }}
                    placeholder="Ваше имя"
                  />
                </div>

                {/* Поле: Ниша / Бизнес */}
                <div>
                  <label htmlFor="business" className="block text-xs font-medium text-neutral-500 mb-3 uppercase tracking-wider">
                    Ниша / Бизнес
                  </label>
                  <input
                    type="text"
                    id="business"
                    name="business"
                    value={formData.business}
                    onChange={handleChange}
                    required
                    className="w-full bg-white text-ink border-0 border-b-2 border-neutral-200 px-0 py-4 focus:outline-none focus:border-lime transition-all duration-300 text-lg"
                    style={{ 
                      fontFamily: 'Helvetica Neue, Arial, sans-serif',
                      borderRadius: '0px'
                    }}
                    placeholder="Опишите ваш бизнес"
                  />
                </div>

                {/* Поле: Основной запрос */}
                <div>
                  <label htmlFor="request" className="block text-xs font-medium text-neutral-500 mb-3 uppercase tracking-wider">
                    Основной запрос
                  </label>
                  <select
                    id="request"
                    name="request"
                    value={formData.request}
                    onChange={handleChange}
                    required
                    className="w-full bg-white text-ink border-0 border-b-2 border-neutral-200 px-0 py-4 focus:outline-none focus:border-lime transition-all duration-300 text-lg"
                    style={{ 
                      fontFamily: 'Helvetica Neue, Arial, sans-serif',
                      borderRadius: '0px'
                    }}
                  >
                    <option value="">Выберите запрос</option>
                    <option value="sales">Продажи</option>
                    <option value="funnel">Воронка</option>
                    <option value="scaling">Масштабирование</option>
                    <option value="launch">Запуск с нуля</option>
                    <option value="optimization">Оптимизация процессов</option>
                  </select>
                </div>

                {/* Поле: Бюджет / готовность к инвестициям */}
                <div>
                  <label htmlFor="budget" className="block text-xs font-medium text-neutral-500 mb-3 uppercase tracking-wider">
                    Бюджет / Инвестиции
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    required
                    className="w-full bg-white text-ink border-0 border-b-2 border-neutral-200 px-0 py-4 focus:outline-none focus:border-lime transition-all duration-300 text-lg"
                    style={{ 
                      fontFamily: 'Helvetica Neue, Arial, sans-serif',
                      borderRadius: '0px'
                    }}
                  >
                    <option value="">Выберите бюджет</option>
                    <option value="50k-200k">50-200 тыс. руб.</option>
                    <option value="200k-500k">200-500 тыс. руб.</option>
                    <option value="500k-1m">500 тыс. - 1 млн руб.</option>
                    <option value="1m+">От 1 млн руб.</option>
                    <option value="discuss">Обсудим индивидуально</option>
                  </select>
                </div>

                {/* Поле: Контакты */}
                <div>
                  <label htmlFor="contacts" className="block text-xs font-medium text-neutral-500 mb-3 uppercase tracking-wider">
                    Контакты (<span className="u-lime-underline">email</span> / <span className="u-lime-underline">telegram</span>)
                  </label>
                  <input
                    type="text"
                    id="contacts"
                    name="contacts"
                    value={formData.contacts}
                    onChange={handleChange}
                    required
                    className="w-full bg-white text-ink border-0 border-b-2 border-neutral-200 px-0 py-4 focus:outline-none focus:border-lime transition-all duration-300 text-lg"
                    style={{ 
                      fontFamily: 'Helvetica Neue, Arial, sans-serif',
                      borderRadius: '0px'
                    }}
                    placeholder="Email или Telegram"
                  />
                </div>

                {/* Fashion-кнопка CTA */}
                <div className="pt-12">
                  <button
                    type="submit"
                    className="w-full bg-ink text-white hover:bg-neutral-800 py-6 px-8 font-bold uppercase tracking-wider transition-all duration-300 border-0"
                    style={{ 
                      fontFamily: 'Helvetica Neue, Arial, sans-serif',
                      fontSize: 'clamp(14px, 2.5vw, 18px)',
                      borderRadius: '0px', // строго прямоугольно
                      letterSpacing: '2px'
                    }}
                  >
                    ДАВАЙТЕ РАБОТАТЬ ВМЕСТЕ
                  </button>
                </div>
              </motion.form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ApplicationForm;