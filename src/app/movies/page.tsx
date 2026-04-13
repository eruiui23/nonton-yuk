'use client';
import { useState, useEffect, useCallback, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import api from '../../services/api';

// Import komponen
import SearchHeader from '../../components/SearchHeader';
import FilmCard from '../../components/FilmCard';
import Pagination from '../../components/Pagination';

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
        take: 12,
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
      <section className="relative overflow-hidden rounded-3xl bg-base-200/40 border border-base-content/5 p-8 sm:p-12 mb-12">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-accent/10 blur-[100px] rounded-full pointer-events-none translate-y-1/3 -translate-x-1/3"></div>
        
        <div className="relative grid gap-8 lg:grid-cols-[1fr_300px] items-center z-10">
          <div>
            <div className="inline-block px-3 py-1 mb-6 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase">
              Katalog Lengkap
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-6 tracking-tighter leading-tight">
              Eksplorasi Dunia <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Perfilman.</span>
            </h1>
            <p className="max-w-xl text-base-content/70 text-lg leading-relaxed">
              Jelajahi ribuan judul film, saring berdasarkan genre kesukaanmu, dan temukan tontonan mahakarya untuk menemanimu hari ini.
            </p>
          </div>
          <div className="bg-base-100/60 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-2xl border border-base-content/10">
            <h2 className="text-sm font-bold uppercase tracking-widest text-base-content/50 mb-5 text-center lg:text-left">Cari Judul</h2>
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
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 sm:gap-6">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="h-auto aspect-[2/3] w-full rounded-2xl bg-base-200/50 animate-pulse border border-base-200/30"></div>
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 sm:gap-6">
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