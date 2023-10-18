import useLinkCategories from '@/hooks/useLinkCategories';
import { ReactNode } from 'react';
import LinkCategories from './LinkCategories';

interface IProps {
  children: ReactNode;
}

function LinksLayout(props: IProps) {
  const { children } = props;
  const { categories } = useLinkCategories();
  return (
    <div className="grid grid-cols-12 gap-4">
      <LinkCategories categories={categories} />
      <div className="col-span-10">{children}</div>
    </div>
  );
}

export default LinksLayout;
