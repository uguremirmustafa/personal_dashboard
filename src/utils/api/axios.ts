import axios from 'axios';
import { removeCookie } from '../helpers/cookie';
import { authConfig } from '@/config/authConfig';

export const baseURL = process.env.NEXT_PUBLIC_SERVER_BASE;

const axiosObj = axios.create({
  baseURL: `${baseURL}api`,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

const unauthPages = ['/auth/register', '/auth/login'];

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      console.log('here dude');
      removeCookie(authConfig.userKey);
      if (!unauthPages.includes(window.location.pathname)) {
        window.location.href = '/auth/login';
      }
    }
  }
);

export default axiosObj;
