import { Star } from 'lucide-react';

type UserReview = {
  film?: string;
  rating?: number;
  comment?: string;
};

type UserReviewCardProps = {
  review: UserReview;
};

export default function UserReviewCard({ review }: UserReviewCardProps) {
  return (
    <div className="card bg-base-100 border border-base-200 shadow-sm">
      <div className="card-body p-5">
        <div className="flex justify-between items-center mb-2">
          <span className="font-bold text-primary">{review.film || 'Film'}</span>
          <span className="badge badge-warning font-bold flex items-center gap-1 px-3 py-3">
            <span className="w-3 h-3 flex items-center justify-center"><Star className="w-3 h-3 fill-current" /></span> {review.rating}/10
          </span>
        </div>
        <p className="text-sm opacity-80 italic">"{review.comment}"</p>
      </div>
    </div>
  );
}
