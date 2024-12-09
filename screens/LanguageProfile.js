import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import ProfileItemContainer from "../component/ProfileItemContainer";
import Heading from "../component/Heading";
import { useTheme } from "../context/themeContext";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase.config";
import UploadImageComponent from "../component/UploadImage";
const LanguageProfile = () => {
  const route = useRoute();
  const { mode } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [title, setTitle] = useState("");
  const [imageUri, setImageUri] = useState(null);
  const navigation = useNavigation();
  const { languageName } = route.params;

  const questionsData = [
    {
      title: "Create Theory Questions",
      viewLink: "",
    },
    {
      title: "Create Coding Questions",
      viewLink: "",
    },
    {
      title: "Create Console Log Questions",
      viewLink: "",
    },
  ];

  const handleModalClose = (val, title) => {
    console.log(title === "Create Console Log Questions");

    setIsVisible(val);
    setTitle(title);
    setAnswer("");
    setQuestion("");
  };

  const handleSubmit = async () => {
    if (!answer || !question) {
      Alert.alert("Validation Error", "Please enter all fields.");
      return;
    }
    try {
      let collectionName = "";

      if (title === "Create Theory Questions") {
        collectionName = "CreateTheoryQuestions";
      } else if (title === "Create Coding Questions") {
        collectionName = "CreateCodingQuestions";
      } else if (title === "Create Console Log Questions") {
        collectionName = "CreateConsoleLogQuestions";
      }

      if (collectionName) {
        await addDoc(collection(db, collectionName), {
          question: question.trim(),
          answer: answer.trim(),
          createdAt: new Date(),
        });
        Alert.alert("Success", "Your question has been added successfully!");
        setIsVisible(false);
        setAnswer("");
        setQuestion("");
      } else {
        throw new Error("Invalid question type.");
      }
    } catch (error) {
      Alert.alert("Error", error.message || "An error occurred.");
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#292f3d" }}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{languageName}</Text>
      </View>

      <View style={styles.content}>
        {questionsData.map((item) => {
          return (
            <ProfileItemContainer
              onPress={handleModalClose}
              key={item.title}
              title={item.title}
              viewLink={item.viewLink}
            />
          );
        })}

        <Modal
          visible={isVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setIsVisible(false)}
        >
          <KeyboardAvoidingView
            style={styles.modalBackdrop}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <View style={styles.modalContent}>
              <Text style={styles.modalHeading}>Enter Question and Answer</Text>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Please Enter a Question:</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter Question"
                  placeholderTextColor="#c1c1c1"
                  value={question}
                  onChangeText={(text) => setQuestion(text)}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Please Enter an Answer:</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter Answer"
                  placeholderTextColor="#c1c1c1"
                  value={answer}
                  onChangeText={(text) => setAnswer(text)}
                />
              </View>
              {"Create Coding Questions" ||
                ("Create Console Log Questions" && (
                  <UploadImageComponent
                    setImageUri={setImageUri}
                    imageUri={imageUri}
                  />
                ))}

              <TouchableOpacity
                style={styles.submitButton}
                onPress={handleSubmit}
              >
                <Text style={styles.submitButtonText}>Submit</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setIsVisible(false)}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </Modal>
      </View>
    </View>
  );
};

export default LanguageProfile;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 12,
    borderRadius: 32,
  },
  headerTitle: {
    flex: 1,
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  content: {
    justifyContent: "center",
    alignItems: "center",
    gap: 60,
    marginTop: 20,
  },
  modalBackdrop: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  modalContent: {
    width: "85%",
    backgroundColor: "#414652",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  modalHeading: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#e7e8e9",
    marginBottom: 28,
    textAlign: "center",
  },
  inputContainer: {
    width: "100%",
    marginBottom: 20,
  },
  inputLabel: {
    color: "#e7e8e9",
    marginBottom: 12,
    fontSize: 14,
    fontWeight: "600",
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#e7e8e9",
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    color: "#e7e8e9",
    backgroundColor: "#2c2f36",
    fontSize: 14,
  },
  submitButton: {
    width: "100%",
    backgroundColor: "#5A9BFC",
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  submitButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  closeButton: {
    width: "100%",
    backgroundColor: "#FC5A5A",
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  closeButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
