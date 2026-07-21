"use client";

import React, { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { RefreshCw, AlertTriangle } from "lucide-react";
import PaperGrain from "@/components/PaperGrain";
import CandleGlow from "@/components/CandleGlow";

function LoginContent() {
  const router = useRouter();
  const { status } = useSession();
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/admin/dashboard");
    }
  }, [status, router]);

  const handleGoogleAuthStart = () => {
    signIn("google", { callbackUrl: "/admin/dashboard" });
  };

  const getErrorMessage = (errType: string) => {
    switch (errType.toLowerCase()) {
      case "accessdenied":
        return "Access Denied: Your Google email is not in the authorized Admin whitelist.";
      case "configuration":
        return "Server Configuration Error: Verify your NEXTAUTH_SECRET, Google Client ID, and Client Secret are loaded correctly.";
      default:
        return `Authentication Error (${errType}): Google OAuth failed to verify.`;
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-charcoal text-cream flex items-center justify-center font-sans text-xs">
        <RefreshCw className="w-5 h-5 text-beige animate-spin mr-2" />
        Verifying authorization credentials...
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-charcoal text-cream overflow-hidden flex items-center justify-center p-6 selection:bg-beige selection:text-charcoal font-sans">
      <PaperGrain />
      <CandleGlow />

      <div className="w-full max-w-[420px] border border-border-muted bg-card-bg/25 backdrop-blur-xl p-8 space-y-6 shadow-2xl relative z-10 text-center">
        <div className="card-hover-overlay pointer-events-none opacity-[0.02]" />

        {/* Branding Logo */}
        <div className="space-y-3">
          <div className="w-14 h-14 rounded-full bg-beige/10 border border-border-muted mx-auto flex items-center justify-center relative overflow-hidden cinematic-overlay">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAd5hbeEys4swuXyv-km07QcTtbRv6-5_lLKSPD_OOmHm_7J74GfSjobMxj1gwwarW7Fka_JgewkrhbKiE5AV_w7sojt6rJeBJ8rU_xAoNhKK-u4cgdCr_qoypokzNNKcbeBNNIJRA_mP2Gg9_VF081Sz_uPa6YDldNiOUxzAGDrl2Bj9AfP6xC3RiSOCkDDmqCru71ma2mZSrh9QOOwJEPRww59Knj1XbvIws3O3EdqE7X-bDyQDXdI4FFADUFYkaW2qubW4FSmG9J"
              alt="Logo"
              className="w-full h-full object-cover grayscale"
            />
          </div>
          
          <div className="space-y-1">
            <h1 className="font-serif text-3xl italic leading-none">Margins Publisher</h1>
            <p className="font-sans text-[9px] uppercase tracking-[0.25em] text-beige font-semibold">CMS Access Control</p>
          </div>
        </div>

        {/* Instructions */}
        <div className="font-sans text-xs text-cream/70 leading-relaxed font-light px-4">
          Access is restricted to authorized publication members. Public registration is closed. Please sign in with your whitelisted Google Workspace account.
        </div>

        {/* Error message presentation if exists */}
        {error && (
          <div className="bg-red-950/40 border border-red-500/20 p-4 text-left space-y-1">
            <div className="flex items-center space-x-2 text-red-400 font-semibold text-xs uppercase tracking-wider">
              <AlertTriangle className="w-4 h-4" />
              <span>Login Blocked</span>
            </div>
            <p className="text-[11px] text-cream/80 leading-normal font-sans">
              {getErrorMessage(error)}
            </p>
          </div>
        )}

        {/* Google OAuth Trigger ONLY */}
        <button
          onClick={handleGoogleAuthStart}
          className="w-full bg-beige text-charcoal hover:bg-cream hover:text-charcoal font-sans text-xs font-semibold uppercase tracking-widest py-3 flex items-center justify-center space-x-2 transition-colors duration-300 shadow-md"
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
          </svg>
          <span>Sign In with Google</span>
        </button>

        {/* Back Link */}
        <div className="border-t border-border-muted/20 pt-4 flex justify-center">
          <Link href="/" className="font-sans text-[10px] text-cream/40 uppercase tracking-widest hover:text-cream transition-colors flex items-center space-x-1">
            <span>Cancel</span>
          </Link>
        </div>

      </div>
    </div>
  );
}

export default function AdminLogin() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-charcoal text-cream flex items-center justify-center font-sans text-xs">
        <RefreshCw className="w-5 h-5 text-beige animate-spin mr-2" />
        Loading login panel...
      </div>
    }>
      <LoginContent />
    </Suspense>
  );
}

