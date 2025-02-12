import React, { createContext, useContext, PropsWithChildren } from 'react';
import { router } from 'expo-router';
import { useStorageState } from '../../../hooks/useStorageState';
import { AUTH, SIGN_IN_SCREEN_PATH, TABS_PATH } from '../../../constants';

export type AuthDataType = {
  id: string;
  email: string;
  username: string;
  avatarName: string | null;
  accessToken: string;
};

export type AuthContextType = {
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

export const useAuthContext = () => {
  const value = useContext(AuthContext);
  if (!value) {
    throw new Error('useAuthContext must be wrapped in an <AuthProvider />');
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

  const fetchUserData = async (
    accessToken: string,
  ): Promise<{
    id: string;
    username: string;
    email: string;
    avatarName: string | null;
  }> => {
    const response = await fetch(`${AUTH}/whoami`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error('failed to fetch user data');
    }

    return response.json();
  };

  const signIn = async (email: string | null, password: string | null) => {
    if (!email || !password) {
      throw new Error('email and password are required');
    }

    try {
      const authResponse = await fetch(AUTH + '/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!authResponse.ok) {
        throw new Error('failed to sign in');
      }

      const { accessToken } = await authResponse.json();

      const userData = await fetchUserData(accessToken);

      setAuthData({
        ...userData,
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
      const response = await fetch(AUTH + '/signup', {
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
      router.replace(TABS_PATH);
    } catch (error) {
      console.error('sign up error:', error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      setAuthData(null);
      router.replace(SIGN_IN_SCREEN_PATH);
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

export default AuthProvider;
