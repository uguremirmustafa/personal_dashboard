import { authConfig } from '@/config/authConfig';
import { AuthValuesType, ErrCallbackType, UserInfo } from '@/types';
import axiosObj from '@/utils/api/axios';
import { getCookie, removeCookie, setCookie } from '@/utils/helpers/cookie';
import { Credentials } from '@/utils/schema-types';
import { useRouter } from 'next/router';
import { ReactNode, createContext, useContext, useEffect, useState } from 'react';

const defaultProvider: AuthValuesType = {
  user: getStoredUser(),
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve(),
};

const AuthContext = createContext(defaultProvider);

type Props = {
  children: ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<UserInfo | null>(defaultProvider.user);
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading);

  const router = useRouter();

  function storeUser(userInfo: UserInfo) {
    setCookie(authConfig.userKey, JSON.stringify(userInfo));
    setUser({ ...userInfo });
  }

  function clearUser() {
    setUser(null);
    removeCookie(authConfig.userKey);
  }

  useEffect(() => {
    const initAuth = async (): Promise<void> => {
      if (!router.isReady) {
        console.log('router is not ready');

        return;
      }

      if (user) {
        setLoading(true);
        console.log('user is here, getting profile');
        try {
          const res = await axiosObj.get('/auth/profile');

          if (res?.status === 200 && res?.data) {
            storeUser(res.data);
            setLoading(false);
          } else {
            clearUser();
            setLoading(false);
            if (!router.pathname.includes('auth/login')) {
              router.replace('/auth/login');
            }
          }
        } catch (error) {
          clearUser();
          setLoading(false);
          if (!router.pathname.includes('auth/login')) {
            router.replace('/auth/login');
          }
        }
      } else {
        setLoading(false);
        clearUser();
        console.log('user not found');
      }
    };
    if (router.isReady) {
      initAuth();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  const handleLogin = async (params: Credentials, errorCallback?: ErrCallbackType) => {
    try {
      const res = await axiosObj.post('/auth/login', params);
      if (res?.data) {
        storeUser(res?.data);

        const returnUrl = router.query.returnUrl;
        const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/';

        router.replace(redirectURL as string);
      } else {
        if (errorCallback) errorCallback({ message: 'Username or password is not correct' });
      }
    } catch (error) {
      if (errorCallback) {
        errorCallback({ message: 'sth went wrong' });
      }
    }
  };

  const handleRegister = async (params: Credentials, errorCallback?: ErrCallbackType) => {
    try {
      const res = await axiosObj.post('/auth/register', params);
      console.log(res);
      if (res?.data) {
        router.push('/auth/login');
      } else {
        if (errorCallback) errorCallback({ message: 'sth went wrong' });
      }
    } catch (error) {
      if (errorCallback) {
        errorCallback({ message: 'sth went wrong' });
      }
      clearUser();
    }
  };

  const handleLogout = () => {
    clearUser();
    router.push('/auth/login');
  };

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    logout: handleLogout,
    register: handleRegister,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('be sure you are using useAuth inside the AuthProvider');
  }

  return context;
};

export function getStoredUser() {
  const user = getCookie(authConfig.userKey);

  if (!user) {
    return null;
  }
  return JSON.parse(user ?? '{}') as UserInfo;
}
