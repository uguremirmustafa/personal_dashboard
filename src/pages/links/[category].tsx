import LinkForm from '@/components/forms/LinkForm';
import LinksLayout from '@/components/layout/LinksLayout';
import MainLayout from '@/components/layout/MainLayout';
import LinkCard from '@/components/link-card/LinkCard';
import ConfirmationModal from '@/components/modal/modal-contents/ConfirmationModal';
import { useModal } from '@/context/ModalContext';
import { useRightClick } from '@/context/RightClickContext';
import useLinks from '@/hooks/useLinks';
import axiosObj from '@/utils/api/axios';
import getNumbers from '@/utils/helpers/number-array';
import {
  CategoryWithIdAndLinkCounts,
  LinkItemWithCategoryIdList,
  LinkItemWithId,
} from '@/utils/schema-types';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';
import { FaPlus } from 'react-icons/fa';
import { GrEdit } from 'react-icons/gr';
import { HiOutlineTrash } from 'react-icons/hi2';
import { useQueryClient } from 'react-query';
import { useHotkeys } from 'react-hotkeys-hook';

function Page(): JSX.Element {
  const { data: links, refetch: getLinks, error: linksError } = useLinks();
  const queryClient = useQueryClient();
  const { setModal, closeModal } = useModal();
  const router = useRouter();
  const _categoryId = router.query?.category ?? '0';
  const categoryId = Number(_categoryId);

  const linkCategories = queryClient.getQueryData<CategoryWithIdAndLinkCounts[]>('link_categories');

  const category = linkCategories?.find((x) => x.id === categoryId);
  const linkCountUnderCategory = category?._count.links ?? 5;

  function onSuccess() {
    closeModal();
    getLinks();
    queryClient.fetchQuery('link_categories');
  }

  function openLinkForm(item: LinkItemWithCategoryIdList, id?: LinkItemWithId['id']) {
    setModal({
      title: 'New Link',
      content: <LinkForm onSuccess={onSuccess} initialValues={item} id={id} />,
      id: 'link_form',
    });
  }

  async function deleteLink(id: LinkItemWithId['id']) {
    try {
      const res = await axiosObj.delete(`/link/${id}`);
      if (res) {
        onSuccess();
      } else {
        console.log('sth went wrong');
      }
    } catch (error) {
      console.log(error);
    }
  }

  function openDeleteConfirm(item: LinkItemWithCategoryIdList, id: LinkItemWithId['id']) {
    setModal({
      title: 'Delete Link',
      id: 'link_form',
      content: (
        <ConfirmationModal
          question={`Are you sure you want to delete this item: ${item.name}?`}
          onOk={() => deleteLink(id)}
        />
      ),
    });
  }

  const { setCtxMenu, close } = useRightClick();

  function onEditClick(node: LinkItemWithCategoryIdList) {
    close();
    openLinkForm(node, node.id);
  }
  function onDeleteClick(node: LinkItemWithCategoryIdList) {
    close();
    openDeleteConfirm(node, node.id);
  }

  function handleRightClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    return (node: LinkItemWithCategoryIdList) => {
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
            <li>
              <a onClick={() => onDeleteClick(node)}>
                <HiOutlineTrash />
                Delete
              </a>
            </li>
          </>
        ),
      });
    };
  }

  useHotkeys('ctrl+shift+k', () => openLinkForm(initialValues));

  return (
    <div>
      <div className="flex items-center justify-between border-b border-b-base-200 pb-3 mb-3">
        <h2 className="text-2xl font-bold">{category?.name}</h2>
        <div className="tooltip" data-tip="New Link">
          <button
            className="no-animation btn btn-ghost"
            onClick={() => openLinkForm(initialValues)}
          >
            <kbd className="kbd">ctrl</kbd> + <kbd className="kbd">shift</kbd> +{' '}
            <kbd className="kbd">k</kbd>
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 ">
        {links
          ? links.map((link) => {
              return <LinkCard key={link.path} item={link} handleRightClick={handleRightClick} />;
            })
          : getNumbers(linkCountUnderCategory).map((x) => (
              <span key={x} className="skeleton h-20" />
            ))}
        {linksError ? <span>Something went wrong</span> : null}
      </div>
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

const initialValues: LinkItemWithCategoryIdList = {
  name: '',
  path: '',
  icon: '',
  categoryIds: [],
  id: 0,
};
