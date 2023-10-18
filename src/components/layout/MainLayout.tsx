import { ReactNode } from 'react';
import Navbar from './Navbar';
import Modal from '../modal/Modal';
import ContextMenu from '../context-menu/ContextMenu';

interface IProps {
  children: ReactNode;
}

function MainLayout(props: IProps): JSX.Element {
  const { children } = props;
  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100 to-base-200">
      <Navbar />
      <div className="divider h-[1px] shadow-none"></div>
      <Modal />
      <ContextMenu />
      <div className="m-4 mt-0">{children}</div>
    </div>
  );
}

export default MainLayout;
