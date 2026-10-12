import { Link, useLocation } from 'react-router-dom';
import css from '../../styles/AuthPage.module.css';
import LoginForm from '../../components/LoginForm/LoginForm';

export default function LoginPage() {
  const location = useLocation();

  return (
    <section className={css.page}>
      <div className={css.card}>
        <h1 className={css.title}>Sign in</h1>
        <p className={css.subtitle}>Sign in to create, edit and delete movies.</p>

        <LoginForm />

        <p className={css.switch}>
          Don&apos;t have an account?{' '}
          <Link to="/register" state={location.state} className={css.link}>
            Sign up
          </Link>
        </p>
      </div>
    </section>
  );
}
