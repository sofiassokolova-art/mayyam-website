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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');
    
    try {
      // Имитация отправки формы
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log("Form submitted:", formData);
      setSubmitStatus('success');
      
      // Очистить форму
      setFormData({
        name: "",
        business: "",
        request: "",
        budget: "",
        contacts: "",
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
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
      className="relative py-24 md:py-32 bg-[url('/images/orange-texture-1.png')] bg-cover bg-center"
      style={{ 
        paddingTop: '120px',
        paddingBottom: '120px'
      }}
    >
      {/* Полупрозрачный overlay для лучшей читаемости */}
      <div className="absolute inset-0 bg-black/20" />
      
      <div className="container-custom relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="relative max-w-6xl mx-auto"
        >
          {/* Строгая прямоугольная форма с оранжевой рамкой */}
          <div 
            className="relative bg-white p-8 md:p-16 shadow-lg" 
            style={{ 
              border: '40px solid transparent',
              backgroundImage: 'url(/images/orange-texture-1.png), linear-gradient(white, white)',
              backgroundOrigin: 'border-box, padding-box',
              backgroundClip: 'border-box, padding-box',
              minHeight: '400px'
            }}
          >
            {/* Заголовок */}
            <motion.h3
              variants={itemVariants}
              className="text-ink uppercase text-center mb-12"
              style={{ 
                fontFamily: 'var(--font-raleway), sans-serif',
                fontSize: 'clamp(24px, 6vw, 32px)',
                fontWeight: 800,
                letterSpacing: '2px'
              }}
            >
              СОТРУДНИЧЕСТВО
            </motion.h3>

            <motion.form
              variants={itemVariants}
              onSubmit={handleSubmit}
              className="space-y-8"
            >
              {/* Первая строка: Имя | Ниша/Бизнес | Основной запрос */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
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
                    className="w-full bg-white text-ink border border-neutral-300 px-4 py-3 focus:outline-none focus:border-lime transition-all duration-300 text-base"
                    style={{ 
                      fontFamily: 'Helvetica Neue, Arial, sans-serif',
                      borderRadius: '0px'
                    }}
                    placeholder="Ваше имя"
                  />
                </div>

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
                    className="w-full bg-white text-ink border border-neutral-300 px-4 py-3 focus:outline-none focus:border-lime transition-all duration-300 text-base"
                    style={{ 
                      fontFamily: 'Helvetica Neue, Arial, sans-serif',
                      borderRadius: '0px'
                    }}
                    placeholder="Опишите ваш бизнес"
                  />
                </div>

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
                    className="w-full bg-white text-ink border border-neutral-300 px-4 py-3 focus:outline-none focus:border-lime transition-all duration-300 text-base"
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
              </div>

              {/* Вторая строка: Бюджет | Контакты */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                <div>
                  <label htmlFor="budget" className="block text-xs font-medium text-neutral-500 mb-3 uppercase tracking-wider">
                    Бюджет
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    required
                    className="w-full bg-white text-ink border border-neutral-300 px-4 py-3 focus:outline-none focus:border-lime transition-all duration-300 text-base"
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
                    className="w-full bg-white text-ink border border-neutral-300 px-4 py-3 focus:outline-none focus:border-lime transition-all duration-300 text-base"
                    style={{ 
                      fontFamily: 'Helvetica Neue, Arial, sans-serif',
                      borderRadius: '0px'
                    }}
                    placeholder="Email или Telegram"
                  />
                </div>
              </div>

              {/* Кнопка по центру внизу на всю ширину */}
              <div className="pt-8">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-white text-ink border-2 border-ink hover:bg-ink hover:text-white py-4 px-8 font-medium uppercase tracking-wider transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                  style={{ 
                    fontFamily: 'Helvetica Neue, Arial, sans-serif',
                    fontSize: 'clamp(14px, 2.5vw, 18px)',
                    letterSpacing: '1px',
                    borderRadius: '0px'
                  }}
                >
                  {isSubmitting ? 'ОТПРАВЛЯЕМ...' : 'ДАВАЙТЕ РАБОТАТЬ ВМЕСТЕ'}
                </button>
                
                {/* Статусник отправки */}
                {submitStatus && (
                  <div className="mt-4 text-center">
                    <p className={`text-sm ${submitStatus === 'success' ? 'text-lime' : 'text-red-500'}`}>
                      {submitStatus === 'success' ? 'Заявка отправлена! Мы свяжемся с вами в ближайшее время.' : 'Ошибка отправки. Попробуйте ещё раз.'}
                    </p>
                  </div>
                )}
              </div>
            </motion.form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ApplicationForm;