import { router, useSegments } from 'expo-router';
import { ReactNode, createContext, useContext, useEffect, useMemo } from 'react';

import { useAsyncStorage } from '@hooks/useAsyncStorage';

type AuthContextProps = {
  user?: boolean;
  signIn: () => void;
  signOut: () => void;
  setUser: (value: boolean) => void;
};

const AuthContext = createContext({} as AuthContextProps);

function useProtectedRoute(user: boolean) {
  const segments = useSegments();

  useEffect(() => {
    const inPublicGroup = segments[0] === '(public)';

    if (!user && !inPublicGroup) {
      router.replace('/login');
    } else if (user && inPublicGroup) {
      router.replace('/');
    }
  }, [user, segments]);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useAsyncStorage('@DailyDiet:user', true);

  useProtectedRoute(!!user);

  const value = useMemo(() => {
    return {
      signIn: () => setUser(true),
      signOut: () => setUser(false),
      setUser,
      user,
    };
  }, [setUser, user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
