import { useState, useEffect } from 'react';

export default function useLocalStorage() {
  const [value, setValue] = useState(() => window.localStorage.getItem('username'));

  useEffect(() => {
    localStorage.setItem('username', value);
  }, [value]);

  return [value, setValue];
}
