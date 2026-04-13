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
    <div className="card bg-base-200/50 backdrop-blur-sm border border-base-content/10 shadow-md hover:shadow-xl hover:border-primary/50 transition-all duration-300">
      <div className="card-body p-6 sm:p-5">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-3">
          <span className="font-black text-lg text-primary tracking-wide leading-tight">{review.film || 'Film'}</span>
          <span className="badge badge-warning badge-outline border border-warning/30 bg-warning/10 text-warning font-black tracking-widest flex items-center gap-1.5 px-3 py-3">
            <span className="w-3.5 h-3.5 flex items-center justify-center"><Star className="w-3.5 h-3.5 fill-current" /></span> {review.rating}/10
          </span>
        </div>
        <p className="text-base-content/90 text-sm italic leading-relaxed font-medium mt-1">"{review.comment}"</p>
      </div>
    </div>
  );
}
