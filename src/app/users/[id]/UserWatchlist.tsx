'use client';

import { useState } from 'react';
import api from '../../../services/api';

interface UserWatchlistProps {
  items: any[];
  isOwner: boolean;
  token: string | null;
  onRefresh: () => void;
}

export default function UserWatchlist({ items, isOwner, token, onRefresh }: UserWatchlistProps) {
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const toggleVisibility = async (listId: string, currentStatus: boolean) => {
    if (!token || !isOwner) return;
    setLoadingId(listId);
    try {
      await api.patch(`/film-lists/${listId}`, 
        { public: !currentStatus }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      onRefresh(); 
    } catch (error) {
      alert('Gagal merubah visibilitas.');
    } finally {
      setLoadingId(null);
    }
  };

  if (items.length === 0) return <div className="p-8 bg-base-200 rounded-xl text-center opacity-50 italic">Daftar tontonan kosong.</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {items.map((item, i) => (
        <div key={i} className="card bg-base-100 border border-base-200 shadow-sm hover:border-primary/40 transition-all">
          <div className="card-body p-4 flex-row justify-between items-center">
            <div>
              <p className="font-bold line-clamp-1">{item.film_title}</p>
              <div className="flex gap-2 mt-1">
                <span className="badge badge-ghost badge-xs uppercase text-[9px] font-bold">{item.list_status?.replace('_', ' ')}</span>
                {isOwner && (
                  <span className={`badge badge-xs text-[9px] font-bold ${item.public ? 'badge-info' : 'badge-neutral'}`}>
                    {item.public ? 'PUBLIC' : 'PRIVATE'}
                  </span>
                )}
              </div>
            </div>

            {/* TOMBOL TOGGLE: Hanya muncul jika pemilik profil */}
            {isOwner && (
              <div className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  className="toggle toggle-primary toggle-sm" 
                  checked={item.public}
                  disabled={loadingId === item.id}
                  onChange={() => toggleVisibility(item.id, item.public)}
                />
                {loadingId === item.id && <span className="loading loading-spinner loading-xs"></span>}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}