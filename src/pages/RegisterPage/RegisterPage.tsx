import { Link, useLocation } from 'react-router-dom';
import RegisterForm from '../../components/RegisterForm/RegisterForm';

export default function RegisterPage() {
  const location = useLocation();

  return (
    <section className="container py-4 py-md-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
          <div className="card p-3 p-md-4 shadow-sm">
            <h1 className="h4 fw-bold mb-0">Create account</h1>
            <p className="small text-body-secondary mt-2 mb-4">
              Sign up to start tracking your movies.
            </p>

            <RegisterForm />

            <p className="small text-body-secondary text-center mt-4 mb-0">
              Already have an account?{' '}
              <Link to="/login" state={location.state} className="link-primary fw-semibold">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
