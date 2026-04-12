'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuthStore } from '../store/useAuthStore';

export default function Navbar() {
  const { user, token } = useAuthStore();

  // Trik Hydration: Mencegah error layar kedip saat Next.js membaca localStorage
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    const timer = window.setTimeout(() => setIsMounted(true), 0);
    return () => window.clearTimeout(timer);
  }, []);

  const handleLogout = () => {
    // 1. Bersihkan brankas Zustand di LocalStorage
    localStorage.removeItem('auth-storage'); // Sesuaikan jika nama persist Zustand-mu berbeda

    // 2. Hancurkan Kunci Cookie (agar satpam Middleware tidak marah)
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "role=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    // 3. Paksa hard-refresh ke halaman login agar semua state memori bersih
    window.location.href = '/login';
  };

  // Jangan render apa-apa selama sepersekian detik awal untuk mencegah error Hydration
  if (!isMounted) return <div className="navbar bg-base-100 shadow-md h-16"></div>;

  return (
    <div className="navbar sticky top-0 z-50 border-b border-base-200/80 bg-base-100/95 backdrop-blur-xl px-4 sm:px-8 shadow-sm">
      <div className="flex-1 gap-4">
        <Link href="/" className="inline-flex items-center gap-2 text-2xl font-extrabold tracking-tight text-primary">
          <span className="inline-block rounded-xl bg-primary/15 px-3 py-1 text-base-content">🎬</span>
          NontonYuk
        </Link>
      </div>
      <div className="hidden md:flex gap-2">
        <Link href="/genres" className="btn btn-ghost btn-sm">
          Kategori
        </Link>
        <Link href="/" className="btn btn-ghost btn-sm">
          Film
        </Link>
      </div>
      <div className="flex-none gap-2">
        {!token ? (
          // SKENARIO A: Guest (Belum Login)
          <div className="flex gap-2">
            <Link href="/login" className="btn btn-ghost font-bold">Masuk</Link>
            <Link href="/register" className="btn btn-primary shadow-sm hidden sm:flex">Daftar</Link>
          </div>
        ) : (
          // SKENARIO B: User (Sudah Login)
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar placeholder ring ring-transparent hover:ring-primary transition-all">
              <div className="bg-primary text-primary-content rounded-full w-10">
                <span className="font-bold text-lg uppercase">
                  {user?.display_name?.charAt(0) || 'U'}
                </span>
              </div>
            </div>

            <ul tabIndex={0} className="mt-4 z-[1] p-2 shadow-xl menu menu-sm dropdown-content bg-base-100 rounded-box w-52 border border-base-200">
              <li className="menu-title px-4 py-2 opacity-60">
                Hi, {user?.display_name}
              </li>

              <li>
                <Link href={`/users/${user?.id}`} className="py-3 font-medium">Profil</Link>
              </li>

              {/* Tambahan Menu KHUSUS ADMIN */}
              {user?.role === 'ADMIN' && (
                <li>
                  <Link href="/admin" className="py-3 font-medium text-secondary">🛡️ Panel Admin</Link>
                </li>
              )}

              <div className="divider my-0"></div>

              <li>
                <button onClick={handleLogout} className="py-3 text-error font-bold">
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}