import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: '%s | Nonton Yuk', // %s akan diganti dengan judul halaman spesifik
    default: 'Nonton Yuk - Jelajahi Dunia Film', // Judul default kalau di home
  },
  description: 'Platform manajemen, katalog, dan ulasan film terbaik untukmu.',
  icons: {
    icon: '/favicon.ico', // Bonus: Bikin icon tab browser jadi emoji clapperboard!
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.14),_transparent_18%),radial-gradient(circle_at_bottom_right,_rgba(16,185,129,0.12),_transparent_22%),var(--background)]">
          <Navbar />
          <main className="flex-1">{children}</main>
        </div>
      </body>
    </html>
  );
}
