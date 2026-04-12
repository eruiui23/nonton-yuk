'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { useAuthStore } from '../../../store/useAuthStore';
import api from '../../../services/api';
import UserHeader from './UserHeader';
import UserWatchlist from './UserWatchlist'; // Komponen gabungan baru

export default function UnifiedProfilePage() {
    const params = useParams();
    const id = params?.id as string;
    const { user, token } = useAuthStore();

    const [profile, setProfile] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Cek apakah ini profil milik saya sendiri
    const isOwner = user?.id === id;
    console.log("ID URL:", id);
    console.log("ID Saya:", user?.id);
    console.log("Apakah Pemilik?", isOwner);

    const fetchProfile = useCallback(async () => {
        if (!id) return;
        try {
            setIsLoading(true);
            // Jika pemilik, kirim token agar backend menampilkan data private
            const response = await api.get(`/users/${id}`, {
                headers: isOwner && token ? { Authorization: `Bearer ${token}` } : {}
            });
            setProfile(response.data.data);

            // Update judul tab browser
            document.title = `${response.data.data.display_name} | Nonton Yuk`;
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }, [id, isOwner, token]);

    useEffect(() => {
        fetchProfile();
    }, [fetchProfile]);

    if (isLoading) return <div className="flex justify-center items-center min-h-[60vh]"><span className="loading loading-spinner loading-lg text-primary"></span></div>;
    if (!profile) return <div className="text-center py-20 font-bold">Profil tidak ditemukan.</div>;

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <UserHeader
                displayName={profile.display_name}
                username={profile.username}
                bio={profile.bio || "Tidak ada bio."}
            />

            {/* SEKSI WATCHLIST (Gaya Atas-Bawah) */}
            <div className="mt-12">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    🎬 Watchlist {isOwner && <span className="badge badge-secondary badge-sm">Milik Saya</span>}
                </h2>
                <UserWatchlist
                    items={profile.film_lists || []}
                    isOwner={isOwner}
                    token={token}
                    onRefresh={fetchProfile}
                />
            </div>

            <div className="divider my-12 opacity-30"></div>

            {/* SEKSI ULASAN (Gaya Atas-Bawah) */}
            <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6">⭐ Ulasan Terbaru</h2>
                {profile.reviews && profile.reviews.length > 0 ? (
                    <div className="flex flex-col gap-4">
                        {profile.reviews.map((rev: any, i: number) => (
                            <div key={i} className="card bg-base-100 border border-base-200 shadow-sm">
                                <div className="card-body p-5">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="font-bold text-primary">{rev.film || "Film"}</span>
                                        <span className="badge badge-warning font-bold">⭐ {rev.rating}/10</span>
                                    </div>
                                    <p className="text-sm opacity-80 italic">"{rev.comment}"</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="p-8 bg-base-200 rounded-xl text-center opacity-50 italic">Belum ada ulasan.</div>
                )}
            </div>
        </div>
    );
}