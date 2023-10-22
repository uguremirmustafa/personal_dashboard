'use client';
import { useModal } from '@/context/ModalContext';
import { useHotkeys } from 'react-hotkeys-hook';
import { FaTimes } from 'react-icons/fa';

function Modal() {
  const { modal, closeModal } = useModal();

  useHotkeys('escape', () => closeModal());

  if (!modal) {
    return null;
  }
  return (
    <dialog
      open={!!modal.id}
      onKeyUp={(e) => {
        if (e.key === 'Escape') {
          closeModal();
        }
      }}
      id={modal.id}
      className="modal overflow-hidden bg-neutral-900/40 items-start p-2 md:pt-10 md:px-10"
    >
      <div
        className={`modal-box shadow-lg p-0 w-full ${
          modal.size ? `max-w-[${modal.size}]` : 'max-w-3xl'
        } `}
      >
        <form method="dialog">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-4 top-3"
            onClick={() => closeModal()}
          >
            <FaTimes />
          </button>
        </form>
        <h3 className="font-bold text-lg border-primary py-3 px-4 bg-primary/10">{modal.title}</h3>
        <div className="p-4">{modal.content}</div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={() => closeModal()}>close</button>
      </form>
    </dialog>
  );
}

export default Modal;
