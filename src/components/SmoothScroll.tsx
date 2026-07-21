"use client";

import React, { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    // Update ScrollTrigger on scroll
    const updateScrollTrigger = () => {
      ScrollTrigger.update();
    };
    lenis.on("scroll", updateScrollTrigger);

    // Synchronize Lenis with GSAP ticker
    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tick);

    // Disable lag smoothing to prevent visual stuttering
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      lenis.off("scroll", updateScrollTrigger);
      gsap.ticker.remove(tick);
    };
  }, []);

  return <>{children}</>;
}
