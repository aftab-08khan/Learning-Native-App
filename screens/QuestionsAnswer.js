import React, { useEffect, useState } from "react";
import {
  Alert,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Clipboard,
  ActivityIndicator,
  Modal,
  KeyboardAvoidingView,
  Platform,
  TextInput,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useTheme } from "../context/themeContext";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "../firebase.config";
import { Ionicons } from "@expo/vector-icons";
import UploadImageComponent from "../component/UploadImage";
import { useUser } from "../context/UserContext";
const QuestionsAnswer = () => {
  const route = useRoute();
  const { languageName } = route.params;
  const [isVisible, setIsVisible] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState("");
  const [editingAnswer, setEditingAnswer] = useState("");
  const navigation = useNavigation();
  const { admin } = useUser();
  const { title, mode, setImageUri, imageUri } = useTheme();
  const [questionAnswerData, setQuestionAnswerData] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchQuestionAnswer = async () => {
    try {
      const collectionNameMap = {
        "Create Theory Questions": "CreateTheoryQuestions",
        "Create Coding Questions": "CreateCodingQuestions",
        "Create Console Log Questions": "CreateConsoleLogQuestions",
      };

      const collectionName = collectionNameMap[title];
      if (!collectionName) {
        throw new Error("Invalid collection name. Please check the title.");
      }

      const mainCollectionSnapshot = await getDocs(
        collection(db, "languages", languageName, collectionName)
      );

      const allQuestions = [];
      for (const doc of mainCollectionSnapshot.docs) {
        allQuestions.push({ id: doc.id, ...doc.data() });
      }

      setQuestionAnswerData(allQuestions);
    } catch (error) {
      Alert.alert(
        "Error",
        `An error occurred while fetching data: ${error.message}`
      );
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text) => {
    Clipboard.setString(text);
    Alert.alert("Copied!", "Answer copied to clipboard.");
  };
  const handleEditmModalOpen = (value, data) => {
    setEditingAnswer(data.answer);
    setEditingQuestion(data.question);
    setIsVisible(value);
  };
  const handleModalClose = () => {
    setIsVisible(false);
  };

  useEffect(() => {
    fetchQuestionAnswer();
  }, []); // Only run once when the component mounts
  const handleEditFormSubmit = () => {};

  const confirmDelete = (id) => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this item? This action cannot be undone.",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Delete canceled"),
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => handleDelete(id),
          style: "destructive", // Makes the button visually stand out (red on iOS)
        },
      ]
    );
  };

  const handleDelete = async (id) => {
    console.log(id, "id");

    try {
      const subCollectionNameMap = {
        "Create Theory Questions": "CreateTheoryQuestions",
        "Create Coding Questions": "CreateCodingQuestions",
        "Create Console Log Questions": "CreateConsoleLogQuestions",
      };
      const subCollectionName = subCollectionNameMap[title];

      await deleteDoc(
        doc(db, "languages", languageName, subCollectionName, id)
      );
      setQuestionAnswerData((prev) => prev.filter((item) => item.id !== id));
      Alert.alert("Success", "Language deleted successfully!");
    } catch (error) {
      Alert.alert("Error", error.message || "Failed to delete language.");
    }
  };

  if (loading) {
    return (
      <SafeAreaView
        style={[
          styles.loaderContainer,
          mode === false ? styles.darkContainer : styles.lightContainer,
        ]}
      >
        <View style={styles.loaderContainer}>
          <ActivityIndicator
            size="large"
            color="#007BFF"
            style={styles.loader}
          />
          <Text
            style={[
              styles.headerTitle,
              mode === false ? styles.darkText : styles.lightText,
            ]}
          >
            Loading Questions...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  if (questionAnswerData.length === 0) {
    return (
      <SafeAreaView
        style={[
          styles.container,
          mode === false ? styles.darkContainer : styles.lightContainer,
        ]}
      >
        <Text
          style={[
            styles.headerTitle,
            mode === false ? styles.darkText : styles.lightText,
          ]}
        >
          No questions available.
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={[
        styles.container,
        mode === false ? styles.darkContainer : styles.lightContainer,
      ]}
    >
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text
          style={[
            styles.headerTitle,
            mode === false ? styles.darkText : styles.lightText,
          ]}
        >
          {title}
        </Text>
      </View>

      <View style={[styles.cards]}>
        <FlatList
          data={questionAnswerData}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <View
              style={[styles.card, mode === false ? styles.dark : styles.light]}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={[
                    styles.question,
                    mode === false ? styles.darkText : styles.lightText,
                  ]}
                >
                  Question {index + 1}
                </Text>
                {admin === true ? (
                  <View style={{ flexDirection: "row", gap: 12 }}>
                    <TouchableOpacity
                      onPress={() => handleEditmModalOpen(true, item)}
                    >
                      <Ionicons name="create" size={20} color="green" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => confirmDelete(item.id)}>
                      <Ionicons name="trash-outline" size={20} color="red" />
                    </TouchableOpacity>
                  </View>
                ) : (
                  ""
                )}
              </View>
              <Text
                style={[
                  styles.question,
                  mode === false ? styles.darkText : styles.lightText,
                ]}
              >
                {item.question}?
              </Text>
              <View style={styles.answerContainer}>
                <Text style={styles.answer}>{item.answer}</Text>
                <TouchableOpacity onPress={() => copyToClipboard(item.answer)}>
                  <Ionicons name="copy" size={20} color="#007BFF" />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>
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
                value={editingQuestion}
                onChangeText={(text) => setEditingQuestion(text)}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Please Enter an Answer:</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Answer"
                placeholderTextColor="#c1c1c1"
                value={editingAnswer}
                onChangeText={(text) => setEditingAnswer(text)}
              />
            </View>
            {title === "Create Console Log Questions" ||
            title === "Create Coding Questions" ? (
              <UploadImageComponent
                setImageUri={setImageUri}
                imageUri={imageUri}
              />
            ) : null}

            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleEditFormSubmit}
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  lightText: {
    color: "#414652",
  },
  darkText: {
    color: "#fff",
  },
  container: {
    flex: 1,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  lightContainer: {
    backgroundColor: "#fff",
  },
  darkContainer: {
    backgroundColor: "#292f3d",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  loader: {
    marginBottom: 20, // Adds space between the loader and the text
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
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  card: {
    backgroundColor: "#FFF",
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    elevation: 2,
  },
  question: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  answerContainer: {
    backgroundColor: "#000",
    flexDirection: "row",
    justifyContent: "space-between",
    // alignItems: "center",

    padding: 12,
    borderRadius: 4,
    gap: 6,
  },
  answer: {
    fontSize: 14,
    color: "#fff",
    flex: 1,
    lineHeight: 20,
  },
  cards: {
    paddingHorizontal: 20,
    marginTop: 12,
    marginBottom: 80,
    overflow: "hidden",
  },
  light: {
    backgroundColor: "#eaeaec",
  },
  dark: {
    backgroundColor: "#3e4450",
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

export default QuestionsAnswer;
