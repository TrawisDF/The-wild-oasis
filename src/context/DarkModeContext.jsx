import { createContext, useContext, useEffect, useState } from 'react';
import { useLocalStorageState } from '../hooks/useLocalStorageState';

const DarkModeContext = createContext();

function DarkModeProvider({ children }) {
  const [isDarkMode, setDarkMode] = useLocalStorageState(
    window.matchMedia('(prefers-color-scheme:dark)').matches,
    'isDarkMode'
  );

  function toggleDarkMode() {
    setDarkMode((isDark) => !isDark);
  }
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark-mode');
      document.documentElement.classList.remove('dark-mode');
    } else {
      document.documentElement.classList.remove('dark-mode');
      document.documentElement.classList.add('dark-mode');
    }
  }, [isDarkMode]);

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (context === undefined) {
    throw new Error(`You are using context outside context provider`);
  }
  return context;
}
export { DarkModeProvider, useDarkMode };
