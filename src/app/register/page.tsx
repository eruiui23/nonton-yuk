'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import api from '../../services/api'; 

export default function RegisterPage() {
  const router = useRouter();
  
  // 1. Sesuaikan state dengan key yang diminta backend
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    display_name: '',
    bio: ''
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      // 2. Kirim payload yang presisi sesuai dokumentasi
      await api.post('/auth/register', {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        display_name: formData.display_name,
        bio: formData.bio
      });

      setSuccessMsg('Akun berhasil dibuat! Mengalihkan ke halaman login...');
      
      setTimeout(() => {
        router.push('/login');
      }, 2000);

    } catch (error: any) {
      setErrorMsg(
        error.response?.data?.message || 
        error.response?.data?.error || 
        'Gagal mendaftar. Pastikan username/email belum digunakan.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[90vh] px-4 py-8">
      <div className="card w-full max-w-lg bg-base-100 shadow-2xl border border-base-200">
        <div className="card-body">
          <h2 className="card-title text-3xl font-bold mb-2 justify-center">Daftar Akun User</h2>
          <p className="text-center text-base-content/70 mb-6">
            Lengkapi data di bawah ini untuk mulai menyimpan watchlist.
          </p>

          {errorMsg && (
            <div className="alert alert-error mb-4 shadow-sm text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="alert alert-success mb-4 shadow-sm text-sm text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span>{successMsg}</span>
            </div>
          )}

          <form onSubmit={handleRegister} className="flex flex-col gap-3">
            <div className="grid grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label"><span className="label-text font-semibold">Username</span></label>
                <input 
                  type="text" 
                  placeholder="tanpa_spasi" 
                  className="input input-bordered focus:input-primary" 
                  required
                  value={formData.username}
                  onChange={(e) => setFormData({...formData, username: e.target.value.replace(/\s+/g, '')})}
                />
              </div>

              <div className="form-control">
                <label className="label"><span className="label-text font-semibold">Display Name</span></label>
                <input 
                  type="text" 
                  placeholder="Nama Tampilan" 
                  className="input input-bordered focus:input-primary" 
                  required
                  value={formData.display_name}
                  onChange={(e) => setFormData({...formData, display_name: e.target.value})}
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label"><span className="label-text font-semibold">Email</span></label>
              <input 
                type="email" 
                placeholder="nama@email.com" 
                className="input input-bordered focus:input-primary" 
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>

            <div className="form-control">
              <label className="label"><span className="label-text font-semibold">Password</span></label>
              <input 
                type="password" 
                placeholder="••••••••" 
                className="input input-bordered focus:input-primary" 
                required
                minLength={6}
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>

            <div className="form-control mb-2">
              <label className="label"><span className="label-text font-semibold">Bio</span></label>
              <textarea 
                placeholder="Ceritakan sedikit tentang dirimu..." 
                className="textarea textarea-bordered focus:textarea-primary h-20" 
                value={formData.bio}
                onChange={(e) => setFormData({...formData, bio: e.target.value})}
              ></textarea>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary w-full"
              disabled={isLoading || !!successMsg}
            >
              {isLoading ? <span className="loading loading-spinner"></span> : 'Daftar Sekarang'}
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
      </div>
    </div>
  );
}