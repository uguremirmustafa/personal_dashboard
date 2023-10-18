import { NavbarItem } from '@/types';
import { HiOutlineHomeModern, HiOutlineBookmarkSquare } from 'react-icons/hi2';

export const NAVBAR_ITEMS: NavbarItem[] = [
  {
    name: 'home',
    path: '/',
    icon: HiOutlineHomeModern,
  },
  {
    name: 'links',
    path: '/links',
    icon: HiOutlineBookmarkSquare,
  },
];
