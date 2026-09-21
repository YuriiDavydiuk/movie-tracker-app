import { useState, type ReactNode } from 'react';
import { ModalContext, type ModalContextValue } from './context';
import type { Movie } from '../../types/movie';

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [currentMovie, setCurrentMovie] = useState<Movie | null>(null);

  const openCreate = () => setIsCreateOpen(true);
  const openEdit = (movie: Movie) => {
    setCurrentMovie(movie);
    setIsEditOpen(true);
  };
  const closeModal = () => {
    setIsCreateOpen(false);
    setIsEditOpen(false);
    setCurrentMovie(null);
  };

  const value: ModalContextValue = {
    isCreateOpen,
    isEditOpen,
    currentMovie,
    openCreate,
    openEdit,
    closeModal,
  };

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>;
}
