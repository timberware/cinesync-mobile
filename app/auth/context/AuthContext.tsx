import React, { createContext, useContext, PropsWithChildren } from 'react';
import { useStorageState } from '../hooks/useStorageState';
import { router } from 'expo-router';
import { LOGIN } from '../../../constants/urls';
import { SIGNUP } from '../../../constants/urls';

type AuthDataType = {
  email: string;
  accessToken: string;
};

type AuthContextType = {
  user: AuthDataType | null;
  signIn: (email: string | null, password: string | null) => Promise<void>;
  signUp: (
    email: string | null,
    username: string | null,
    password: string | null,
  ) => Promise<void>;
  signOut: () => Promise<void>;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const value = useContext(AuthContext);
  if (!value) {
    throw new Error('useAuth must be wrapped in an <AuthProvider />');
  }

  return {
    ...value,
  };
};

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [[isLoading, authData], setAuthData] = useStorageState('auth') as [
    [boolean, AuthDataType | null],
    (value: AuthDataType | null) => void,
  ];

  const signIn = async (email: string | null, password: string | null) => {
    if (!email || !password) {
      throw new Error('email and password are required');
    }

    try {
      const response = await fetch(LOGIN, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'failed to sign in');
      }

      const { accessToken } = await response.json();

      setAuthData({
        email,
        accessToken,
      });
    } catch (error) {
      console.error('sign in error:', error);
      throw error;
    }
  };

  const signUp = async (
    email: string | null,
    username: string | null,
    password: string | null,
  ) => {
    if (!email || !username || !password) {
      throw new Error('email, username, and password are required');
    }

    try {
      const response = await fetch(SIGNUP, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'sign up failed');
      }

      await signIn(email, password);
      router.replace('/(tabs)');
    } catch (error) {
      console.error('sign up error:', error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      setAuthData(null);
      router.replace('/auth/screens/SignInScreen');
    } catch (error) {
      console.error('sign out error:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user: authData,
        signIn,
        signUp,
        signOut,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
