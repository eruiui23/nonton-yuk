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
    <div className="container mx-auto px-4 py-10 max-w-7xl min-h-screen">
      <section className="relative overflow-hidden rounded-3xl bg-base-200/40 border border-base-content/5 p-8 sm:p-12 mb-12">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary/10 blur-[120px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-primary/10 blur-[100px] rounded-full pointer-events-none translate-y-1/3 -translate-x-1/3"></div>

        <div className="relative z-10 text-center max-w-3xl mx-auto">
          <div className="inline-block px-3 py-1 mb-6 rounded-full border border-secondary/30 bg-secondary/10 text-secondary text-xs font-bold tracking-widest uppercase">
            Peta Kategori
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tighter leading-tight">
            Eksplorasi <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary">Genre.</span>
          </h1>
          <p className="text-base-content/90 text-lg leading-relaxed mb-10">
            Temukan tontonan favoritmu berdasarkan genre dan langsung telusuri ribuan judul mahakarya yang menantimu.
          </p>
          <GenreSearch search={search} onSearchChange={setSearch} />
        </div>
      </section>

      {isLoading ? (
        <div className="flex justify-center py-20"><span className="loading loading-spinner loading-lg text-primary"></span></div>
      ) : filteredGenres.length > 0 ? (
        <GenreGrid genres={filteredGenres} />
      ) : (
        <div className="text-center py-20 text-base-content/70 font-bold">
          Genre tidak ditemukan.
        </div>
      )}
    </div>
  );
}