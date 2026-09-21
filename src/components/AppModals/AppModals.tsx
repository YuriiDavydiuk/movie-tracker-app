import Modal from '../Modal/Modal';
import CreateMovieForm from '../CreateMovieForm/CreateMovie';
import EditMovieForm from '../EditMovieForm/EditMovieForm';
import { useModal } from '../../context/ModalContext/useModal';

export default function AppModals() {
  const { isCreateOpen, isEditOpen, currentMovie, closeModal } = useModal();

  if (!isCreateOpen && !isEditOpen) return null;

  return (
    <Modal onClose={closeModal}>
      {isCreateOpen && <CreateMovieForm onClose={closeModal} />}
      {isEditOpen && currentMovie && <EditMovieForm movie={currentMovie} onClose={closeModal} />}
    </Modal>
  );
}
