import ActiveLink from '../active-link/ActiveLink';
import useLinkCategories from '@/hooks/useLinkCategories';
import getNumbers from '@/utils/helpers/number-array';
import { useEffect, useRef, useState } from 'react';
import { FaCheck, FaPlus, FaSpinner, FaTimes } from 'react-icons/fa';
import { Controller, useForm } from 'react-hook-form';
import { CategoryWithId, CategoryWithIdAndLinkCounts } from '@/utils/schema-types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Category as schema } from '@/utils/schemas/schemas';
import Form from '../atoms/Form';
import { useMutation, useQueryClient } from 'react-query';
import { deleteCategory, saveCategory } from '@/utils/api/link-category.api';
import { useRouter } from 'next/router';
import { useHotkeys } from 'react-hotkeys-hook';
import { useRightClick } from '@/context/RightClickContext';
import { GrEdit } from 'react-icons/gr';
import { HiOutlineTrash } from 'react-icons/hi2';
import { useModal } from '@/context/ModalContext';
import ConfirmationModal from '../modal/modal-contents/ConfirmationModal';

function LinkCategories() {
  const router = useRouter();
  const _cat = router.query.category ?? '0';
  const currentCategory = Number(_cat);
  const [search, setSearch] = useState('');
  const searchRef = useRef<null | HTMLInputElement>(null);
  const { setModal, closeModal } = useModal();
  const queryClient = useQueryClient();
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
    watch,
  } = useForm<CategoryWithId>({
    defaultValues: { name: '', id: 0 },
    resolver: zodResolver(schema),
    mode: 'all',
  });

  const { isLoading: loadingForSave, mutate: saveCategoryMutate } = useMutation({
    mutationFn: saveCategory,
    onSuccess: (data) => {
      setFormActive(false);
      reset({ name: '', id: 0 });
      getCategories();
      router.push(`/links/${data.id}`);
      queryClient.invalidateQueries(['links', data.id]);
    },
    onError: (err) => {
      // @ts-ignore
      setError('name', { message: err.message });
    },
  });

  const { isLoading: loadingForDelete, mutate: deleteCategoryMutate } = useMutation({
    mutationFn: deleteCategory,
    onSuccess: (data) => {
      if (data) {
        getCategories();
        if (data === currentCategory) {
          router.push('/links');
        }
      }
      closeModal();
    },
    onError: (err) => {
      // @ts-ignore
      setError('name', { message: err.message });
    },
  });

  async function saveLinkCategory(data: CategoryWithId) {
    saveCategoryMutate({ ...data, id: watch('id') });
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

  const { setCtxMenu, close } = useRightClick();

  function handleRightClick(e: React.MouseEvent<HTMLLIElement, MouseEvent>) {
    return (node: CategoryWithIdAndLinkCounts) => {
      e.preventDefault();
      e.stopPropagation();
      const { pageX, pageY } = e;
      setCtxMenu({
        x: pageX,
        y: pageY,
        isOpen: true,
        children: (
          <>
            <li>
              <a onClick={() => onEditClick(node)}>
                <GrEdit />
                Edit
              </a>
            </li>
            {node._count.links === 0 && (
              <li>
                <a onClick={() => onDeleteClick(node)}>
                  <HiOutlineTrash />
                  Delete
                </a>
              </li>
            )}
          </>
        ),
      });
    };
  }

  function openDeleteConfirm(
    item: CategoryWithIdAndLinkCounts,
    id: CategoryWithIdAndLinkCounts['id']
  ) {
    setModal({
      title: 'Delete Link',
      id: 'link_form',
      content: (
        <ConfirmationModal
          question={`Are you sure you want to delete this item: ${item.name}?`}
          onOk={() => deleteCategoryMutate(id)}
        />
      ),
    });
  }

  function onEditClick(node: CategoryWithIdAndLinkCounts) {
    close();
    reset({ name: node.name, id: node.id });
    openCategoryForm();
  }
  function onDeleteClick(node: CategoryWithIdAndLinkCounts) {
    openDeleteConfirm(node, node.id);
  }

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
      <nav className="md:h-[calc(100vh-200px)] overflow-y-scroll">
        <ul className="flex flex-row flex-nowrap overflow-x-auto md:flex-col gap-2 menu">
          {categories
            ? categories.map((cat) => {
                const count = cat._count.links;
                return (
                  <li key={cat.id} onContextMenu={(e) => handleRightClick(e)(cat)}>
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
