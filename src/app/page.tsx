'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import api from '../services/api';

// Import komponen tetangga
import SearchHeader from './SearchHeader';
import FilmCard from './FilmCard';
import Pagination from './Pagination';

// 1. Kita pisahkan isi utamanya ke komponen HomeContent
function HomeContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Tangkap parameter dari URL
  const genreIdFilter = searchParams.get('genreId');
  const genreNameFilter = searchParams.get('genreName');

  const [films, setFilms] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');

  const fetchFilms = async () => {
    try {
      setIsLoading(true);
      
      // Menggunakan object params agar lebih rapi dan dinamis
      const params: any = {
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

      // Tembak API menggunakan Axios params
      const response = await api.get('/films', { params });
      const filmsData = response.data.data;
      const meta = response.data.meta[0];

      setTotalPages(meta.total_page || 1);
      setFilms(filmsData.map((f: any) => ({
        ...f,
        imageUrl: f.images?.[0] || null
      })));
    } catch (error) {
      console.error("Gagal memuat film");
    } finally {
      setIsLoading(false);
    }
  };

  // Tambahkan genreIdFilter ke dalam dependency array agar fetch diulang saat filter berganti
  useEffect(() => {
    const delayDebounce = setTimeout(fetchFilms, 500);
    return () => clearTimeout(delayDebounce);
  }, [search, page, genreIdFilter]); 

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl min-h-screen">
      
      {/* Header & Search */}
      <div className="mb-8">
        <SearchHeader search={search} setSearch={setSearch} setPage={setPage} />

        {/* Indikator Filter Genre (Hanya muncul jika masuk dari halaman kategori) */}
        {genreNameFilter && (
          <div className="mt-4 flex items-center gap-2 animate-fade-in">
            <span className="text-sm font-semibold opacity-70">Menampilkan genre:</span>
            <div className="badge badge-primary badge-lg shadow-sm font-bold gap-1 py-3 px-4">
              <span className="capitalize">{genreNameFilter}</span>
              <button 
                onClick={() => router.push('/')} // Hapus filter dengan kembali ke rute root
                className="ml-2 btn btn-xs btn-circle btn-ghost text-primary-content hover:bg-base-200 hover:text-base-content"
                title="Hapus Filter"
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="skeleton h-96 w-full rounded-xl"></div>
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {films.map((film) => <FilmCard key={film.id} film={film} />)}
          </div>
          
          {films.length === 0 && (
            <div className="text-center py-20 bg-base-200 rounded-3xl mt-6 border-2 border-dashed border-base-300">
              <h3 className="text-2xl font-bold opacity-30 italic">Film tidak ditemukan...</h3>
              {genreNameFilter && (
                <p className="mt-2 opacity-50">Coba hapus filter genre untuk melihat film lainnya.</p>
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