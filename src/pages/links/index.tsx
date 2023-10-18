import { NextPageWithLayout } from '../_app';
import { ReactElement } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import LinksLayout from '@/components/layout/LinksLayout';

const Page: NextPageWithLayout = () => {
  return (
    <div>
      <p>Select a category and see some links...</p>
    </div>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <LinksLayout>{page}</LinksLayout>
    </MainLayout>
  );
};

export default Page;
