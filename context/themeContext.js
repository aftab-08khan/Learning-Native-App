import React, { createContext, useContext, useState } from "react";
import { Keyboard } from "react-native";

const Theme = createContext();

export const useTheme = () => useContext(Theme);

export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState(false);

  const handleMode = () => {
    setMode((prev) => !prev);
  };

  const handleDismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <Theme.Provider value={{ mode, handleMode, handleDismissKeyboard }}>
      {children}
    </Theme.Provider>
  );
};
