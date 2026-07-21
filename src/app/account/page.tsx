"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getSession, clearSession, Session } from "@/utils/authSession";
import { Bookmark, History, Mail, User as UserIcon, LogOut, ArrowLeft, Check } from "lucide-react";
import PaperGrain from "@/components/PaperGrain";

export default function ReaderAccountHub() {
  const router = useRouter();
  const [session, setSessionState] = useState<Session | null>(null);
  
  // Account settings state
  const [profileName, setProfileName] = useState("");
  const [profileEmail, setProfileEmail] = useState("");
  const [savedArticles, setSavedArticles] = useState<string[]>([
    "Finding Comfort in the In-Between",
    "The Weight of Unspoken Words"
  ]);
  const [readingHistory] = useState([
    { title: "The Art of Slow Listening", date: "Today, 2:40 PM" },
    { title: "Morning Rituals of Epictetus", date: "Yesterday, 9:15 AM" }
  ]);
  const [newsletterPref, setNewsletterPref] = useState({
    essays: true,
    monthly: true,
    partners: false
  });
  const [isSaved, setIsSaved] = useState(false);

  // Authenticate check
  useEffect(() => {
    const currentSession = getSession();
    if (!currentSession.isAuthenticated || currentSession.role !== "Reader") {
      router.push("/auth/login");
    } else {
      const timer = setTimeout(() => {
        setSessionState(currentSession);
        setProfileName(currentSession.name || "Aria Sterling");
        setProfileEmail(currentSession.email || "aria.sterling@gmail.com");
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [router]);

  const handleLogout = () => {
    clearSession();
    router.push("/auth/login");
  };

  const handleSaveProfile = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  if (!session) {
    return (
      <div className="min-h-screen bg-[#121212] text-[#e5e5e5] flex items-center justify-center font-sans text-xs">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#121212] text-[#e5e5e5] p-6 md:p-12 font-sans selection:bg-[#F7EFE8] selection:text-[#121212]">
      <PaperGrain />

      <div className="max-w-[850px] mx-auto space-y-8 relative z-10">
        
        {/* Navigation back */}
        <div className="flex justify-between items-center">
          <Link 
            href="/"
            className="flex items-center space-x-2 text-cream/50 hover:text-cream text-[10px] uppercase tracking-widest font-semibold transition-colors duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Journal</span>
          </Link>

          <button
            onClick={handleLogout}
            className="border border-border-muted hover:border-cream/40 text-cream/70 hover:text-cream px-3.5 py-1.5 text-[10px] uppercase tracking-widest transition-colors duration-300 flex items-center space-x-1.5"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Log Out</span>
          </button>
        </div>

        {/* Header Profile Title */}
        <div className="flex items-center space-x-4 border-b border-border-muted/30 pb-6">
          <div className="w-12 h-12 rounded-full bg-[#1c1c1c] border border-border-muted flex items-center justify-center font-serif text-lg text-cream/70">
            {profileName.substring(0, 1).toUpperCase()}
          </div>
          <div className="space-y-0.5">
            <h2 className="font-serif text-2xl italic leading-none">{profileName}</h2>
            <p className="text-[10px] text-cream/40 uppercase tracking-widest">Reader Profile</p>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Saved Articles & Reading History (8 cols) */}
          <div className="md:col-span-8 space-y-6">
            
            {/* Bookmarks */}
            <div className="border border-border-muted bg-[#161616] p-6 space-y-4">
              <h3 className="font-serif text-base italic text-cream flex items-center space-x-2 border-b border-border-muted/20 pb-2">
                <Bookmark className="w-4 h-4 text-cream/50" />
                <span>Saved Bookmarks</span>
              </h3>
              {savedArticles.length > 0 ? (
                <div className="divide-y divide-border-muted/20">
                  {savedArticles.map((art) => (
                    <div key={art} className="py-3 flex justify-between items-center group">
                      <span className="font-serif text-sm text-cream hover:text-cream/80 transition-colors cursor-pointer">{art}</span>
                      <button
                        onClick={() => setSavedArticles(savedArticles.filter(a => a !== art))}
                        className="text-[9px] uppercase tracking-wider text-cream/30 hover:text-red-400 transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-cream/30 text-xs py-2">No saved bookmarks yet.</p>
              )}
            </div>

            {/* History */}
            <div className="border border-border-muted bg-[#161616] p-6 space-y-4">
              <h3 className="font-serif text-base italic text-cream flex items-center space-x-2 border-b border-border-muted/20 pb-2">
                <History className="w-4 h-4 text-cream/50" />
                <span>Reading History</span>
              </h3>
              <div className="divide-y divide-border-muted/20">
                {readingHistory.map((hist) => (
                  <div key={hist.title} className="py-3 flex justify-between items-center">
                    <span className="text-xs text-cream/80">{hist.title}</span>
                    <span className="text-[9px] text-cream/30">{hist.date}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Sidebar Customizer settings (4 cols) */}
          <div className="md:col-span-4 space-y-6">
            
            {/* Newsletter interest toggles */}
            <div className="border border-border-muted bg-[#161616] p-6 space-y-4">
              <h3 className="font-serif text-base italic text-cream flex items-center space-x-2 border-b border-border-muted/20 pb-2">
                <Mail className="w-4 h-4 text-cream/50" />
                <span>Newsletter</span>
              </h3>
              <div className="space-y-3 text-xs">
                <label className="flex items-center space-x-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newsletterPref.essays}
                    onChange={(e) => setNewsletterPref({ ...newsletterPref, essays: e.target.checked })}
                    className="bg-[#121212] border border-border-muted text-cream focus:ring-0 focus:outline-none"
                  />
                  <span className="text-cream/70">Weekly Essays</span>
                </label>
                <label className="flex items-center space-x-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newsletterPref.monthly}
                    onChange={(e) => setNewsletterPref({ ...newsletterPref, monthly: e.target.checked })}
                    className="bg-[#121212] border border-border-muted text-cream focus:ring-0 focus:outline-none"
                  />
                  <span className="text-cream/70">Monthly Digest</span>
                </label>
                <label className="flex items-center space-x-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newsletterPref.partners}
                    onChange={(e) => setNewsletterPref({ ...newsletterPref, partners: e.target.checked })}
                    className="bg-[#121212] border border-border-muted text-cream focus:ring-0 focus:outline-none"
                  />
                  <span className="text-cream/70">Partner Releases</span>
                </label>
              </div>
            </div>

            {/* Profile fields */}
            <div className="border border-border-muted bg-[#161616] p-6 space-y-4">
              <h3 className="font-serif text-base italic text-cream flex items-center space-x-2 border-b border-border-muted/20 pb-2">
                <UserIcon className="w-4 h-4 text-cream/50" />
                <span>Profile Settings</span>
              </h3>
              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-[9px] uppercase tracking-wider text-cream/40">Name</label>
                  <input
                    type="text"
                    value={profileName}
                    onChange={(e) => setProfileName(e.target.value)}
                    className="w-full bg-[#121212] text-cream border border-border-muted px-3 py-1.5 text-xs focus:outline-none focus:border-cream/40"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] uppercase tracking-wider text-cream/40">Email</label>
                  <input
                    type="email"
                    value={profileEmail}
                    onChange={(e) => setProfileEmail(e.target.value)}
                    className="w-full bg-[#121212] text-cream border border-border-muted px-3 py-1.5 text-xs focus:outline-none"
                    disabled
                  />
                </div>

                <button
                  onClick={handleSaveProfile}
                  className="w-full bg-cream text-charcoal hover:bg-cream/90 font-sans text-[10px] font-semibold uppercase tracking-widest py-2 transition-all duration-300 shadow-md flex justify-center items-center space-x-1"
                >
                  {isSaved ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Changes Saved</span>
                    </>
                  ) : (
                    <span>Save Settings</span>
                  )}
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
