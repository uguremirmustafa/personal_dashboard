import useLinkCategories from '@/hooks/useLinkCategories';
import { ReactNode } from 'react';
import ActiveLink from '../active-link/ActiveLink';

interface IProps {
  children: ReactNode;
}

function LinksLayout(props: IProps) {
  const { children } = props;
  const { categories } = useLinkCategories();
  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-2 bg-neutral-900 p-4 rounded">
        <nav>
          <ul className="flex flex-col gap-1">
            {categories.map((cat) => {
              return (
                <li key={cat.id}>
                  <ActiveLink
                    activeClassName="active"
                    href={`/links/${cat.id}`}
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
      <div className="col-span-10">{children}</div>
    </div>
  );
}

export default LinksLayout;
