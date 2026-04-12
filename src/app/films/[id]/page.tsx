'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { useAuthStore } from '../../../store/useAuthStore';
import api from '../../../services/api';

import FilmInfo from './FilmInfo';
import WatchlistAction from './WatchlistAction';
import ReviewFeature from './ReviewFeature';
import ReviewCard from './ReviewCard'; // <--- Komponen baru kita

export default function FilmDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const { token } = useAuthStore();

  const [film, setFilm] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Bungkus dalam useCallback agar bisa dipassing ke komponen anak tanpa re-render berlebih
  const fetchFilmDetail = useCallback(async () => {
    if (!id) return;
    try {
      // Kita kirim token juga di sini supaya backend tahu mana reaksi "milik kita"
      const response = await api.get(`/films/${id}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      setFilm(response.data.data);

      document.title = `${response.data.data.title} | Nonton Yuk`;
    } catch (error) {
      console.error("Gagal memuat detail film:", error);
    } finally {
      setIsLoading(false);
    }
  }, [id, token]);

  useEffect(() => {
    fetchFilmDetail();
  }, [fetchFilmDetail]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (!film) return <div className="text-center py-20 font-bold">Film tidak ditemukan.</div>;

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      
      {/* 1. Informasi Utama Film */}
      <FilmInfo film={film} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
        
        {/* KOLOM KIRI: Ulasan Pengguna (Daftar ulasan dari orang lain) */}
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            💬 Ulasan Komunitas <div className="badge badge-ghost opacity-50">{film.reviews?.length || 0}</div>
          </h2>
          
          {film.reviews && film.reviews.length > 0 ? (
            <div className="flex flex-col">
              {film.reviews.map((rev: any) => (
                <ReviewCard 
                  key={rev.id} 
                  review={rev} 
                  token={token} 
                  onRefresh={fetchFilmDetail} 
                />
              ))}
            </div>
          ) : (
            <div className="bg-base-200/50 rounded-2xl p-10 text-center border-2 border-dashed border-base-300">
              <p className="text-base-content/50 italic">Belum ada ulasan untuk film ini. Jadilah yang pertama!</p>
            </div>
          )}
        </div>

        {/* KOLOM KANAN: Aksi User (Watchlist & Tulis Review) */}
        <div className="flex flex-col gap-4">
          <div className="card bg-base-100 shadow-xl border border-base-200 sticky top-24">
            <div className="card-body">
              <h3 className="card-title text-lg mb-4">Aksi Kamu</h3>
              <WatchlistAction filmId={id} token={token} />
              <ReviewFeature filmId={id} token={token} onRefresh={fetchFilmDetail} />
              
              <div className="divider opacity-50">INFO</div>
              <div className="text-xs space-y-2 opacity-70">
                <div className="flex justify-between"><span>Status:</span> <span className="font-bold uppercase text-primary">{film.airing_status?.replace('_', ' ')}</span></div>
                <div className="flex justify-between"><span>Total Eps:</span> <span className="font-bold">{film.total_episodes}</span></div>
                <div className="flex justify-between"><span>Rilis:</span> <span className="font-bold">{film.release_date?.split(' ')[0]}</span></div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}