import * as z from 'zod';
import { loginFormSchema } from './utils/schemas/schemas';

export interface LinkCategory {
  link_category_id: number;
  name: string;
}
export interface LinkItem {
  link_id: number;
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

export type LoginFormValues = z.infer<typeof loginFormSchema>;

export type AuthValuesType = {
  loading: boolean;
  logout: () => void;
  user: UserInfo | null;
  setLoading: (value: boolean) => void;
  setUser: (value: UserInfo | null) => void;
  login: (params: LoginFormValues, errorCallback?: ErrCallbackType) => void;
};
