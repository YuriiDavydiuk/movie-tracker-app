import { createContext } from 'react';
import type { Movie } from '../../types/movie';

export interface ModalContextValue {
  isCreateOpen: boolean;
  isEditOpen: boolean;
  currentMovie: Movie | null;
  openCreate: () => void;
  openEdit: (movie: Movie) => void;
  closeModal: () => void;
}

export const ModalContext = createContext<ModalContextValue | undefined>(undefined);
