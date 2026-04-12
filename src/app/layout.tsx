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
    icon: '🎬', // Bonus: Bikin icon tab browser jadi emoji clapperboard!
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
      <body className="min-h-full flex flex-col">
        <Navbar />
        {children}</body>

    </html>
  );
}
