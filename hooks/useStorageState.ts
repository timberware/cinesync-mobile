import { useEffect, useCallback, useReducer } from 'react';
import * as SecureStore from 'expo-secure-store';

type UseStateHook<T> = [[boolean, T | null], (value: T | null) => void];

function useAsyncState<T>(
  initialValue: [boolean, T | null] = [true, null],
): UseStateHook<T> {
  return useReducer(
    (
      state: [boolean, T | null],
      action: T | null = null,
    ): [boolean, T | null] => [false, action],
    initialValue,
  ) as UseStateHook<T>;
}

export const setStorageItemAsync = async (
  key: string,
  value: string | null,
) => {
  if (value == null) {
    await SecureStore.deleteItemAsync(key);
  } else {
    await SecureStore.setItemAsync(key, value);
  }
};

export const useStorageState = (key: string): UseStateHook<string> => {
  const [state, setState] = useAsyncState<string>();

  useEffect(() => {
    SecureStore.getItemAsync(key).then((value) => {
      try {
        const parsedValue = value ? JSON.parse(value) : null;
        setState(parsedValue);
      } catch (error) {
        setState(value);
        console.error(error);
      }
    });
  }, [key, setState]);

  const setValue = useCallback(
    (value: string | null) => {
      const serializedValue = value ? JSON.stringify(value) : null;
      setState(value);
      setStorageItemAsync(key, serializedValue);
    },
    [key, setState],
  );

  return [state, setValue];
};
