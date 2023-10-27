import ActiveLink from '../active-link/ActiveLink';
import useLinkCategories from '@/hooks/useLinkCategories';
import getNumbers from '@/utils/helpers/number-array';
import { useEffect, useRef, useState } from 'react';
import { FaCheck, FaPlus, FaSpinner, FaTimes } from 'react-icons/fa';
import { Controller, useForm } from 'react-hook-form';
import { Category } from '@/utils/schema-types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Category as schema } from '@/utils/schemas/schemas';
import Form from '../atoms/Form';
import { useMutation } from 'react-query';
import { saveCategory } from '@/utils/api/link-category.api';
import { useRouter } from 'next/router';
import { useHotkeys } from 'react-hotkeys-hook';

function LinkCategories() {
  const router = useRouter();

  const [search, setSearch] = useState('');
  const searchRef = useRef<null | HTMLInputElement>(null);

  const { data: _categories, refetch: getCategories, error: categoriesError } = useLinkCategories();
  const categories = _categories?.filter((x) =>
    x.name.toLowerCase().includes(search.toLowerCase())
  );

  const [formActive, setFormActive] = useState(false);

  function openCategoryForm() {
    setFormActive(true);
  }

  const {
    control,
    handleSubmit,
    formState: { isValid },
    reset,
    setError,
  } = useForm<Category>({
    defaultValues: { name: '' },
    resolver: zodResolver(schema),
    mode: 'all',
  });

  const { isLoading: loadingForSave, mutate: saveCategoryMutate } = useMutation({
    mutationFn: saveCategory,
    onSuccess: (data) => {
      setFormActive(false);
      reset({ name: '' });
      getCategories();
      router.push(`/links/${data.id}`);
    },
    onError: (err) => {
      // @ts-ignore
      setError('name', { message: err.message });
    },
  });

  async function saveLinkCategory(data: Category) {
    saveCategoryMutate(data);
  }

  function jumpToMostProbableItem() {
    if (categories && categories.length > 0 && categories.length < 3) {
      const mostProbableItem = categories[0];
      router.push(`/links/${mostProbableItem.id}`);
    }
  }

  useEffect(() => {
    if (search.length >= 3) {
      jumpToMostProbableItem();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  useHotkeys('ctrl+/', () => searchRef.current?.focus());

  return (
    <div className="bg-gradient-to-b from-base-200 to-base-100 rounded-box shadow-md">
      <div className="px-3 pt-3">
        {formActive ? (
          <Form onSubmit={handleSubmit(saveLinkCategory)} autoComplete="off">
            <Controller
              name="name"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <div className="ml-[2px]">
                  <div className="join w-full">
                    <input
                      {...field}
                      placeholder="Category name"
                      className="input input-sm md:input-md input-bordered w-full join-item"
                      autoFocus
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setFormActive(false);
                        reset({ name: '' });
                      }}
                      className="join-item btn btn-sm md:btn-md btn-neutral"
                      disabled={loadingForSave}
                    >
                      {loadingForSave ? (
                        <span className="animate-spin">
                          <FaSpinner />
                        </span>
                      ) : (
                        <FaTimes />
                      )}
                    </button>
                    <button
                      disabled={!isValid}
                      className="join-item btn btn-sm md:btn-md btn-success"
                      type="submit"
                    >
                      {loadingForSave ? (
                        <span className="animate-spin">
                          <FaSpinner />
                        </span>
                      ) : (
                        <FaCheck />
                      )}
                    </button>
                  </div>
                  {error ? <span>{error.message}</span> : ''}
                </div>
              )}
            />
          </Form>
        ) : (
          <div className="relative w-full join">
            <input
              className="input input-sm md:input-md w-full join-item"
              placeholder="Search categories (ctrl+/)"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              ref={searchRef}
            />

            <div className="tooltip" data-tip="New Category">
              <button
                className="btn btn-sm md:btn-md join-item btn-primary no-animation"
                onClick={() => openCategoryForm()}
              >
                <FaPlus />
              </button>
            </div>
          </div>
        )}
      </div>
      <nav className="md:h-[calc(100vh-120px)]">
        <ul className="flex flex-row flex-nowrap overflow-x-auto md:flex-col gap-2 menu">
          {categories
            ? categories.map((cat) => {
                const count = cat._count.links;
                return (
                  <li key={cat.id}>
                    <ActiveLink activeClassName="active" href={`/links/${cat.id}`}>
                      {cat.name}
                      {count > 0 ? <span className="badge badge-primary">{count}</span> : null}
                    </ActiveLink>
                  </li>
                );
              })
            : getNumbers(5).map((x) => <span key={x} className="skeleton h-8" />)}
        </ul>
      </nav>
    </div>
  );
}

export default LinkCategories;
