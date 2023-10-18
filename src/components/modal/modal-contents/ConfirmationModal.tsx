import { useModal } from '@/context/ModalContext';

interface IProps {
  question?: string;
  onOk: () => void;
}
function ConfirmationModal(props: IProps): JSX.Element {
  const { question, onOk } = props;
  const { closeModal } = useModal();
  return (
    <div>
      <p>{question ?? 'Are you sure?'}</p>
      <div className="float-right my-4">
        <button className="btn btn-outline mr-4" onClick={() => closeModal()}>
          cancel
        </button>
        <button className="btn btn-primary" onClick={() => onOk()}>
          confirm
        </button>
      </div>
    </div>
  );
}

export default ConfirmationModal;
