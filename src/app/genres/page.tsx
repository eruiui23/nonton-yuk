'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import api from '../../services/api';

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
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-black mb-4">Eksplorasi Kategori</h1>
        <p className="text-base-content/70 text-lg">
          Temukan tontonan favoritmu berdasarkan genre.
        </p>
      </div>

      {/* Bar Pencarian Genre */}
      <div className="max-w-md mx-auto mb-10">
        <input 
          type="text" 
          placeholder="Cari genre... (misal: action, komedi)" 
          className="input input-bordered input-primary w-full shadow-sm rounded-full px-6"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20"><span className="loading loading-spinner loading-lg text-primary"></span></div>
      ) : filteredGenres.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredGenres.map((genre) => (
            <Link 
              key={genre.id} 
              // Lempar user ke home dengan membawa parameter genreId & nama genre
              href={`/?genreId=${genre.id}&genreName=${genre.name}`}
              className="card bg-base-100 border border-base-200 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-primary transition-all cursor-pointer group"
            >
              <div className="card-body items-center justify-center p-6 text-center">
                <span className="text-lg font-bold capitalize group-hover:text-primary transition-colors">
                  {genre.name}
                </span>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-base-content/50 font-bold">
          Genre tidak ditemukan.
        </div>
      )}
    </div>
  );
}