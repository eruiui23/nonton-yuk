import RegisterForm from './RegisterForm';

export default function RegisterPage() {
  return (
    <div className="flex items-center justify-center min-h-[90vh] px-4 py-8">
      <div className="card w-full max-w-lg bg-base-100 shadow-2xl border border-base-200">
        <RegisterForm />
      </div>
    </div>
  );
}