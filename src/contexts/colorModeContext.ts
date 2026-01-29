import { createContext } from 'react';

export const ColorModeContext = createContext<{
  toggleColorMode: () => void;
  isDarkMode: boolean;
}>({
  toggleColorMode: () => {},
  isDarkMode: false,
});

export default ColorModeContext;