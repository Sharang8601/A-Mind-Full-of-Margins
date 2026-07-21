"use client";

import React, { useState } from "react";
import { ArrowUp, ArrowDown, Move, HelpCircle, AlertCircle, Save } from "lucide-react";

interface HomepageSection {
  id: string;
  name: string;
  desc: string;
  status: "Active" | "Hidden";
}

export default function HomepageBuilder() {
  const [sections, setSections] = useState<HomepageSection[]>([
    { id: "hero", name: "Featured Cover Story", desc: "Large 50% width main story with left vertical cards and right sidebar widgets.", status: "Active" },
    { id: "recent", name: "Section 1: Recent Essays", desc: "3-column grid displaying the latest entries chronologically.", status: "Active" },
    { id: "reflections", name: "Section 2: Reflections & Fragments", desc: "Masonry column grid for micro-thoughts, lists, and pull quotes.", status: "Active" },
    { id: "popular", name: "Section 3: Popular Stories", desc: "Alternating magazine grid card layouts for reader favorites.", status: "Active" },
    { id: "quote", name: "Section 4: Pull-Quote Callout", desc: "Full width print-aesthetic quotation banner.", status: "Active" },
    { id: "newsletter", name: "Section 5: Newsletter Correspondence", desc: "Centered email capture banner with glowing backlights.", status: "Active" },
  ]);

  const [heroTitle, setHeroTitle] = useState("Finding Comfort in the In-Between");
  const [sidebarDesc, setSidebarDesc] = useState("Exploring the spaces between thoughts, books, and everyday life.");
  const [isSaved, setIsSaved] = useState(false);

  // Move element up in array
  const moveUp = (index: number) => {
    if (index === 0) return;
    const updated = [...sections];
    const temp = updated[index];
    updated[index] = updated[index - 1];
    updated[index - 1] = temp;
    setSections(updated);
  };

  // Move element down in array
  const moveDown = (index: number) => {
    if (index === sections.length - 1) return;
    const updated = [...sections];
    const temp = updated[index];
    updated[index] = updated[index + 1];
    updated[index + 1] = temp;
    setSections(updated);
  };

  // Toggle visible status
  const toggleStatus = (id: string) => {
    setSections(sections.map(sec => 
      sec.id === id 
        ? { ...sec, status: sec.status === "Active" ? "Hidden" : "Active" } 
        : sec
    ));
  };

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex justify-between items-end">
        <div>
          <span className="font-sans text-[10px] text-beige uppercase tracking-[0.2em] font-semibold block mb-1">
            Layout Customizer
          </span>
          <h2 className="font-serif text-3xl font-normal italic text-cream">
            Homepage Builder
          </h2>
        </div>
        
        <button
          onClick={handleSave}
          className="bg-beige text-charcoal hover:bg-cream hover:text-charcoal font-sans text-xs font-semibold uppercase tracking-widest px-6 py-2.5 flex items-center space-x-2 transition-all duration-300"
        >
          <Save className="w-4 h-4" />
          <span>{isSaved ? "Saved Layout!" : "Save Layout"}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: Drag & Drop Sections Layout (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="border border-border-muted bg-card-bg/10 p-6 space-y-4">
            <div className="flex justify-between items-center border-b border-border-muted/30 pb-2">
              <h4 className="font-serif text-lg italic text-cream">
                Section Ordering (Grid Flow)
              </h4>
              <span className="font-sans text-[9px] uppercase tracking-wider text-cream/40 flex items-center space-x-1">
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Drag or use arrows to sort</span>
              </span>
            </div>

            {/* List of sections */}
            <div className="space-y-3">
              {sections.map((sec, index) => {
                const isHidden = sec.status === "Hidden";
                return (
                  <div 
                    key={sec.id}
                    className={`border border-border-muted p-4 flex items-center justify-between transition-all duration-300 relative group ${
                      isHidden ? "opacity-40 bg-charcoal/20 border-dashed" : "bg-card-bg/20"
                    }`}
                  >
                    <div className="card-hover-overlay" />
                    
                    {/* Left: Reorder indicator & Details */}
                    <div className="flex items-center space-x-4 relative z-10">
                      <Move className="w-4 h-4 text-cream/30 cursor-grab active:cursor-grabbing flex-shrink-0" />
                      <div className="flex flex-col">
                        <span className="font-serif text-sm font-medium text-cream group-hover:text-beige transition-colors">
                          {sec.name}
                        </span>
                        <span className="font-sans text-[10px] text-cream/40">
                          {sec.desc}
                        </span>
                      </div>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex items-center space-x-3 relative z-10">
                      {/* Hide/Show Toggle */}
                      <button
                        onClick={() => toggleStatus(sec.id)}
                        className={`px-2 py-0.5 border text-[8px] uppercase tracking-widest font-semibold font-sans rounded-none transition-colors ${
                          isHidden 
                            ? "border-red-500/30 text-red-400 hover:bg-red-500/10" 
                            : "border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10"
                        }`}
                      >
                        {sec.status}
                      </button>

                      {/* Sorting Arrows */}
                      <div className="flex flex-col space-y-0.5">
                        <button 
                          onClick={() => moveUp(index)}
                          disabled={index === 0}
                          className="p-1 hover:bg-charcoal text-cream/40 hover:text-beige disabled:opacity-10 transition-colors"
                        >
                          <ArrowUp className="w-3 h-3" />
                        </button>
                        <button 
                          onClick={() => moveDown(index)}
                          disabled={index === sections.length - 1}
                          className="p-1 hover:bg-charcoal text-cream/40 hover:text-beige disabled:opacity-10 transition-colors"
                        >
                          <ArrowDown className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Side: Quick Text Customization (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Featured Content Customizer */}
          <div className="border border-border-muted bg-card-bg/10 p-6 space-y-4">
            <h4 className="font-serif text-lg italic text-cream border-b border-border-muted/30 pb-2">
              Featured Content
            </h4>

            <div className="space-y-4">
              {/* Cover title override */}
              <div className="space-y-1.5">
                <label className="font-sans text-[10px] uppercase tracking-wider text-cream/40">Hero Cover Story Title</label>
                <input
                  type="text"
                  value={heroTitle}
                  onChange={(e) => setHeroTitle(e.target.value)}
                  className="w-full bg-charcoal text-cream border border-border-muted rounded-none px-3 py-2 font-sans text-xs focus:outline-none focus:border-beige transition-colors"
                />
              </div>

              {/* Sidebar subtitle override */}
              <div className="space-y-1.5">
                <label className="font-sans text-[10px] uppercase tracking-wider text-cream/40">Sidebar Description</label>
                <textarea
                  value={sidebarDesc}
                  onChange={(e) => setSidebarDesc(e.target.value)}
                  rows={3}
                  className="w-full bg-charcoal text-cream border border-border-muted rounded-none px-3 py-2 font-sans text-xs focus:outline-none focus:border-beige transition-colors resize-none"
                />
              </div>
            </div>
          </div>

          {/* Warning block about custom layouts */}
          <div className="border border-beige/30 bg-beige/5 p-4 space-y-2 flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-beige flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-serif text-sm italic text-cream font-medium">Layout Safety Notice</span>
              <p className="font-sans text-xs text-cream/70 leading-relaxed font-light">
                Reordering blocks changes structural flow immediately on client browser. Be sure to check margins and spacing consistency between elements to maintain premium editorial pacing.
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
