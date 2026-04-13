'use client';
import Link from 'next/link';
import { useAuthStore } from '../store/useAuthStore';
import { ArrowRight, Film, Star } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function LandingHero() {
  const { user } = useAuthStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="min-h-[calc(100vh-5rem)] flex flex-col justify-center relative">
      <div className="absolute top-0 w-full h-[500px] bg-primary/20 blur-[150px] rounded-full sm:-top-[300px] pointer-events-none"></div>

      {/* Marquee Background Element */}
      <div className="absolute top-1/4 left-0 w-full overflow-hidden opacity-5 pointer-events-none select-none -translate-y-1/2 flex">
        <div className="whitespace-nowrap flex w-max font-black text-[12vw] uppercase animate-marquee text-primary leading-none">
          <span className="pr-8">🎬 FILM 🍿 SERIES ⭐️ REVIEW 🎥 NONTON 🎟️ TIKET 🎭 DRAMA</span>
          <span className="pr-8">🎬 FILM 🍿 SERIES ⭐️ REVIEW 🎥 NONTON 🎟️ TIKET 🎭 DRAMA</span>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-8 py-20 lg:py-32 relative z-10 flex flex-col items-center text-center">
        {mounted && (
          <div className="badge badge-primary badge-outline px-4 py-3 mb-8 shadow-sm">
            <span className="font-semibold tracking-widest text-sm">
              HALO, {user?.display_name ? user.display_name.toUpperCase() : 'PENGGUNA'}!
            </span>
          </div>
        )}

        <h1 className="text-6xl sm:text-7xl md:text-8xl font-black tracking-tighter mb-8 max-w-5xl leading-tight">
          Satu Tempat Untuk <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
            Semua Tontonanmu.
          </span>
        </h1>

        <p className="text-lg md:text-xl text-base-content/90 max-w-2xl mb-12 font-medium">
          Jelajahi ribuan film, tambahkan ke watchlist, dan baca ulasan terbaik dari komunitas Nonton Yuk!
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Link
            href="/movies"
            className="btn btn-primary btn-lg rounded-full px-8 shadow-lg shadow-primary/30 hover:scale-105 transition-transform font-bold"
          >
            <Film className="w-5 h-5 mr-2" />
            Mulai Eksplorasi
            <ArrowRight className="w-5 h-5 ml-1" />
          </Link>
          {!user && (
            <Link
              href="/login"
              className="btn btn-outline btn-lg rounded-full px-8 hover:scale-105 transition-transform"
            >
              Masuk / Daftar
            </Link>
          )}
        </div>

        {/* Floating Mini Cards */}
        <div className="hidden lg:flex w-full justify-center gap-6 mt-24 opacity-80">
          <div className="card glass-card bg-base-200/50 backdrop-blur-md p-6 rounded-3xl w-64 text-left border border-base-content/10 shadow-xl transform -rotate-6 hover:rotate-0 transition-transform cursor-default">
            <Star className="w-10 h-10 text-warning mb-4" />
            <h3 className="font-bold text-lg mb-2">Review Terpercaya</h3>
            <p className="text-sm text-base-content/90">Baca pengalaman menonton dari user lain sebelum kamu memutuskannya.</p>
          </div>
          <div className="card glass-card bg-base-200/50 backdrop-blur-md p-6 rounded-3xl w-64 text-left border border-base-content/10 shadow-xl transform translate-y-8 hover:translate-y-4 transition-transform cursor-default">
            <Film className="w-10 h-10 text-info mb-4" />
            <h3 className="font-bold text-lg mb-2">Katalog Update</h3>
            <p className="text-sm text-base-content/90">Rilisan terbaru dari berbagai genre bisa kamu temukan di sini.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
