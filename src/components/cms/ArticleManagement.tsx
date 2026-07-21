"use client";

import React, { useState } from "react";
import { 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  Eye, 
  Calendar, 
  FileText 
} from "lucide-react";

export interface Article {
  id: string;
  title: string;
  slug: string;
  category: string;
  author: string;
  excerpt: string;
  content: string;
  tags: string[];
  readingTime: string;
  status: "Draft" | "Scheduled" | "Published";
  date: string;
  seoTitle?: string;
  seoDesc?: string;
}

interface ArticleManagementProps {
  articles: Article[];
  onAddArticle: () => void;
  onEditArticle: (article: Article) => void;
  onDeleteArticle: (id: string) => void;
  onPreviewArticle: (article: Article) => void;
}

export default function ArticleManagement({ 
  articles, 
  onAddArticle, 
  onEditArticle, 
  onDeleteArticle, 
  onPreviewArticle 
}: ArticleManagementProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | "Draft" | "Scheduled" | "Published">("All");

  const filteredArticles = articles.filter(art => {
    const matchesSearch = 
      art.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      art.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      art.author.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesStatus = statusFilter === "All" || art.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Top Header Row */}
      <div className="flex justify-between items-end">
        <div>
          <span className="font-sans text-[10px] text-beige uppercase tracking-[0.2em] font-semibold block mb-1">
            Publishing Log
          </span>
          <h2 className="font-serif text-3xl font-normal italic text-cream">
            Manage Articles
          </h2>
        </div>
        <button
          onClick={onAddArticle}
          className="bg-beige text-charcoal hover:bg-cream hover:text-charcoal font-sans text-xs font-semibold uppercase tracking-widest px-4 py-2.5 flex items-center space-x-2 transition-colors duration-300"
        >
          <Plus className="w-4 h-4" />
          <span>Write Essay</span>
        </button>
      </div>

      {/* Filters & Search Row */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-card-bg/10 border border-border-muted p-4">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cream/40" />
          <input
            type="text"
            placeholder="Search articles, tags, authors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-charcoal text-cream border border-border-muted rounded-none pl-10 pr-4 py-2 font-sans text-xs focus:outline-none focus:border-beige placeholder-cream/30 transition-colors"
          />
        </div>

        {/* Status Filters */}
        <div className="flex space-x-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          {(["All", "Published", "Draft", "Scheduled"] as const).map((filter) => {
            const isActive = statusFilter === filter;
            return (
              <button
                key={filter}
                onClick={() => setStatusFilter(filter)}
                className={`px-3 py-1.5 font-sans text-[10px] uppercase tracking-wider transition-all duration-300 ${
                  isActive
                    ? "bg-beige/10 border border-beige text-beige"
                    : "border border-border-muted text-cream/60 hover:text-cream hover:border-cream/30"
                }`}
              >
                {filter}
              </button>
            );
          })}
        </div>
      </div>

      {/* Table Log */}
      <div className="border border-border-muted bg-card-bg/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border-muted bg-card-bg/25 text-cream/40 font-sans text-[9px] uppercase tracking-widest">
                <th className="p-4 pl-6 font-semibold">Title</th>
                <th className="p-4 font-semibold">Category</th>
                <th className="p-4 font-semibold">Author</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold">Date</th>
                <th className="p-4 pr-6 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-muted/30 font-sans text-xs text-cream/80">
              {filteredArticles.length > 0 ? (
                filteredArticles.map((art) => {
                  
                  // Status Badge Colors
                  const statusColors = {
                    Published: "bg-emerald-400/10 border-emerald-400/40 text-emerald-400",
                    Draft: "bg-amber-400/10 border-amber-400/40 text-amber-400",
                    Scheduled: "bg-cyan-400/10 border-cyan-400/40 text-cyan-400",
                  };

                  return (
                    <tr 
                      key={art.id} 
                      className="hover:bg-card-bg/10 transition-colors duration-200 group"
                    >
                      {/* Title & Reading Time */}
                      <td className="p-4 pl-6 max-w-xs md:max-w-sm">
                        <div className="flex flex-col">
                          <span 
                            onClick={() => onPreviewArticle(art)}
                            className="font-serif text-sm font-medium text-cream group-hover:text-beige cursor-pointer transition-colors duration-300 truncate"
                          >
                            {art.title}
                          </span>
                          <span className="text-[10px] text-cream/40 flex items-center space-x-1.5 mt-0.5">
                            <FileText className="w-3 h-3" />
                            <span>{art.readingTime}</span>
                          </span>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="p-4">
                        <span className="text-cream/70 font-sans text-[10px] uppercase tracking-wider">
                          {art.category}
                        </span>
                      </td>

                      {/* Author */}
                      <td className="p-4">
                        <span className="text-cream/70 font-medium">
                          {art.author}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="p-4">
                        <span className={`px-2 py-0.5 border text-[9px] uppercase tracking-wider font-semibold rounded-none ${
                          statusColors[art.status]
                        }`}>
                          {art.status}
                        </span>
                      </td>

                      {/* Date */}
                      <td className="p-4">
                        <span className="text-cream/50 flex items-center space-x-1">
                          <Calendar className="w-3.5 h-3.5 text-cream/30" />
                          <span>{art.date}</span>
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="p-4 pr-6 text-right space-x-3">
                        <button
                          onClick={() => onPreviewArticle(art)}
                          className="text-cream/50 hover:text-cream transition-colors duration-300 inline-block"
                          title="Preview"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onEditArticle(art)}
                          className="text-cream/50 hover:text-beige transition-colors duration-300 inline-block"
                          title="Edit"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onDeleteArticle(art.id)}
                          className="text-cream/50 hover:text-red-400 transition-colors duration-300 inline-block"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} className="p-12 text-center text-cream/40 font-sans text-xs">
                    No articles found matching filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
