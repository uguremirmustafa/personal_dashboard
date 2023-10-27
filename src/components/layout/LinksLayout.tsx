import useLinkCategories from '@/hooks/useLinkCategories';
import { ReactNode } from 'react';
import LinkCategories from './LinkCategories';

interface IProps {
  children: ReactNode;
}

function LinksLayout(props: IProps) {
  const { children } = props;
  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-12 md:col-span-5 lg:col-span-4 xl:col-span-3">
        <LinkCategories />
      </div>
      <div className="col-span-12 md:col-span-7 lg:col-span-8 xl:col-span-9">{children}</div>
    </div>
  );
}

export default LinksLayout;
