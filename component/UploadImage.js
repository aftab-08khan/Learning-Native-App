import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker"; // For Expo
import { useTheme } from "../context/themeContext";

const UploadImageComponent = () => {
  const { imageUri, handleImageUpload } = useTheme();
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.uploadButton} onPress={handleImageUpload}>
        <Text style={styles.uploadButtonText}>Upload Image</Text>
      </TouchableOpacity>

      {imageUri && (
        <Image source={{ uri: imageUri }} style={styles.imagePreview} />
      )}
    </View>
  );
};

export default UploadImageComponent;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    width: "100%",
  },
  uploadButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  uploadButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  imagePreview: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginTop: 15,
  },
});
