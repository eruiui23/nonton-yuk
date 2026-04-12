'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../../store/useAuthStore';
import api from '../../services/api';

export default function LoginForm() {
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
      
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      if (err.response?.data?.message) {
        setErrorMsg(err.response.data.message);
      } else {
        setErrorMsg('Terjadi kesalahan pada server. Coba lagi nanti.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="card-body p-8" onSubmit={handleLogin}>
      {errorMsg && (
        <div className="alert alert-error shadow-sm text-sm p-3 rounded-2xl">
          <span>{errorMsg}</span>
        </div>
      )}

      <div className="flex flex-col gap-2 mb-4">
        <label className="font-semibold text-base-content/90">Email</label>
        <input
          type="email"
          placeholder="email@contoh.com"
          className="input input-bordered input-lg w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      
      <div className="flex flex-col gap-2 mb-6">
        <label className="font-semibold text-base-content/90">Password</label>
        <input
          type="password"
          placeholder="********"
          className="input input-bordered input-lg w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      
      <div className="mt-2">
        <button 
          type="submit" 
          className="btn btn-primary btn-lg w-full"
          disabled={isLoading}
        >
          {isLoading ? <span className="loading loading-spinner"></span> : 'Masuk'}
        </button>
      </div>
    </form>
  );
}
