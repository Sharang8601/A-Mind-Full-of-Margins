"use client";

import React from "react";
import { 
  LayoutDashboard, 
  FileText, 
  Folder, 
  Image as ImageIcon, 
  PenTool, 
  Mail, 
  Users, 
  Globe, 
  BarChart3, 
  UserCheck, 
  Settings, 
  LogOut, 
  Home as HomeIcon
} from "lucide-react";

export type SidebarItem = 
  | "Dashboard"
  | "Articles"
  | "Categories"
  | "Media Library"
  | "Authors"
  | "Homepage Builder"
  | "Newsletter"
  | "Subscribers"
  | "SEO"
  | "Analytics"
  | "Users"
  | "Settings";

interface SidebarProps {
  activePanel: SidebarItem;
  setActivePanel: (panel: SidebarItem) => void;
  userRole: string;
  userName?: string;
  userEmail?: string;
  onLogout: () => void;
}

export default function Sidebar({ activePanel, setActivePanel, userRole, userName, userEmail, onLogout }: SidebarProps) {
  const menuItems: { name: SidebarItem; icon: React.ComponentType<{ className?: string }>; roles: string[] }[] = [
    { name: "Dashboard", icon: LayoutDashboard, roles: ["Super Admin", "Editor"] },
    { name: "Articles", icon: FileText, roles: ["Super Admin", "Editor"] },
    { name: "Categories", icon: Folder, roles: ["Super Admin", "Editor"] },
    { name: "Media Library", icon: ImageIcon, roles: ["Super Admin", "Editor"] },
    { name: "Authors", icon: PenTool, roles: ["Super Admin", "Editor"] },
    { name: "Homepage Builder", icon: HomeIcon, roles: ["Super Admin", "Editor"] },
    { name: "Newsletter", icon: Mail, roles: ["Super Admin", "Editor"] },
    { name: "Subscribers", icon: Users, roles: ["Super Admin"] },
    { name: "SEO", icon: Globe, roles: ["Super Admin", "Editor"] },
    { name: "Analytics", icon: BarChart3, roles: ["Super Admin"] },
    { name: "Users", icon: UserCheck, roles: ["Super Admin"] },
    { name: "Settings", icon: Settings, roles: ["Super Admin"] },
  ];

  // Filter menu items by user role
  const visibleItems = menuItems.filter(item => item.roles.includes(userRole));

  return (
    <aside className="w-64 bg-card-bg/40 backdrop-blur-xl border-r border-border-muted flex flex-col justify-between h-screen sticky top-0">
      <div className="flex flex-col">
        {/* Logo / Title */}
        <div className="p-6 border-b border-border-muted flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-beige/25 flex items-center justify-center border border-border-muted relative overflow-hidden cinematic-overlay">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAd5hbeEys4swuXyv-km07QcTtbRv6-5_lLKSPD_OOmHm_7J74GfSjobMxj1gwwarW7Fka_JgewkrhbKiE5AV_w7sojt6rJeBJ8rU_xAoNhKK-u4cgdCr_qoypokzNNKcbeBNNIJRA_mP2Gg9_VF081Sz_uPa6YDldNiOUxzAGDrl2Bj9AfP6xC3RiSOCkDDmqCru71ma2mZSrh9QOOwJEPRww59Knj1XbvIws3O3EdqE7X-bDyQDXdI4FFADUFYkaW2qubW4FSmG9J"
              alt="Logo"
              className="w-full h-full object-cover grayscale"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-sm italic text-cream leading-tight">Margins CMS</span>
            <span className="font-sans text-[9px] uppercase tracking-widest text-beige font-semibold">
              {userRole}
            </span>
          </div>
        </div>

        {/* Navigation List */}
        <nav className="p-4 space-y-1 overflow-y-auto max-h-[calc(100vh-180px)]">
          {visibleItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePanel === item.name;

            return (
              <button
                key={item.name}
                onClick={() => setActivePanel(item.name)}
                className={`w-full flex items-center space-x-3 px-4 py-3 text-xs uppercase tracking-wider font-sans font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-beige text-charcoal shadow-md"
                    : "text-cream/70 hover:text-cream hover:bg-card-bg/50"
                }`}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span>{item.name}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer / User Profile & Logout */}
      <div className="p-4 border-t border-border-muted flex flex-col space-y-3 bg-charcoal/20">
        <div className="flex items-center space-x-3">
          <div className="w-7 h-7 rounded-full bg-beige/25 overflow-hidden flex items-center justify-center font-serif text-[10px] font-bold text-beige border border-border-muted">
            {userRole.substring(0, 1)}
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-sans text-xs text-cream truncate leading-tight">{userName || "Editorial Staff"}</span>
            <span className="font-sans text-[9px] text-cream/40 truncate">{userEmail || "editor@margins.com"}</span>
          </div>
        </div>
        
        <button
          onClick={onLogout}
          className="w-full flex items-center justify-center space-x-2 px-3 py-2 border border-border-muted hover:border-beige/40 text-cream/70 hover:text-cream text-[10px] uppercase tracking-widest font-sans transition-all duration-300"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Exit Panel</span>
        </button>
      </div>
    </aside>
  );
}
