import { LinkItemWithCategoryIdList } from '@/utils/schema-types';
import Image from 'next/image';
import { GrEdit, GrTrash } from 'react-icons/gr';

interface IProps {
  item: LinkItemWithCategoryIdList;
  handleRightClick(
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ): (node: LinkItemWithCategoryIdList) => void;
}

function LinkCard(props: IProps) {
  const { item, handleRightClick } = props;

  return (
    <div onContextMenu={(e) => handleRightClick(e)(item)}>
      <a
        href={item.path}
        target="_blank"
        className="font-bold bg-primary hover:bg-primary-focus px-4 overflow-hidden transition
        py-4 shadow-lg rounded-md flex items-center justify-between h-20"
      >
        <span>{item.name}</span>

        {item?.icon && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            className="h-full rounded object-cover overflow-hidden"
            src={item.icon}
            alt={item.name}
          />
        )}
      </a>
    </div>
  );
}

export default LinkCard;
