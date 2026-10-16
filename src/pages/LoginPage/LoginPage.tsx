import { Link, useLocation } from 'react-router-dom';
import LoginForm from '../../components/LoginForm/LoginForm';

export default function LoginPage() {
  const location = useLocation();

  return (
    <section className="flex justify-center px-5 py-6 md:px-8 md:py-15">
      <div className="w-full max-w-[400px] rounded-lg border border-gray-200 bg-white p-5 shadow-sm md:p-8">
        <h1 className="text-2xl font-bold text-gray-900">Sign in</h1>
        <p className="mt-2 mb-6 text-sm text-gray-500">
          Sign in to create, edit and delete movies.
        </p>

        <LoginForm />

        <p className="mt-6 text-center text-sm text-gray-500">
          Don&apos;t have an account?{' '}
          <Link
            to="/register"
            state={location.state}
            className="font-semibold text-blue-600 hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </section>
  );
}
