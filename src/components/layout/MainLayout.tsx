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
    <div>
      <Navbar />
      <div className="divider h-[1px] shadow-none"></div>
      <Modal />
      <ContextMenu />
      <div className="p-4 pt-0">{children}</div>
    </div>
  );
}

export default MainLayout;
