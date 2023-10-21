import ActiveLink from '../active-link/ActiveLink';
import useLinkCategories from '@/hooks/useLinkCategories';
import getNumbers from '@/utils/helpers/number-array';

function LinkCategories() {
  const { data: categories, refetch: getCategories, error: categoriesError } = useLinkCategories();

  function openCategoryForm() {}

  return (
    <div className="col-span-2 bg-gradient-to-b from-base-200 to-base-100 rounded-box shadow-md h-[calc(100vh-120px)]">
      <nav>
        <ul className="flex flex-col gap-2 menu">
          {categories
            ? categories.map((cat) => {
                const count = cat._count.links;
                return (
                  <li key={cat.id}>
                    <ActiveLink activeClassName="active" href={`/links/${cat.id}`}>
                      {cat.name}
                      <span className="badge badge-primary">{count}</span>
                    </ActiveLink>
                  </li>
                );
              })
            : getNumbers(5).map((x) => <span key={x} className="skeleton h-8" />)}
          <li>
            <button onClick={() => openCategoryForm()}>new category</button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default LinkCategories;
