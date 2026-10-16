import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <section className="mx-auto my-20 flex w-full max-w-[1440px] flex-col items-center gap-3 px-5 text-center md:px-8 min-[90rem]:px-16">
      <h1 className="text-[64px] font-bold text-gray-900">404</h1>
      <p className="text-lg text-gray-600">Page not found</p>
      <Link
        to="/"
        className="inline-flex min-h-10 items-center justify-center rounded bg-blue-600 px-3 py-2 text-base text-white transition-colors hover:bg-blue-700"
      >
        Back to movies
      </Link>
    </section>
  );
}
