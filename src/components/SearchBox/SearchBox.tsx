import css from './SearchBox.module.css';
import { useMovies } from '../../context/MoviesContext/useMovie';

interface SearchBoxProps {
  onSearch: (newSearchQuery: string) => void;
}

export default function SearchBox({ onSearch }: SearchBoxProps) {
  const { searchQuery } = useMovies();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  };

  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search movie..."
      defaultValue={searchQuery}
      onChange={handleChange}
    />
  );
}
