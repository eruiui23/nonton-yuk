'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link'; // <--- Wajib import ini buat pindah halaman
import api from '../../../services/api';

interface Review {
  id: string;
  user_id: string;
  rating: number;
  comment: string;
  likes: number;
  dislikes: number;
  reactions: Array<{ id: string; status: 'like' | 'dislike' }>;
}

interface ReviewCardProps {
  review: Review;
  token: string | null;
  onRefresh: () => void;
}

export default function ReviewCard({ review, token, onRefresh }: ReviewCardProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  
  // STATE BARU: Untuk menyimpan nama pembuat ulasan
  const [authorName, setAuthorName] = useState<string>(`Memuat...`);

  const myReaction = review.reactions && review.reactions.length > 0 
    ? review.reactions[0] 
    : null;

  // JURUS N+1: Ambil data user saat kartu ulasan ini dimunculkan di layar
  useEffect(() => {
    const fetchAuthorData = async () => {
      try {
        const res = await api.get(`/users/${review.user_id}`);
        // Asumsi struktur data profil ada display_name atau username
        const name = res.data.data.display_name || res.data.data.username || `User #${review.user_id.slice(0,5)}`;
        setAuthorName(name);
      } catch (error) {
        // Kalau error (misal user dihapus), fallback ke ID saja
        setAuthorName(`User #${review.user_id.slice(0,5)}`);
      }
    };

    fetchAuthorData();
  }, [review.user_id]);

  const handleReact = async (targetType: 'like' | 'dislike') => {
    if (!token) {
      alert('Silakan login untuk memberikan reaksi.');
      router.push('/login');
      return;
    }

    if (myReaction?.status === targetType) {
       // Opsional: Kalau mau nambahin fitur Batal React (DELETE), taruh sini
       // await api.delete(`/reactions/${myReaction.id}`, { headers: ... });
       return;
    }

    setIsLoading(true);
    try {
      if (!myReaction) {
        // Ingat hotfix semalam: pakenya 'status' bukan 'reaction_type' ya!
        await api.post('/reactions', 
          { review_id: review.id, status: targetType },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        await api.put(`/reactions/${myReaction.id}`, 
          { status: targetType },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
      onRefresh();
    } catch (error) {
      console.error(error);
      alert('Gagal memproses reaksi.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card bg-base-100 border border-base-200 shadow-sm mb-4 transition-all hover:border-primary/30">
      <div className="card-body p-5">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2 mb-2">
              {/* TOMBOL KE PROFIL USER */}
              <Link 
                href={`/users/${review.user_id}`} 
                className="font-bold text-sm text-primary hover:underline decoration-2 underline-offset-4"
              >
                {authorName}
              </Link>
              <div className="badge badge-warning badge-sm font-bold shadow-sm">⭐ {review.rating}</div>
            </div>
            <p className="text-base-content/80 text-sm">"{review.comment}"</p>
          </div>
        </div>

        <div className="card-actions justify-end mt-4 pt-4 border-t border-base-200 gap-3">
          <button 
            onClick={() => handleReact('like')}
            disabled={isLoading}
            className={`btn btn-xs sm:btn-sm gap-2 shadow-sm ${myReaction?.status === 'like' ? 'btn-success text-white' : 'btn-outline btn-success'}`}
          >
            👍 {review.likes}
          </button>
          <button 
            onClick={() => handleReact('dislike')}
            disabled={isLoading}
            className={`btn btn-xs sm:btn-sm gap-2 shadow-sm ${myReaction?.status === 'dislike' ? 'btn-error text-white' : 'btn-outline btn-error'}`}
          >
            👎 {review.dislikes}
          </button>
        </div>
      </div>
    </div>
  );
}