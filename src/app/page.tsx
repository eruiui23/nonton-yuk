'use client';
import Link from 'next/link';
import { useAuthStore } from '../store/useAuthStore';
import { ArrowRight, Film, Star } from 'lucide-react';
import { useState, useEffect } from 'react';
import FilmCard from '../components/FilmCard';
import api from '../services/api';

export default function LandingPage() {
  const { user } = useAuthStore();
  const [mounted, setMounted] = useState(false);
  const [recommendedFilms, setRecommendedFilms] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Prevent hydration mismatch for user & fetch recommendations
  useEffect(() => {
    setMounted(true);
    
    async function fetchRecommendations() {
      const ids = [
        '00302da5-2954-4e40-860d-7cc55c3d6094',
        '1d2637b7-a18a-498c-a21b-287dcca54ff2',
        '8311b33f-8e26-4c45-972f-d5755f05a73a',
        'db377f94-24b3-4f7b-bbce-1b8622b0dbb1'
      ];
      
      try {
        const responses = await Promise.all(
          ids.map(id => api.get(`/films/${id}`).catch(() => null))
        );
        
        const filmsData = responses
          .map((res: any) => res?.data?.data)
          .filter(Boolean);

        setRecommendedFilms(filmsData.map((f: any) => ({
          ...f,
          imageUrl: Array.isArray(f.images) && f.images.length > 0 ? f.images[0] : null
        })));
      } catch (error) {
        console.error("Gagal memuat rekomendasi film", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchRecommendations();
  }, []);

  return (
    <div className="bg-base-100 overflow-hidden relative">
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

          <p className="text-lg md:text-xl text-base-content/70 max-w-2xl mb-12 font-medium">
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
              <p className="text-sm text-base-content/70">Baca pengalaman menonton dari user lain sebelum kamu memutuskannya.</p>
            </div>
            <div className="card glass-card bg-base-200/50 backdrop-blur-md p-6 rounded-3xl w-64 text-left border border-base-content/10 shadow-xl transform translate-y-8 hover:translate-y-4 transition-transform cursor-default">
              <Film className="w-10 h-10 text-info mb-4" />
              <h3 className="font-bold text-lg mb-2">Katalog Update</h3>
              <p className="text-sm text-base-content/70">Rilisan terbaru dari berbagai genre bisa kamu temukan di sini.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Recommended Section */}
      <section className="container mx-auto px-4 sm:px-8 pb-32 relative z-10 w-full border-t border-base-content/10 pt-20">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 gap-4">
          <div>
            <h2 className="text-3xl md:text-5xl font-black mb-3">Rekomendasi Film</h2>
            <p className="text-base-content/70 text-lg">Pilihan terbaik untuk mulai menonton hari ini.</p>
          </div>
          <Link href="/movies" className="btn btn-outline btn-md shrink-0 rounded-full px-6">Lihat Semua</Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {isLoading ? (
            [...Array(4)].map((_, i) => (
              <div key={i} className="h-auto aspect-[2/3] w-full rounded-lg bg-base-200/50 animate-pulse border border-base-200/30"></div>
            ))
          ) : (
            recommendedFilms.slice(0, 4).map((film) => (
              <FilmCard key={film.id} film={film} />
            ))
          )}
        </div>
      </section>
    </div>
  );
}
