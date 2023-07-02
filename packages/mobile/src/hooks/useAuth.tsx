import { api } from '@lib/api';
import { router, usePathname, useSegments } from 'expo-router';
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { useAsyncStorage } from '@hooks/useAsyncStorage';

type User = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
};

type AuthContextProps = {
  user?: User | null;
  token?: string | null;
  signIn: (props: { email: string; password: string }) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext({} as AuthContextProps);

export function AuthProvider({
  children,
  canRedirect,
}: {
  children: ReactNode;
  canRedirect: boolean;
}) {
  const segments = useSegments();
  const pathname = usePathname();

  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useAsyncStorage<string | null>('@DailyDiet:token', null);

  useEffect(() => {
    async function loadUser() {
      if (!user) {
        const response = await api.get('/me');

        setUser({
          id: response.data.id,
          name: response.data.name,
          email: response.data.email,
          avatar: response.data.avatar,
        });
      }

      router.replace('/home');
    }

    const inPrivateGroup = segments[0] === '(private)';
    const inSplashScreen = pathname === '/';

    if (!token && (inPrivateGroup || inSplashScreen) && canRedirect) {
      setUser(null);
      router.replace('/login');
    } else if (token && !inPrivateGroup && canRedirect) {
      api.defaults.headers.authorization = `Bearer ${token}`;

      loadUser();
    }
  }, [token, segments, canRedirect, user, pathname]);

  const value = useMemo<AuthContextProps>(() => {
    return {
      signIn: async ({ email, password }) => {
        const response = await api.post('/login', { email, password });

        setToken(response.data.token);
      },
      signOut: async () => {
        try {
          await api.post('/logout');
        } finally {
          setToken(null);
        }
      },
      user,
      token,
    };
  }, [setToken, token, user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

/**
 * This hook should be use only when you want to make sure that user is logged in
 */
export function useUser() {
  const { user } = useAuth();

  if (!user) {
    throw new Error('useUser must be used when user is logged in');
  }

  return user;
}
