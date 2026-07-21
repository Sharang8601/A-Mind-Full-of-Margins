import React from "react";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-dark-bg/60 border-t border-border-muted pt-16 pb-12 px-6 md:px-12 w-full">
      <div className="max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand Info */}
          <div className="flex flex-col space-y-4">
            <span className="font-serif text-2xl italic tracking-wide text-cream">
              A Mind Full of Margins
            </span>
            <p className="font-sans text-xs text-cream/60 leading-relaxed max-w-[280px]">
              A premium digital journal dedicated to the exploration of slow living, slow reading, and reflective storytelling.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col space-y-3">
            <h4 className="font-sans text-[10px] text-beige uppercase tracking-[0.2em] font-semibold">
              Magazine
            </h4>
            <a href="#hero" className="font-sans text-xs text-cream/70 hover:text-cream transition-colors duration-300">
              Home Page
            </a>
            <a href="#stories" className="font-sans text-xs text-cream/70 hover:text-cream transition-colors duration-300">
              Featured Stories
            </a>
            <a href="#categories" className="font-sans text-xs text-cream/70 hover:text-cream transition-colors duration-300">
              Journal Categories
            </a>
            <a href="#newsletter" className="font-sans text-xs text-cream/70 hover:text-cream transition-colors duration-300">
              Newsletter
            </a>
          </div>

          {/* Categories */}
          <div className="flex flex-col space-y-3">
            <h4 className="font-sans text-[10px] text-beige uppercase tracking-[0.2em] font-semibold">
              Topics
            </h4>
            <a href="#" className="font-sans text-xs text-cream/70 hover:text-cream transition-colors duration-300">
              Reflections
            </a>
            <a href="#" className="font-sans text-xs text-cream/70 hover:text-cream transition-colors duration-300">
              Slow Living
            </a>
            <a href="#" className="font-sans text-xs text-cream/70 hover:text-cream transition-colors duration-300">
              Personal Growth
            </a>
            <a href="#" className="font-sans text-xs text-cream/70 hover:text-cream transition-colors duration-300">
              Philosophy
            </a>
          </div>

          {/* Socials / External */}
          <div className="flex flex-col space-y-3">
            <h4 className="font-sans text-[10px] text-beige uppercase tracking-[0.2em] font-semibold">
              Follow Us
            </h4>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-xs text-cream/70 hover:text-cream transition-colors duration-300 flex items-center space-x-1"
            >
              <span>Instagram</span>
              <ArrowUpRight className="w-3 h-3 opacity-60" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-xs text-cream/70 hover:text-cream transition-colors duration-300 flex items-center space-x-1"
            >
              <span>Twitter / X</span>
              <ArrowUpRight className="w-3 h-3 opacity-60" />
            </a>
            <a
              href="https://pinterest.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-xs text-cream/70 hover:text-cream transition-colors duration-300 flex items-center space-x-1"
            >
              <span>Pinterest</span>
              <ArrowUpRight className="w-3 h-3 opacity-60" />
            </a>
          </div>
        </div>

        {/* Bottom Panel */}
        <div className="border-t border-border-muted pt-8 flex flex-col md:flex-row justify-between items-center text-cream/40 text-[10px] font-sans tracking-wide">
          <span className="mb-4 md:mb-0">
            © 2026 A Mind Full of Margins. All rights reserved.
          </span>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-cream transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-cream transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
