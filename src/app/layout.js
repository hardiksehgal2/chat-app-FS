"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import useAuthStore from "@/store/useAuthStore";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Public routes that do not require authentication
const publicRoutes = ["/login", "/signup", "/forgot-password"];

export default function RootLayout({ children }) {
  const { checkAuth, isCheckingAuth, authUser } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  // Check authentication status on initial load
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Redirect unauthenticated users to login and authenticated users away from public routes
  useEffect(() => {
    if (!isCheckingAuth) {
      if (!authUser && !publicRoutes.includes(pathname)) {
        // Redirect unauthenticated users to login
        router.push("/login");
      } else if (authUser && publicRoutes.includes(pathname)) {
        // Redirect authenticated users away from public routes to home page
        router.push("/");
      }
    }
  }, [isCheckingAuth, authUser, router, pathname]);

  // While checking authentication, render a loader or nothing
  if (isCheckingAuth) {
    return (
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased flex items-center justify-center min-h-screen`}
        >
          <div className="animate-spin h-8 w-8 border-4 border-gray-300 border-t-transparent rounded-full"></div>
        </body>
      </html>
    );
  }

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
