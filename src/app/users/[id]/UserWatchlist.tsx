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

  const toggleVisibility = async (listId: string, currentStatus: string) => {
    if (!token || !isOwner) return;
    setLoadingId(listId);
    
    // Tentukan status baru (kebalikan dari yang sekarang)
    const newVisibility = currentStatus === 'public' ? 'private' : 'public';
    
    try {
      await api.patch(`/film-lists/${listId}`, 
        { visibility: newVisibility }, 
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

            {/* TOMBOL TOGGLE PRIVASI (HANYA UNTUK OWNER) */}
            {isOwner && (
              <div className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  className="toggle toggle-primary toggle-sm" 
                  checked={item.visibility === 'public'}
                  disabled={loadingId === item.id}
                  onChange={() => toggleVisibility(item.id, item.visibility)}
                />
                {loadingId === item.id && <span className="loading loading-spinner loading-xs text-primary"></span>}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}