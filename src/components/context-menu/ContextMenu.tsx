import { useRightClick } from '@/context/RightClickContext';
import useOutsideClick from '@/hooks/utility/useOutsideClick';
import { useRef } from 'react';

function ContextMenu() {
  const { ctxMenu, close } = useRightClick();
  const { isOpen, x, y, children } = ctxMenu;

  const ref = useRef<HTMLUListElement | null>(null);

  useOutsideClick([ref], close);

  if (!isOpen || !children) {
    return null;
  }

  return (
    <ul
      ref={ref}
      className="absolute menu bg-base-200 rounded-box z-50 shadow border-base-300 border"
      style={{ top: y, left: x }}
    >
      {children}
    </ul>
  );
}

export default ContextMenu;
