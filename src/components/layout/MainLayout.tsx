import { ReactNode } from 'react';
import Navbar from './Navbar';

interface IProps {
  children: ReactNode;
}

function MainLayout(props: IProps): JSX.Element {
  const { children } = props;
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-700 to-neutral-800 text-white">
      <Navbar />
      <div className="m-4 mt-0">{children}</div>
    </div>
  );
}

export default MainLayout;
