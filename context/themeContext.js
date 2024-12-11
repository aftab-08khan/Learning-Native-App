import React, { createContext, useContext, useState } from "react";
import { Alert, Keyboard } from "react-native";
import * as ImagePicker from "expo-image-picker"; // For Expo

const Theme = createContext();

export const useTheme = () => useContext(Theme);

export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState(false);
  const [title, setTitle] = useState("");
  const [imageUri, setImageUri] = useState(null);
  const handleImageUpload = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "We need camera roll permissions to proceed."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };
  const handleMode = () => {
    setMode((prev) => !prev);
  };

  const handleDismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <Theme.Provider
      value={{
        title,
        setTitle,
        mode,
        handleMode,
        handleDismissKeyboard,
        imageUri,
        setImageUri,
        handleImageUpload,
      }}
    >
      {children}
    </Theme.Provider>
  );
};
