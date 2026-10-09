import css from './SearchBox.module.css';
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
      className={css.input}
      type="text"
      placeholder="Search movie..."
      defaultValue={searchQuery}
      onChange={handleChange}
      ref={inputRef}
      aria-label="Search movie"
    />
  );
}
