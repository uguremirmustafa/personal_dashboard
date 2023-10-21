import ActiveLink from '../active-link/ActiveLink';
import useLinkCategories from '@/hooks/useLinkCategories';
import getNumbers from '@/utils/helpers/number-array';
import { useRef, useState } from 'react';
import { FaCheck, FaPlus, FaSearch, FaSpinner, FaTimes } from 'react-icons/fa';
import { Controller, useForm } from 'react-hook-form';
import { Category } from '@/utils/schema-types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Category as schema } from '@/utils/schemas/schemas';
import Form from '../atoms/Form';
import { useMutation } from 'react-query';
import { saveCategory } from '@/utils/api/link-category.api';
import { useRouter } from 'next/router';

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

  return (
    <div className="bg-gradient-to-b from-base-200 to-base-100 rounded-box shadow-md h-[calc(100vh-120px)]">
      <div className="px-2 pt-2">
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
                      className="input input-bordered w-full join-item"
                      autoFocus
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setFormActive(false);
                        reset({ name: '' });
                      }}
                      className="join-item btn btn-neutral"
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
                    <button disabled={!isValid} className="join-item btn btn-success" type="submit">
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
          <div className="flex justify-between items-center">
            <div className="join">
              <input
                className="input join-item"
                placeholder="Search categories"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                ref={searchRef}
              />
              <button
                className="px-3 inline-block join-item bg-base-100"
                onClick={() => {
                  if (search) {
                    setSearch('');
                    searchRef.current?.focus();
                  }
                }}
              >
                {search ? <FaTimes /> : <FaSearch />}
              </button>
            </div>
            <div className="tooltip" data-tip="New Category">
              <button
                className="btn btn-sm btn-circle btn-primary no-animation shadow-lg"
                onClick={() => openCategoryForm()}
              >
                <FaPlus />
              </button>
            </div>
          </div>
        )}
      </div>
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
        </ul>
      </nav>
    </div>
  );
}

export default LinkCategories;
