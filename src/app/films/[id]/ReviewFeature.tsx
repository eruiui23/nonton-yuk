'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../../services/api';

interface ReviewFeatureProps {
  filmId: string;
  token: string | null;
  onRefresh: () => void;
}

export default function ReviewFeature({ filmId, token, onRefresh }: ReviewFeatureProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(10);
  const [comment, setComment] = useState('');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'warning' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' | 'warning') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleOpen = () => {
    if (!token) {
      showToast('Silakan login terlebih dahulu!', 'warning');
      setTimeout(() => router.push('/login'), 1500);
    } else {
      setIsOpen(true);
    }
  };

  const { mutate: submitReview, isPending: isSubmitting } = useMutation({
    mutationFn: () =>
      api.post(
        '/reviews',
        { film_id: filmId, rating, comment },
        { headers: { Authorization: `Bearer ${token}` } }
      ),
    onSuccess: () => {
      showToast('Ulasan berhasil dikirim! ⭐', 'success');
      setIsOpen(false);
      setComment('');
      setRating(10);
      // Invalidate query reviews agar list langsung terupdate
      queryClient.invalidateQueries({ queryKey: ['reviews', filmId] });
      onRefresh();
    },
    onError: (error: any) => {
      showToast(error.response?.data?.error || 'Gagal mengirim ulasan.', 'error');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitReview();
  };

  return (
    <>
      <button onClick={handleOpen} className="btn btn-secondary w-full shadow-lg">
        Tulis Ulasan
      </button>

      {toast && (
        <div className="toast toast-top toast-center z-[9999] mt-16">
          <div
            className={`alert shadow-xl font-bold ${
              toast.type === 'success'
                ? 'alert-success text-white'
                : toast.type === 'error'
                ? 'alert-error text-white'
                : 'alert-warning'
            }`}
          >
            <span>{toast.message}</span>
          </div>
        </div>
      )}

      {isOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Berikan Ulasanmu</h3>

            <form onSubmit={handleSubmit}>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text font-bold">Rating (1-10)</span>
                </label>
                <div className="rating rating-sm sm:rating-md">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
                    <input
                      key={star}
                      type="radio"
                      name="rating"
                      className="mask mask-star-2 bg-warning"
                      checked={rating === star}
                      onChange={() => setRating(star)}
                    />
                  ))}
                </div>
                <div className="mt-2 text-sm font-bold text-warning">{rating} / 10 Bintang</div>
              </div>

              <div className="form-control mb-6">
                <label className="label">
                  <span className="label-text font-bold">Komentar</span>
                </label>
                <textarea
                  className="textarea textarea-bordered h-24 focus:textarea-primary"
                  placeholder="Apa pendapatmu tentang film ini?"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  required
                ></textarea>
              </div>

              <div className="modal-action">
                <button type="button" className="btn" onClick={() => setIsOpen(false)} disabled={isSubmitting}>
                  Batal
                </button>
                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                  {isSubmitting ? <span className="loading loading-spinner"></span> : 'Kirim Ulasan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}