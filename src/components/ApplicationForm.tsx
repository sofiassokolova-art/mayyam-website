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
    <section id="application" className="bg-white section-padding">
      <div className="container-custom">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-2xl"
        >
          <motion.h3
            variants={itemVariants}
            className="text-black text-4xl md:text-5xl font-extrabold mb-6"
          >
            Заполните анкету
          </motion.h3>

          <motion.p
            variants={itemVariants}
            className="text-[#AAAAAA] text-base md:text-lg mb-12"
          >
            Я выбираю проекты, с которыми работаю
          </motion.p>

          <motion.form
            variants={itemVariants}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-black mb-2">
                Имя
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full rounded-xl border-neutral-300 focus:border-[#C6FF00] focus:ring-[#C6FF00] px-6 py-4 text-black"
                placeholder="Ваше имя"
              />
            </div>

            <div>
              <label htmlFor="business" className="block text-sm font-medium text-black mb-2">
                Ниша / Бизнес
              </label>
              <input
                type="text"
                id="business"
                name="business"
                value={formData.business}
                onChange={handleChange}
                required
                className="w-full rounded-xl border-neutral-300 focus:border-[#C6FF00] focus:ring-[#C6FF00] px-6 py-4 text-black"
                placeholder="Опишите ваш бизнес"
              />
            </div>

            <div>
              <label htmlFor="request" className="block text-sm font-medium text-black mb-2">
                Основной запрос
              </label>
              <select
                id="request"
                name="request"
                value={formData.request}
                onChange={handleChange}
                required
                className="w-full rounded-xl border-neutral-300 focus:border-[#C6FF00] focus:ring-[#C6FF00] px-6 py-4 text-black"
              >
                <option value="">Выберите запрос</option>
                <option value="sales">Продажи</option>
                <option value="funnel">Воронка</option>
                <option value="scaling">Масштабирование</option>
              </select>
            </div>

            <div>
              <label htmlFor="budget" className="block text-sm font-medium text-black mb-2">
                Бюджет / готовность к инвестициям
              </label>
              <input
                type="text"
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                required
                className="w-full rounded-xl border-neutral-300 focus:border-[#C6FF00] focus:ring-[#C6FF00] px-6 py-4 text-black"
                placeholder="Укажите бюджет"
              />
            </div>

            <div>
              <label htmlFor="contacts" className="block text-sm font-medium text-black mb-2">
                Контакты (email/telegram)
              </label>
              <input
                type="text"
                id="contacts"
                name="contacts"
                value={formData.contacts}
                onChange={handleChange}
                required
                className="w-full rounded-xl border-neutral-300 focus:border-[#C6FF00] focus:ring-[#C6FF00] px-6 py-4 text-black"
                placeholder="Email или Telegram"
              />
            </div>

            <button
              type="submit"
              className="w-full btn-primary h-14 px-8 rounded-full font-extrabold hover:shadow-glow"
            >
              Отправить заявку
            </button>
          </motion.form>
        </motion.div>
      </div>
    </section>
  );
};

export default ApplicationForm;
