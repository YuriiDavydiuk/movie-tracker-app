import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <section className="container d-flex flex-column align-items-center gap-3 py-5 text-center">
      <h1 className="display-1 fw-bold mb-0">404</h1>
      <p className="fs-5 text-body-secondary mb-0">Page not found</p>
      <Link to="/" className="btn btn-primary">
        Back to movies
      </Link>
    </section>
  );
}
