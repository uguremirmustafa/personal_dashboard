import { ReactNode } from 'react';
import Navbar from './Navbar';

interface IProps {
  children: ReactNode;
}

function AuthLayout(props: IProps): JSX.Element {
  const { children } = props;
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-700 to-neutral-800">
      <div className="m-auto max-w-md">{children}</div>
    </div>
  );
}

export default AuthLayout;
