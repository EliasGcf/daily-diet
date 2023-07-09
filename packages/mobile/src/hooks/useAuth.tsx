import { router, useNavigation, usePathname, useSegments } from 'expo-router';
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { useAsyncStorage } from '@hooks/useAsyncStorage';

import { api } from '@lib/api';

type User = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
};

type UpdateUser = {
  name: string;
  newPassword?: string;
  newPasswordConfirmation?: string;
  currentPassword?: string;
};

type AuthContextProps = {
  user?: User | null;
  token?: string | null;
  signIn: (props: { email: string; password: string }) => Promise<void>;
  signOut: () => Promise<void>;
  updateUser: (props: UpdateUser) => Promise<void>;
};

const AuthContext = createContext({} as AuthContextProps);

export function AuthProvider({
  children,
  canRedirect,
}: {
  children: ReactNode;
  canRedirect: boolean;
}) {
  const navigation = useNavigation();
  const segments = useSegments();
  const pathname = usePathname();

  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useAsyncStorage<string | null>('@DailyDiet:token', null);

  api.defaults.headers.authorization = `Bearer ${token}`;

  useEffect(() => {
    async function onAuthenticated() {
      if (!user) {
        const response = await api.get('/me');

        setUser({
          id: response.data.id,
          name: response.data.name,
          email: response.data.email,
          avatar: response.data.avatar,
        });
      }

      if (navigation.canGoBack()) {
        navigation.dispatch({ type: 'POP_TO_TOP' });
      }
      router.replace('/home');
    }

    const inPrivateGroup = segments[0] === '(private)';
    const inPublicGroup = segments[0] === '(public)';
    const inSplashScreen = pathname === '/';

    if (!token && (inPrivateGroup || inSplashScreen) && canRedirect) {
      if (navigation.canGoBack()) {
        navigation.dispatch({ type: 'POP_TO_TOP' });
      }
      router.replace('/login');
      setUser(null);
    } else if (token && (inPublicGroup || inSplashScreen) && canRedirect) {
      onAuthenticated();
    }
  }, [token, segments, canRedirect, user, pathname, navigation]);

  const value = useMemo<AuthContextProps>(() => {
    return {
      signIn: async ({ email, password }) => {
        const response = await api.post('/login', { email, password });

        setUser({
          name: response.data.user.name,
          email: response.data.user.email,
          id: response.data.user.id,
          avatar: response.data.user.avatar,
        });
        setToken(response.data.token);
      },
      signOut: async () => {
        try {
          await api.post('/logout');
        } finally {
          setToken(null);
        }
      },
      updateUser: async (data) => {
        const response = await api.put('/users', data);

        setUser({
          id: response.data.id,
          name: response.data.name,
          email: response.data.email,
          avatar: response.data.avatar,
        });
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
