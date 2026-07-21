"use client";

export interface Session {
  isAuthenticated: boolean;
  role: "Super Admin" | "Editor" | "Reader" | null;
  email: string | null;
  name: string | null;
}



const SESSION_KEY = "margins_session";

export function getSession(): Session {
  if (typeof window === "undefined") {
    return { isAuthenticated: false, role: null, email: null, name: null };
  }
  const raw = localStorage.getItem(SESSION_KEY);
  if (!raw) {
    return { isAuthenticated: false, role: null, email: null, name: null };
  }
  try {
    return JSON.parse(raw);
  } catch {
    return { isAuthenticated: false, role: null, email: null, name: null };
  }
}

export function setSession(session: Session): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  }
}

export function clearSession(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(SESSION_KEY);
  }
}
