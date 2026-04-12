export default function ReviewsTab({ items }: { items: any[] }) {
  if (!items || items.length === 0) {
    return (
      <div className="text-center py-12 text-base-content/50 bg-base-100 rounded-xl border border-base-200">
        Kamu belum menulis ulasan apa pun.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {items.map((review, index) => (
        <div key={index} className="card bg-base-100 shadow-sm border border-base-200">
          <div className="card-body p-5">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-lg text-primary">{review.film}</h3>
              <div className="badge badge-warning gap-1 font-bold">⭐ {review.rating} / 10</div>
            </div>
            <p className="text-base-content/80 italic">"{review.comment}"</p>
          </div>
        </div>
      ))}
    </div>
  );
}