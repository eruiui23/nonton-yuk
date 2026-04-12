'use client';

import { useState, useEffect } from 'react';
import api from '../../services/api';
import GenreSearch from './GenreSearch';
import GenreGrid from './GenreGrid';

interface Genre {
  id: string;
  name: string;
}

export default function PublicGenresPage() {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchPublicGenres = async () => {
      try {
        setIsLoading(true);
        // Memanggil API genre publik
        const response = await api.get('/genres');
        setGenres(response.data.data);
      } catch (error) {
        console.error('Gagal memuat genre', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPublicGenres();
  }, []);

  // Fitur Filter Lokal (Client-side) untuk mencari nama genre
  const filteredGenres = genres.filter(g => 
    g.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-10 max-w-6xl">
      <div className="rounded-[2rem] border border-base-200 bg-base-100/90 p-10 shadow-xl shadow-slate-200/40 backdrop-blur-xl mb-10">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-black mb-4">Eksplorasi Kategori</h1>
          <p className="text-base-content/70 text-lg max-w-2xl mx-auto">
            Temukan tontonan favoritmu berdasarkan genre dan langsung akses daftar film yang cocok.
          </p>
        </div>
      </div>

      <GenreSearch search={search} onSearchChange={setSearch} />

      {isLoading ? (
        <div className="flex justify-center py-20"><span className="loading loading-spinner loading-lg text-primary"></span></div>
      ) : filteredGenres.length > 0 ? (
        <GenreGrid genres={filteredGenres} />
      ) : (
        <div className="text-center py-20 text-base-content/50 font-bold">
          Genre tidak ditemukan.
        </div>
      )}
    </div>
  );
}