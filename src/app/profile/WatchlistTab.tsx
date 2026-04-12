'use client';

import { useState, useEffect } from 'react';
import api from '../../services/api';

interface WatchlistTabProps {
    items: any[];
    token: string | null;
    onRefresh: () => void; // Fungsi untuk memuat ulang profil setelah update
}

export default function WatchlistTab({ items, token, onRefresh }: WatchlistTabProps) {
    const [loadingId, setLoadingId] = useState<string | null>(null);
    const [localItems, setLocalItems] = useState(items);

    useEffect(() => {
        setLocalItems(items);
    }, [items]);

    const toggleVisibility = async (listId: string, currentStatus: boolean) => {
    if (!token) return;
    
    setLoadingId(listId);
    try {
      // Tembak backend untuk ganti statusnya
      await api.patch(`/film-lists/${listId}`, 
        { public: !currentStatus }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      // JURUS ILUSI: Jangan panggil onRefresh(). 
      // Ubah data di layar secara manual agar filmnya tidak hilang.
      setLocalItems((prevItems) => 
        prevItems.map((item) => 
          item.id === listId ? { ...item, public: !currentStatus } : item
        )
      );

      // onRefresh(); // <-- MATIKAN INI
    } catch (error) {
      console.error('Gagal update privasi:', error);
      alert('Gagal mengubah visibilitas.');
    } finally {
      setLoadingId(null);
    }
  };

    if (!items || items.length === 0) {
        return (
            <div className="col-span-full text-center py-12 text-base-content/50 bg-base-100 rounded-xl border border-base-200">
                Kamu belum menambahkan film apa pun ke watchlist.
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {items.map((item, index) => (
                <div key={index} className="card bg-base-100 shadow-sm border border-base-200 hover:border-primary transition-all">
                    <div className="card-body p-4 sm:p-5 flex-col sm:flex-row justify-between items-start sm:items-center gap-4">

                        {/* Info Film */}
                        <div className="flex-1">
                            <h3 className="font-bold text-lg line-clamp-1" title={item.film_title}>
                                {item.film_title}
                            </h3>
                            <div className="flex gap-2 mt-2">
                                <span className="badge badge-primary badge-outline uppercase text-[10px] font-bold">
                                    {item.list_status?.replace('_', ' ')}
                                </span>
                                <span className={`badge uppercase text-[10px] font-bold ${item.public ? 'badge-info' : 'badge-ghost'}`}>
                                    {item.public ? '🌍 Publik' : '🔒 Privat'}
                                </span>
                            </div>
                        </div>

                        {/* Aksi Toggle Privasi */}
                        <div className="flex items-center gap-3">
                            <span className="text-xs font-semibold opacity-70">
                                {item.public ? 'Terlihat Publik' : 'Sembunyikan'}
                            </span>
                            <input
                                type="checkbox"
                                className="toggle toggle-primary toggle-sm"
                                checked={item.public}
                                disabled={loadingId === item.id}
                                onChange={() => toggleVisibility(item.id, item.public)}
                            />
                            {loadingId === item.id && <span className="loading loading-spinner loading-xs text-primary"></span>}
                        </div>

                    </div>
                </div>
            ))}
        </div>
    );
}