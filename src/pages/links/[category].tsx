import LinkForm from '@/components/forms/LinkForm';
import LinkCategories from '@/components/layout/LinkCategories';
import LinksLayout from '@/components/layout/LinksLayout';
import MainLayout from '@/components/layout/MainLayout';
import LinkCard from '@/components/link-card/LinkCard';
import ConfirmationModal from '@/components/modal/modal-contents/ConfirmationModal';
import { useModal } from '@/context/ModalContext';
import { useRightClick } from '@/context/RightClickContext';
import useLinkCategories from '@/hooks/useLinkCategories';
import useLinks from '@/hooks/useLinks';
import axiosObj from '@/utils/api/axios';
import { LinkItemWithCategoryIdList, LinkItemWithId } from '@/utils/schema-types';
import { ReactElement } from 'react';
import { FaPlus } from 'react-icons/fa';
import { GrEdit } from 'react-icons/gr';
import { HiOutlineTrash } from 'react-icons/hi2';

function Page(): JSX.Element {
  const { links, getData } = useLinks();
  const { getCategories, categories } = useLinkCategories();
  const { setModal, closeModal } = useModal();

  function onSuccess() {
    closeModal();
    getData();
    getCategories();
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

  const { setCtxMenu } = useRightClick();

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
              <a onClick={() => openLinkForm(node, node.id)}>
                <GrEdit />
                Edit
              </a>
            </li>
            <li>
              <a onClick={() => openDeleteConfirm(node, node.id)}>
                <HiOutlineTrash />
                Delete
              </a>
            </li>
          </>
        ),
      });
    };
  }

  return (
    <div className="grid grid-cols-12 gap-4">
      <LinkCategories categories={categories} />
      <div className="col-span-10">
        <div className="flex items-end  gap-4 mb-3">
          <h2 className="text-2xl font-bold">Links</h2>
          <div className="tooltip" data-tip="New Link">
            <button
              className="btn btn-sm btn-circle btn-primary no-animation shadow-lg"
              onClick={() => openLinkForm(initialValues)}
            >
              <FaPlus />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 ">
          {links.map((link) => {
            return <LinkCard key={link.path} item={link} handleRightClick={handleRightClick} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default Page;

const initialValues: LinkItemWithCategoryIdList = {
  name: '',
  path: '',
  icon: '',
  categoryIds: [],
  id: 0,
};
