"use client";

import React, { useEffect, useRef } from "react";
import { ArrowRight, Heart, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PaperGrain from "@/components/PaperGrain";
import CandleGlow from "@/components/CandleGlow";

gsap.registerPlugin(ScrollTrigger);

// Cinematic image reveal wrapper (1.4s reveal: scale 1.15 -> 1, blur 10px -> 0, opacity 0 -> 1)
function CinematicImage({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return (
    <div className="relative overflow-hidden w-full h-full group-hover:scale-[1.03] card-image-transition">
      <div className="card-hover-overlay" />
      <motion.img
        initial={{ scale: 1.15, filter: "blur(10px)", opacity: 0 }}
        whileInView={{ scale: 1, filter: "blur(0px)", opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        src={src}
        alt={alt}
        className={`w-full h-full object-cover grayscale group-hover:grayscale-0 ${className}`}
      />
    </div>
  );
}

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLImageElement>(null);
  const ghostRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Parallax scrolling for center hero image (0.3 scroll ratio)
    if (heroRef.current && heroImageRef.current) {
      gsap.to(heroImageRef.current, {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }

    // Parallax scrolling for background ghost text elements (0.15 scroll ratio)
    ghostRefs.current.forEach((el) => {
      if (el) {
        gsap.to(el, {
          yPercent: -15,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    });
  }, []);

  // Staggered reveal animations (Category -> Title -> Description -> Image)
  const revealContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1, // 100ms stagger delay
      },
    },
  };

  const revealItem = {
    hidden: { opacity: 0, y: 15, filter: "blur(3px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <div className="relative min-h-screen bg-charcoal text-cream overflow-hidden selection:bg-beige selection:text-charcoal">
      {/* Background Ambience */}
      <PaperGrain />
      <CandleGlow />

      {/* Editorial Ghost Typography Background Elements */}
      <div 
        ref={(el) => { if (el) ghostRefs.current[0] = el; }} 
        className="ghost-text top-[15%] left-[5%]"
      >
        MARGINS
      </div>
      <div 
        ref={(el) => { if (el) ghostRefs.current[1] = el; }} 
        className="ghost-text top-[32%] right-[8%]"
      >
        ESSAYS
      </div>
      <div 
        ref={(el) => { if (el) ghostRefs.current[2] = el; }} 
        className="ghost-text top-[54%] left-[10%]"
      >
        REFLECTIONS
      </div>
      <div 
        ref={(el) => { if (el) ghostRefs.current[3] = el; }} 
        className="ghost-text top-[72%] right-[5%]"
      >
        STORIES
      </div>
      <div 
        ref={(el) => { if (el) ghostRefs.current[4] = el; }} 
        className="ghost-text top-[88%] left-[15%]"
      >
        NOTES
      </div>

      <Header />

      {/* Page transition fade & soft motion wrap */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* MAIN MAGAZINE HERO GRID */}
        <main className="w-full max-w-[1600px] mx-auto border-x border-border-muted" ref={heroRef}>
          <div className="grid-editorial border-b border-border-muted">
            
            {/* LEFT COLUMN (25% Width) - Vertical Article Cards */}
            <div className="border-b lg:border-b-0 lg:border-r border-border-muted bg-card flex flex-col divide-y divide-border-muted relative z-10">
              
              {/* Left Card 1 */}
              <motion.article 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={revealContainer}
                className="p-5 group flex flex-col space-y-3 hover:bg-charcoal/30 transition-colors duration-500 cursor-pointer relative overflow-hidden"
              >
                <motion.div variants={revealItem} className="parallax-img-container aspect-[16/9] bg-charcoal overflow-hidden border border-border-muted relative cinematic-overlay">
                  <CinematicImage
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCSlY5u3zZwsyg8ExocyGG7c1Ddd6CmL7IEpv9i0DwRsCycfhepbdRuzIHkaXWtAmsUlMyb8GCLqZW9MxAkDQhEKrMkzwLA3qXXk7B4UlO3_CuI0-he5OrY1plcg5nzbaJu-OuMLtsD-tP3UB5ONmQILh9X4AHs-G56qTRF736GGeMhfFehINze2orVq10vckgmHmSbcnrBmJaJVVp6eaR4qQRMRjIKzPr9_cI-lforq8CSss7oZ5Jz5ELRaSGNN631mVkTgH6bUJH-"
                    alt="Hands writing in leather journal"
                  />
                </motion.div>
                
                <div className="space-y-1">
                  <motion.span variants={revealItem} className="font-sans text-[9px] text-beige uppercase tracking-[0.15em] font-medium block">
                    Reflections
                  </motion.span>
                  <motion.h3 variants={revealItem} className="font-serif text-xl text-cream card-title-transition group-hover:text-beige leading-[1.15] tracking-tight">
                    The Weight of Unspoken Words
                  </motion.h3>
                  <motion.p variants={revealItem} className="font-sans text-[11px] text-cream/70 leading-[1.6] line-clamp-2 opacity-95">
                    A personal reflection on the things we leave unsaid and how they shape our closest relationships.
                  </motion.p>
                </div>
              </motion.article>

              {/* Left Card 2 */}
              <motion.article 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={revealContainer}
                className="p-5 group flex flex-col space-y-3 hover:bg-charcoal/30 transition-colors duration-500 cursor-pointer relative overflow-hidden"
              >
                <motion.div variants={revealItem} className="parallax-img-container aspect-[16/9] bg-charcoal overflow-hidden border border-border-muted relative cinematic-overlay">
                  <CinematicImage
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBxC-4qWt553XCeI03wG65RF3JId2cHBmFzPt_2qdWOyI5byegwitM2YJRw-FZE3dEChGLVS5V5w1-Q-SYhlAV-R1S5gDXlm9kxoeAm4A7XWyCCVW0hrSI276-uA3SFkas4VZg6SbIuWbeVuib2gkw0NYV3rba1JerJ6NUiuRotmRyM_T1uSxL72ZQIvotsrc9KLFZkpUQSJAO3uWq1LAGdhyAZJrQLooGsY9vNx5aTM_I6RkW3hT-5Qnqp85hAKWL0MAQK2mfeWVT8"
                    alt="Conversations over coffee"
                  />
                </motion.div>
                
                <div className="space-y-1">
                  <motion.span variants={revealItem} className="font-sans text-[9px] text-beige uppercase tracking-[0.15em] font-medium block">
                    Life
                  </motion.span>
                  <motion.h3 variants={revealItem} className="font-serif text-xl text-cream card-title-transition group-hover:text-beige leading-[1.15] tracking-tight">
                    The Art of Slow Listening
                  </motion.h3>
                  <motion.p variants={revealItem} className="font-sans text-[11px] text-cream/70 leading-[1.6] line-clamp-2 opacity-95">
                    Learning to truly hear others in a world that never stops talking, finding intimacy in shared silence.
                  </motion.p>
                </div>
              </motion.article>

              {/* Left Card 3 */}
              <motion.article 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={revealContainer}
                className="p-5 group flex flex-col space-y-3 hover:bg-charcoal/30 transition-colors duration-500 cursor-pointer relative overflow-hidden"
              >
                <motion.div variants={revealItem} className="parallax-img-container aspect-[16/9] bg-charcoal overflow-hidden border border-border-muted relative cinematic-overlay">
                  <CinematicImage
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuse4nEgc7Vst5D6QL94HEB-rJXFC5npPw-6kw1OXLfP_hP9X-PFWhFr3wDRuQ-UkWHIPluHvSBGHJSXxYsbG9Uk5-ydGi9DjKuMQcOdkWqHTB2sgFvyUq9ub5VKI4tt6OHgK-mILqkvvgmysxTpB_j97aVtjchJVI5gUYYI-418Sr-4_5bDhfzJXDEgzWSbs1Om-sohcGBP2cdmXd3QYQaGE9sionQzjLD6HDEEzPsc-p0ovz5TUDh7kk4"
                    alt="Sanctuary and walking"
                  />
                </motion.div>
                
                <div className="space-y-1">
                  <motion.span variants={revealItem} className="font-sans text-[9px] text-beige uppercase tracking-[0.15em] font-medium block">
                    Connection
                  </motion.span>
                  <motion.h3 variants={revealItem} className="font-serif text-xl text-cream card-title-transition group-hover:text-beige leading-[1.15] tracking-tight">
                    Finding Home in Conversations
                  </motion.h3>
                  <motion.p variants={revealItem} className="font-sans text-[11px] text-cream/70 leading-[1.6] line-clamp-2 opacity-95">
                    How fleeting moments of vulnerability can build lasting sanctuaries in our everyday lives.
                  </motion.p>
                </div>
              </motion.article>
            </div>

            {/* CENTER COLUMN (50% Width) - Large Featured Story & Stack */}
            <div className="border-b lg:border-b-0 lg:border-r border-border-muted flex flex-col bg-charcoal relative z-10">
              
              {/* Hero Article */}
              <article className="flex flex-col border-b border-border-muted pb-8 group cursor-pointer relative overflow-hidden">
                <div className="w-full aspect-[16/10] bg-dark-bg border-b border-border-muted overflow-hidden relative cinematic-overlay">
                  <div className="card-hover-overlay" />
                  <img
                    ref={heroImageRef}
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDhX8qUCiTfZSN26eOcbboAAXYxuzANWuftg8n_HWZDKmbQLqe7gM0jQO3lkolFKVxHEQp7JmwssRCEUnvQl0m1SowUX0M6hlJSkhHJgGH0ZDH17Qu4-6sP0mIvCL68KaTPfBvSon9cVkya1a-5tNmzffOTOUEYHE8SedlKP3IgTfk2A5ZNmeGHnVMqZSglV443Mv15U9NgOza6U9NiDJJ8XwNQBERAhYzNYdh_FA41JJuJqTYTtc1aVr98TtZE2oZa0a6rlxyC9JNX"
                    alt="Two girls engaged in deep conversation over coffee"
                    className="absolute inset-0 w-full h-[130%] object-cover object-center grayscale group-hover:grayscale-0 card-image-transition"
                  />
                </div>

                <motion.div 
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={revealContainer}
                  className="flex flex-col items-center text-center px-8 pt-8"
                >
                  <motion.span variants={revealItem} className="font-sans text-[10px] text-beige uppercase tracking-[0.15em] font-medium block mb-4">
                    Featured Story
                  </motion.span>
                  
                  <motion.h2 variants={revealItem} className="font-serif text-4xl md:text-[48px] text-cream mb-4 leading-[1.05] tracking-tight card-title-transition group-hover:text-beige blend-difference relative z-10">
                    Finding Comfort in the In-Between
                  </motion.h2>
                  
                  <motion.p variants={revealItem} className="font-sans text-sm text-cream/70 leading-[1.6] mb-6 opacity-90 max-w-[85%]">
                    In the quiet moments between our busy lives, we find the stories that truly matter. A reflection on slowing down and embracing the warmth of human connection.
                  </motion.p>

                  <motion.div variants={revealItem} className="flex justify-center items-center space-x-3 text-beige font-sans text-xs tracking-wide">
                    <span>By Alistair Vance</span>
                    <span className="text-[10px] opacity-50">•</span>
                    <span>15 Min Read</span>
                  </motion.div>
                </motion.div>
              </article>

              {/* Recent Entries List */}
              <div id="recent-essays" className="flex flex-col p-8">
                <h4 className="font-sans text-[10px] text-beige uppercase tracking-[0.15em] font-medium border-b border-border-muted pb-2 mb-4">
                  Recent Entries
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  
                  {/* Entry 1 */}
                  <motion.article 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={revealContainer}
                    className="flex flex-col group cursor-pointer relative overflow-hidden"
                  >
                    <motion.div variants={revealItem} className="w-full aspect-[4/3] bg-card-bg mb-3 bg-cover bg-center relative overflow-hidden cinematic-overlay">
                      <CinematicImage src="https://lh3.googleusercontent.com/aida-public/AB6AXuDo48flFPWh_ZuH-eY3jQX0ouNTngrTniP472zOeib3qJu25LHJ2YZLp7DJQ_z3kPyThiOr9j0aZng_tZIiIgkrDDt5_HLVVXMCCMPxP7_lSs_asyrMpzos9p8kkI4cSnwC9nQx44xNV_kiMXxqCST_MiTu1iWhXAti92nldZ4OvPL2wKVAkrw6AJ127ydd0XqN7Ort6E5oUTo-SQmkDP8bwDV6tD7lSxtGLsrH6zpQCsvTlvTKaR9Iw60t3cBFql365mzyl-sj6fZ6" alt="Letters" />
                    </motion.div>
                    <motion.span variants={revealItem} className="font-sans text-[9px] text-beige uppercase tracking-[0.1em] font-medium mb-1">Growth</motion.span>
                    <motion.h5 variants={revealItem} className="font-serif text-lg text-cream card-title-transition group-hover:text-beige leading-[1.2] mb-2">Letters to My Younger Self</motion.h5>
                    <motion.p variants={revealItem} className="font-sans text-[11px] text-cream/70 line-clamp-2 mb-3">Reflecting on the advice I wish I had known ten years ago, and learning to forgive past mistakes.</motion.p>
                    <motion.div variants={revealItem} className="flex justify-between items-center text-beige opacity-80 mt-auto pt-2 border-t border-border-muted/30">
                      <span className="font-sans text-[10px]">Oct 12 • 5 min</span>
                      <div className="flex items-center space-x-2 text-[12px]">
                        <Heart className="w-3 h-3 hover:text-cream cursor-pointer" />
                        <MessageSquare className="w-3 h-3 hover:text-cream cursor-pointer" />
                      </div>
                    </motion.div>
                  </motion.article>

                  {/* Entry 2 */}
                  <motion.article 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={revealContainer}
                    className="flex flex-col group cursor-pointer relative overflow-hidden"
                  >
                    <motion.div variants={revealItem} className="w-full aspect-[4/3] bg-card-bg mb-3 bg-cover bg-center relative overflow-hidden cinematic-overlay">
                      <CinematicImage src="https://lh3.googleusercontent.com/aida-public/AB6AXuCFz_iCtUToIVmjv3cs_V_krf71Ur4gr8SVIocoS1XrelEOAro0RyAlfTyUlIKRIt3vPl-C6hq380wIzZUE5pnylELfftRnx-Y6tiVLQ-ONeinyuvBuadsI2HtoB6IS8CKCHHtCe1xCFmHklENeH5ax_jMZDGwdNqBujo2jGmITBA6JpSKT_I3oafvA2BBF9U6glOim12SSkEzTWo_1fbIIoPQ39dNlOeSbYiJT0lOFqa8NodqsGtwQ-QfHrcj4rfrTMcyMMLUsCX9U" alt="Coffee" />
                    </motion.div>
                    <motion.span variants={revealItem} className="font-sans text-[9px] text-beige uppercase tracking-[0.1em] font-medium mb-1">Rituals</motion.span>
                    <motion.h5 variants={revealItem} className="font-serif text-lg text-cream card-title-transition group-hover:text-beige leading-[1.2] mb-2">The Ritual of Morning Coffee</motion.h5>
                    <motion.p variants={revealItem} className="font-sans text-[11px] text-cream/70 line-clamp-2 mb-3">How a simple daily habit can ground us before the chaos of the day begins.</motion.p>
                    <motion.div variants={revealItem} className="flex justify-between items-center text-beige opacity-80 mt-auto pt-2 border-t border-border-muted/30">
                      <span className="font-sans text-[10px]">Oct 05 • 3 min</span>
                      <div className="flex items-center space-x-2 text-[12px]">
                        <Heart className="w-3 h-3 hover:text-cream cursor-pointer" />
                        <MessageSquare className="w-3 h-3 hover:text-cream cursor-pointer" />
                      </div>
                    </motion.div>
                  </motion.article>

                  {/* Entry 3 */}
                  <motion.article 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={revealContainer}
                    className="flex flex-col group cursor-pointer relative overflow-hidden"
                  >
                    <motion.div variants={revealItem} className="w-full aspect-[4/3] bg-card-bg mb-3 bg-cover bg-center relative overflow-hidden cinematic-overlay">
                      <CinematicImage src="https://lh3.googleusercontent.com/aida-public/AB6AXuBDDnBs05Xo3dvr6yYV2MJNTAPqyVOZ9tDseLJ58Q6IMBPjWvp6SSgK7sxyz1Ml6gJxT9F_yLoM3N1r1cExS7QmQmnhoL8cE9m6Mf0NTl1tgu_yB_pZ-a0WysYboFEzGaeZzk3ELHj4jK59L3laoqjUz_tv_hAQrr_CxaJaAPbDgirddHJZ9AjsT26j1bdTbhkYAMADIAtVyU1YXCFFxnGxKyWqh4hq0ysYD0fuXJF11R-LKPgAiD7D1VK6oAllI-0pSor7UryJhOZx" alt="Autumn path" />
                    </motion.div>
                    <motion.span variants={revealItem} className="font-sans text-[9px] text-beige uppercase tracking-[0.1em] font-medium mb-1">Nature</motion.span>
                    <motion.h5 variants={revealItem} className="font-serif text-lg text-cream card-title-transition group-hover:text-beige leading-[1.2] mb-2">Embracing the Changing Seasons</motion.h5>
                    <motion.p variants={revealItem} className="font-sans text-[11px] text-cream/70 line-clamp-2 mb-3">Finding beauty in transition and letting go, just as the leaves fall from the trees.</motion.p>
                    <motion.div variants={revealItem} className="flex justify-between items-center text-beige opacity-80 mt-auto pt-2 border-t border-border-muted/30">
                      <span className="font-sans text-[10px]">Sep 28 • 8 min</span>
                      <div className="flex items-center space-x-2 text-[12px]">
                        <Heart className="w-3 h-3 hover:text-cream cursor-pointer" />
                        <MessageSquare className="w-3 h-3 hover:text-cream cursor-pointer" />
                      </div>
                    </motion.div>
                  </motion.article>

                </div>

                <div className="flex justify-center mt-8">
                  <a
                    href="#recent-essays"
                    className="border border-border-muted text-cream px-6 py-2 font-sans text-xs uppercase tracking-wider hover:bg-card-bg transition-colors duration-300"
                  >
                    See All Entries
                  </a>
                </div>
              </div>

              {/* Popular Essays Stack */}
              <div className="flex flex-col p-8 border-t border-border-muted">
                <h4 className="font-sans text-[10px] text-beige uppercase tracking-[0.15em] font-medium border-b border-border-muted pb-2 mb-6">
                  Popular Essays
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <motion.article 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={revealContainer}
                    className="flex flex-col group cursor-pointer relative overflow-hidden"
                  >
                    <motion.h3 variants={revealItem} className="font-serif text-3xl text-cream group-hover:text-beige card-title-transition leading-[1.1] mb-4">
                      The Quiet Courage of Starting Over
                    </motion.h3>
                    <motion.p variants={revealItem} className="font-sans text-sm text-cream/70 leading-[1.6] mb-4">
                      Sometimes the bravest thing we can do is admit that we are on the wrong path, and have the strength to begin again.
                    </motion.p>
                    <motion.a variants={revealItem} href="#popular-stories" className="font-sans text-[11px] text-beige opacity-80 hover:text-cream transition-colors duration-300">
                      Read Essay →
                    </motion.a>
                  </motion.article>

                  <motion.article 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={revealContainer}
                    className="flex flex-col group cursor-pointer relative overflow-hidden"
                  >
                    <motion.h3 variants={revealItem} className="font-serif text-3xl text-cream group-hover:text-beige card-title-transition leading-[1.1] mb-4">
                      In Defense of Mediocrity
                    </motion.h3>
                    <motion.p variants={revealItem} className="font-sans text-sm text-cream/70 leading-[1.6] mb-4">
                      Why the relentless pursuit of excellence is exhausting, and how finding joy in being just &apos;okay&apos; can set us free.
                    </motion.p>
                    <motion.a variants={revealItem} href="#popular-stories" className="font-sans text-[11px] text-beige opacity-80 hover:text-cream transition-colors duration-300">
                      Read Essay →
                    </motion.a>
                  </motion.article>
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN (25% Width) - Sidebar Widgets */}
            <div className="flex flex-col bg-charcoal relative z-10">
              <div className="sticky top-[80px]">
                
                {/* Author Sidebar */}
                <div className="p-6 border-b border-border-muted flex flex-col items-center text-center shadow-[0_0_50px_rgba(169,141,123,0.015)]">
                  <div className="w-24 h-24 rounded-full overflow-hidden border border-border-muted mb-4 relative cinematic-overlay group cursor-pointer">
                    <img
                      alt="A Mind Full of Margins Logo"
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 card-image-transition"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAd5hbeEys4swuXyv-km07QcTtbRv6-5_lLKSPD_OOmHm_7J74GfSjobMxj1gwwarW7Fka_JgewkrhbKiE5AV_w7sojt6rJeBJ8rU_xAoNhKK-u4cgdCr_qoypokzNNKcbeBNNIJRA_mP2Gg9_VF081Sz_uPa6YDldNiOUxzAGDrl2Bj9AfP6xC3RiSOCkDDmqCru71ma2mZSrh9QOOwJEPRww59Knj1XbvIws3O3EdqE7X-bDyQDXdI4FFADUFYkaW2qubW4FSmG9J"
                    />
                  </div>
                  
                  <h4 className="font-serif text-2xl text-cream mb-2">A Mind Full of Margins</h4>
                  <p className="font-sans text-xs text-cream/70 mb-6">Exploring the spaces between thoughts, books, and everyday life.</p>
                  
                  <form onSubmit={(e) => e.preventDefault()} className="flex flex-col space-y-3 w-full">
                    <input
                      className="bg-card-bg text-cream border border-border-muted rounded-none px-3 py-2 font-sans text-xs focus:outline-none focus:border-beige w-full placeholder-cream/30 transition-colors duration-300"
                      placeholder="Email Address"
                      type="email"
                      required
                    />
                    <button
                      className="bg-beige text-charcoal font-sans text-[10px] font-semibold uppercase tracking-[0.1em] py-2 w-full hover:bg-cream hover:text-charcoal transition-colors duration-500 shadow-md"
                      type="submit"
                    >
                      Subscribe
                    </button>
                  </form>
                </div>

                {/* Recommendations */}
                <div className="p-6 border-b border-border-muted">
                  <h4 className="font-sans text-[10px] text-beige uppercase tracking-[0.15em] font-medium border-b border-border-muted pb-2 mb-4">
                    Recommendations
                  </h4>
                  
                  <ul className="space-y-4">
                    <li className="flex items-center space-x-3 group cursor-pointer">
                      <div className="w-8 h-8 rounded-full bg-card-bg border border-border-muted flex-shrink-0 group-hover:bg-beige transition-colors duration-500 flex items-center justify-center font-serif text-xs font-bold text-beige group-hover:text-charcoal">
                        D
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="font-serif text-sm text-cream leading-tight group-hover:text-beige transition-colors duration-300 truncate">The Daily Stoic</span>
                        <span className="font-sans text-[10px] text-cream/50 truncate">Ancient wisdom for everyday life.</span>
                      </div>
                    </li>
                    
                    <li className="flex items-center space-x-3 group cursor-pointer">
                      <div className="w-8 h-8 rounded-full bg-card-bg border border-border-muted flex-shrink-0 group-hover:bg-beige transition-colors duration-500 flex items-center justify-center font-serif text-xs font-bold text-beige group-hover:text-charcoal">
                        B
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="font-serif text-sm text-cream leading-tight group-hover:text-beige transition-colors duration-300 truncate">Brain Pickings</span>
                        <span className="font-sans text-[10px] text-cream/50 truncate">An inventory of cross-disciplinary meaning.</span>
                      </div>
                    </li>

                    <li className="flex items-center space-x-3 group cursor-pointer">
                      <div className="w-8 h-8 rounded-full bg-card-bg border border-border-muted flex-shrink-0 group-hover:bg-beige transition-colors duration-500 flex items-center justify-center font-serif text-xs font-bold text-beige group-hover:text-charcoal">
                        F
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="font-serif text-sm text-cream leading-tight group-hover:text-beige transition-colors duration-300 truncate font-medium">Farnam Street</span>
                        <span className="font-sans text-[10px] text-cream/50 truncate font-light">Master the best of what other people have already figured out.</span>
                      </div>
                    </li>
                  </ul>
                </div>

                {/* Trending / Most Read List */}
                <div className="flex flex-col p-6">
                  <h4 className="font-sans text-[10px] text-beige uppercase tracking-[0.15em] font-medium border-b border-border-muted pb-2 mb-4">
                    Most Read
                  </h4>
                  
                  <ol className="space-y-0">
                    <li className="group cursor-pointer border-b border-border-muted last:border-0 py-3 first:pt-0">
                      <span className="font-serif text-sm text-beige italic block mb-1 opacity-80 group-hover:opacity-100 transition-opacity">I.</span>
                      <h5 className="font-serif text-xl text-cream group-hover:text-beige transition-colors duration-300 leading-[1.15] tracking-tight">The Joy of Missing Out</h5>
                    </li>
                    <li className="group cursor-pointer border-b border-border-muted last:border-0 py-3">
                      <span className="font-serif text-sm text-beige italic block mb-1 opacity-80 group-hover:opacity-100 transition-opacity">II.</span>
                      <h5 className="font-serif text-xl text-cream group-hover:text-beige transition-colors duration-300 leading-[1.15] tracking-tight">Navigating Grief with Grace</h5>
                    </li>
                    <li className="group cursor-pointer border-b border-border-muted last:border-0 py-3">
                      <span className="font-serif text-sm text-beige italic block mb-1 opacity-80 group-hover:opacity-100 transition-opacity">III.</span>
                      <h5 className="font-serif text-xl text-cream group-hover:text-beige transition-colors duration-300 leading-[1.15] tracking-tight">The Healing Power of Nostalgia</h5>
                    </li>
                    <li className="group cursor-pointer border-b border-border-muted last:border-0 py-3">
                      <span className="font-serif text-sm text-beige italic block mb-1 opacity-80 group-hover:opacity-100 transition-opacity">IV.</span>
                      <h5 className="font-serif text-xl text-cream group-hover:text-beige transition-colors duration-300 leading-[1.15] tracking-tight">Unplugging for the Weekend</h5>
                    </li>
                    <li className="group cursor-pointer border-b border-border-muted last:border-0 py-3">
                      <span className="font-serif text-sm text-beige italic block mb-1 opacity-80 group-hover:opacity-100 transition-opacity">V.</span>
                      <h5 className="font-serif text-xl text-cream group-hover:text-beige transition-colors duration-300 leading-[1.15] tracking-tight">Cherishing Small Moments</h5>
                    </li>
                  </ol>
                </div>

              </div>
            </div>

          </div>

          {/* SECTION 2: REFLECTIONS (Masonry Layout) - Below Hero Grid */}
          <section id="reflections" className="py-20 border-b border-border-muted bg-charcoal relative z-10">
            <div className="px-6 md:px-12">
              <div className="mb-12 text-center space-y-3">
                <span className="font-sans text-[10px] text-beige uppercase tracking-[0.25em] font-semibold block">
                  Sanctuary Notes
                </span>
                <h2 className="font-serif text-3xl font-normal italic">
                  Reflections &amp; Fragments
                </h2>
                <div className="w-12 h-[1px] bg-beige/30 mx-auto mt-2"></div>
              </div>

              <div className="masonry-grid">
                
                {/* Masonry Card 1: Text Quote */}
                <motion.div 
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={revealContainer}
                  className="masonry-item border border-border-muted p-6 bg-card-bg/15 hover:bg-card-bg/25 transition-all duration-300 relative overflow-hidden"
                >
                  <motion.span variants={revealItem} className="font-serif text-4xl text-beige/30 block mb-2 font-light">“</motion.span>
                  <motion.p variants={revealItem} className="font-serif text-lg italic leading-relaxed text-cream/90 font-light">
                    To read is to light a candle in the dark pages of memory. We wait for the moments where the text ends and the real reading begins.
                  </motion.p>
                  <div className="w-8 h-[1px] bg-beige/30 my-4"></div>
                  <motion.span variants={revealItem} className="font-sans text-[9px] text-beige uppercase tracking-widest font-semibold block">
                    Notebook entry #142
                  </motion.span>
                </motion.div>

                {/* Masonry Card 2: Image & Text */}
                <motion.div 
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={revealContainer}
                  className="masonry-item border border-border-muted p-6 bg-card-bg/15 hover:bg-card-bg/25 transition-all duration-300 group relative overflow-hidden"
                >
                  <motion.div variants={revealItem} className="aspect-[4/3] bg-dark-bg border border-border-muted overflow-hidden mb-4 relative cinematic-overlay">
                    <CinematicImage
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBxJYwXxpp69JWss1y8mcyM_g0SToDSd1XVVnhqALvttGmjUAYKngh0CIdXnxI0ECagP7CGgLzXwmJk5siR6CFZMDwTUmZpaZRhbBB1QWeQA_6y3Abv1RHX2haOShP80d39VsHx4XsnYaePVzFDFg4Nz_KzVt3fV9VvxAO3yZDeClPGyEk2isfzVp8khjyv7tKd7dAmFhdDnSFGlducxPvm2QAaNqtrMcWMw7fTYFbWtpK8q2-muSyKJaK5npAD6UDEPlTF4zYM02F2"
                      alt="Letters in ink"
                    />
                  </motion.div>
                  <motion.span variants={revealItem} className="font-sans text-[9px] text-beige uppercase tracking-widest font-bold block mb-1">Rituals</motion.span>
                  <motion.h4 variants={revealItem} className="font-serif text-lg italic text-cream mb-2 card-title-transition group-hover:text-beige">The Language of Old Books</motion.h4>
                  <motion.p variants={revealItem} className="font-sans text-xs text-cream/70 leading-relaxed">
                    There is a rich tactile history in books that have traveled through multiple hands. The smell of cedar, yellowed margins, and scribbled annotations of past readers.
                  </motion.p>
                </motion.div>

                {/* Masonry Card 3: Short Prose */}
                <motion.div 
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={revealContainer}
                  className="masonry-item border border-border-muted p-6 bg-card-bg/15 hover:bg-card-bg/25 transition-all duration-300 relative overflow-hidden"
                >
                  <motion.span variants={revealItem} className="font-sans text-[9px] text-beige uppercase tracking-widest font-bold block mb-2">Observations</motion.span>
                  <motion.h4 variants={revealItem} className="font-serif text-lg italic text-cream mb-2">The Silence of Early Morning</motion.h4>
                  <motion.p variants={revealItem} className="font-sans text-xs text-cream/70 leading-relaxed">
                    Between the hour of five and six, the world belongs to no one. The light is cool, thin, and slate-gray. In this brief pocket, thoughts remain unhurried, clean of the day&apos;s upcoming noise.
                  </motion.p>
                </motion.div>

                {/* Masonry Card 4: List Card */}
                <motion.div 
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={revealContainer}
                  className="masonry-item border border-border-muted p-6 bg-card-bg/15 hover:bg-card-bg/25 transition-all duration-300 relative overflow-hidden"
                >
                  <motion.span variants={revealItem} className="font-sans text-[9px] text-beige uppercase tracking-widest font-bold block mb-3">Quiet Practice</motion.span>
                  <motion.h4 variants={revealItem} className="font-serif text-lg italic text-cream mb-3">Three Rituals for Quiet Evenings</motion.h4>
                  <ul className="space-y-2.5 font-sans text-xs text-cream/80">
                    <motion.li variants={revealItem} className="flex items-baseline space-x-2">
                      <span className="text-beige font-serif font-bold">1.</span>
                      <span>Soft illumination: replace overhead electric fixtures with simple beeswax candles.</span>
                    </motion.li>
                    <motion.li variants={revealItem} className="flex items-baseline space-x-2">
                      <span className="text-beige font-serif font-bold">2.</span>
                      <span>Loose-leaf infusions: brew chamomile or lavender and hold the warm ceramic.</span>
                    </motion.li>
                    <motion.li variants={revealItem} className="flex items-baseline space-x-2">
                      <span className="text-beige font-serif font-bold">3.</span>
                      <span>Unplugged writing: review the day using a steel nib fountain pen on cotton paper.</span>
                    </motion.li>
                  </ul>
                </motion.div>

                {/* Masonry Card 5: Image & Short Poetry */}
                <motion.div 
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={revealContainer}
                  className="masonry-item border border-border-muted p-6 bg-card-bg/15 hover:bg-card-bg/25 transition-all duration-300 group relative overflow-hidden"
                >
                  <motion.div variants={revealItem} className="aspect-[3/4] bg-dark-bg border border-border-muted overflow-hidden mb-4 relative cinematic-overlay">
                    <CinematicImage
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDgvf-LDaj3OnAu-ZjXCmg3ggbbsQSx_e4j8wFt8hpivR5kdZknYEFRFDRtdBmDnC0f7db2yXWT9LMJV0PUaxw-DKkwY73kFRsHiekjMKtibjOk14F8PJS7MDMZ2BQmYiVBFPUQJi24YNq94Bti_TKw2O7ZPDoM-YgGXDSbNI1FgBIlNuJUY7LpGc0SlOV6NbmMHhesNGJqE-2kzknohernARbVHArcn9LRgm2J39HC93ufl1PIu_KZe-Xre39WKwgklThZtZYXkX9S"
                      alt="Solitary tree in nature"
                    />
                  </motion.div>
                  <motion.span variants={revealItem} className="font-sans text-[9px] text-beige uppercase tracking-widest font-bold block mb-1">Poetics</motion.span>
                  <motion.p variants={revealItem} className="font-serif italic text-sm text-cream/90 leading-relaxed">
                    &ldquo;Let the year slide into its borders.<br />
                    The leaves hold no remorse for falling.<br />
                    They rest where they land,<br />
                    making margins of the ground.&rdquo;
                  </motion.p>
                </motion.div>

                {/* Masonry Card 6: Small Review block */}
                <motion.div 
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={revealContainer}
                  className="masonry-item border border-border-muted p-6 bg-card-bg/15 hover:bg-card-bg/25 transition-all duration-300 relative overflow-hidden"
                >
                  <motion.span variants={revealItem} className="font-sans text-[9px] text-beige uppercase tracking-widest font-bold block mb-2">Reading List</motion.span>
                  <motion.h4 variants={revealItem} className="font-serif text-lg italic text-cream mb-2">Epictetus&apos; Discourses</motion.h4>
                  <motion.p variants={revealItem} className="font-sans text-xs text-cream/70 leading-relaxed">
                    A timeless manual on focus and internal liberty. Recalled in small passages, its fragments serve as anchors when the external noise of modern productivity becomes overwhelming.
                  </motion.p>
                  <motion.a variants={revealItem} href="#" className="font-sans text-[9px] text-beige uppercase tracking-widest font-bold mt-3 inline-block border-b border-beige/40 pb-0.5 hover:text-cream transition-colors duration-300">
                    View Book Log →
                  </motion.a>
                </motion.div>
              </div>
            </div>
          </section>

          {/* SECTION 3: POPULAR STORIES (Magazine Card Layout) */}
          <section id="popular-stories" className="py-20 border-b border-border-muted bg-dark-bg/15 relative z-10">
            <div className="px-6 md:px-12">
              <div className="flex justify-between items-end mb-12">
                <div className="space-y-2">
                  <span className="font-sans text-[10px] text-beige uppercase tracking-[0.2em] font-semibold block">
                    Most Appreciated
                  </span>
                  <h2 className="font-serif text-3xl font-normal italic">
                    Popular Stories
                  </h2>
                </div>
                <span className="font-sans text-xs text-cream/40 italic">
                  Selected by our readers
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                {/* Popular story 1 */}
                <motion.article 
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={revealContainer}
                  className="border border-border-muted p-8 bg-charcoal flex flex-col justify-between space-y-6 hover:border-beige/30 transition-all duration-500 group relative overflow-hidden"
                >
                  <div className="card-hover-overlay" />
                  <div className="space-y-4 relative z-10">
                    <div className="flex items-center space-x-2 text-[9px] font-sans uppercase tracking-widest text-beige font-semibold">
                      <span>Philosophy</span>
                      <span>•</span>
                      <span className="text-cream/50">8 Min Read</span>
                    </div>
                    <motion.h3 variants={revealItem} className="font-serif text-2xl md:text-3xl text-cream card-title-transition group-hover:text-beige leading-tight">
                      The Quiet Courage of Starting Over
                    </motion.h3>
                    <motion.p variants={revealItem} className="font-sans text-xs text-cream/70 leading-relaxed">
                      Sometimes the bravest thing we can do is admit that we are on the wrong path, and have the strength to begin again. A philosophical exploration of letting go of sunk costs in career, relationships, and identity.
                    </motion.p>
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-border-muted/30 relative z-10">
                    <span className="font-sans text-[10px] text-cream/40">By Eleanor Thorne</span>
                    <a href="#" className="font-sans text-[10px] text-beige group-hover:text-cream transition-colors duration-300 uppercase tracking-widest font-semibold flex items-center gap-1">
                      Read Essay <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </motion.article>

                {/* Popular story 2 */}
                <motion.article 
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={revealContainer}
                  className="border border-border-muted p-8 bg-charcoal flex flex-col justify-between space-y-6 hover:border-beige/30 transition-all duration-500 group relative overflow-hidden"
                >
                  <div className="card-hover-overlay" />
                  <div className="space-y-4 relative z-10">
                    <div className="flex items-center space-x-2 text-[9px] font-sans uppercase tracking-widest text-beige font-semibold">
                      <span>Slow Living</span>
                      <span>•</span>
                      <span className="text-cream/50">6 Min Read</span>
                    </div>
                    <motion.h3 variants={revealItem} className="font-serif text-2xl md:text-3xl text-cream card-title-transition group-hover:text-beige leading-tight">
                      In Defense of Mediocrity
                    </motion.h3>
                    <motion.p variants={revealItem} className="font-sans text-xs text-cream/70 leading-relaxed">
                      Why the relentless pursuit of excellence is exhausting, and how finding joy in being just &ldquo;okay&rdquo; can set us free. Learning to enjoy hobbies, crafts, and reading without the pressure to monetize or master them.
                    </motion.p>
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-border-muted/30 relative z-10">
                    <span className="font-sans text-[10px] text-cream/40">By Rishika Shukla</span>
                    <a href="#" className="font-sans text-[10px] text-beige group-hover:text-cream transition-colors duration-300 uppercase tracking-widest font-semibold flex items-center gap-1">
                      Read Essay <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </motion.article>
              </div>
            </div>
          </section>

          {/* SECTION 4: QUOTE BLOCK */}
          <section id="quote-block" className="py-24 bg-dark-bg/30 text-center relative overflow-hidden border-b border-border-muted z-10">
            {/* Decorative watermark inside the quote */}
            <div className="absolute top-[40%] left-[10%] font-serif text-[10vw] text-cream/[0.01] pointer-events-none select-none">
              “
            </div>
            <div className="absolute bottom-[40%] right-[10%] font-serif text-[10vw] text-cream/[0.01] pointer-events-none select-none">
              ”
            </div>
            
            <div className="max-w-[900px] mx-auto px-6 relative z-10 space-y-6">
              <span className="font-serif text-5xl text-beige/30 block font-light leading-none">“</span>
              
              <p className="font-serif text-2xl md:text-3xl lg:text-[34px] italic leading-relaxed text-cream/90 font-light max-w-3xl mx-auto">
                We live in the margins of our own lives, waiting for the moments where the text ends and the real reading begins.
              </p>
              
              <div className="w-16 h-[1px] bg-beige/30 mx-auto my-6"></div>
              
              <span className="font-sans text-[10px] text-beige uppercase tracking-[0.25em] font-semibold block">
                Editorial Note • Issue I, Margins
              </span>
            </div>
          </section>

          {/* SECTION 5: NEWSLETTER BANNER */}
          <section id="newsletter" className="py-20 bg-dark-bg/60 relative overflow-hidden z-10">
            {/* Subtle grid background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

            <div className="max-w-[750px] mx-auto px-6 relative z-10 text-center space-y-8 flex flex-col items-center shadow-[0_0_80px_rgba(169,141,123,0.025)] bg-gradient-to-br from-card-bg/20 to-transparent p-12 border border-border-muted/30">
              <div className="space-y-3">
                <span className="font-sans text-[10px] text-beige uppercase tracking-[0.25em] font-semibold block animate-pulse">
                  Correspondence
                </span>
                <h2 className="font-serif text-3xl md:text-4xl font-normal italic">
                  Join the Conversations
                </h2>
                <p className="font-sans text-sm text-cream/70 font-light leading-relaxed max-w-md mx-auto">
                  Subscribe to receive weekly essays, literary reflections, and slow living recommendation roundups directly in your inbox.
                </p>
              </div>

              <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-3 w-full max-w-md relative z-10">
                <input
                  type="email"
                  placeholder="Email address"
                  className="bg-charcoal text-cream border border-border-muted rounded-none px-4 py-3 font-sans text-sm flex-grow focus:outline-none focus:border-beige placeholder-cream/30 transition-all duration-300"
                  required
                />
                <button
                  type="submit"
                  className="bg-beige text-charcoal hover:bg-cream hover:text-charcoal font-sans text-xs font-semibold uppercase tracking-widest px-8 py-3 transition-colors duration-500 shadow-md hover:shadow-lg whitespace-nowrap"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </section>

        </main>
      </motion.div>

      <Footer />
    </div>
  );
}
