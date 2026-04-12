'use client';

import { useState } from 'react';
import api from '../../../services/api';
import UserWatchlistItem from './UserWatchlistItem';

interface UserWatchlistItemData {
  id?: string;
  film_title?: string;
  list_status?: string;
  visibility?: string;
}

interface UserWatchlistProps {
  items: UserWatchlistItemData[];
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
      console.error(error);
      alert('Gagal merubah visibilitas.');
    } finally {
      setLoadingId(null);
    }
  };

  if (items.length === 0) return <div className="p-8 bg-base-200 rounded-xl text-center opacity-50 italic">Daftar tontonan kosong.</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {items.map((item, i) => (
        <UserWatchlistItem
          key={item.id || i}
          item={item}
          isOwner={isOwner}
          loadingId={loadingId}
          onToggleVisibility={toggleVisibility}
        />
      ))}
    </div>
  );
}