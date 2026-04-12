'use client';

import { useState, useEffect } from 'react';
import { useAuthStore } from '../../store/useAuthStore';
import api from '../../services/api';

// Import Komponen Lokal
import ProfileHeader from './ProfileHeader';
import ProfileTabs from './ProfileTabs';
import WatchlistTab from './WatchlistTab';
import ReviewsTab from './ReviewsTab';

export default function ProfilePage() {
  const { user, token } = useAuthStore();
  const [profile, setProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [activeTab, setActiveTab] = useState<'watchlist' | 'reviews'>('watchlist');

  const fetchProfile = async () => {
    if (!user?.id) return;
    try {
      setIsLoading(true);
      const response = await api.get(`/users/${user.id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProfile(response.data.data);
    } catch (error: any) {
      setErrorMsg('Gagal memuat data profil.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [user?.id, token]);

  if (isLoading) return <div className="flex justify-center items-center min-h-[60vh]"><span className="loading loading-spinner loading-lg text-primary"></span></div>;

  if (errorMsg || !profile) return <div className="container mx-auto px-4 py-16 text-center"><div className="alert alert-error max-w-md mx-auto"><span>{errorMsg || 'Data tidak ditemukan.'}</span></div></div>;

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <ProfileHeader
        displayName={profile.display_name}
        username={profile.username}
        bio={profile.bio}
      />

      <ProfileTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        watchlistCount={profile.film_lists?.length || 0}
        reviewsCount={profile.reviews?.length || 0}
      />

      <div className="min-h-[400px]">
        {activeTab === 'watchlist' ? (
          <WatchlistTab
            items={profile.film_lists}
            token={token}
            onRefresh={fetchProfile} // Lempar fungsi fetchProfile agar komponen anak bisa nge-refresh data
          />
        ) : (
          <ReviewsTab items={profile.reviews} />
        )}
      </div>
    </div>
  );
}