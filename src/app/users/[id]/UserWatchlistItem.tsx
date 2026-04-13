type UserWatchlistItemData = {
  id?: string;
  film_title?: string;
  list_status?: string;
  visibility?: string;
};

type UserWatchlistItemProps = {
  item: UserWatchlistItemData;
  isOwner: boolean;
  loadingId: string | null;
  onToggleVisibility: (listId: string, currentStatus: string) => void;
};

export default function UserWatchlistItem({ item, isOwner, loadingId, onToggleVisibility }: UserWatchlistItemProps) {
  return (
    <div className="card bg-base-200/50 backdrop-blur-sm border border-base-content/10 shadow-md hover:shadow-xl hover:border-primary/50 transition-all duration-300">
      <div className="card-body p-4 sm:p-5 flex-row justify-between items-center">
        <div>
          <p className="font-black text-lg line-clamp-1 tracking-wide" title={item.film_title}>{item.film_title}</p>
          <div className="flex gap-2 mt-2">
            <span className="badge border border-base-content/20 bg-base-100/50 badge-sm uppercase text-[10px] tracking-widest font-bold">
              {item.list_status?.replace('_', ' ')}
            </span>
            {isOwner && (
              <span className={`badge badge-sm text-[10px] tracking-widest font-bold ${item.visibility === 'public' ? 'badge-primary badge-outline text-primary' : 'border border-base-content/20 bg-base-content/10 text-base-content/90'}`}>
                {item.visibility?.toUpperCase()}
              </span>
            )}
          </div>
        </div>

        {isOwner && (
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              className="toggle toggle-primary toggle-sm"
              checked={item.visibility === 'public'}
              disabled={loadingId === item.id}
              onChange={() => {
                if (item.id && item.visibility) {
                  onToggleVisibility(item.id, item.visibility);
                }
              }}
            />
            {loadingId === item.id && <span className="loading loading-spinner loading-xs text-primary"></span>}
          </div>
        )}
      </div>
    </div>
  );
}
