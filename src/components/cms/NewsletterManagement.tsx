"use client";

import React, { useState } from "react";
import { Download, Send, Check, RefreshCw, Users } from "lucide-react";

interface Subscriber {
  id: string;
  email: string;
  status: "Active" | "Bounced" | "Unsubscribed";
  joinDate: string;
  source: string;
}

export default function NewsletterManagement() {
  const [subscribers] = useState<Subscriber[]>([
    { id: "1", email: "reader.one@gmail.com", status: "Active", joinDate: "Jul 05, 2026", source: "Homepage Widget" },
    { id: "2", email: "journal.lover@outlook.com", status: "Active", joinDate: "Jul 02, 2026", source: "Sidebar Form" },
    { id: "3", email: "poetry.fan@yahoo.com", status: "Active", joinDate: "Jun 28, 2026", source: "Cover Article Scroll" },
    { id: "4", email: "stoic.student@gmail.com", status: "Bounced", joinDate: "Jun 20, 2026", source: "Sidebar Form" },
    { id: "5", email: "margins.critic@gmail.com", status: "Unsubscribed", joinDate: "Jun 15, 2026", source: "Homepage Widget" },
  ]);

  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  // Trigger real CSV download
  const handleExportCSV = () => {
    const headers = ["ID", "Email", "Status", "Join Date", "Source"];
    const rows = subscribers.map(sub => [sub.id, sub.email, sub.status, sub.joinDate, sub.source]);
    
    const csvContent = 
      "data:text/csv;charset=utf-8," + 
      [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
      
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "margins_subscribers_export.csv");
    document.body.appendChild(link); // Required for FF
    link.click();
    document.body.removeChild(link);
  };

  const handleSendCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject || !body) return;

    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setIsSent(true);
      setSubject("");
      setBody("");
      setTimeout(() => setIsSent(false), 3000);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex justify-between items-end">
        <div>
          <span className="font-sans text-[10px] text-beige uppercase tracking-[0.2em] font-semibold block mb-1">
            Correspondence Engine
          </span>
          <h2 className="font-serif text-3xl font-normal italic text-cream">
            Newsletter &amp; Campaigns
          </h2>
        </div>
        
        <button
          onClick={handleExportCSV}
          className="border border-border-muted hover:border-beige/50 text-cream/70 hover:text-cream px-4 py-2.5 font-sans text-xs uppercase tracking-widest flex items-center space-x-2 transition-colors duration-300"
        >
          <Download className="w-4 h-4" />
          <span>Export CSV</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: Campaign Creator (7 cols) */}
        <div className="lg:col-span-7 border border-border-muted bg-card-bg/10 p-6 space-y-4">
          <h4 className="font-serif text-lg italic text-cream border-b border-border-muted/30 pb-2">
            Compose Newsletter Campaign
          </h4>

          <form onSubmit={handleSendCampaign} className="space-y-4">
            {/* Subject */}
            <div className="space-y-1.5">
              <label className="font-sans text-[10px] uppercase tracking-wider text-cream/40">Email Subject Line</label>
              <input
                type="text"
                placeholder="Issue II: The Language of Silence"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full bg-charcoal text-cream border border-border-muted rounded-none px-3 py-2 font-sans text-xs focus:outline-none focus:border-beige placeholder-cream/30 transition-colors"
                required
              />
            </div>

            {/* Template Body */}
            <div className="space-y-1.5">
              <label className="font-sans text-[10px] uppercase tracking-wider text-cream/40">Newsletter Body (Markdown/Text)</label>
              <textarea
                placeholder="Dear readers, this week we explore silence in the margins of life..."
                value={body}
                onChange={(e) => setBody(e.target.value)}
                rows={8}
                className="w-full bg-charcoal text-cream border border-border-muted rounded-none px-3 py-2 font-sans text-xs focus:outline-none focus:border-beige placeholder-cream/30 transition-colors resize-y"
                required
              />
            </div>

            {/* Actions */}
            <button
              type="submit"
              disabled={isSending}
              className="bg-beige text-charcoal hover:bg-cream hover:text-charcoal disabled:opacity-50 font-sans text-xs font-semibold uppercase tracking-widest py-2.5 px-6 flex items-center space-x-2 transition-colors duration-300 shadow-md"
            >
              {isSending ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Broadcasting...</span>
                </>
              ) : isSent ? (
                <>
                  <Check className="w-4 h-4 text-emerald-950" />
                  <span>Newsletter Sent!</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Send to 1,842 Subscribers</span>
                </>
              )}
            </button>

          </form>
        </div>

        {/* Right Side: Subscribers log (5 cols) */}
        <div className="lg:col-span-5 border border-border-muted bg-card-bg/5 p-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-border-muted/30 pb-2">
              <h4 className="font-serif text-lg italic text-cream flex items-center space-x-2">
                <Users className="w-4 h-4 text-beige" />
                <span>Active Subscribers</span>
              </h4>
            </div>

            {/* Logs List */}
            <div className="divide-y divide-border-muted/20 max-h-96 overflow-y-auto pr-1">
              {subscribers.map((sub) => {
                
                const badgeStyle = {
                  Active: "bg-emerald-400/10 border-emerald-400/40 text-emerald-400",
                  Bounced: "bg-red-400/10 border-red-400/40 text-red-400",
                  Unsubscribed: "bg-cream/10 border-cream/20 text-cream/40"
                }[sub.status];

                return (
                  <div key={sub.id} className="py-3 flex justify-between items-start font-sans text-xs">
                    <div className="flex flex-col space-y-0.5">
                      <span className="font-medium text-cream">{sub.email}</span>
                      <span className="text-[10px] text-cream/40 flex items-center space-x-1">
                        <span>Joined {sub.joinDate}</span>
                        <span>•</span>
                        <span>{sub.source}</span>
                      </span>
                    </div>
                    <span className={`px-1.5 py-0.5 border text-[8px] uppercase tracking-wider font-semibold rounded-none ${badgeStyle}`}>
                      {sub.status}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
