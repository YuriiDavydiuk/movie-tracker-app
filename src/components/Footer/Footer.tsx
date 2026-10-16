export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50 py-4 text-center text-gray-600">
      <div className="mx-auto w-full max-w-[1440px] px-5 md:px-8 min-[90rem]:px-16">
        Movie Tracker {new Date().getFullYear()}
      </div>
    </footer>
  );
}
