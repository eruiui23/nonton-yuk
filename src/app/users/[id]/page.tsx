'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import api from '../../../services/api';
import UserHeader from './UserHeader';
import UserPublicList from './UserPublicList';

export default function PublicProfilePage() {
  const params = useParams();
  const id = params?.id as string;

  const [profile, setProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchPublicProfile = async () => {
      try {
        setIsLoading(true);
        // Endpoint publik untuk melihat user lain
        const response = await api.get(`/users/${id}`);
        setProfile(response.data.data);
      } catch (err) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPublicProfile();
  }, [id]);

  if (isLoading) return <div className="flex justify-center items-center min-h-[60vh]"><span className="loading loading-spinner loading-lg"></span></div>;
  if (error || !profile) return <div className="text-center py-20 font-bold text-error">User tidak ditemukan atau profil bersifat privat.</div>;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <UserHeader 
        displayName={profile.display_name} 
        username={profile.username} 
        bio={profile.bio} 
      />
      
      <div className="divider my-10">KONTEN PUBLIK</div>

      <UserPublicList 
        watchlist={profile.film_lists || []} 
        reviews={profile.reviews || []} 
      />
    </div>
  );
}