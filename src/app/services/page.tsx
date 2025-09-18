"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

interface Service {
  id: string;
  title: string;
  description: string;
}

const services: Service[] = [
  {
    id: "audit",
    title: "АУДИТ ПРОДАЖ",
    description: "Глубокий анализ текущих процессов продаж и выявление точек роста. Детальный разбор воронки, конверсий и команды с конкретными рекомендациями по улучшению."
  },
  {
    id: "strategy",
    title: "СТРАТЕГИЯ РОСТА",
    description: "Разработка комплексной стратегии масштабирования бизнеса. Анализ рынка, позиционирование, customer journey и roadmap развития на 6-12 месяцев."
  },
  {
    id: "funnel",
    title: "НАСТРОЙКА ВОРОНКИ",
    description: "Построение и оптимизация полной воронки продаж от лида до клиента. Лид-магниты, email-последовательности, CRM интеграция и A/B тестирование."
  },
  {
    id: "scaling",
    title: "МАСШТАБИРОВАНИЕ",
    description: "Комплексное масштабирование бизнеса с увеличением оборотов на 150-300%. Оптимизация unit-экономики, автоматизация процессов, построение команды."
  },
  {
    id: "mentoring",
    title: "МЕНТОРСТВО",
    description: "Персональное сопровождение и консультации по развитию бизнеса. Еженедельные созвоны, разбор задач, помощь в принятии решений, доступ к экспертизе 24/7."
  }
];

export default function Page() {
  const [expandedService, setExpandedService] = useState<string | null>(null);

  const toggleService = (serviceId: string) => {
    setExpandedService(expandedService === serviceId ? null : serviceId);
  };

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

      <div className="flex min-h-screen flex-col md:flex-row">
        {/* Левая колонка - Ч/Б изображение */}
        <div className="w-full md:w-2/5 h-64 md:h-auto relative overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/uslugi.JPG"
              alt="Марьям Биктимирова"
              fill
              className="object-cover hover:grayscale transition-all duration-300"
              priority
            />
          </div>
        </div>

        {/* Правая колонка - Список услуг */}
        <div className="w-full md:w-3/5 flex flex-col">
          {/* Заголовок */}
          <div className="px-8 md:px-16 pt-16 md:pt-24 pb-8 md:pb-12">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-ink"
              style={{
                fontFamily: 'var(--font-raleway), sans-serif',
                fontSize: 'clamp(32px, 5vw, 48px)',
                fontWeight: 800,
                letterSpacing: '0.02em',
                textTransform: 'uppercase'
              }}
            >
              УСЛУГИ
            </motion.h1>
          </div>

          {/* Список услуг - Таблица-аккордеон */}
          <div className="flex-1 px-8 md:px-16">
            <div className="space-y-0">
              {services.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="border-b border-ink"
                >
                  {/* Строка услуги */}
                  <div
                    className="flex items-center justify-between py-8 cursor-pointer group hover:bg-neutral-50 px-4 -mx-4 transition-all duration-200"
                    onClick={() => toggleService(service.id)}
                  >
                    <h3
                      className="text-ink group-hover:translate-x-2 transition-transform duration-200"
                      style={{
                        fontFamily: 'var(--font-raleway), sans-serif',
                        fontSize: 'clamp(14px, 2vw, 18px)',
                        fontWeight: 800,
                        letterSpacing: '0.02em',
                      }}
                    >
                      {service.title}
                    </h3>
                    
                    <motion.div
                      animate={{ rotate: expandedService === service.id ? 45 : 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="flex items-center justify-center w-8 h-8"
                    >
                      <span
                        className={`text-2xl font-light leading-none transition-colors duration-300 ${
                          expandedService === service.id ? 'text-lime' : 'text-ink'
                        }`}
                        style={{
                          fontFamily: 'var(--font-raleway), sans-serif',
                        }}
                      >
                        +
                      </span>
                    </motion.div>
                  </div>

                  {/* Описание услуги */}
                  <AnimatePresence>
                    {expandedService === service.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="pb-8 px-4 -mx-4">
                          <p
                            className="text-neutral-600 leading-relaxed max-w-3xl"
                            style={{
                              fontFamily: 'Georgia, serif',
                              fontSize: 'clamp(12px, 1.5vw, 14px)',
                              fontStyle: 'italic',
                              lineHeight: 1.7
                            }}
                          >
                            {service.description}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>

            {/* Нижний отступ */}
            <div className="h-24"></div>
          </div>
        </div>
      </div>
    </main>
  );
}