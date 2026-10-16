import { Link, useLocation } from 'react-router-dom';
import RegisterForm from '../../components/RegisterForm/RegisterForm';

export default function RegisterPage() {
  const location = useLocation();

  return (
    <section className="flex justify-center px-5 py-6 md:px-8 md:py-15">
      <div className="w-full max-w-[400px] rounded-lg border border-gray-200 bg-white p-5 shadow-sm md:p-8">
        <h1 className="text-2xl font-bold text-gray-900">Create account</h1>
        <p className="mt-2 mb-6 text-sm text-gray-500">Sign up to start tracking your movies.</p>

        <RegisterForm />

        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{' '}
          <Link
            to="/login"
            state={location.state}
            className="font-semibold text-blue-600 hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </section>
  );
}
