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
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Имя обязательно для заполнения';
    }

    if (!formData.business.trim()) {
      newErrors.business = 'Описание бизнеса обязательно';
    }

    if (!formData.contacts.trim()) {
      newErrors.contacts = 'Контакты обязательны для заполнения';
    } else {
      // Простая валидация email или телефона
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
      
      if (!emailRegex.test(formData.contacts) && !phoneRegex.test(formData.contacts)) {
        newErrors.contacts = 'Введите корректный email или телефон';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Валидация формы
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('');
    setErrors({});
    
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        console.log("Form submitted successfully:", result);
        setSubmitStatus('success');
        
        // Очистить форму
        setFormData({
          name: "",
          business: "",
          request: "",
          budget: "",
          contacts: "",
        });
      } else {
        throw new Error(result.error || 'Ошибка при отправке формы');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Очистить ошибку для этого поля
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
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
      className="bg-paper pt-16 pb-32 md:pt-20 md:pb-40" // белый фон секции
    >
      <div className="container-custom">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="relative max-w-4xl mx-auto"
        >
          {/* Оранжевая рамка-подложка за белым блоком */}
          <div 
            className="absolute"
            style={{
              background: 'url(/images/orange-texture-1.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              borderRadius: '0px',
              filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.2))',
              top: '-48px',
              left: '-24px',
              right: '-24px',
              bottom: '-48px'
            }}
          />
          
          {/* Уменьшенная белая анкета с отступами от оранжевой рамки */}
          <div 
            className="relative bg-white mx-6 md:mx-8 my-16 md:my-20 p-8 md:p-12"
            style={{ 
              borderRadius: '0px',
              boxShadow: '0 12px 40px rgba(0,0,0,0.15)'
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
                    className={`w-full bg-white text-ink border px-4 py-3 focus:outline-none transition-all duration-300 text-base ${
                      errors.name ? 'border-red-500 focus:border-red-500' : 'border-neutral-300 focus:border-lime'
                    }`}
                    style={{ 
                      fontFamily: 'Helvetica Neue, Arial, sans-serif',
                      borderRadius: '0px'
                    }}
                    placeholder="Ваше имя"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-2">{errors.name}</p>
                  )}
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
                    className={`w-full bg-white text-ink border px-4 py-3 focus:outline-none transition-all duration-300 text-base ${
                      errors.business ? 'border-red-500 focus:border-red-500' : 'border-neutral-300 focus:border-lime'
                    }`}
                    style={{ 
                      fontFamily: 'Helvetica Neue, Arial, sans-serif',
                      borderRadius: '0px'
                    }}
                    placeholder="Опишите ваш бизнес"
                  />
                  {errors.business && (
                    <p className="text-red-500 text-sm mt-2">{errors.business}</p>
                  )}
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
                    className={`w-full bg-white text-ink border px-4 py-3 focus:outline-none transition-all duration-300 text-base ${
                      errors.contacts ? 'border-red-500 focus:border-red-500' : 'border-neutral-300 focus:border-lime'
                    }`}
                    style={{ 
                      fontFamily: 'Helvetica Neue, Arial, sans-serif',
                      borderRadius: '0px'
                    }}
                    placeholder="Email или Telegram"
                  />
                  {errors.contacts && (
                    <p className="text-red-500 text-sm mt-2">{errors.contacts}</p>
                  )}
                </div>

                {/* Кнопка с закруглёнными углами */}
                <div className="pt-4 pb-2"> {/* уменьшенные отступы чтобы кнопка не вываливалась */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-white text-ink border-2 border-ink py-3 px-6 font-bold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md rounded-full application-form-button"
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