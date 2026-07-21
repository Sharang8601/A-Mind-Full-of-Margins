"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle } from "lucide-react";

// Import CMS Subcomponents
import Sidebar, { SidebarItem } from "@/components/cms/Sidebar";
import DashboardOverview from "@/components/cms/DashboardOverview";
import ArticleManagement, { Article } from "@/components/cms/ArticleManagement";
import RichTextEditor from "@/components/cms/RichTextEditor";
import MediaLibrary from "@/components/cms/MediaLibrary";
import CategoryManagement from "@/components/cms/CategoryManagement";
import AuthorManagement from "@/components/cms/AuthorManagement";
import HomepageBuilder from "@/components/cms/HomepageBuilder";
import NewsletterManagement from "@/components/cms/NewsletterManagement";
import { SEOPanel, UserManagement, SettingsPanel } from "@/components/cms/AdditionalPanels";

import PaperGrain from "@/components/PaperGrain";
import CandleGlow from "@/components/CandleGlow";

import { useSession, signOut } from "next-auth/react";

interface DashboardPreviewBlock {
  id: string;
  type: string;
  value?: string;
  extra?: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export default function AdminDashboard() {
  const router = useRouter();
  const { data: session, status } = useSession();
  
  // Active Sidebar Panel
  const [activePanel, setActivePanel] = useState<SidebarItem>("Dashboard");
  
  // Editor mode variables
  const [isEditing, setIsEditing] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  
  // Preview modal variables
  const [previewArticle, setPreviewArticle] = useState<Article | null>(null);

  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    if (status === "authenticated") {
      fetch(`${API_URL}/api/articles`, { credentials: "include" })
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data)) {
            setArticles(data);
          }
        })
        .catch(err => {
          console.error("Failed to fetch articles:", err);
        });
    }
  }, [status]);

  const categories = ["Reflections", "Creativity", "Slow Living", "Relationships", "Philosophy"];
  const authors = ["Alistair Vance", "Rishika Shukla", "Eleanor Thorne"];

  // Security guard check
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);

  const handleLogout = () => {
    signOut({ callbackUrl: "/admin/login" });
  };

  // Article Actions
  const handleSaveArticle = async (updated: Article) => {
    // Mongo IDs are 24 char hex strings, math.random looks like 0.123
    const isExisting = updated.id && !updated.id.includes(".");
    const url = isExisting ? `${API_URL}/api/articles/${updated.id}` : `${API_URL}/api/articles`;
    const method = isExisting ? "PUT" : "POST";
    
    const payload = { ...updated };
    if (!isExisting) delete (payload as Partial<Article>).id;

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        credentials: "include"
      });
      
      if (!res.ok) throw new Error("Failed to save");
      const savedArticle = await res.json();
      
      if (isExisting) {
        setArticles(articles.map(art => art.id === savedArticle.id ? savedArticle : art));
      } else {
        setArticles([savedArticle, ...articles]);
      }
      setIsEditing(false);
      setEditingArticle(null);
      setActivePanel("Articles");
    } catch (e) {
      console.error(e);
      alert("Failed to save article");
    }
  };

  const handleDeleteArticle = async (id: string) => {
    if (id.includes(".")) {
      // Mock article deletion
      setArticles(articles.filter(art => art.id !== id));
      return;
    }
    
    try {
      await fetch(`${API_URL}/api/articles/${id}`, { 
        method: "DELETE",
        credentials: "include"
      });
      setArticles(articles.filter(art => art.id !== id));
    } catch(e) {
      console.error(e);
      alert("Failed to delete article");
    }
  };

  const handleEditArticleTrigger = (art: Article) => {
    setEditingArticle(art);
    setIsEditing(true);
  };

  const handleAddArticleTrigger = () => {
    setEditingArticle(null);
    setIsEditing(true);
  };

  if (status === "loading" || !session) {
    return (
      <div className="min-h-screen bg-charcoal text-cream flex items-center justify-center font-sans text-xs">
        Verifying authorization credentials...
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-charcoal text-cream overflow-x-hidden selection:bg-beige selection:text-charcoal font-sans flex z-10">
      <PaperGrain />
      <CandleGlow />

      {/* Sidebar Menu Navigation */}
      <Sidebar
        activePanel={activePanel}
        setActivePanel={(panel) => {
          setActivePanel(panel);
          setIsEditing(false); // reset editor on navigation
        }}
        userRole={(session?.user as { role?: string })?.role || "Super Admin"}
        userName={session?.user?.name || "Editorial Staff"}
        userEmail={session?.user?.email || "editor@margins.com"}
        onLogout={handleLogout}
      />

      {/* Dashboard Center content pane */}
      <main className="flex-grow p-8 max-w-[1200px] overflow-y-auto h-screen relative z-10">
        
        {/* Dynamic Render of sub-panels */}
        {isEditing ? (
          <RichTextEditor
            article={editingArticle}
            onSave={handleSaveArticle}
            onCancel={() => {
              setIsEditing(false);
              setEditingArticle(null);
            }}
            categories={categories}
            authors={authors}
          />
        ) : (
          <>
            {activePanel === "Dashboard" && <DashboardOverview />}
            
            {activePanel === "Articles" && (
              <ArticleManagement
                articles={articles}
                onAddArticle={handleAddArticleTrigger}
                onEditArticle={handleEditArticleTrigger}
                onDeleteArticle={handleDeleteArticle}
                onPreviewArticle={(art) => setPreviewArticle(art)}
              />
            )}

            {activePanel === "Categories" && <CategoryManagement />}
            {activePanel === "Media Library" && <MediaLibrary />}
            {activePanel === "Authors" && <AuthorManagement />}
            {activePanel === "Homepage Builder" && <HomepageBuilder />}
            {activePanel === "Newsletter" && <NewsletterManagement />}
            {activePanel === "Subscribers" && <NewsletterManagement />} {/* Share sub-state */}
            
            {activePanel === "SEO" && <SEOPanel />}
            {activePanel === "Analytics" && <DashboardOverview />} {/* Share charts */}
            {activePanel === "Users" && <UserManagement />}
            {activePanel === "Settings" && <SettingsPanel />}
          </>
        )}

      </main>

      {/* Live Preview Modal Overlay */}
      <AnimatePresence>
        {previewArticle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPreviewArticle(null)}
            className="fixed inset-0 bg-charcoal/80 backdrop-blur-md z-50 flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-charcoal border border-border-muted w-full max-w-[700px] max-h-[85vh] overflow-y-auto p-12 space-y-6 select-text shadow-2xl relative"
            >
              <div className="text-center space-y-4 border-b border-border-muted/30 pb-6 mb-6">
                <span className="font-sans text-[9px] text-beige uppercase tracking-[0.25em] font-semibold">
                  {previewArticle.category} • Article Preview
                </span>
                <h2 className="font-serif text-3xl italic text-cream leading-tight">
                  {previewArticle.title}
                </h2>
                <div className="flex justify-center items-center space-x-2 text-[10px] font-sans tracking-wide text-cream/40">
                  <span className="text-beige font-semibold">{previewArticle.author}</span>
                  <span>•</span>
                  <span>{previewArticle.readingTime}</span>
                </div>
              </div>

              {/* Contents */}
              <div className="space-y-4 font-serif text-sm leading-relaxed text-cream/90 font-light text-justify">
                {(() => {
                  try {
                    const blocks = JSON.parse(previewArticle.content);
                    if (Array.isArray(blocks)) {
                      return blocks.map((b: DashboardPreviewBlock) => {
                        if (b.type === "paragraph" && b.value) {
                          return <p key={b.id} className="whitespace-pre-line">{b.value}</p>;
                        }
                        if (b.type === "heading" && b.value) {
                          return <h4 key={b.id} className="font-serif text-lg italic text-cream pt-3 border-b border-border-muted/10 pb-0.5">{b.value}</h4>;
                        }
                        if (b.type === "quote" && b.value) {
                          return (
                            <blockquote key={b.id} className="border-l-2 border-beige pl-4 py-1 my-4 font-serif italic text-beige text-base text-center bg-beige/5 pr-4">
                              “{b.value}”
                            </blockquote>
                          );
                        }
                        if (b.type === "image" && b.extra) {
                          return (
                            <div key={b.id} className="my-6 space-y-1.5 border border-border-muted/20 p-2 bg-card-bg/10">
                              <div className="aspect-[16/10] bg-dark-bg relative overflow-hidden cinematic-overlay">
                                <img src={b.extra} alt={b.value} className="w-full h-full object-cover" />
                              </div>
                              {b.value && <div className="font-sans text-[9px] text-cream/40 text-center uppercase tracking-widest">{b.value}</div>}
                            </div>
                          );
                        }
                        if (b.type === "divider") {
                          return <div key={b.id} className="w-12 h-[1px] bg-beige/30 mx-auto my-6" />;
                        }
                        if (b.type === "callout" && b.value) {
                          return (
                            <div key={b.id} className="flex space-x-2 items-start border border-beige/40 bg-beige/5 p-4 my-6 font-sans text-xs">
                              <AlertCircle className="w-4 h-4 text-beige mt-0.5 flex-shrink-0" />
                              <p className="text-cream/80">{b.value}</p>
                            </div>
                          );
                        }
                        if (b.type === "list" && b.value) {
                          return (
                            <ul key={b.id} className="list-disc pl-5 space-y-1.5 font-sans text-xs text-cream/80 my-4">
                              {b.value.split("\n").filter(Boolean).map((item: string, idx: number) => (
                                <li key={idx}>{item}</li>
                              ))}
                            </ul>
                          );
                        }
                        return null;
                      });
                    }
                  } catch {
                    return <p className="whitespace-pre-line">{previewArticle.content}</p>;
                  }
                })()}
              </div>

              <div className="flex justify-end pt-6 border-t border-border-muted/30">
                <button
                  onClick={() => setPreviewArticle(null)}
                  className="bg-beige text-charcoal hover:bg-cream hover:text-charcoal font-sans text-[10px] font-semibold uppercase tracking-widest px-6 py-2 transition-colors duration-300"
                >
                  Close Preview
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
