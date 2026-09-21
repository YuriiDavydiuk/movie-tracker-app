import { useContext } from 'react';
import { MoviesContext } from './context';

export function useMovies() {
  const context = useContext(MoviesContext);
  if (!context) {
    throw new Error('useMovies must be used within MoviesProvider');
  }
  return context;
}
