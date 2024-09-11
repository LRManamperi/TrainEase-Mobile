import React, { createContext, useContext, useState } from 'react';
import { DefaultTheme, DarkTheme, Provider as PaperProvider } from 'react-native-paper';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <PaperProvider theme={isDarkMode ? DarkTheme : DefaultTheme}>
        {children}
      </PaperProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
