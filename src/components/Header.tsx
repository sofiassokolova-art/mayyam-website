"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { href: "/about", label: "обо мне" },
    { href: "/services", label: "услуги" },
    { href: "#contact", label: "контакты" },
  ];

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-paper/80 backdrop-blur-md shadow-soft"
          : "bg-transparent"
      }`}
    >
      <div className="container-custom">
        <nav className="flex items-center justify-between py-4">
          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-8 ml-auto">
            {navItems.map((item) => (
              <li key={item.href}>
                {item.href.startsWith('/') ? (
                  <Link
                    href={item.href}
                    className={`text-sm font-medium transition-colors duration-200 underline-lime ${
                      isScrolled ? "text-ink" : "text-white"
                    }`}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <a
                    href={item.href}
                    className={`text-sm font-medium transition-colors duration-200 underline-lime ${
                      isScrolled ? "text-ink" : "text-white"
                    }`}
                  >
                    {item.label}
                  </a>
                )}
              </li>
            ))}
          </ul>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden flex flex-col items-center justify-center w-8 h-8 ml-auto"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span className={`block w-6 h-0.5 transition-all duration-300 ${
              isScrolled ? "bg-ink" : "bg-white"
            } ${isMobileMenuOpen ? "rotate-45 translate-y-1" : ""}`}></span>
            <span className={`block w-6 h-0.5 mt-1 transition-all duration-300 ${
              isScrolled ? "bg-ink" : "bg-white"
            } ${isMobileMenuOpen ? "opacity-0" : ""}`}></span>
            <span className={`block w-6 h-0.5 mt-1 transition-all duration-300 ${
              isScrolled ? "bg-ink" : "bg-white"
            } ${isMobileMenuOpen ? "-rotate-45 -translate-y-1" : ""}`}></span>
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-paper/95 backdrop-blur-md border-t border-neutral-200"
          >
            <div className="container-custom py-6">
              <ul className="space-y-4">
                {navItems.map((item) => (
                  <li key={item.href}>
                    {item.href.startsWith('/') ? (
                      <Link
                        href={item.href}
                        className="block text-ink font-medium py-2 transition-colors duration-200 hover:text-lime"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <a
                        href={item.href}
                        className="block text-ink font-medium py-2 transition-colors duration-200 hover:text-lime"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
