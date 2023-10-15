import { ReactNode } from 'react';
import AuthGuard from './AuthGuard';
import GuestGuard from './GuestGuard';
import Spinner from '../atoms/Spinner';

interface IProps {
  authGuard: boolean;
  guestGuard: boolean;
  children: ReactNode;
}
function Guards(props: IProps) {
  const { authGuard, children, guestGuard } = props;
  if (guestGuard) {
    return <GuestGuard fallback={<Spinner />}>{children}</GuestGuard>;
  } else if (!guestGuard && !authGuard) {
    return <>{children}</>;
  } else {
    return <AuthGuard fallback={<Spinner />}>{children}</AuthGuard>;
  }
}

export default Guards;
