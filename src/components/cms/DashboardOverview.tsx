"use client";

import React, { useState, useEffect } from "react";
import { 
  FileText, 
  CheckCircle, 
  FileEdit, 
  Users, 
  TrendingUp, 
  Eye, 
  ChevronRight,
  Loader2
} from "lucide-react";

export default function DashboardOverview() {
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);
  
  const [isLoading, setIsLoading] = useState(true);
  
  // State variables initialized to 0/empty, ready for backend data
  const [metrics] = useState([
    { title: "Total Articles", val: "0", icon: FileText, change: "-", color: "text-beige" },
    { title: "Published", val: "0", icon: CheckCircle, change: "-", color: "text-emerald-400" },
    { title: "Draft Articles", val: "0", icon: FileEdit, change: "-", color: "text-amber-400" },
    { title: "Subscribers", val: "0", icon: Users, change: "-", color: "text-cyan-400" },
    { title: "Monthly Readers", val: "0", icon: TrendingUp, change: "-", color: "text-beige" },
    { title: "Page Views", val: "0", icon: Eye, change: "-", color: "text-beige" },
  ]);

  const [barChartData, setBarChartData] = useState<{label: string, val: number}[]>([]);
  const [readerGrowth, setReaderGrowth] = useState<{month: string, val: number}[]>([]);
  const [categories, setCategories] = useState<{name: string, val: number, count: string, color: string}[]>([]);

  // Simulate API fetch using useEffect
  useEffect(() => {
    let isMounted = true;
    
    const fetchDashboardData = async () => {
      setIsLoading(true);
      try {
        // TODO: Replace with real API endpoints when ready
        // const res = await fetch('/api/dashboard/stats');
        // const data = await res.json();
        
        // Simulating network delay for realistic dashboard loading
        await new Promise(resolve => setTimeout(resolve, 800));
        
        if (isMounted) {
          // Since no real API data is returned yet, we keep the data empty
          setBarChartData([]);
          setReaderGrowth([]);
          setCategories([]);
        }
      } catch (error) {
        console.error("Failed to fetch dashboard stats", error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };
    
    fetchDashboardData();
    
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="space-y-8">
      {/* Page Title */}
      <div>
        <span className="font-sans text-[10px] text-beige uppercase tracking-[0.2em] font-semibold block mb-1">
          CMS Control Hub
        </span>
        <h2 className="font-serif text-3xl font-normal italic text-cream flex items-center gap-4">
          Dashboard Overview
          {isLoading && <Loader2 className="w-5 h-5 text-beige animate-spin opacity-50" />}
        </h2>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics.map((card) => {
          const Icon = card.icon;
          return (
            <div 
              key={card.title} 
              className="border border-border-muted bg-card-bg/20 p-6 flex flex-col justify-between hover:border-beige/30 transition-all duration-300 relative group overflow-hidden"
            >
              <div className="card-hover-overlay" />
              <div className="flex justify-between items-start relative z-10">
                <div className="space-y-1">
                  <span className="font-sans text-[10px] text-cream/40 uppercase tracking-widest block">
                    {card.title}
                  </span>
                  <span className="font-serif text-3xl text-cream font-medium">
                    {isLoading ? "-" : card.val}
                  </span>
                </div>
                <div className={`p-2 bg-charcoal border border-border-muted rounded-none ${card.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <div className="text-[10px] font-sans text-cream/50 mt-4 border-t border-border-muted/30 pt-3 flex justify-between items-center relative z-10">
                <span>{isLoading ? "Loading..." : card.change}</span>
                <ChevronRight className="w-3 h-3 text-beige opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Chart 1: Article Performance (Bar Chart) */}
        <div className="border border-border-muted bg-card-bg/10 p-6 flex flex-col justify-between">
          <div className="flex justify-between items-center mb-6">
            <h4 className="font-serif text-lg italic text-cream">
              Article Performance (Views in Thousands)
            </h4>
            <span className="font-sans text-[9px] uppercase tracking-wider text-beige border border-beige/30 px-2 py-0.5">
              Live Feed
            </span>
          </div>

          <div className="h-64 w-full relative flex flex-col justify-center">
            {isLoading ? (
               <div className="flex flex-col items-center text-cream/40 space-y-2">
                 <Loader2 className="w-6 h-6 animate-spin text-beige/50" />
                 <span className="font-sans text-[10px] uppercase tracking-widest">Loading data...</span>
               </div>
            ) : barChartData.length === 0 ? (
               <div className="flex items-center justify-center text-cream/40 font-sans text-xs italic">
                 No performance data available.
               </div>
            ) : (
               <div className="h-full w-full flex items-end justify-between px-2 pt-8 relative">
                {barChartData.map((bar, i) => {
                  const maxVal = Math.max(...barChartData.map(d => d.val), 1);
                  const percent = (bar.val / maxVal) * 100;
                  const isHovered = hoveredBar === i;

                  return (
                    <div 
                      key={bar.label}
                      className="flex flex-col items-center flex-1 mx-2 relative group"
                      onMouseEnter={() => setHoveredBar(i)}
                      onMouseLeave={() => setHoveredBar(null)}
                    >
                      {/* Tooltip */}
                      <div className={`absolute -top-8 bg-beige text-charcoal font-sans text-[10px] font-semibold px-2 py-1 transition-all duration-300 ${
                        isHovered ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
                      }`}>
                        {bar.val}k views
                      </div>

                      {/* Bar */}
                      <div 
                        className="w-full bg-beige/20 border border-beige/40 group-hover:bg-beige/40 group-hover:border-beige transition-all duration-500 relative"
                        style={{ height: `${percent}%` }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-t from-beige/10 to-transparent" />
                      </div>

                      {/* Label */}
                      <span className="font-sans text-[9px] text-cream/40 uppercase tracking-widest mt-2 truncate w-full text-center">
                        {bar.label}
                      </span>
                    </div>
                  );
                })}
               </div>
            )}
          </div>
        </div>

        {/* Chart 2: Reader Growth (Line Chart) & Popular Categories */}
        <div className="grid grid-cols-1 gap-8">
          {/* Reader Growth SVG Line Chart */}
          <div className="border border-border-muted bg-card-bg/10 p-6 flex flex-col justify-between min-h-[220px]">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-serif text-lg italic text-cream">
                Monthly Reader Growth
              </h4>
              <span className="text-cream/40 font-sans text-[10px]">
                Q2 Growth
              </span>
            </div>

            <div className="flex-1 w-full relative flex flex-col justify-center">
              {isLoading ? (
                 <div className="flex flex-col items-center text-cream/40 space-y-2">
                   <Loader2 className="w-5 h-5 animate-spin text-beige/50" />
                 </div>
              ) : readerGrowth.length === 0 ? (
                 <div className="flex items-center justify-center text-cream/40 font-sans text-xs italic">
                   No growth data available.
                 </div>
              ) : (
                <div className="h-32 w-full relative pt-4">
                  {/* Real SVG rendering logic will go here when data arrives */}
                </div>
              )}
            </div>
          </div>

          {/* Popular Categories */}
          <div className="border border-border-muted bg-card-bg/10 p-6 flex flex-col justify-between min-h-[220px]">
            <h4 className="font-serif text-lg italic text-cream mb-4">
              Category Distribution
            </h4>
            
            <div className="flex-1 w-full relative flex flex-col justify-center">
              {isLoading ? (
                 <div className="flex flex-col items-center text-cream/40 space-y-2">
                   <Loader2 className="w-5 h-5 animate-spin text-beige/50" />
                 </div>
              ) : categories.length === 0 ? (
                 <div className="flex items-center justify-center text-cream/40 font-sans text-xs italic">
                   No categories data available.
                 </div>
              ) : (
                <div className="space-y-3">
                  {categories.map((cat) => (
                    <div key={cat.name} className="space-y-1">
                      <div className="flex justify-between items-center text-[10px] font-sans uppercase tracking-widest text-cream/70">
                        <span>{cat.name}</span>
                        <span className="text-cream/40">{cat.count}</span>
                      </div>
                      <div className="w-full h-1.5 bg-card-bg/80 relative overflow-hidden border border-border-muted">
                        <div className={`h-full ${cat.color}`} style={{ width: `${cat.val}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
