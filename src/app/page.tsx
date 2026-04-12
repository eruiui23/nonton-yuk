'use client';
import { useState, useEffect, useCallback, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import api from '../services/api';

// Import komponen tetangga
import SearchHeader from './SearchHeader';
import FilmCard from './FilmCard';
import Pagination from './Pagination';

type FilmItem = {
  id: string;
  title: string;
  images?: string[];
  airing_status: string;
  total_episodes: number;
  average_rating: number;
  imageUrl?: string | null;
};

// 1. Kita pisahkan isi utamanya ke komponen HomeContent
function HomeContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Tangkap parameter dari URL
  const genreIdFilter = searchParams.get('genreId');
  const genreNameFilter = searchParams.get('genreName');

  const [films, setFilms] = useState<FilmItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');

  const fetchFilms = useCallback(async () => {
    try {
      setIsLoading(true);
      
      const params: Record<string, string | number> = {
        page: page,
        take: 8,
      };

      // Jika ada pencarian teks
      if (search) {
        params.filter_by = 'title';
        params.filter = search;
      }

      // Jika ada filter genre dari URL
      if (genreIdFilter) {
        // Asumsi param backend adalah "genre", sesuaikan jika di spec-nya "genre_id"
        params.genre = genreIdFilter; 
      }

      const response = await api.get('/films', { params });
      const filmsData = response.data.data as FilmItem[];
      const meta = response.data.meta[0];

      setTotalPages(meta.total_page || 1);
      setFilms(filmsData.map((f) => ({
        ...f,
        imageUrl: Array.isArray(f.images) ? f.images[0] : null
      })));
    } catch (error: unknown) {
      console.error('Gagal memuat film', error);
    } finally {
      setIsLoading(false);
    }
  }, [page, search, genreIdFilter]);

  // Tambahkan genreIdFilter ke dalam dependency array agar fetch diulang saat filter berganti
  useEffect(() => {
    const delayDebounce = setTimeout(fetchFilms, 500);
    return () => clearTimeout(delayDebounce);
  }, [fetchFilms]); 

  return (
    <div className="container mx-auto px-4 py-10 max-w-7xl min-h-screen">
      <section className="relative overflow-hidden rounded-[2rem] bg-primary text-primary-content p-10 shadow-[0_35px_120px_-45px_rgba(59,130,246,0.9)] mb-10">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.35),_transparent_20%)]"></div>
        <div className="relative grid gap-6 lg:grid-cols-[1.4fr_0.9fr] items-center">
          <div>
            <span className="badge badge-secondary badge-lg">Temukan Film</span>
            <h1 className="mt-6 text-5xl sm:text-6xl font-black leading-tight tracking-tight">Nonton jadi mudah, cepat, dan modern.</h1>
            <p className="mt-6 max-w-2xl text-base-content/90 text-lg">
              Jelajahi katalog film, lihat review terkini, dan kelola watchlist dengan tampilan yang bersih dan responsif.
            </p>
          </div>
          <div className="rounded-[1.75rem] bg-base-100 p-8 shadow-xl border border-base-200 backdrop-blur-xl text-base-content">
            <h2 className="text-xl font-semibold mb-4">Cari film favoritmu</h2>
            <SearchHeader search={search} setSearch={setSearch} setPage={setPage} />
          </div>
        </div>
      </section>

      {genreNameFilter && (
        <div className="mb-8 flex flex-wrap items-center gap-3 rounded-3xl border border-info/20 bg-info/10 px-5 py-4 text-base-content/90 shadow-sm">
          <span className="font-semibold uppercase tracking-[0.2em] text-sm text-info">Filter Genre</span>
          <div className="badge badge-info badge-outline font-semibold py-3 px-4">
            {genreNameFilter}
          </div>
          <button
            onClick={() => router.push('/')}
            className="btn btn-sm btn-ghost border border-info/20"
          >
            Reset
          </button>
        </div>
      )}

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-96 w-full rounded-[1.5rem] bg-base-200 animate-pulse"></div>
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {films.map((film) => <FilmCard key={film.id} film={film} />)}
          </div>
          
          {films.length === 0 && (
            <div className="text-center py-20 bg-base-100 rounded-[1.75rem] mt-6 border border-dashed border-base-200 shadow-sm">
              <h3 className="text-2xl font-bold opacity-60 italic">Film tidak ditemukan...</h3>
              {genreNameFilter && (
                <p className="mt-2 text-base-content/70">Coba hapus filter genre untuk melihat film lainnya.</p>
              )}
            </div>
          )}

          {films.length > 0 && (
            <Pagination page={page} totalPages={totalPages} setPage={setPage} />
          )}
        </>
      )}
    </div>
  );
}

// 2. Bungkus komponen utamanya dengan Suspense untuk Export
export default function HomePage() {
  return (
    <Suspense fallback={
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    }>
      <HomeContent />
    </Suspense>
  );
}