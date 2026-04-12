import LoginForm from './LoginForm';

export default function LoginPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-14">
      <div className="container mx-auto px-4">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.9fr] items-center">
          <div className="space-y-6">
            <span className="badge badge-secondary badge-lg">Selamat Datang</span>
            <h1 className="text-5xl font-bold tracking-tight">Masuk ke akunmu</h1>
            <p className="max-w-xl text-lg text-base-content/70">
              Akses ribuan film, berikan ulasan, dan kelola daftar tontonan favoritmu dengan tampilan yang rapi dan modern.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-3xl border border-base-200 bg-base-100 p-6 shadow-sm">
                <h3 className="font-semibold">Fitur Utama</h3>
                <ul className="mt-4 space-y-3 text-sm text-base-content/70">
                  <li>• Watchlist personal</li>
                  <li>• Review dan rating</li>
                  <li>• Akses cepat ke detail film</li>
                </ul>
              </div>
              <div className="rounded-3xl border border-base-200 bg-base-100 p-6 shadow-sm">
                <h3 className="font-semibold">Keamanan</h3>
                <p className="mt-3 text-sm text-base-content/70">Login aman dengan token yang tersimpan di cookie dan session yang bersih.</p>
              </div>
            </div>
          </div>

          <div className="card bg-base-100 border border-base-200 shadow-2xl rounded-[1.75rem]">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}