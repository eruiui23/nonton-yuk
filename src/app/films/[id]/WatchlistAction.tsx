'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '../../../services/api';

interface WatchlistActionProps {
  filmId: string;
  token: string | null;
}

export default function WatchlistAction({ filmId, token }: WatchlistActionProps) {
  const router = useRouter();
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleAdd = async () => {
    if (!token) {
      alert('Silakan login terlebih dahulu!');
      router.push('/login');
      return;
    }

    setStatus('loading');
    try {
      await api.post('/film-lists', 
        { film_id: filmId, list_status: "watching" },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setStatus('success');
      setTimeout(() => setStatus('idle'), 3000);
    } catch (error: any) {
      console.error(error);
      alert(error.response?.data?.error || 'Gagal menyimpan ke watchlist.');
      setStatus('idle');
    }
  };

  if (status === 'success') {
    return (
      <button className="btn btn-success text-white w-full shadow-lg" disabled>
        ✓ Tersimpan di Watchlist
      </button>
    );
  }

  return (
    <button 
      onClick={handleAdd}
      disabled={status === 'loading'}
      className="btn btn-primary w-full shadow-lg"
    >
      {status === 'loading' ? <span className="loading loading-spinner"></span> : '+ Tambah ke Watchlist'}
    </button>
  );
}