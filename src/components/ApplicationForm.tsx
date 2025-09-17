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
          className="relative max-w-2xl md:max-w-6xl mx-auto"
        >
          {/* Адаптивный прямоугольник: вертикальный на мобиле, горизонтальный на десктопе */}
          <div 
            className="relative md:aspect-[4/3] aspect-[3/4]"
            style={{
              background: 'url(/images/orange-texture-1.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              padding: '30px', // уменьшенные отступы на мобиле
              minHeight: '600px' // выше для мобильной версии
            }}
          >
            {/* Белый внутренний контейнер */}
            <div className="bg-white h-full p-6 md:p-12 pb-6" style={{ minHeight: '540px' }}>
              {/* Заголовок шрифтом как у Манифеста */}
              <motion.h3
                variants={itemVariants}
                className="text-ink uppercase text-center mb-6"
                style={{ 
                  fontFamily: 'var(--font-raleway), sans-serif',
                  fontSize: 'clamp(20px, 5vw, 32px)', // уменьшенный размер
                  fontWeight: 800,
                  letterSpacing: '2px'
                }}
              >
                СОТРУДНИЧЕСТВО
              </motion.h3>

              <motion.form
                variants={itemVariants}
                onSubmit={handleSubmit}
                className="space-y-4"
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
                    className="w-full bg-white text-ink border-0 border-b-2 border-neutral-200 px-0 py-3 focus:outline-none focus:border-lime transition-all duration-300 text-base"
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
                    className="w-full bg-white text-ink border-0 border-b-2 border-neutral-200 px-0 py-3 focus:outline-none focus:border-lime transition-all duration-300 text-base"
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
                    className="w-full bg-white text-ink border-0 border-b-2 border-neutral-200 px-0 py-3 focus:outline-none focus:border-lime transition-all duration-300 text-base"
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
                    className="w-full bg-white text-ink border-0 border-b-2 border-neutral-200 px-0 py-3 focus:outline-none focus:border-lime transition-all duration-300 text-base"
                    style={{ 
                      fontFamily: 'Helvetica Neue, Arial, sans-serif',
                      borderRadius: '0px'
                    }}
                    placeholder="Email или Telegram"
                  />
                </div>

                {/* Кнопка CTA с чёрным контуром и функциональностью */}
                <div className="pt-6">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-white text-ink border-2 border-ink hover:bg-ink hover:text-white py-3 px-6 font-medium uppercase tracking-wider transition-all duration-300 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ 
                      fontFamily: 'Helvetica Neue, Arial, sans-serif',
                      fontSize: 'clamp(12px, 2vw, 16px)',
                      letterSpacing: '1px'
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
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ApplicationForm;