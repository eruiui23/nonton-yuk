'use client';

import { useState } from 'react';
import api from '../../../services/api';
import FilmPoster from './FilmPoster'

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
                { visibility: newVisibility }, // Sesuaikan key body API dengan backend-mu
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {items.map((item, i) => (
                <div key={i} className="card bg-base-100 border border-base-200 shadow-sm hover:border-primary/40 transition-all overflow-hidden flex-row h-24 sm:h-28">

                    {/* AREA POSTER: Wajib 'relative' karena Image di FilmPoster pake 'fill' */}
                    <div className="relative w-16 sm:w-20 h-full flex-shrink-0 overflow-hidden">
                        <FilmPoster filmTitle={item.film_title} />
                    </div>

                    {/* KONTEN KARTU */}
                    <div className="card-body p-3 flex-1 flex-row justify-between items-center min-w-0">
                        <div className="min-w-0">
                            <p className="font-bold text-sm sm:text-base truncate" title={item.film_title}>
                                {item.film_title}
                            </p>
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

                        {/* TOGGLE PRIVACY */}
                        {isOwner && (
                            <div className="flex items-center ml-2">
                                <input
                                    type="checkbox"
                                    className="toggle toggle-primary toggle-sm"
                                    checked={item.visibility === 'public'}
                                    disabled={loadingId === item.id}
                                    onChange={() => toggleVisibility(item.id, item.visibility)}
                                />
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}