/* eslint-disable react-refresh/only-export-components */

import  { createContext, useState, useEffect, ReactNode } from 'react';

export interface ThemeContextType {
  darkMode: boolean;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');

    // it checks user's os mode
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    console.log("pere: ",prefersDark)
    // so if no theme is set and user's os preference is dark then it will
    // be dark otherwise default light. And if preference is light then light
    const shouldUseDark =
      savedTheme === 'dark' ||
      (!savedTheme && prefersDark);

    setDarkMode(shouldUseDark);
    document.documentElement.classList.toggle('dark', shouldUseDark);
  }, []);

  const toggleTheme = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('theme', !darkMode ? 'dark' : 'light');
    // if (newMode) {
    //   localStorage.setItem('theme', 'dark');
    // } else {
    //   localStorage.removeItem('theme'); // Respect OS preference when not dark
    // }

    document.documentElement.classList.toggle('dark', newMode);
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};


