import RegisterForm from './RegisterForm';

export default function RegisterPage() {
  return (
    <div className="relative min-h-[calc(100vh-5rem)] flex items-center justify-center py-14 px-4 overflow-hidden">
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-secondary/10 blur-[150px] rounded-full pointer-events-none -translate-y-1/2 -translate-x-1/3"></div>
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-primary/10 blur-[120px] rounded-full pointer-events-none translate-y-1/3 translate-x-1/3"></div>

      <div className="container mx-auto relative z-10">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center max-w-6xl mx-auto">
          <div className="space-y-6">
            <span className="inline-block px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase mb-2">
              Bergabung Sekarang
            </span>
            <h1 className="text-5xl md:text-6xl font-black tracking-tighter leading-tight">
              Buat <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-accent">Akunmu.</span>
            </h1>
            <p className="max-w-xl text-lg text-base-content/90 leading-relaxed mb-8">
              Pendaftaran gratis seutuhnya. Mulai bangun watchlist pribadi, berikan ulasan komprehensif, serta nikmati ekosistem film eksklusif.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="rounded-3xl border border-base-content/5 bg-base-200/40 backdrop-blur-md p-6 shadow-xl">
                <h3 className="font-bold tracking-wide">Mulai Singkat</h3>
                <p className="mt-3 text-sm text-base-content/90 leading-relaxed font-medium">Hanya butuh sekian detik untuk bergabung ke dunia perfilman tanpa batas kami.</p>
              </div>
              <div className="rounded-3xl border border-base-content/5 bg-base-200/40 backdrop-blur-md p-6 shadow-xl">
                <h3 className="font-bold tracking-wide">Terhubung Sentral</h3>
                <p className="mt-3 text-sm text-base-content/90 leading-relaxed font-medium">Review, watchlist, dan profil dikemas elegan dalam dasbor sentral milikmu sendiri.</p>
              </div>
            </div>
          </div>

          <div className="bg-base-200/40 backdrop-blur-xl border border-base-content/10 shadow-2xl rounded-[2rem] overflow-hidden relative mt-8 lg:mt-0">
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent pointer-events-none"></div>
            <div className="relative z-10">
              <RegisterForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}