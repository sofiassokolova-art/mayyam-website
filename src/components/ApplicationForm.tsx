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
      className="py-20 md:py-32"
      style={{ 
        marginBottom: '120px',
        paddingTop: '100px',
        paddingBottom: '100px'
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
          {/* Оранжевая рамка */}
          <div 
            className="absolute inset-0 rounded-2xl"
            style={{
              background: 'url(/images/orange-texture-1.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              padding: '30px'
            }}
          >
            <div className="w-full h-full bg-white rounded-xl"></div>
          </div>
          
          {/* Содержимое формы */}
          <div className="relative bg-white rounded-xl p-8 md:p-12 m-[30px]">
            <motion.h3
              variants={itemVariants}
              className="text-ink text-2xl md:text-[32px] font-bold mb-4 text-center"
            >
              Заполните анкету
            </motion.h3>

            <motion.p
              variants={itemVariants}
              className="text-muted text-lg mb-8 text-center"
            >
              Я выбираю проекты, с которыми работаю
            </motion.p>

          <motion.form
            variants={itemVariants}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-ink mb-2">
                Имя
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-white text-ink rounded-lg px-4 py-3 mb-6 focus:outline-none focus:ring-2 focus:ring-lime"
                placeholder="Ваше имя"
              />
            </div>

            <div>
              <label htmlFor="business" className="block text-sm font-medium text-ink mb-2">
                Ниша / Бизнес
              </label>
              <input
                type="text"
                id="business"
                name="business"
                value={formData.business}
                onChange={handleChange}
                required
                className="w-full bg-white text-ink rounded-lg px-4 py-3 mb-6 focus:outline-none focus:ring-2 focus:ring-lime"
                placeholder="Опишите ваш бизнес"
              />
            </div>

            <div>
              <label htmlFor="request" className="block text-sm font-medium text-ink mb-2">
                Основной запрос
              </label>
              <select
                id="request"
                name="request"
                value={formData.request}
                onChange={handleChange}
                required
                className="w-full bg-white text-ink rounded-lg px-4 py-3 mb-6 focus:outline-none focus:ring-2 focus:ring-lime"
              >
                <option value="">Выберите запрос</option>
                <option value="sales">Продажи</option>
                <option value="funnel">Воронка</option>
                <option value="scaling">Масштабирование</option>
              </select>
            </div>


            <div>
              <label htmlFor="contacts" className="block text-sm font-medium text-ink mb-2">
                Контакты (<span className="u-lime-underline">email</span> / <span className="u-lime-underline">telegram</span>)
              </label>
              <input
                type="text"
                id="contacts"
                name="contacts"
                value={formData.contacts}
                onChange={handleChange}
                required
                className="w-full bg-white text-ink rounded-lg px-4 py-3 mb-6 focus:outline-none focus:ring-2 focus:ring-lime"
                placeholder="Email или Telegram"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-white text-ink hover:bg-ink hover:text-white rounded-full py-4 px-8 font-medium transition-all duration-300"
            >
              Давайте работать вместе
            </button>
            </motion.form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ApplicationForm;
