import React, { useContext } from 'react';

const AppContext = React.createContext();

export function useAppContext() {
  return useContext(AppContext);
}

export default AppContext;
