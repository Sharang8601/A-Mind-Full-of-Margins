"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getSession } from "@/utils/authSession";

export default function AdminGate() {
  const router = useRouter();

  useEffect(() => {
    const session = getSession();
    if (session.isAuthenticated && (session.role === "Super Admin" || session.role === "Editor")) {
      router.push("/admin/dashboard");
    } else {
      router.push("/admin/login");
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-charcoal text-cream flex items-center justify-center font-sans text-xs">
      Directing to portal...
    </div>
  );
}
