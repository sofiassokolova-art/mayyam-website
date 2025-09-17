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
      className="bg-paper py-32 md:py-40"
    >
      <div className="container-custom">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="relative w-[95%] md:w-[60%] max-w-3xl mx-auto"
        >
          {/* Белый блок с толстой оранжевой рамкой */}
          <div 
            className="relative bg-white shadow-xl" 
            style={{ 
              border: '80px solid transparent',
              backgroundImage: 'url(/images/orange-texture-1.png), linear-gradient(white, white)',
              backgroundOrigin: 'border-box, padding-box',
              backgroundClip: 'border-box, padding-box',
              borderRadius: '0px' // строго прямоугольный
            }}
          >
            <div className="p-12 md:p-16">
              {/* Главный заголовок */}
              <motion.h3
                variants={itemVariants}
                className="text-ink uppercase text-center mb-3"
                style={{ 
                  fontFamily: 'var(--font-raleway), sans-serif',
                  fontSize: 'clamp(32px, 6vw, 48px)',
                  fontWeight: 900,
                  letterSpacing: '0.05em'
                }}
              >
                СОТРУДНИЧЕСТВО
              </motion.h3>

              {/* Подзаголовок серый */}
              <motion.p
                variants={itemVariants}
                className="text-center mb-16"
                style={{ 
                  fontFamily: 'Helvetica Neue, Arial, sans-serif',
                  fontSize: 'clamp(16px, 3vw, 20px)',
                  color: '#666',
                  fontWeight: 400
                }}
              >
                Я выбираю проекты, с которыми работаю
              </motion.p>

              <motion.form
                variants={itemVariants}
                onSubmit={handleSubmit}
                className="space-y-8"
              >
                {/* Все поля вертикально друг под другом */}
                
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
                    className="w-full bg-white text-ink border border-neutral-300 px-6 py-4 focus:outline-none focus:border-lime transition-all duration-300 text-lg"
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
                    className="w-full bg-white text-ink border border-neutral-300 px-6 py-4 focus:outline-none focus:border-lime transition-all duration-300 text-lg"
                    style={{ 
                      fontFamily: 'Helvetica Neue, Arial, sans-serif',
                      borderRadius: '0px'
                    }}
                    placeholder="Опишите ваш бизнес"
                  />
                </div>

                {/* Поле: Основной запрос */}
                <div>
                  <label htmlFor="request" className="block text-xs font-bold mb-3 uppercase tracking-wider text-ink">
                    ОСНОВНОЙ ЗАПРОС
                  </label>
                  <select
                    id="request"
                    name="request"
                    value={formData.request}
                    onChange={handleChange}
                    required
                    className="w-full bg-white text-ink border border-neutral-300 px-6 py-4 focus:outline-none focus:border-lime transition-all duration-300 text-lg"
                    style={{ 
                      fontFamily: 'Helvetica Neue, Arial, sans-serif',
                      borderRadius: '0px'
                    }}
                  >
                    <option value="" style={{ color: '#9A9A9A' }}>Выберите запрос</option>
                    <option value="sales">Продажи</option>
                    <option value="funnel">Воронка</option>
                    <option value="scaling">Масштабирование</option>
                    <option value="launch">Запуск с нуля</option>
                    <option value="optimization">Оптимизация процессов</option>
                  </select>
                </div>

                {/* Поле: Бюджет */}
                <div>
                  <label htmlFor="budget" className="block text-xs font-bold mb-3 uppercase tracking-wider text-ink">
                    БЮДЖЕТ / ГОТОВНОСТЬ К ИНВЕСТИЦИЯМ
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    required
                    className="w-full bg-white text-ink border border-neutral-300 px-6 py-4 focus:outline-none focus:border-lime transition-all duration-300 text-lg"
                    style={{ 
                      fontFamily: 'Helvetica Neue, Arial, sans-serif',
                      borderRadius: '0px'
                    }}
                  >
                    <option value="" style={{ color: '#9A9A9A' }}>Выберите бюджет</option>
                    <option value="50k-200k">50-200 тыс. руб.</option>
                    <option value="200k-500k">200-500 тыс. руб.</option>
                    <option value="500k-1m">500 тыс. - 1 млн руб.</option>
                    <option value="1m+">От 1 млн руб.</option>
                    <option value="discuss">Обсудим индивидуально</option>
                  </select>
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
                    className="w-full bg-white text-ink border border-neutral-300 px-6 py-4 focus:outline-none focus:border-lime transition-all duration-300 text-lg"
                    style={{ 
                      fontFamily: 'Helvetica Neue, Arial, sans-serif',
                      borderRadius: '0px'
                    }}
                    placeholder="Email или Telegram"
                  />
                </div>

                {/* Кнопка на всю ширину формы */}
                <div className="pt-8">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-white text-ink border-2 border-ink hover:bg-ink hover:text-white py-5 px-8 font-bold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                    style={{ 
                      fontFamily: 'Helvetica Neue, Arial, sans-serif',
                      fontSize: 'clamp(16px, 3vw, 20px)',
                      letterSpacing: '0.5px',
                      borderRadius: '0px' // строго прямоугольная
                    }}
                  >
                    {isSubmitting ? 'ОТПРАВЛЯЕМ...' : 'ДАВАЙТЕ РАБОТАТЬ ВМЕСТЕ'}
                  </button>
                  
                  {/* Статусник отправки */}
                  {submitStatus && (
                    <div className="mt-6 text-center">
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