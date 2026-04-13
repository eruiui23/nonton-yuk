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

  const handleAdd = async (listStatus: 'plan_to_watch' | 'watching' | 'completed') => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }

    if (!token) {
      alert('Silakan login terlebih dahulu!');
      router.push('/login');
      return;
    }

    setStatus('loading');
    try {
      await api.post('/film-lists', 
        { film_id: filmId, list_status: listStatus },
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
    <div className="dropdown dropdown-bottom w-full">
      <div 
        tabIndex={0} 
        role="button" 
        className="btn btn-primary w-full shadow-lg"
      >
        {status === 'loading' ? <span className="loading loading-spinner"></span> : '+ Tambah ke Watchlist'}
      </div>
      <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow-xl bg-base-100 rounded-box w-full border border-base-200 mt-1">
        <li>
          <button onClick={() => handleAdd('plan_to_watch')} disabled={status === 'loading'}>
            🗓️ Plan to Watch
          </button>
        </li>
        <li>
          <button onClick={() => handleAdd('watching')} disabled={status === 'loading'}>
            👀 Watching
          </button>
        </li>
        <li>
          <button onClick={() => handleAdd('completed')} disabled={status === 'loading'}>
            ✅ Completed
          </button>
        </li>
      </ul>
    </div>
  );
}