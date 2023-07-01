import { router, useSegments } from 'expo-router';
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

  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useAsyncStorage<string | null>('@DailyDiet:token', null);

  useEffect(() => {
    // Simulate loading user data from API
    async function loadUser() {
      // eslint-disable-next-line no-promise-executor-return
      await new Promise((resolve) => setTimeout(resolve, 1000));
      router.replace('/home');
    }

    const inPublicGroup = segments[0] === '(public)';

    if (!token && !inPublicGroup && canRedirect) {
      router.replace('/login');
    } else if (token && inPublicGroup && canRedirect) {
      loadUser();
    }
  }, [token, segments, canRedirect]);

  const value = useMemo(() => {
    return {
      signIn: async () => {
        setUser({} as User);
        setToken('token');
      },
      signOut: async () => {
        setUser(null);
        setToken(null);
      },
      user,
      token,
    };
  }, [setToken, setUser, token, user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
