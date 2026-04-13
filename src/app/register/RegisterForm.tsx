'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useMutation } from '@tanstack/react-query';
import api from '../../services/api';

export default function RegisterForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    display_name: '',
    bio: '',
  });

  const { mutate: handleRegister, isPending, isSuccess, error } = useMutation({
    mutationFn: () =>
      api.post('/auth/register', {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        display_name: formData.display_name,
        bio: formData.bio,
      }),
    onSuccess: () => {
      setTimeout(() => router.push('/login'), 2000);
    },
  });

  const errorMsg = error
    ? ((error as any).response?.data?.message ||
        (error as any).response?.data?.error ||
        'Gagal mendaftar. Pastikan username/email belum digunakan.')
    : null;

  return (
    <div className="card-body p-8 sm:p-10">
      <h2 className="text-3xl font-black mb-1 text-center tracking-tight">Daftar Akun User</h2>
      <p className="text-center text-sm font-medium text-base-content/90 mb-6">
        Lengkapi data di bawah ini untuk mulai menyimpan watchlist.
      </p>

      {errorMsg && (
        <div className="alert alert-error mb-4 shadow-sm text-sm">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span>{errorMsg}</span>
        </div>
      )}

      {isSuccess && (
        <div className="alert alert-success mb-4 shadow-sm text-sm text-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span>Akun berhasil dibuat! Mengalihkan ke halaman login...</span>
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleRegister();
        }}
        className="flex flex-col gap-4"
      >
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1 w-full">
            <label className="font-bold text-xs tracking-widest text-base-content/90 uppercase pl-1">Username</label>
            <input
              type="text"
              placeholder="tanpa_spasi"
              className="input input-bordered input-md w-full bg-base-100/50 backdrop-blur-sm focus:border-secondary transition-colors"
              required
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value.replace(/\s+/g, '') })}
            />
          </div>

          <div className="flex flex-col gap-1 w-full">
            <label className="font-bold text-xs tracking-widest text-base-content/90 uppercase pl-1">Display Name</label>
            <input
              type="text"
              placeholder="Nama Lengkap"
              className="input input-bordered input-md w-full bg-base-100/50 backdrop-blur-sm focus:border-secondary transition-colors"
              required
              value={formData.display_name}
              onChange={(e) => setFormData({ ...formData, display_name: e.target.value })}
            />
          </div>
        </div>

        <div className="flex flex-col gap-1 w-full">
          <label className="font-bold text-xs tracking-widest text-base-content/90 uppercase pl-1">Email</label>
          <input
            type="email"
            placeholder="nama@email.com"
            className="input input-bordered input-md w-full bg-base-100/50 backdrop-blur-sm focus:border-secondary transition-colors"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>

        <div className="flex flex-col gap-1 w-full">
          <label className="font-bold text-xs tracking-widest text-base-content/90 uppercase pl-1">Password</label>
          <input
            type="password"
            placeholder="••••••••"
            className="input input-bordered input-md w-full bg-base-100/50 backdrop-blur-sm focus:border-secondary transition-colors"
            required
            minLength={6}
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
        </div>

        <div className="flex flex-col gap-1 w-full mb-2">
          <label className="font-bold text-xs tracking-widest text-base-content/90 uppercase pl-1">Bio Profile</label>
          <textarea
            placeholder="Tulis sedikit tentang dirimu (Opsional)..."
            className="textarea textarea-bordered textarea-md w-full bg-base-100/50 backdrop-blur-sm focus:border-secondary transition-colors h-20"
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
          ></textarea>
        </div>

        <button
          type="submit"
          className="btn btn-secondary w-full shadow-lg mt-2 font-bold tracking-wide"
          disabled={isPending || isSuccess}
        >
          {isPending ? <span className="loading loading-spinner"></span> : 'Selesaikan Pendaftaran'}
        </button>
      </form>

      <div className="divider mt-4 mb-2">ATAU</div>

      <p className="text-center text-sm">
        Sudah punya akun?{' '}
        <Link href="/login" className="text-primary font-bold hover:underline">
          Masuk di sini
        </Link>
      </p>
    </div>
  );
}
