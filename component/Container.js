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
  Image,
  FlatList,
} from "react-native";
import Heading from "./Heading";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useTheme } from "../context/themeContext";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import { db } from "../firebase.config";
import UploadImageComponent from "./UploadImage";
import { useUser } from "../context/UserContext";

const Container = ({ navigation }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [languageName, setLanguageName] = useState("");
  const { handleDismissKeyboard } = useTheme();
  const [languagesData, setLanguagesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageUri, setImageUri] = useState(null);
  const { admin } = useUser();
  const handleSubmit = async () => {
    if (!languageName || !imageUri) {
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
      fetchLanguagesData();
      setIsVisible(false);
      setLanguageName("");
      setImageUri(null);
    } catch (error) {
      Alert.alert("Error", error.message || "An error occurred.");
    }
  };

  const fetchLanguagesData = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "languages"));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setLanguagesData(data);
    } catch (error) {
      Alert.alert("Error", error.message || "Failed to fetch data.");
    }
    setLoading(false);
  };
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "languages", id));

      setLanguagesData((prev) => prev.filter((item) => item.id !== id));
      Alert.alert("Success", "Your data has been deleted.");
    } catch (error) {
      Alert.alert(
        "Error",
        error.message || "There was an issue deleting the data."
      );
    }
  };

  useEffect(() => {
    fetchLanguagesData();
  }, []);

  const renderLanguageItem = ({ item }) => (
    <TouchableOpacity
      style={styles.languageItem}
      onPress={() => navigation.navigate("SingleProfile")}
    >
      <Text style={styles.languageName}>{item.languageName}</Text>
      <Image source={{ uri: item.imageUri }} style={styles.icon} />
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => {
          Alert.alert(
            "Confirm Delete",
            "Are you sure you want to delete this",
            [
              {
                text: "Cancel",
                style: "cancel",
              },
              { text: "Delete", onPress: () => handleDelete(item.id) },
            ]
          );
        }}
      >
        <Text style={styles.deleteText}>Delete</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <TouchableWithoutFeedback onPress={handleDismissKeyboard}>
      <View style={styles.main}>
        <View style={styles.flex}>
          <Heading>Interview Questions</Heading>
          {admin === true ? (
            <TouchableOpacity
              style={styles.pulseButton}
              onPress={() => setIsVisible(true)}
            >
              <MaterialIcons name="add" size={24} color="#fff" />
            </TouchableOpacity>
          ) : null}
        </View>

        {loading ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        ) : (
          <FlatList
            data={languagesData}
            renderItem={renderLanguageItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.flatListContainer}
          />
        )}

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
  flatListContainer: {
    paddingHorizontal: 10,
    marginTop: 20,
  },
  languageItem: {
    width: 150,
    padding: 10,
    borderRadius: 12,
    backgroundColor: "#f4f4f4",
    marginRight: 10,
    alignItems: "center",
  },
  languageName: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#333",
    marginTop: 10,
    marginBottom: 12,
  },
  icon: {
    width: 100,
    height: 100,
    borderRadius: 8,
    resizeMode: "cover",
  },
  deleteButton: {
    backgroundColor: "#f44336",
    paddingHorizontal: 20,
    paddingVertical: 6,
    borderRadius: 8,
    marginTop: 8,
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
  deleteText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
