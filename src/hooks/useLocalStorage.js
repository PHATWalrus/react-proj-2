import { useState, useEffect } from 'react';

// stealing local storage logic so we don't lose data on refresh lol
export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('oopsie doopsie local storage failed', error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      // allow value to be a function so we have same api as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error('could not save to local storage. sadge.', error);
    }
  };

  return [storedValue, setValue];
}
