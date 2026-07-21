"use client";

import React, { useState, useEffect } from "react";
import { 
  Map, 
  UserX, 
  Trash2, 
  Key, 
  Server, 
  BarChart, 
  Image as ImageIcon,
  Save,
  ShieldAlert
} from "lucide-react";

// ==========================================
// 1. SEO PANEL COMPONENT
// ==========================================
export function SEOPanel() {
  const [metaTitle, setMetaTitle] = useState("A Mind Full of Margins - Digital Literary Journal");
  const [metaDesc, setMetaDesc] = useState("A premium digital journal dedicated to the exploration of slow living, slow reading, and reflective storytelling.");
  const [ogImage, setOgImage] = useState("https://lh3.googleusercontent.com/aida-public/AB6AXuDhX8qUCiTfZSN26eOcbboAAXYxuzANWuftg8n_HWZDKmbQLqe7gM0jQO3lkolFKVxHEQp7JmwssRCEUnvQl0m1SowUX0M6hlJSkhHJgGH0ZDH17Qu4-6sP0mIvCL68KaTPfBvSon9cVkya1a-5tNmzffOTOUEYHE8SedlKP3IgTfk2A5ZNmeGHnVMqZSglV443Mv15U9NgOza6U9NiDJJ8XwNQBERAhYzNYdh_FA41JJuJqTYTtc1aVr98TtZE2oZa0a6rlxyC9JNX");
  const [canonical, setCanonical] = useState(process.env.NEXT_PUBLIC_APP_URL || "https://a-mind-full-of-margins.vercel.app");
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <span className="font-sans text-[10px] text-beige uppercase tracking-[0.2em] font-semibold block mb-1">
          Search Discovery
        </span>
        <h2 className="font-serif text-3xl font-normal italic text-cream">
          SEO Control Panel
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Forms column (7 cols) */}
        <form onSubmit={handleSave} className="lg:col-span-7 border border-border-muted bg-card-bg/10 p-6 space-y-4 h-fit">
          <h4 className="font-serif text-lg italic text-cream border-b border-border-muted/30 pb-2">
            Site-Wide Index SEO Settings
          </h4>

          {/* Canonical */}
          <div className="space-y-1.5">
            <label className="font-sans text-[10px] uppercase tracking-wider text-cream/40">Canonical Base URL</label>
            <input
              type="url"
              value={canonical}
              onChange={(e) => setCanonical(e.target.value)}
              className="w-full bg-charcoal text-cream border border-border-muted rounded-none px-3 py-2 font-sans text-xs focus:outline-none focus:border-beige"
              required
            />
          </div>

          {/* Meta Title */}
          <div className="space-y-1.5">
            <label className="font-sans text-[10px] uppercase tracking-wider text-cream/40">Meta Title Template</label>
            <input
              type="text"
              value={metaTitle}
              onChange={(e) => setMetaTitle(e.target.value)}
              className="w-full bg-charcoal text-cream border border-border-muted rounded-none px-3 py-2 font-sans text-xs focus:outline-none focus:border-beige"
              required
            />
          </div>

          {/* Meta Description */}
          <div className="space-y-1.5">
            <label className="font-sans text-[10px] uppercase tracking-wider text-cream/40">Meta Description</label>
            <textarea
              value={metaDesc}
              onChange={(e) => setMetaDesc(e.target.value)}
              rows={3}
              className="w-full bg-charcoal text-cream border border-border-muted rounded-none px-3 py-2 font-sans text-xs focus:outline-none focus:border-beige resize-none"
              required
            />
          </div>

          {/* OG Image */}
          <div className="space-y-1.5">
            <label className="font-sans text-[10px] uppercase tracking-wider text-cream/40">OG Share Image (URL)</label>
            <div className="flex space-x-2">
              <input
                type="text"
                value={ogImage}
                onChange={(e) => setOgImage(e.target.value)}
                className="w-full bg-charcoal text-cream border border-border-muted rounded-none px-3 py-2 font-sans text-[10px] focus:outline-none focus:border-beige"
              />
            </div>
          </div>

          <button
            type="submit"
            className="bg-beige text-charcoal hover:bg-cream hover:text-charcoal font-sans text-xs font-semibold uppercase tracking-widest py-2.5 px-6 flex items-center space-x-2 transition-colors duration-300 shadow-md"
          >
            <Save className="w-4 h-4" />
            <span>{isSaved ? "Saved SEO Metadata!" : "Save SEO Details"}</span>
          </button>
        </form>

        {/* Sitemap Index visual check (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="border border-border-muted bg-card-bg/5 p-6 space-y-4">
            <h4 className="font-serif text-lg italic text-cream flex items-center space-x-2 border-b border-border-muted/30 pb-2">
              <Map className="w-4 h-4 text-beige" />
              <span>Auto-Generated Sitemap.xml</span>
            </h4>
            <p className="font-sans text-xs text-cream/60 leading-relaxed font-light">
              The sitemap is dynamically generated and pinged to Google Search Console on every new article publish.
            </p>
            <div className="bg-charcoal/50 border border-border-muted/40 p-4 font-mono text-[10px] text-cream/50 overflow-x-auto space-y-1">
              <div>&lt;sitemapindex xmlns=&quot;http://www.sitemaps.org&quot;&gt;</div>
              <div className="pl-4">&lt;sitemap&gt;</div>
              <div className="pl-8">&lt;loc&gt;{canonical}/sitemap-pages.xml&lt;/loc&gt;</div>
              <div className="pl-8">&lt;lastmod&gt;2026-07-05&lt;/lastmod&gt;</div>
              <div className="pl-4">&lt;/sitemap&gt;</div>
              <div className="pl-4">&lt;sitemap&gt;</div>
              <div className="pl-8">&lt;loc&gt;{canonical}/sitemap-articles.xml&lt;/loc&gt;</div>
              <div className="pl-8">&lt;lastmod&gt;2026-07-05&lt;/lastmod&gt;</div>
              <div className="pl-4">&lt;/sitemap&gt;</div>
              <div>&lt;/sitemapindex&gt;</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 2. USER MANAGEMENT COMPONENT
// ==========================================
interface User {
  id: string;
  name: string;
  email: string;
  oauth: boolean;
  joinDate: string;
  status: "Active" | "Blocked";
}

import { Loader2 } from "lucide-react";

export function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        if (isMounted) {
          setUsers([]);
        }
      } catch (error) {
        console.error("Failed to fetch users", error);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };
    fetchUsers();
    return () => { isMounted = false; };
  }, []);

  const toggleBlock = (id: string) => {
    setUsers(users.map(u => 
      u.id === id 
        ? { ...u, status: u.status === "Active" ? "Blocked" : "Active" } 
        : u
    ));
  };

  const deleteUser = (id: string) => {
    setUsers(users.filter(u => u.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <span className="font-sans text-[10px] text-beige uppercase tracking-[0.2em] font-semibold block mb-1">
          Access Control
        </span>
        <h2 className="font-serif text-3xl font-normal italic text-cream flex items-center gap-4">
          User &amp; Reader Management
          {isLoading && <Loader2 className="w-5 h-5 text-beige animate-spin opacity-50" />}
        </h2>
      </div>

      <div className="border border-border-muted bg-card-bg/5 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border-muted bg-card-bg/25 text-cream/40 font-sans text-[9px] uppercase tracking-widest">
              <th className="p-4 pl-6 font-semibold">Name</th>
              <th className="p-4 font-semibold">Email</th>
              <th className="p-4 font-semibold">Google Auth</th>
              <th className="p-4 font-semibold">Join Date</th>
              <th className="p-4 font-semibold">Status</th>
              <th className="p-4 pr-6 text-right font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-muted/30 font-sans text-xs text-cream/80">
            {isLoading ? (
              <tr>
                <td colSpan={6} className="p-8 text-center text-cream/40 font-sans italic text-xs">
                  <div className="flex flex-col items-center justify-center space-y-3">
                    <Loader2 className="w-6 h-6 animate-spin text-beige/50" />
                    <span>Loading users...</span>
                  </div>
                </td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-8 text-center text-cream/40 font-sans italic text-xs">
                  No users found in the system.
                </td>
              </tr>
            ) : (
              users.map((u) => (
                <tr key={u.id} className="hover:bg-card-bg/5 transition-colors duration-200">
                  <td className="p-4 pl-6 font-medium text-cream">{u.name}</td>
                  <td className="p-4">{u.email}</td>
                  <td className="p-4">
                    {u.oauth ? (
                      <span className="text-emerald-400 font-semibold uppercase text-[9px] tracking-wide bg-emerald-400/10 border border-emerald-400/30 px-2 py-0.5">Verified</span>
                    ) : (
                      <span className="text-cream/30 uppercase text-[9px] tracking-wide border border-border-muted px-2 py-0.5">Password</span>
                    )}
                  </td>
                  <td className="p-4 text-cream/50">{u.joinDate}</td>
                  <td className="p-4">
                    <span className={`px-2 py-0.5 border text-[9px] uppercase tracking-wider font-semibold ${
                      u.status === "Active" 
                        ? "bg-emerald-400/10 border-emerald-400/40 text-emerald-400" 
                        : "bg-red-400/10 border-red-400/40 text-red-400"
                    }`}>
                      {u.status}
                    </span>
                  </td>
                  <td className="p-4 pr-6 text-right space-x-3">
                    <button
                      onClick={() => toggleBlock(u.id)}
                      className="text-cream/50 hover:text-beige transition-colors duration-300"
                      title={u.status === "Active" ? "Block Reader" : "Unblock Reader"}
                    >
                      <UserX className="w-4 h-4 inline" />
                    </button>
                    <button
                      onClick={() => deleteUser(u.id)}
                      className="text-cream/50 hover:text-red-400 transition-colors duration-300"
                      title="Delete Account"
                    >
                      <Trash2 className="w-4 h-4 inline" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ==========================================
// 3. SETTINGS PANEL COMPONENT
// ==========================================
export function SettingsPanel() {
  const [googleClientId, setGoogleClientId] = useState(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "");
  const [cloudinaryName, setCloudinaryName] = useState(process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "");
  const [smtpServer, setSmtpServer] = useState("");
  const [googleAnalyticsId, setGoogleAnalyticsId] = useState("");
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <span className="font-sans text-[10px] text-beige uppercase tracking-[0.2em] font-semibold block mb-1">
          System Infrastructure
        </span>
        <h2 className="font-serif text-3xl font-normal italic text-cream">
          CMS System Settings
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Core settings columns */}
        <form onSubmit={handleSave} className="lg:col-span-8 space-y-6">
          
          {/* Cloudinary Integration */}
          <div className="border border-border-muted bg-card-bg/10 p-6 space-y-4">
            <h4 className="font-serif text-lg italic text-cream flex items-center space-x-2 border-b border-border-muted/30 pb-2">
              <ImageIcon className="w-4 h-4 text-beige" />
              <span>Cloudinary Image Bucket</span>
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5 md:col-span-2">
                <label className="font-sans text-[10px] uppercase tracking-wider text-cream/40">Cloudinary Cloud Name</label>
                <input
                  type="text"
                  value={cloudinaryName}
                  onChange={(e) => setCloudinaryName(e.target.value)}
                  className="w-full bg-charcoal text-cream border border-border-muted rounded-none px-3 py-2 font-sans text-xs focus:outline-none focus:border-beige"
                  required
                />
              </div>
            </div>
          </div>

          {/* Google OAuth API Keys */}
          <div className="border border-border-muted bg-card-bg/10 p-6 space-y-4">
            <h4 className="font-serif text-lg italic text-cream flex items-center space-x-2 border-b border-border-muted/30 pb-2">
              <Key className="w-4 h-4 text-beige" />
              <span>Google OAuth &amp; NextAuth Settings</span>
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5 md:col-span-2">
                <label className="font-sans text-[10px] uppercase tracking-wider text-cream/40">Google Client ID</label>
                <input
                  type="text"
                  value={googleClientId}
                  onChange={(e) => setGoogleClientId(e.target.value)}
                  className="w-full bg-charcoal text-cream border border-border-muted rounded-none px-3 py-2 font-sans text-xs focus:outline-none focus:border-beige"
                  required
                />
              </div>
            </div>
          </div>

          {/* SMTP Server settings */}
          <div className="border border-border-muted bg-card-bg/10 p-6 space-y-4">
            <h4 className="font-serif text-lg italic text-cream flex items-center space-x-2 border-b border-border-muted/30 pb-2">
              <Server className="w-4 h-4 text-beige" />
              <span>SMTP Mailing Server</span>
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5 md:col-span-2">
                <label className="font-sans text-[10px] uppercase tracking-wider text-cream/40">SMTP Relay Host</label>
                <input
                  type="text"
                  value={smtpServer}
                  onChange={(e) => setSmtpServer(e.target.value)}
                  className="w-full bg-charcoal text-cream border border-border-muted rounded-none px-3 py-2 font-sans text-xs focus:outline-none focus:border-beige"
                  required
                />
              </div>
            </div>
          </div>

          {/* Google Analytics GA4 */}
          <div className="border border-border-muted bg-card-bg/10 p-6 space-y-4">
            <h4 className="font-serif text-lg italic text-cream flex items-center space-x-2 border-b border-border-muted/30 pb-2">
              <BarChart className="w-4 h-4 text-beige" />
              <span>Google Analytics Measurement</span>
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5 md:col-span-2">
                <label className="font-sans text-[10px] uppercase tracking-wider text-cream/40">Measurement ID (GA4)</label>
                <input
                  type="text"
                  value={googleAnalyticsId}
                  onChange={(e) => setGoogleAnalyticsId(e.target.value)}
                  className="w-full bg-charcoal text-cream border border-border-muted rounded-none px-3 py-2 font-sans text-xs focus:outline-none focus:border-beige"
                  required
                />
              </div>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="bg-beige text-charcoal hover:bg-cream hover:text-charcoal font-sans text-xs font-semibold uppercase tracking-widest py-2.5 px-6 flex items-center space-x-2 transition-colors duration-300 shadow-md"
          >
            <Save className="w-4 h-4" />
            <span>{isSaved ? "Saved Configurations!" : "Save Settings"}</span>
          </button>
        </form>

        {/* Security Warning Column (4 cols) */}
        <div className="lg:col-span-4">
          <div className="border border-red-500/30 bg-red-500/5 p-6 space-y-4">
            <h4 className="font-serif text-base italic text-red-400 flex items-center space-x-2 border-b border-red-500/20 pb-2">
              <ShieldAlert className="w-4.5 h-4.5" />
              <span>Production Credentials</span>
            </h4>
            <p className="font-sans text-xs text-cream/70 leading-relaxed font-light">
              Always double-check credentials before saving. OAuth callbacks and SMTP configurations reload connection handlers upon writing, potentially locking active editorial sessions.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
