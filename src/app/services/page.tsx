"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Link from "next/link";
// Simple SVG icons
const ChevronDown = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="6,9 12,15 18,9"></polyline>
  </svg>
);

const ChevronRight = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="9,18 15,12 9,6"></polyline>
  </svg>
);

interface Service {
  id: string;
  title: string;
  price: string;
  duration: string;
  description: string;
  details: string[];
  results: string[];
}

const services: Service[] = [
  {
    id: "audit",
    title: "Аудит продаж",
    price: "от 50 000 ₽",
    duration: "5-7 дней",
    description: "Глубокий анализ текущих процессов продаж и выявление точек роста",
    details: [
      "Анализ воронки продаж",
      "Оценка конверсий на каждом этапе",
      "Выявление узких мест",
      "Анализ скриптов и процессов",
      "Оценка работы команды"
    ],
    results: [
      "Детальный отчёт с рекомендациями",
      "План оптимизации процессов",
      "Список приоритетных задач",
      "Прогноз роста показателей"
    ]
  },
  {
    id: "strategy",
    title: "Стратегия роста",
    price: "от 150 000 ₽",
    duration: "2-3 недели",
    description: "Разработка комплексной стратегии масштабирования бизнеса",
    details: [
      "Анализ рынка и конкурентов",
      "Определение целевой аудитории",
      "Построение customer journey",
      "Разработка ценностного предложения",
      "Создание roadmap развития"
    ],
    results: [
      "Стратегический план развития",
      "Positioning statement",
      "Карта клиентского пути",
      "Метрики и KPI",
      "План запуска"
    ]
  },
  {
    id: "funnel",
    title: "Настройка воронки",
    price: "от 200 000 ₽",
    duration: "3-4 недели",
    description: "Построение и оптимизация полной воронки продаж от лида до клиента",
    details: [
      "Проектирование этапов воронки",
      "Настройка лид-магнитов",
      "Создание последовательности писем",
      "Интеграция CRM систем",
      "A/B тестирование элементов"
    ],
    results: [
      "Готовая воронка продаж",
      "Автоматизированные процессы",
      "Настроенная аналитика",
      "Скрипты для команды",
      "Система отчётности"
    ]
  },
  {
    id: "scaling",
    title: "Масштабирование",
    price: "от 300 000 ₽",
    duration: "1-2 месяца",
    description: "Комплексное масштабирование бизнеса с увеличением оборотов",
    details: [
      "Оптимизация unit-экономики",
      "Масштабирование рекламы",
      "Автоматизация процессов",
      "Построение команды продаж",
      "Внедрение системы управления"
    ],
    results: [
      "Рост выручки на 150-300%",
      "Снижение стоимости привлечения",
      "Автоматизированные процессы",
      "Обученная команда",
      "Система масштабирования"
    ]
  },
  {
    id: "mentoring",
    title: "Менторство",
    price: "от 100 000 ₽/мес",
    duration: "3-6 месяцев",
    description: "Персональное сопровождение и консультации по развитию бизнеса",
    details: [
      "Еженедельные созвоны 1-на-1",
      "Разбор текущих задач",
      "Помощь в принятии решений",
      "Доступ к экспертизе 24/7",
      "Связь с сообществом предпринимателей"
    ],
    results: [
      "Ускорение принятия решений",
      "Избежание критических ошибок",
      "Доступ к лучшим практикам",
      "Развитие лидерских качеств",
      "Рост личной эффективности"
    ]
  }
];

