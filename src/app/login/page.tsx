import LoginForm from './LoginForm';

export default function LoginPage() {
  return (
    <div className="relative min-h-[calc(100vh-5rem)] flex items-center justify-center py-14 overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 blur-[150px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/3"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/10 blur-[120px] rounded-full pointer-events-none translate-y-1/3 -translate-x-1/3"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.9fr] items-center max-w-6xl mx-auto">
          <div className="space-y-6">
            <span className="inline-block px-3 py-1 rounded-full border border-secondary/30 bg-secondary/10 text-secondary text-xs font-bold tracking-widest uppercase mb-2">
              Selamat Datang
            </span>
            <h1 className="text-5xl md:text-6xl font-black tracking-tighter leading-tight">
              Masuk ke <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Akunmu.</span>
            </h1>
            <p className="max-w-xl text-lg text-base-content/70 leading-relaxed mb-8">
              Akses ribuan film, berikan ulasan, dan kelola daftar tontonan favoritmu dengan tampilan yang rapi dan elegan.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="rounded-3xl border border-base-content/5 bg-base-200/40 backdrop-blur-md p-6 shadow-xl">
                <h3 className="font-bold tracking-wide">Fitur Utama</h3>
                <ul className="mt-4 space-y-3 text-sm text-base-content/70 font-medium">
                  <li>✨ Watchlist Pribadi</li>
                  <li>✨ Review dan Rating</li>
                  <li>✨ Eksplorasi Cepat</li>
                </ul>
              </div>
              <div className="rounded-3xl border border-base-content/5 bg-base-200/40 backdrop-blur-md p-6 shadow-xl">
                <h3 className="font-bold tracking-wide">Keamanan</h3>
                <p className="mt-3 text-sm text-base-content/70 leading-relaxed font-medium">Login aman dan super lancar dengan sistem autentikasi termodern berbasis sesi tersandikan.</p>
              </div>
            </div>
          </div>

          <div className="bg-base-200/40 backdrop-blur-xl border border-base-content/10 shadow-2xl rounded-[2rem] overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none"></div>
            <div className="relative z-10">
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}