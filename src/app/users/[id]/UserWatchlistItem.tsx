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
    <div className="card bg-base-100 border border-base-200 shadow-sm hover:border-primary/40 transition-all">
      <div className="card-body p-4 flex-row justify-between items-center">
        <div>
          <p className="font-bold line-clamp-1" title={item.film_title}>{item.film_title}</p>
          <div className="flex gap-2 mt-1">
            <span className="badge badge-ghost badge-xs uppercase text-[9px] font-bold">
              {item.list_status?.replace('_', ' ')}
            </span>
            {isOwner && (
              <span className={`badge badge-xs text-[9px] font-bold ${item.visibility === 'public' ? 'badge-info' : 'badge-neutral'}`}>
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
              onChange={() => onToggleVisibility(item.id, item.visibility)}
            />
            {loadingId === item.id && <span className="loading loading-spinner loading-xs text-primary"></span>}
          </div>
        )}
      </div>
    </div>
  );
}
