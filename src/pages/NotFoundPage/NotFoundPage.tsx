import { Link } from 'react-router-dom';
import css from './NotFoundPage.module.css';

export default function NotFoundPage() {
  return (
    <section className={css.section}>
      <h1 className={css.code}>404</h1>
      <p className={css.text}>Page not found</p>
      <Link to="/" className={css.link}>
        Back to movies
      </Link>
    </section>
  );
}
