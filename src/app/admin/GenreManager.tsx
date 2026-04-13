import { useState, useEffect } from 'react';
import api from '../../services/api';
import GenreTable from './GenreTable';
import GenreModal from './GenreModal';

interface Genre {
  id: string;
  name: string;
}

export default function GenreManager({ token }: { token: string }) {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [toast, setToast] = useState<{ message: string, type: 'success' | 'error' } | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingGenre, setEditingGenre] = useState<Genre | null>(null);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchGenres = async () => {
    try {
      setIsLoading(true);
      const response = await api.get(`/genres/admin?page=${page}&take=10`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setGenres(response.data.data);
      setTotalPages(response.data.meta[0]?.total_page || 1);
    } catch (error) {
      showToast('Gagal memuat daftar genre', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGenres();
  }, [page, token]);

  const handleSaveGenre = async (name: string) => {
    try {
      if (editingGenre) {
        await api.put(`/genres/${editingGenre.id}`, { name }, { headers: { Authorization: `Bearer ${token}` } });
        showToast('Genre berhasil diperbarui!', 'success');
      } else {
        await api.post('/genres', { name }, { headers: { Authorization: `Bearer ${token}` } });
        showToast('Genre baru berhasil ditambahkan!', 'success');
      }
      setIsModalOpen(false);
      fetchGenres();
    } catch (error: any) {
      showToast(error.response?.data?.error || 'Gagal menyimpan genre.', 'error');
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {toast && (
        <div className="toast toast-top toast-center z-[9999] mt-4">
          <div className={`alert shadow-xl font-bold text-white ${toast.type === 'success' ? 'alert-success' : 'alert-error'}`}>
            <span>{toast.message}</span>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center bg-base-200/40 backdrop-blur-md p-6 rounded-2xl border border-base-content/10 shadow-xl mb-4">
        <h2 className="text-2xl font-black">Daftar Genre</h2>
        <button onClick={() => { setEditingGenre(null); setIsModalOpen(true); }} className="btn btn-secondary shadow-lg">
          + Tambah Genre
        </button>
      </div>

      <GenreTable genres={genres} isLoading={isLoading} onEdit={(genre) => { setEditingGenre(genre); setIsModalOpen(true); }} />

      {totalPages > 1 && (
        <div className="flex justify-center mt-4">
          <div className="join border border-base-300 shadow-sm">
            <button className="join-item btn" disabled={page === 1} onClick={() => setPage(page - 1)}>«</button>
            <button className="join-item btn pointer-events-none bg-base-200">Halaman {page} dari {totalPages}</button>
            <button className="join-item btn" disabled={page === totalPages} onClick={() => setPage(page + 1)}>»</button>
          </div>
        </div>
      )}

      <GenreModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleSaveGenre} initialData={editingGenre} />
    </div>
  );
}