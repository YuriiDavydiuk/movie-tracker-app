import { useEffect, useRef } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';
import { useMovies } from '../../context/MoviesContext/useMovie';

interface SearchBoxProps {
  onSearch: (newSearchQuery: string) => void;
}

export default function SearchBox({ onSearch }: SearchBoxProps) {
  const { searchQuery } = useMovies();
  const inputRef = useRef<HTMLInputElement>(null);
  const location = useLocation();
  const navigationType = useNavigationType();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  };

  useEffect(() => {
    if (navigationType === 'POP' && inputRef.current) {
      inputRef.current.value = searchQuery;
    }
  }, [location.key, navigationType, searchQuery]);

  return (
    <input
      className="min-h-10 w-full min-w-0 rounded border border-gray-300 bg-white px-3 py-2 text-base text-gray-900 placeholder:text-gray-400 focus:border-blue-600 focus:outline-2 focus:outline-offset-2 focus:outline-blue-600 md:max-w-[240px]"
      type="text"
      placeholder="Search movie..."
      defaultValue={searchQuery}
      onChange={handleChange}
      ref={inputRef}
      aria-label="Search movie"
    />
  );
}
