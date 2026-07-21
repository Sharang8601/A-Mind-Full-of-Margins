import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const ADMIN_EMAIL = "rishiikaa.june@gmail.com";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      if (user.email && user.email.toLowerCase() === ADMIN_EMAIL.toLowerCase()) {
        return true;
      }
      return false; // Reject if it's not the admin email
    },
    async session({ session }) {
      // Attach a role for the dashboard to use
      if (session.user?.email && session.user.email.toLowerCase() === ADMIN_EMAIL.toLowerCase()) {
         (session.user as { role?: string }).role = "Super Admin"; 
      }
      return session;
    }
  },
  pages: {
    signIn: '/admin/login',
    error: '/admin/login',
  }
});

export { handler as GET, handler as POST };
