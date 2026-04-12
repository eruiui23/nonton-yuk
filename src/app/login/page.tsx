import LoginForm from './LoginForm';

export default function LoginPage() {
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
          <LoginForm />
        </div>
      </div>
    </div>
  );
}