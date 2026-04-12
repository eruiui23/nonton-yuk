interface UserPublicListProps {
  watchlist: any[];
  reviews: any[];
}

export default function UserPublicList({ watchlist, reviews }: UserPublicListProps) {
  return (
    <div className="flex flex-col gap-12">
      {/* SEKSI WATCHLIST */}
      <section>
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">🎬 Watchlist</h2>
        {watchlist.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {watchlist.map((item, i) => (
              <div key={i} className="p-4 bg-base-100 rounded-xl border border-base-200 flex justify-between items-center shadow-sm">
                <span className="font-semibold">{item.film_title}</span>
                <div className="badge badge-outline text-[10px] uppercase font-bold">{item.list_status.replace('_', ' ')}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 bg-base-200 rounded-xl text-center opacity-50 italic">Daftar tontonan masih kosong.</div>
        )}
      </section>

      {/* SEKSI ULASAN */}
      <section>
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">⭐ Ulasan Terbaru</h2>
        {reviews.length > 0 ? (
          <div className="flex flex-col gap-4">
            {reviews.map((rev, i) => (
              <div key={i} className="card bg-base-100 border border-base-200 shadow-sm">
                <div className="card-body p-5">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-primary">{rev.film}</span>
                    <span className="badge badge-warning font-bold">⭐ {rev.rating}/10</span>
                  </div>
                  <p className="text-sm opacity-80">"{rev.comment}"</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 bg-base-200 rounded-xl text-center opacity-50 italic">Belum ada ulasan yang ditulis.</div>
        )}
      </section>
    </div>
  );
}