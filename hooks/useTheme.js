import { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { darkTheme, lightTheme } from '../lib/theme';
import { setItem, getItem } from '../lib/storage';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const systemColorScheme = useColorScheme();
  const [themeName, setThemeName] = useState('dark');

  useEffect(() => {
    (async () => {
      const savedTheme = await getItem('app_theme');
      if (savedTheme) {
        setThemeName(savedTheme);
      } else {
        setThemeName('dark'); // default to dark per specs
      }
    })();
  }, []);

  const toggleTheme = () => {
    const newTheme = themeName === 'dark' ? 'light' : 'dark';
    setThemeName(newTheme);
    setItem('app_theme', newTheme);
  };

  const theme = themeName === 'dark' ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ isDark: theme.isDark, colors: theme.colors, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
