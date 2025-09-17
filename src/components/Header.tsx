"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { href: "#about", label: "обо мне" },
    { href: "#services", label: "услуги" },
    { href: "#cases", label: "кейсы" },
    { href: "#faq", label: "вопросы" },
    { href: "#contact", label: "контакты" },
  ];

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 hidden md:block ${
        isScrolled
          ? "bg-paper/80 backdrop-blur-md shadow-soft"
          : "bg-transparent"
      }`}
    >
      <div className="container-custom">
        <nav className="flex items-center justify-end py-4">
          {/* Navigation */}
          <ul className="flex items-center gap-8">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={`text-sm font-medium transition-colors duration-200 underline-lime ${
                    isScrolled ? "text-ink" : "text-white"
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </motion.header>
  );
};

export default Header;
