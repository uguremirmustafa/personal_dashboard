import useLinkCategories from '@/hooks/useLinkCategories';
import Link from 'next/link';
import React, { ReactNode } from 'react';
import ActiveLink from '../active-link/ActiveLink';

interface IProps {
  children: ReactNode;
}

function LinksLayout(props: IProps) {
  const { children } = props;
  const { categories } = useLinkCategories();
  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-1 bg-neutral-900 p-4 rounded">
        <nav>
          <ul className="flex flex-col gap-1">
            {categories.map((cat) => {
              return (
                <li key={cat.link_category_id}>
                  <ActiveLink
                    activeClassName="active"
                    href={`/links/${cat.link_category_id}`}
                    className="link inline-block w-full"
                  >
                    {cat.name}
                  </ActiveLink>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
      <div>{children}</div>
    </div>
  );
}

export default LinksLayout;
