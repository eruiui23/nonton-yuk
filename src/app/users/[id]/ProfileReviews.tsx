import UserReviewCard from './UserReviewCard';

type UserReview = {
  film?: string;
  rating?: number;
  comment?: string;
};

type ProfileReviewsProps = {
  reviews?: UserReview[];
};

export default function ProfileReviews({ reviews }: ProfileReviewsProps) {
  if (!reviews || reviews.length === 0) {
    return (
      <div className="p-8 bg-base-200/50 backdrop-blur-sm rounded-xl border border-base-content/10 text-center text-base-content/70 italic font-medium shadow-sm">
        Pengguna ini belum pernah mengulas mahakarya mana pun.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {reviews.map((review, index) => (
        <UserReviewCard key={index} review={review} />
      ))}
    </div>
  );
}
