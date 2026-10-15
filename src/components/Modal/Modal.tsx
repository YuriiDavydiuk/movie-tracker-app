import { createPortal } from 'react-dom';

import { useEffect } from 'react';

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ onClose, children }: ModalProps) {
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const handleEscapeClick = (e: KeyboardEvent) => {
      if (e.code === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscapeClick);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscapeClick);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return createPortal(
    <>
      <div
        className="modal d-block"
        role="dialog"
        aria-modal="true"
        aria-label="Movie dialog"
        tabIndex={-1}
        onClick={handleBackdropClick}
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-body p-3 p-md-4">{children}</div>
          </div>
        </div>
      </div>

      <div className="modal-backdrop show" aria-hidden="true" />
    </>,
    document.body
  );
}
