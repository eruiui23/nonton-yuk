import RegisterForm from './RegisterForm';

export default function RegisterPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-14 px-4">
      <div className="container mx-auto">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-center">
          <div className="space-y-6">
            <span className="badge badge-secondary badge-lg">Gabung Sekarang</span>
            <h1 className="text-5xl font-bold tracking-tight">Buat akun usermu</h1>
            <p className="max-w-xl text-lg text-base-content/70">
              Daftar dan mulai bangun watchlist, beri review, serta nikmati pengalaman film yang lebih personal.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-3xl border border-base-200 bg-base-100 p-6 shadow-sm">
                <h3 className="font-semibold">Mulai Cepat</h3>
                <p className="mt-3 text-sm text-base-content/70">Cukup isi beberapa informasi dan akunmu siap dipakai.</p>
              </div>
              <div className="rounded-3xl border border-base-200 bg-base-100 p-6 shadow-sm">
                <h3 className="font-semibold">Terhubung</h3>
                <p className="mt-3 text-sm text-base-content/70">Lihat profil, watchlist, dan review dalam satu dashboard terpusat.</p>
              </div>
            </div>
          </div>

          <div className="glass-card border border-base-200 shadow-2xl">
            <RegisterForm />
          </div>
        </div>
      </div>
    </div>
  );
}