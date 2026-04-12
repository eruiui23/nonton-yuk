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
      <div className="p-8 bg-base-200 rounded-xl text-center opacity-50 italic">
        Belum ada ulasan.
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
