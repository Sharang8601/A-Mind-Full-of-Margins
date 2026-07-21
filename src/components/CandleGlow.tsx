"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CandleGlow() {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Heavy springs for a slow, organic drifting candle flare effect
  const springConfig = { damping: 55, stiffness: 50, mass: 1.5 };
  const glowX = useSpring(mouseX, springConfig);
  const glowY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);

    const handleMouseMove = (e: MouseEvent) => {
      // Offset half of width/height (600px / 2 = 300)
      mouseX.set(e.clientX - 300);
      mouseY.set(e.clientY - 300);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!mounted) return null;

  return (
    <motion.div
      animate={{
        opacity: isVisible ? 1 : 0,
      }}
      transition={{ duration: 1.0, ease: "easeOut" }}
      className="fixed top-0 left-0 w-[600px] h-[600px] pointer-events-none rounded-full z-40 hidden md:block"
      style={{
        x: glowX,
        y: glowY,
        background: "radial-gradient(circle, rgba(199, 174, 149, 0.06) 0%, rgba(199, 174, 149, 0.01) 50%, rgba(199, 174, 149, 0) 70%)",
        mixBlendMode: "soft-light",
        filter: "blur(120px)",
      }}
      aria-hidden="true"
    />
  );
}
