'use client';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { CalendarDays, Eye, CheckCircle } from 'lucide-react';
import api from '../../../services/api';

interface WatchlistActionProps {
  filmId: string;
  token: string | null;
}

export default function WatchlistAction({ filmId, token }: WatchlistActionProps) {
  const router = useRouter();

  const { mutate: addToWatchlist, isPending, isSuccess, reset } = useMutation({
    mutationFn: async (listStatus: 'plan_to_watch' | 'watching' | 'completed') => {
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
      if (!token) {
        router.push('/login');
        throw new Error('Silakan login terlebih dahulu!');
      }
      await api.post(
        '/film-lists',
        { film_id: filmId, list_status: listStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    },
    onSuccess: () => {
      setTimeout(() => reset(), 3000);
    },
    onError: (error: any) => {
      alert(error.response?.data?.error || error.message || 'Gagal menyimpan ke watchlist.');
    },
  });

  if (isSuccess) {
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
        {isPending ? <span className="loading loading-spinner"></span> : '+ Tambah ke Watchlist'}
      </div>
      <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow-xl bg-base-100 rounded-box w-full border border-base-200 mt-1">
        <li>
          <button onClick={() => addToWatchlist('plan_to_watch')} disabled={isPending}>
            <CalendarDays className="w-4 h-4 mr-1 opacity-70" /> Plan to Watch
          </button>
        </li>
        <li>
          <button onClick={() => addToWatchlist('watching')} disabled={isPending}>
            <Eye className="w-4 h-4 mr-1 opacity-70" /> Watching
          </button>
        </li>
        <li>
          <button onClick={() => addToWatchlist('completed')} disabled={isPending}>
            <CheckCircle className="w-4 h-4 mr-1 opacity-70" /> Completed
          </button>
        </li>
      </ul>
    </div>
  );
}