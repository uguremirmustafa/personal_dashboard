import Guards from '@/components/guards';
import MainLayout from '@/components/layout/MainLayout';
import { AuthProvider } from '@/context/AuthContext';
import '@/styles/globals.css';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { ReactElement, ReactNode } from 'react';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
  authGuard?: boolean;
  guestGuard?: boolean;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => <MainLayout>{page}</MainLayout>);

  const authGuard = Component.authGuard ?? true;
  const guestGuard = Component.guestGuard ?? false;

  return (
    <AuthProvider>
      <Guards authGuard={authGuard} guestGuard={guestGuard}>
        {getLayout(<Component {...pageProps} />)}
      </Guards>
    </AuthProvider>
  );
}
