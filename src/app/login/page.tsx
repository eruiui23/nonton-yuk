'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../../store/useAuthStore';
import api from '../../services/api';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const login = useAuthStore((state) => state.login);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');

    try {
      const loginResponse = await api.post('/auth/login', {
        email,
        password,
      });

      const token = loginResponse.data.data.token;

      const meResponse = await api.get('/auth/me', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const userData = meResponse.data.data.personal_info;

      login(userData, token); 

      document.cookie = `token=${token}; path=/; max-age=86400; SameSite=Lax`;
      document.cookie = `role=${userData.role}; path=/; max-age=86400; SameSite=Lax`;

      router.push('/');
      
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.message) {
        setErrorMsg(error.response.data.message);
      } else {
        setErrorMsg('Terjadi kesalahan pada server. Coba lagi nanti.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left lg:ml-8 mb-8 lg:mb-0">
          <h1 className="text-5xl font-bold">Masuk ke Akunmu</h1>
          <p className="py-6 text-base-content/80">
            Akses ribuan film, berikan ulasan, dan kelola daftar tontonan favoritmu sekarang.
          </p>
        </div>

        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form className="card-body" onSubmit={handleLogin}>
            {errorMsg && (
              <div className="alert alert-error shadow-sm text-sm p-3 rounded-lg">
                <span>{errorMsg}</span>
              </div>
            )}

            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email@contoh.com"
                className="input input-bordered"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="********"
                className="input input-bordered"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <div className="form-control mt-6">
              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={isLoading}
              >
                {isLoading ? <span className="loading loading-spinner"></span> : 'Masuk'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}