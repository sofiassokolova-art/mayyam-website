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
      className="bg-paper py-32 md:py-40" // белый фон секции
    >
      <div className="container-custom">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="relative max-w-4xl mx-auto"
        >
          {/* Слой 1: Оранжевая картинка с такими же пропорциями */}
          <div 
            className="absolute inset-0"
            style={{
              background: 'url(/images/orange-texture-1.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              borderRadius: '0px',
              aspectRatio: '16/10' // такие же пропорции как у белой анкеты
            }}
          />
          
          {/* Слой 2: Белая анкета поверх оранжевой картинки */}
          <div 
            className="relative bg-white shadow-2xl p-12 md:p-16"
            style={{ 
              borderRadius: '0px', // строго прямоугольная
              aspectRatio: '16/10' // горизонтальная ориентация
            }}
          >
            <div className="h-full flex flex-col justify-center">
              {/* Заголовок */}
              <motion.h3
                variants={itemVariants}
                className="text-ink uppercase text-center mb-8"
                style={{ 
                  fontFamily: 'var(--font-raleway), sans-serif',
                  fontSize: 'clamp(24px, 4vw, 32px)', // уменьшенный размер
                  fontWeight: 900,
                  letterSpacing: '0.05em'
                }}
              >
                СОТРУДНИЧЕСТВО
              </motion.h3>


              <motion.form
                variants={itemVariants}
                onSubmit={handleSubmit}
                className="space-y-6 max-w-xl mx-auto w-full"
              >
                {/* Поле: Имя */}
                <div>
                  <label htmlFor="name" className="block text-xs font-bold mb-3 uppercase tracking-wider text-ink">
                    ИМЯ
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

                {/* Поле: Ниша / Бизнес */}
                <div>
                  <label htmlFor="business" className="block text-xs font-bold mb-3 uppercase tracking-wider text-ink">
                    НИША / БИЗНЕС
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

                {/* Поле: Контакты */}
                <div>
                  <label htmlFor="contacts" className="block text-xs font-bold mb-3 uppercase tracking-wider text-ink">
                    КОНТАКТЫ (EMAIL / TELEGRAM)
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

                {/* Кнопка с закруглёнными углами */}
                <div className="pt-4 pb-2"> {/* уменьшенные отступы чтобы кнопка не вываливалась */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-white text-ink border-2 border-ink hover:bg-ink hover:text-white py-3 px-6 font-bold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md rounded-full"
                    style={{ 
                      fontFamily: 'Helvetica Neue, Arial, sans-serif',
                      fontSize: 'clamp(14px, 2.5vw, 18px)', // уменьшенный шрифт
                      letterSpacing: '0.5px'
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