import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Alert,
  ActivityIndicator,
} from "react-native";
import Heading from "./Heading";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useTheme } from "../context/themeContext";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase.config";
import UploadImageComponent from "./UploadImage";

const Container = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [languageName, setLanguageName] = useState("");
  // const [description, setDescription] = useState("");
  const { handleDismissKeyboard } = useTheme();
  const [languagesData, setLanguagesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageUri, setImageUri] = useState(null);

  const handleSubmit = async () => {
    if (!languageName || !description) {
      Alert.alert("Validation Error", "Please enter both fields.");
      return;
    }

    try {
      await addDoc(collection(db, "languages"), {
        languageName,
        imageUri,
        createdAt: new Date(),
      });
      Alert.alert("Success", "Your data has been saved.");
    } catch (error) {
      Alert.alert("Error", error.message || "An error occurred.");
    }

    setIsVisible(false);
    setLanguageName("");
    // setDescription("");
  };

  // Fetch data from Firestore
  // useEffect(() => {
  //   const subscriber = firestore()
  //     .collection("InterViewQsLanguage")
  //     .orderBy("createdAt", "desc")
  //     .onSnapshot((querySnapshot) => {
  //       const data = [];
  //       querySnapshot.forEach((documentSnapshot) => {
  //         data.push({
  //           ...documentSnapshot.data(),
  //           key: documentSnapshot.id,
  //         });
  //       });
  //       setLanguagesData(data);
  //       setLoading(false);
  //     });

  //   return () => subscriber(); // Unsubscribe from snapshot listener
  // }, []);

  // if (loading) {
  //   return (
  //     <View style={styles.loaderContainer}>
  //       <ActivityIndicator size="large" color="#4CAF50" />
  //     </View>
  //   );
  // }

  return (
    <TouchableWithoutFeedback onPress={handleDismissKeyboard}>
      <View style={styles.main}>
        <View style={styles.flex}>
          <Heading>Interview Questions</Heading>

          <TouchableOpacity
            style={styles.pulseButton}
            onPress={() => setIsVisible(true)}
          >
            <MaterialIcons name="add" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        <View>
          {languagesData?.map((item) => (
            <View key={item.key} style={styles.languageItem}>
              <Text style={styles.languageName}>{item.languageName}</Text>
              <Text style={styles.languageDescription}>{item.description}</Text>
            </View>
          ))}
        </View>

        <Modal
          visible={isVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setIsVisible(false)}
        >
          <KeyboardAvoidingView
            style={styles.modalContainer}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <View style={styles.modalContent}>
              <Text style={styles.modalHeading}>Add New Language</Text>

              <TextInput
                placeholder="Language Name"
                value={languageName}
                onChangeText={setLanguageName}
                style={styles.input}
                placeholderTextColor="#777"
              />
              <UploadImageComponent
                setImageUri={setImageUri}
                imageUri={imageUri}
              />
              {/* <TextInput
                placeholder="Description"
                value={description}
                onChangeText={setDescription}
                style={[styles.input, styles.textArea]}
                multiline
                numberOfLines={4}
                placeholderTextColor="#777"
              /> */}

              <TouchableOpacity
                style={styles.submitButton}
                onPress={handleSubmit}
              >
                <Text style={styles.submitButtonText}>Submit</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setIsVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </Modal>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Container;

const styles = StyleSheet.create({
  main: {
    width: "100%",
    padding: 12,
    borderRadius: 12,
    backgroundColor: "#fff",
  },
  flex: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  pulseButton: {
    backgroundColor: "green",
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  languageItem: {
    marginVertical: 10,
    padding: 15,
    borderRadius: 8,
    backgroundColor: "#f4f4f4",
  },
  languageName: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#333",
  },
  languageDescription: {
    fontSize: 16,
    color: "#555",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "90%",
    padding: 25,
    borderRadius: 15,
    backgroundColor: "#fff",
  },
  modalHeading: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    marginBottom: 15,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  submitButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  cancelButton: {
    marginTop: 10,
    paddingVertical: 15,
    alignItems: "center",
    backgroundColor: "#f44336",
    borderRadius: 8,
  },
  cancelButtonText: {
    color: "#fff",
    fontSize: 18,
  },
});
