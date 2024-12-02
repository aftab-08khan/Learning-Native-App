import { createContext, useContext, useState } from "react";

const Theme = createContext();

export const useTheme = () => useContext(Theme);
export const ThemeContext = ({ children }) => {
  const [mode, setMode] = useState(false);

  const handleMode = () => {
    setMode((prev) => !prev);
  };

  return (
    <Theme.Provider value={{ mode, handleMode }}>{children}</Theme.Provider>
  );
};
