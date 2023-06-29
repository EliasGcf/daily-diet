import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useCallback, useEffect, Dispatch, SetStateAction } from 'react';

type SetValue<T> = Dispatch<SetStateAction<T>>;

type Response<T> = [T, SetValue<T>];

export function useAsyncStorage<S>(key: string, initialValue: S): Response<S> {
  const [storedValue, setStoredValue] = useState(initialValue);

  const setValue = useCallback<SetValue<S>>(
    (value) => {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);

      AsyncStorage.setItem(key, JSON.stringify(valueToStore)).catch((err) => {
        // eslint-disable-next-line no-console
        console.error(err);
      });
    },
    [key, storedValue],
  );

  useEffect(() => {
    async function loadStoredValue() {
      try {
        const value = await AsyncStorage.getItem(key);

        if (!value) return;

        setStoredValue(JSON.parse(value));
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err);
      }
    }

    loadStoredValue();
  }, [key]);

  return [storedValue, setValue];
}
