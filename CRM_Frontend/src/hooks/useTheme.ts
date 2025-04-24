import { ThemeContext, ThemeContextType } from "../providers/ThemeContext";
import {useContext } from 'react';

// Custom hook to access the theme context
export const useTheme = (): ThemeContextType => {
    const context = useContext(ThemeContext);
    if (!context) {
      throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
  };