'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api from '../../../services/api';
import { Star, ThumbsUp, ThumbsDown } from 'lucide-react';

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
  const queryClient = useQueryClient();

  // Gunakan useQuery untuk mengambil data author — TanStack akan otomatis cache hasilnya
  // sehingga user yang sama tidak di-fetch ulang di setiap kartu
  const { data: authorName = `User #${review.user_id.slice(0, 5)}` } = useQuery({
    queryKey: ['user', review.user_id],
    queryFn: async () => {
      const res = await api.get(`/users/${review.user_id}`);
      return res.data.data.display_name || res.data.data.username || `User #${review.user_id.slice(0, 5)}`;
    },
    staleTime: 1000 * 60 * 10, // Cache nama user selama 10 menit
  });

  const myReaction = review.reactions && review.reactions.length > 0 ? review.reactions[0] : null;

  const { mutate: handleReact, isPending: isLoading } = useMutation({
    mutationFn: async (targetType: 'like' | 'dislike') => {
      if (!token) {
        router.push('/login');
        throw new Error('Silakan login untuk memberikan reaksi.');
      }
      if (myReaction?.status === targetType) return; // sudah bereaksi sama

      if (!myReaction) {
        await api.post(
          '/reactions',
          { review_id: review.id, status: targetType },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        await api.put(
          `/reactions/${myReaction.id}`,
          { status: targetType },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
    },
    onSuccess: () => {
      onRefresh();
    },
    onError: (error: any) => {
      alert(error.message || 'Gagal memproses reaksi.');
    },
  });

  return (
    <div className="card bg-base-100 border border-base-200 shadow-sm mb-4 transition-all hover:border-primary/30">
      <div className="card-body p-5">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Link
                href={`/users/${review.user_id}`}
                className="font-bold text-sm text-primary hover:underline decoration-2 underline-offset-4"
              >
                {authorName}
              </Link>
              <div className="badge badge-warning badge-sm font-bold shadow-sm">
                <Star className="w-3 h-3 fill-current inline-block mr-1" />
                {review.rating}
              </div>
            </div>
            <p className="text-base-content/80 text-sm">"{review.comment}"</p>
          </div>
        </div>

        <div className="card-actions justify-end mt-4 pt-4 border-t border-base-200 gap-3">
          <button
            onClick={() => handleReact('like')}
            disabled={isLoading}
            className={`btn btn-xs sm:btn-sm gap-2 shadow-sm ${
              myReaction?.status === 'like' ? 'btn-success text-white' : 'btn-outline btn-success'
            }`}
          >
            <ThumbsUp className="w-4 h-4" /> {review.likes}
          </button>
          <button
            onClick={() => handleReact('dislike')}
            disabled={isLoading}
            className={`btn btn-xs sm:btn-sm gap-2 shadow-sm ${
              myReaction?.status === 'dislike' ? 'btn-error text-white' : 'btn-outline btn-error'
            }`}
          >
            <ThumbsDown className="w-4 h-4" /> {review.dislikes}
          </button>
        </div>
      </div>
    </div>
  );
}