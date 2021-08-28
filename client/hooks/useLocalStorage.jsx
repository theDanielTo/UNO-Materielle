import { useState, useEffect } from 'react';

function getSavedUser(key) {
  const savedValue = JSON.parse(localStorage.getItem(key));
  if (savedValue) return savedValue;
}

export default function useLocalStorage() {
  const [value, setValue] = useState(() => {
    return getSavedUser('mintbean-user');
  });

  useEffect(() => {
    localStorage.setItem('mintbean-user', JSON.stringify(value));
  }, [value]);

  return [value, setValue];
}
