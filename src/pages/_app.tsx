import Guards from '@/components/guards';
import MainLayout from '@/components/layout/MainLayout';
import { AuthProvider } from '@/context/AuthContext';
import { ModalWrapper } from '@/context/ModalContext';
import { RightClickContext } from '@/context/RightClickContext';
import '@/styles/globals.css';
import '@/styles/calendar.css';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { ReactElement, ReactNode } from 'react';
import { IconContext } from 'react-icons';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

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
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ModalWrapper>
          <RightClickContext>
            <IconContext.Provider value={{ className: 'icon' }}>
              <Guards authGuard={authGuard} guestGuard={guestGuard}>
                {getLayout(<Component {...pageProps} />)}
              </Guards>
            </IconContext.Provider>
          </RightClickContext>
        </ModalWrapper>
      </AuthProvider>
    </QueryClientProvider>
  );
}
