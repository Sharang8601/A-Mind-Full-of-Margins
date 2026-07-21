"use client";

import React, { useState } from "react";
import { Search, User, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Home");
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);

  const navItems = [
    { name: "Home", href: "#" },
    { name: "Recent Essays", href: "#recent-essays" },
    { name: "Reflections", href: "#reflections" },
    { name: "Popular Stories", href: "#popular-stories" },
    { name: "Subscribe", href: "#newsletter" }
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-500 border-b border-border-muted bg-charcoal/95 backdrop-blur-md`}
      >
        <div className="w-full max-w-[1600px] mx-auto px-6 md:px-12">
          {/* Row 1: Brand Logo, Title, and Utilities */}
          <div className="flex justify-between items-center py-4 border-b border-border-muted">
            {/* Left: Mobile Menu Toggle or Logo */}
            <div className="flex-1 flex justify-start items-center space-x-4">
              <button
                className="lg:hidden text-cream hover:text-beige transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle Menu"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div className="w-8 h-8 rounded-full bg-beige/25 overflow-hidden hidden lg:block border border-border-muted relative cinematic-overlay">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAd5hbeEys4swuXyv-km07QcTtbRv6-5_lLKSPD_OOmHm_7J74GfSjobMxj1gwwarW7Fka_JgewkrhbKiE5AV_w7sojt6rJeBJ8rU_xAoNhKK-u4cgdCr_qoypokzNNKcbeBNNIJRA_mP2Gg9_VF081Sz_uPa6YDldNiOUxzAGDrl2Bj9AfP6xC3RiSOCkDDmqCru71ma2mZSrh9QOOwJEPRww59Knj1XbvIws3O3EdqE7X-bDyQDXdI4FFADUFYkaW2qubW4FSmG9J"
                  alt="A Mind Full of Margins Logo"
                  className="w-full h-full object-cover grayscale"
                />
              </div>
            </div>

            {/* Center Logo/Title */}
            <div className="flex-grow text-center z-10 relative">
              <a
                href="#"
                className="font-serif text-2xl md:text-3xl lg:text-[36px] font-semibold tracking-wide text-cream hover:text-beige transition-colors duration-300 italic blend-difference"
              >
                A Mind Full of Margins
              </a>
            </div>

            {/* Right Utilities */}
            <div className="flex-1 flex justify-end items-center space-x-4 md:space-x-6">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="text-cream hover:text-beige transition-colors duration-300"
                aria-label="Search"
              >
                <Search className="w-4 h-4 md:w-5 h-5" />
              </button>

              <a
                href="#newsletter"
                className="bg-beige text-charcoal hover:bg-cream transition-colors font-sans text-[10px] font-semibold uppercase tracking-[0.1em] px-4 py-2 rounded-none hidden sm:inline-block"
              >
                Subscribe
              </a>

              <a
                href="/account"
                className="text-cream hover:text-beige transition-colors duration-300 flex items-center space-x-1"
                aria-label="Account"
              >
                <User className="w-4 h-4 md:w-5 h-5" />
                <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.1em] hidden lg:inline-block">Account</span>
              </a>
            </div>
          </div>

          {/* Row 2: Secondary Centered Navigation (Desktop Only) */}
          <nav className="hidden lg:flex justify-center space-x-8 py-2.5">
            {navItems.map((item) => {
              const isHovered = hoveredTab === item.name;
              const isActive = activeTab === item.name;
              const isAnyHovered = hoveredTab !== null;
              
              // Fade out unselected/unhovered links when another link is hovered
              const opacity = isHovered || isActive ? 1 : isAnyHovered ? 0.45 : 0.7;

              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setActiveTab(item.name)}
                  onMouseEnter={() => setHoveredTab(item.name)}
                  onMouseLeave={() => setHoveredTab(null)}
                  className="relative font-sans text-xs tracking-widest uppercase pb-1.5 transition-opacity duration-300 select-none text-cream"
                  style={{ opacity }}
                >
                  <span className="relative z-10">{item.name}</span>
                  
                  {/* Sliding Underline for Hover */}
                  {isHovered && (
                    <motion.div
                      layoutId="hoverUnderline"
                      className="absolute bottom-0 left-0 right-0 h-[1px] bg-beige/40"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  
                  {/* Sliding Underline for Active */}
                  {isActive && (
                    <motion.div
                      layoutId="activeUnderline"
                      className="absolute bottom-0 left-0 right-0 h-[1px] bg-beige"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>
        </div>
        {/* Search Bar Dropdown */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="absolute top-full left-0 w-full bg-charcoal border-b border-border-muted overflow-hidden"
            >
              <div className="max-w-[800px] mx-auto px-6 py-6 flex items-center">
                <input
                  type="text"
                  placeholder="Search articles, stories, essays..."
                  className="w-full bg-transparent border-b border-beige/30 focus:border-beige text-cream placeholder-cream/30 text-lg py-2 outline-none font-serif italic"
                  autoFocus
                />
                <button
                  onClick={() => setIsSearchOpen(false)}
                  className="ml-4 text-cream/70 hover:text-cream"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black z-50 lg:hidden"
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 left-0 h-full w-[280px] bg-charcoal border-r border-border-muted z-50 p-8 flex flex-col justify-between lg:hidden"
            >
              <div>
                <div className="flex justify-between items-center mb-12">
                  <span className="font-serif italic text-lg text-cream">Margins</span>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-cream hover:text-beige"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <nav className="flex flex-col space-y-6 text-sm font-sans tracking-widest uppercase text-cream/80">
                  {navItems.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        setActiveTab(item.name);
                      }}
                      className={`hover:text-cream transition-colors ${
                        activeTab === item.name ? "text-beige" : ""
                      }`}
                    >
                      {item.name}
                    </a>
                  ))}
                  <a
                    href="/account"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="hover:text-cream transition-colors text-beige border-t border-border-muted/30 pt-4 mt-2"
                  >
                    Account
                  </a>
                </nav>
              </div>

              <div className="text-[10px] text-cream/40 font-sans tracking-wider">
                © 2026 A Mind Full of Margins
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
