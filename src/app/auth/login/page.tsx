"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getSession, setSession } from "@/utils/authSession";
import PaperGrain from "@/components/PaperGrain";

export default function ReaderLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // If already logged in as Reader, redirect to account
  useEffect(() => {
    const session = getSession();
    if (session.isAuthenticated && session.role === "Reader") {
      router.push("/account");
    }
  }, [router]);

  const handlePasswordLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    // Check if user is attempting to login as admin via reader route
    if (email.includes("admin") || email.includes("editor")) {
      setError("Admin accounts must sign in through the Admin Portal.");
      return;
    }

    setSession({
      isAuthenticated: true,
      role: "Reader",
      email: email,
      name: email.split("@")[0]
    });
    router.push("/account");
  };

  const handleGoogleLogin = () => {
    setSession({
      isAuthenticated: true,
      role: "Reader",
      email: "aria.sterling@gmail.com",
      name: "Aria Sterling"
    });
    router.push("/account");
  };

  return (
    <div className="relative min-h-screen bg-[#121212] text-[#e5e5e5] flex items-center justify-center p-6 selection:bg-[#F7EFE8] selection:text-[#121212]">
      <PaperGrain />
      
      <div className="w-full max-w-[360px] space-y-8 relative z-10">
        
        {/* Title */}
        <div className="text-center space-y-2">
          <Link href="/" className="font-serif text-3xl italic tracking-tight hover:opacity-85 transition-opacity block">
            Margins
          </Link>
          <p className="font-sans text-[10px] tracking-widest uppercase text-cream/40">Sign in to your account</p>
        </div>

        {error && (
          <div className="border border-red-500/20 bg-red-500/5 px-4 py-2.5 text-xs text-red-400 font-sans text-center">
            {error}
          </div>
        )}

        {/* Login form */}
        <form onSubmit={handlePasswordLogin} className="space-y-4 font-sans text-xs">
          <div className="space-y-1.5">
            <label className="text-cream/50 uppercase tracking-wider text-[9px]">Email address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full bg-[#1c1c1c] text-cream border border-border-muted px-4 py-2.5 focus:outline-none focus:border-cream/40 transition-colors"
              required
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="text-cream/50 uppercase tracking-wider text-[9px]">Password</label>
              <a href="#" className="text-[9px] hover:underline text-cream/40">Forgot?</a>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-[#1c1c1c] text-cream border border-border-muted px-4 py-2.5 focus:outline-none focus:border-cream/40 transition-colors"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-cream text-charcoal hover:bg-cream/90 font-sans text-[11px] font-semibold uppercase tracking-widest py-3 transition-colors duration-300 shadow-md"
          >
            Sign In
          </button>
        </form>

        {/* Divider */}
        <div className="relative py-2 flex items-center justify-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border-muted/30" />
          </div>
          <span className="relative z-10 px-3 bg-[#121212] font-sans text-[9px] text-cream/30 uppercase tracking-widest">or</span>
        </div>

        {/* Google sign-in */}
        <button
          onClick={handleGoogleLogin}
          className="w-full border border-border-muted hover:border-cream/40 bg-transparent text-cream font-sans text-[11px] uppercase tracking-widest py-3 flex items-center justify-center space-x-2 transition-all duration-300"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
          </svg>
          <span>Continue with Google</span>
        </button>

        {/* Footer */}
        <div className="text-center font-sans text-[10px] text-cream/40">
          <span>Don&apos;t have an account? </span>
          <Link href="/auth/signup" className="text-cream hover:underline">
            Sign Up
          </Link>
        </div>

      </div>
    </div>
  );
}
