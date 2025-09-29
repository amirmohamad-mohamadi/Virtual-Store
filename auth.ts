// Secure password comparison using bcrypt hashing (Edge-compatible)
import { compareSync } from "bcrypt-ts-edge";
// Type definition for NextAuth configuration object
import type { NextAuthConfig } from "next-auth";
// Core NextAuth function to initialize authentication
import NextAuth from "next-auth";
// Credentials-based login provider (username + password)
import CredentialsProvider from "next-auth/providers/credentials";
// Prisma client instance for database access
import { prisma } from "@/db/prisma";
// Adapter to connect NextAuth with Prisma models (for session & user management)
import { PrismaAdapter } from "@auth/prisma-adapter";

// Custom NextAuth configuration object
export const config = {
  pages: {
    // Custom sign-in page route
    signIn: "/sign-in",
    // Redirect to sign-in page on error
    error: "/sign-in",
  },
  session: {
    // Use JWT strategy for stateless session management
    strategy: "jwt",
    // Session expiration time (30 days)
    maxAge: 30 * 24 * 60 * 60,
  },
  //  Connect NextAuth to Prisma using official adapter
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      credentials: {
        // Email input field for login form
        email: { type: "email" },
        // Password input field for login form
        password: { type: "password" },
      },
      async authorize(credentials) {
        // Return null if credentials are missing
        if (credentials === null) return null;

        // Find user by email in the database
        const user = await prisma.user.findFirst({
          where: {
            email: credentials.email as string,
          },
        });

        // Check if user exists and has a password
        if (user && user.password) {
          // Compare provided password with hashed password in DB
          const isMatch = compareSync(
            credentials.password as string,
            user.password
          );

          // If password matches, return user object for session
          if (isMatch) {
            return {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role,
            };
          }
        }

        // Invalid credentials: return null to reject login
        return null;
      },
    }),
  ],
  // Callbacks in NextAuth act like filters/controllers to customize, restrict, or enrich data before it reaches the frontend
  callbacks: {
    async jwt({ token, user, trigger, session }: any) {
      // اگر کاربر تازه لاگین کرده، اطلاعاتش رو به توکن اضافه کن
      if (user) {
        token.role = user.role;

        // اگر نام کاربر 'NO_NAME' بود، از ایمیلش به عنوان نام استفاده کن
        if (user.name === "NO_NAME") {
          token.name = user.email!.split("@")[0];

          // نام جدید رو داخل دیتابیس ذخیره کن
          await prisma.user.update({
            where: { id: user.id },
            data: { name: token.name },
          });
        }
      }

      // اگر سشن آپدیت شده (مثلاً نام تغییر کرده)، توکن رو هم آپدیت کن
      if (session?.user.name && trigger === "update") {
        token.name = session.user.name;
      }

      //  توکن نهایی رو برگردون
      return token;
    },
    // Customize session object: attach user ID from JWT and optionally update name on session trigger
    // این تابع بعد از جی دبلیو تی یعنی تابع بالا اجرا می‌شه و اطلاعات توکن رو به سشن منتقل می‌کنه.
    async session({ session, token, trigger }: any) {
      // اطلاعات توکن رو به session منتقل کن
      session.user.id = token.id;
      session.user.name = token.name;
      session.user.role = token.role;

      // اگر سشن آپدیت شده، نام جدید رو اعمال کن
      if (trigger === "update" && token.name) {
        session.user.name = token.name;
      }

      //  سشن نهایی رو برگردون
      return session;
    },
  },
} satisfies NextAuthConfig;

// Export NextAuth handlers and utilities
export const { handlers, auth, signIn, signOut } = NextAuth(config);
