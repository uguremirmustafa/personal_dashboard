import { IconType } from 'react-icons';
import { User } from './utils/schema-types';

export interface NavbarItem {
  name: string;
  path: string;
  icon: IconType;
}
export interface UserInfo {
  email: string;
}
export type ErrCallbackType = (err: { [key: string]: string }) => void;

export type AuthValuesType = {
  loading: boolean;
  logout: () => void;
  user: UserInfo | null;
  setLoading: (value: boolean) => void;
  setUser: (value: UserInfo | null) => void;
  login: (params: User, errorCallback?: ErrCallbackType) => void;
};

export const MODAL_IDS = ['link_form'] as const;

export type ModalId = (typeof MODAL_IDS)[number];
