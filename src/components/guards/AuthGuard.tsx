import { ReactNode, ReactElement, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getStoredUser, useAuth } from '@/context/AuthContext';

interface AuthGuardProps {
  children: ReactNode;
  fallback: ReactElement | null;
}

const AuthGuard = (props: AuthGuardProps) => {
  const { children, fallback } = props;
  const auth = useAuth();
  const router = useRouter();

  useEffect(
    () => {
      if (!router.isReady) {
        console.log('router is not ready');

        return;
      }

      if (auth.user === null && !getStoredUser()) {
        if (router.asPath !== '/' && !router.asPath.includes('auth/login')) {
          router.replace({
            pathname: '/auth/login',
            query: { returnUrl: router.asPath },
          });
        } else {
          router.replace('/auth/login');
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.route]
  );

  if (auth.loading || auth.user === null) {
    return fallback;
  }

  return <>{children}</>;
};

export default AuthGuard;
