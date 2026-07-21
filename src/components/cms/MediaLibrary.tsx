"use client";

import React, { useState } from "react";
import { Upload, Search, Trash2, Image as ImageIcon, Link, Check } from "lucide-react";

interface MediaItem {
  id: string;
  name: string;
  url: string;
  size: string;
  alt: string;
  date: string;
}

export default function MediaLibrary() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedImage, setSelectedImage] = useState<MediaItem | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const [mediaItems, setMediaItems] = useState<MediaItem[]>([
    {
      id: "1",
      name: "Featured Conversation Cafe",
      url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDhX8qUCiTfZSN26eOcbboAAXYxuzANWuftg8n_HWZDKmbQLqe7gM0jQO3lkolFKVxHEQp7JmwssRCEUnvQl0m1SowUX0M6hlJSkhHJgGH0ZDH17Qu4-6sP0mIvCL68KaTPfBvSon9cVkya1a-5tNmzffOTOUEYHE8SedlKP3IgTfk2A5ZNmeGHnVMqZSglV443Mv15U9NgOza6U9NiDJJ8XwNQBERAhYzNYdh_FA41JJuJqTYTtc1aVr98TtZE2oZa0a6rlxyC9JNX",
      size: "242 KB",
      alt: "Two women engaged in deep conversation over coffee at a rustic library table",
      date: "Jul 05, 2026",
    },
    {
      id: "2",
      name: "Candlelight Journaling",
      url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCSlY5u3zZwsyg8ExocyGG7c1Ddd6CmL7IEpv9i0DwRsCycfhepbdRuzIHkaXWtAmsUlMyb8GCLqZW9MxAkDQhEKrMkzwLA3qXXk7B4UlO3_CuI0-he5OrY1plcg5nzbaJu-OuMLtsD-tP3UB5ONmQILh9X4AHs-G56qTRF736GGeMhfFehINze2orVq10vckgmHmSbcnrBmJaJVVp6eaR4qQRMRjIKzPr9_cI-lforq8CSss7oZ5Jz5ELRaSGNN631mVkTgH6bUJH-",
      size: "185 KB",
      alt: "Hands holding a steel nib fountain pen writing on a leather-bound journal",
      date: "Jul 03, 2026",
    },
    {
      id: "3",
      name: "Coffee & Listen",
      url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBxC-4qWt553XCeI03wG65RF3JId2cHBmFzPt_2qdWOyI5byegwitM2YJRw-FZE3dEChGLVS5V5w1-Q-SYhlAV-R1S5gDXlm9kxoeAm4A7XWyCCVW0hrSI276-uA3SFkas4VZg6SbIuWbeVuib2gkw0NYV3rba1JerJ6NUiuRotmRyM_T1uSxL72ZQIvotsrc9KLFZkpUQSJAO3uWq1LAGdhyAZJrQLooGsY9vNx5aTM_I6RkW3hT-5Qnqp85hAKWL0MAQK2mfeWVT8",
      size: "198 KB",
      alt: "Close up of hot coffee mug with notebook on dark wooden tabletop background",
      date: "Jun 28, 2026",
    },
    {
      id: "4",
      name: "Quiet Autumn Path",
      url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBDDnBs05Xo3dvr6yYV2MJNTAPqyVOZ9tDseLJ58Q6IMBPjWvp6SSgK7sxyz1Ml6gJxT9F_yLoM3N1r1cExS7QmQmnhoL8cE9m6Mf0NTl1tgu_yB_pZ-a0WysYboFEzGaeZzk3ELHj4jK59L3laoqjUz_tv_hAQrr_CxaJaAPbDgirddHJZ9AjsT26j1bdTbhkYAMADIAtVyU1YXCFFxnGxKyWqh4hq0ysYD0fuXJF11R-LKPgAiD7D1VK6oAllI-0pSor7UryJhOZx",
      size: "310 KB",
      alt: "Golden sunlight filtering through trees onto a forest trail covered in yellow leaves",
      date: "Jun 25, 2026",
    },
  ]);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    // Simulate drop upload
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const newItem: MediaItem = {
        id: Math.random().toString(),
        name: file.name.split(".")[0],
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCFz_iCtUToIVmjv3cs_V_krf71Ur4gr8SVIocoS1XrelEOAro0RyAlfTyUlIKRIt3vPl-C6hq380wIzZUE5pnylELfftRnx-Y6tiVLQ-ONeinyuvBuadsI2HtoB6IS8CKCHHtCe1xCFmHklENeH5ax_jMZDGwdNqBujo2jGmITBA6JpSKT_I3oafvA2BBF9U6glOim12SSkEzTWo_1fbIIoPQ39dNlOeSbYiJT0lOFqa8NodqsGtwQ-QfHrcj4rfrTMcyMMLUsCX9U",
        size: `${Math.round(file.size / 1024)} KB`,
        alt: file.name,
        date: new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
      };
      setMediaItems([newItem, ...mediaItems]);
      setSelectedImage(newItem);
    }
  };

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const deleteMedia = (id: string) => {
    setMediaItems(mediaItems.filter(item => item.id !== id));
    if (selectedImage?.id === id) {
      setSelectedImage(null);
    }
  };

  const updateAltText = (id: string, altText: string) => {
    setMediaItems(mediaItems.map(item => item.id === id ? { ...item, alt: altText } : item));
    if (selectedImage?.id === id) {
      setSelectedImage({ ...selectedImage, alt: altText });
    }
  };

  const filteredMedia = mediaItems.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.alt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <span className="font-sans text-[10px] text-beige uppercase tracking-[0.2em] font-semibold block mb-1">
          Assets Vault
        </span>
        <h2 className="font-serif text-3xl font-normal italic text-cream">
          Media Library
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Side: Media Upload & Grid (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Drag & Drop Upload Zone */}
          <div 
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            className={`border-2 border-dashed p-8 text-center transition-all duration-300 flex flex-col items-center justify-center space-y-2 cursor-pointer ${
              dragActive 
                ? "border-beige bg-beige/5" 
                : "border-border-muted/60 hover:border-beige/40 bg-card-bg/5"
            }`}
          >
            <Upload className="w-8 h-8 text-beige/80 mb-2" />
            <p className="font-sans text-xs text-cream">
              Drag &amp; Drop media files here, or <span className="text-beige underline">browse files</span>
            </p>
            <p className="font-sans text-[10px] text-cream/40 uppercase tracking-wider">
              Supports JPEG, PNG, MP4 up to 50MB. Integrated with Cloudinary.
            </p>
          </div>

          {/* Search Log & Filter */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cream/40" />
            <input
              type="text"
              placeholder="Search media files..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-card-bg/20 text-cream border border-border-muted rounded-none pl-10 pr-4 py-2.5 font-sans text-xs focus:outline-none focus:border-beige placeholder-cream/30 transition-colors"
            />
          </div>

          {/* Grid Layout of Media */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {filteredMedia.map((item) => {
              const isSelected = selectedImage?.id === item.id;
              return (
                <div 
                  key={item.id}
                  onClick={() => setSelectedImage(item)}
                  className={`aspect-square border cursor-pointer relative overflow-hidden group transition-all duration-300 ${
                    isSelected 
                      ? "border-beige ring-1 ring-beige shadow-md" 
                      : "border-border-muted hover:border-beige/40 bg-card-bg/25"
                  }`}
                >
                  <img src={item.url} alt={item.alt} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-2.5">
                    <span className="font-sans text-[9px] uppercase tracking-wider text-cream truncate w-full">
                      {item.name}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side: Media Meta detail panel (4 cols) */}
        <div className="lg:col-span-4">
          {selectedImage ? (
            <div className="border border-border-muted bg-card-bg/10 p-6 space-y-5 sticky top-[80px]">
              <h4 className="font-serif text-lg italic text-cream border-b border-border-muted/30 pb-2">
                Attachment Details
              </h4>

              {/* Thumbnail */}
              <div className="aspect-[16/10] bg-dark-bg border border-border-muted overflow-hidden relative cinematic-overlay">
                <img src={selectedImage.url} alt={selectedImage.alt} className="w-full h-full object-cover" />
              </div>

              {/* Info Log */}
              <div className="space-y-1.5 font-sans text-xs text-cream/70 border-b border-border-muted/20 pb-4">
                <div className="flex justify-between">
                  <span className="text-cream/40">File Name:</span>
                  <span className="truncate max-w-[180px] font-medium text-cream">{selectedImage.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-cream/40">Size:</span>
                  <span className="font-medium text-cream">{selectedImage.size}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-cream/40">Uploaded:</span>
                  <span className="font-medium text-cream">{selectedImage.date}</span>
                </div>
              </div>

              {/* Copy URL trigger */}
              <div className="space-y-1.5">
                <label className="font-sans text-[10px] uppercase tracking-wider text-cream/40">Asset URL</label>
                <div className="flex space-x-1">
                  <input
                    type="text"
                    value={selectedImage.url}
                    readOnly
                    className="w-full bg-charcoal text-cream/50 border border-border-muted rounded-none px-3 py-2 font-sans text-[10px] focus:outline-none"
                  />
                  <button
                    onClick={() => copyUrl(selectedImage.url)}
                    className="p-2 border border-border-muted hover:border-beige/40 bg-card-bg text-cream/70 hover:text-cream transition-colors flex-shrink-0"
                    title="Copy URL"
                  >
                    {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Link className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Alt Text Area */}
              <div className="space-y-1.5">
                <label className="font-sans text-[10px] uppercase tracking-wider text-cream/40">Alternative Text</label>
                <textarea
                  value={selectedImage.alt}
                  onChange={(e) => updateAltText(selectedImage.id, e.target.value)}
                  rows={3}
                  className="w-full bg-charcoal text-cream border border-border-muted rounded-none px-3 py-2 font-sans text-xs focus:outline-none focus:border-beige placeholder-cream/30 transition-colors resize-none"
                  placeholder="Describe image for screen readers..."
                />
              </div>

              {/* Actions */}
              <button
                onClick={() => deleteMedia(selectedImage.id)}
                className="w-full border border-red-500/30 hover:bg-red-500/10 text-red-400 font-sans text-[10px] font-semibold uppercase tracking-wider py-2 flex items-center justify-center space-x-1.5 transition-colors duration-300"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Asset</span>
              </button>
            </div>
          ) : (
            <div className="border border-border-muted border-dashed bg-card-bg/5 p-8 text-center flex flex-col items-center justify-center space-y-2 h-64 sticky top-[80px]">
              <ImageIcon className="w-7 h-7 text-cream/20" />
              <p className="font-sans text-xs text-cream/40">Select an asset thumbnail to view and edit details.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
