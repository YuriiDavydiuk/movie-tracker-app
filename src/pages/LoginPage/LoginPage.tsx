import { Link, useLocation } from 'react-router-dom';
import LoginForm from '../../components/LoginForm/LoginForm';

export default function LoginPage() {
  const location = useLocation();

  return (
    <section className="container py-4 py-md-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
          <div className="card p-3 p-md-4 shadow-sm">
            <h1 className="h4 fw-bold mb-0">Sign in</h1>
            <p className="small text-body-secondary mt-2 mb-4">
              Sign in to create, edit and delete movies.
            </p>

            <LoginForm />

            <p className="small text-body-secondary text-center mt-4 mb-0">
              Don&apos;t have an account?{' '}
              <Link to="/register" state={location.state} className="link-primary fw-semibold">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
