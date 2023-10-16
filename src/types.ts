import { User } from './utils/schema-types';

export interface LinkCategory {
  id: number;
  name: string;
}

export interface NavbarItem {
  name: string;
  path: string;
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