export default function Page() {
  const [expandedServices, setExpandedServices] = useState<Set<string>>(new Set());

  const toggleService = (serviceId: string) => {
    const newExpanded = new Set(expandedServices);
    if (newExpanded.has(serviceId)) {
      newExpanded.delete(serviceId);
    } else {
      newExpanded.add(serviceId);
    }
    setExpandedServices(newExpanded);
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
    <main className="min-h-screen bg-paper">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-16"
          >
            <h1 
              className="text-ink mb-6"
              style={{
                fontFamily: 'var(--font-raleway), sans-serif',
                fontSize: 'clamp(48px, 8vw, 80px)',
                fontWeight: 800,
                letterSpacing: '0.02em',
                textTransform: 'uppercase'
              }}
            >
              УСЛУГИ
            </h1>
            <p 
              className="text-muted max-w-3xl mx-auto"
              style={{
                fontFamily: 'Georgia, serif',
                fontSize: 'clamp(18px, 3vw, 24px)',
                fontStyle: 'italic',
                lineHeight: 1.6
              }}
            >
              Комплексные решения для роста вашего бизнеса. 
              От аудита до полного масштабирования — выберите подходящий формат работы.
            </p>
          </motion.div>

          {/* Services Table */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-6xl mx-auto"
          >
            <div className="bg-white shadow-soft overflow-hidden" style={{ borderRadius: '0px' }}>
              {/* Table Header */}
              <div className="bg-neutral-50 px-8 py-6 border-b border-neutral-200">
                <div className="grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-1"></div>
                  <div className="col-span-5">
                    <h3 className="font-bold text-ink uppercase tracking-wider text-sm">
                      Услуга
                    </h3>
                  </div>
                  <div className="col-span-2">
                    <h3 className="font-bold text-ink uppercase tracking-wider text-sm">
                      Стоимость
                    </h3>
                  </div>
                  <div className="col-span-2">
                    <h3 className="font-bold text-ink uppercase tracking-wider text-sm">
                      Сроки
                    </h3>
                  </div>
                  <div className="col-span-2">
                    <h3 className="font-bold text-ink uppercase tracking-wider text-sm">
                      Подробнее
                    </h3>
                  </div>
                </div>
              </div>

              {/* Services Rows */}
              {services.map((service, index) => (
                <motion.div key={service.id} variants={itemVariants}>
                  {/* Main Row */}
                  <div 
                    className={`px-8 py-6 border-b border-neutral-200 hover:bg-neutral-50 transition-colors duration-200 cursor-pointer ${
                      index % 2 === 0 ? 'bg-white' : 'bg-neutral-25'
                    }`}
                    onClick={() => toggleService(service.id)}
                  >
                    <div className="grid grid-cols-12 gap-4 items-center">
                      {/* Expand Button */}
                      <div className="col-span-1 flex justify-center">
                        <button className="p-2 hover:bg-lime/20 rounded-full transition-colors duration-200">
                          {expandedServices.has(service.id) ? (
                            <ChevronDown size={20} className="text-lime" />
                          ) : (
                            <ChevronRight size={20} className="text-muted" />
                          )}
                        </button>
                      </div>
                      
                      {/* Service Name & Description */}
                      <div className="col-span-5">
                        <h4 className="font-bold text-ink mb-1" style={{ fontSize: '18px' }}>
                          {service.title}
                        </h4>
                        <p className="text-muted text-sm leading-relaxed">
                          {service.description}
                        </p>
                      </div>
                      
                      {/* Price */}
                      <div className="col-span-2">
                        <span className="font-bold text-ink" style={{ fontSize: '16px' }}>
                          {service.price}
                        </span>
                      </div>
                      
                      {/* Duration */}
                      <div className="col-span-2">
                        <span className="text-muted" style={{ fontSize: '14px' }}>
                          {service.duration}
                        </span>
                      </div>
                      
                      {/* Action */}
                      <div className="col-span-2">
                        <span className="text-lime text-sm font-medium hover:text-lime/80">
                          {expandedServices.has(service.id) ? 'Скрыть' : 'Развернуть'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {expandedServices.has(service.id) && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="bg-neutral-50 px-8 py-8 border-b border-neutral-200"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* What's Included */}
                        <div>
                          <h5 className="font-bold text-ink mb-4 uppercase tracking-wider text-sm">
                            Что входит
                          </h5>
                          <ul className="space-y-2">
                            {service.details.map((detail, idx) => (
                              <li key={idx} className="flex items-start gap-3">
                                <span className="w-2 h-2 bg-lime rounded-full mt-2 flex-shrink-0"></span>
                                <span className="text-muted text-sm leading-relaxed">{detail}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Results */}
                        <div>
                          <h5 className="font-bold text-ink mb-4 uppercase tracking-wider text-sm">
                            Результат
                          </h5>
                          <ul className="space-y-2">
                            {service.results.map((result, idx) => (
                              <li key={idx} className="flex items-start gap-3">
                                <span className="w-2 h-2 bg-orange rounded-full mt-2 flex-shrink-0"></span>
                                <span className="text-muted text-sm leading-relaxed">{result}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* CTA Button */}
                      <div className="mt-8 pt-6 border-t border-neutral-200">
                        <Link
                          href="/#application"
                          className="inline-flex items-center gap-2 bg-lime text-ink px-6 py-3 font-bold uppercase tracking-wider text-sm hover:bg-lime/90 transition-colors duration-200 rounded-full"
                        >
                          Заказать услугу
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-center mt-16"
          >
            <p className="text-muted mb-8 max-w-2xl mx-auto" style={{ fontSize: '16px', lineHeight: 1.6 }}>
              Не уверены, какая услуга подойдёт именно вам? 
              Давайте обсудим ваши задачи и подберём оптимальное решение.
            </p>
            <Link
              href="/#application"
              className="inline-flex items-center gap-2 bg-ink text-white px-8 py-4 font-bold uppercase tracking-wider hover:bg-ink/90 transition-colors duration-200 rounded-full"
              style={{ fontSize: '16px' }}
            >
              Получить консультацию
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
