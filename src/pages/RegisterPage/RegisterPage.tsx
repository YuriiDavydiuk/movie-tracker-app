import { Link, useLocation } from 'react-router-dom';
import css from '../../styles/AuthPage.module.css';
import RegisterForm from '../../components/RegisterForm/RegisterForm';

export default function RegisterPage() {
  const location = useLocation();

  return (
    <section className={css.page}>
      <div className={css.card}>
        <h1 className={css.title}>Create account</h1>
        <p className={css.subtitle}>Sign up to start tracking your movies.</p>

        <RegisterForm />

        <p className={css.switch}>
          Already have an account?{' '}
          <Link to="/login" state={location.state} className={css.link}>
            Sign in
          </Link>
        </p>
      </div>
    </section>
  );
}
