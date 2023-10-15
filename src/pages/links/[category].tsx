import LinksLayout from '@/components/layout/LinksLayout';
import MainLayout from '@/components/layout/MainLayout';
import useLinks from '@/hooks/useLinks';
import { ReactElement } from 'react';

function Page(): JSX.Element {
  const { links } = useLinks();
  return (
    <div>
      <pre>{JSON.stringify(links, null, 2)}</pre>
    </div>
  );
}

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <LinksLayout>{page}</LinksLayout>
    </MainLayout>
  );
};

export default Page;
