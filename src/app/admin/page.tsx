'use client';

import { useAuthStore } from '../../store/useAuthStore';
import FilmForm from './FilmForm';
import GenreManager from './GenreManager';

export default function AdminDashboard() {
  const { user, token } = useAuthStore();

  // Keamanan: Cek apakah user adalah admin
  if (!user || user.role !== 'ADMIN' || !token) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      
      {/* Header Panel */}
      <div className="mb-10 border-b border-base-300 pb-6">
        <h1 className="text-4xl font-bold tracking-tight">Panel Admin</h1>
        <p className="text-base-content/90 mt-2">
          Selamat datang, <span className="font-semibold text-primary">{user.display_name}</span>. Kendalikan sistem dari sini.
        </p>
      </div>

      {/* BAGIAN ATAS: Manajemen Film */}
      <div className="mb-12">
        <FilmForm token={token} />
      </div>


      {/* BAGIAN BAWAH: Manajemen Genre */}
      <div className="mb-12">
        <GenreManager token={token} />
      </div>

    </div>
  );
}