import { CategoryWithId } from '@/utils/schema-types';
import ActiveLink from '../active-link/ActiveLink';

interface IProps {
  categories: CategoryWithId[];
}

function LinkCategories(props: IProps) {
  const { categories } = props;
  return (
    <div className="col-span-2 bg-gradient-to-b from-base-200 to-base-100 rounded-box shadow-md h-[calc(100vh-120px)]">
      <nav>
        <ul className="flex flex-col gap-2 menu">
          {categories.map((cat) => {
            const count = cat._count.links;
            return (
              <li key={cat.id}>
                <ActiveLink activeClassName="active" href={`/links/${cat.id}`}>
                  {cat.name}
                  <span className="badge badge-primary">{count}</span>
                </ActiveLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

export default LinkCategories;
