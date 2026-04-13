'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import FilmCard from './FilmCard';
import api from '../services/api';

export default function LandingRecommended() {
  const [recommendedFilms, setRecommendedFilms] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
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
    <section className="container mx-auto px-4 sm:px-8 pb-32 relative z-10 w-full border-t border-base-content/10 pt-20">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 gap-4">
        <div>
          <h2 className="text-3xl md:text-5xl font-black mb-3">Rekomendasi Film</h2>
          <p className="text-base-content/90 text-lg">Pilihan terbaik untuk mulai menonton hari ini.</p>
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
  );
}
