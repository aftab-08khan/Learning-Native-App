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
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../context/themeContext";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase.config";
import { Ionicons } from "@expo/vector-icons";
const QuestionsAnswer = () => {
  const navigation = useNavigation();
  const { title } = useTheme();
  const [questionAnswerData, setQuestionAnswerData] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchQuestionAnswer = async () => {
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
        console.log("Fetching from collection:", collectionName);

        // Fetch the main collection
        const mainCollectionSnapshot = await getDocs(
          collection(db, collectionName)
        );
        console.log(
          "Main Collection Snapshot Size:",
          mainCollectionSnapshot.size
        );

        if (!mainCollectionSnapshot.empty) {
          const allQuestions = [];

          // Iterate through each document in the main collection
          for (const doc of mainCollectionSnapshot.docs) {
            console.log(`Fetching subcollection for document ID: ${doc.id}`);

            // Fetch the subcollection for the current document
            const subCollectionRef = collection(
              db,
              collectionName,
              doc.id,
              "QuestionsAndAnswers"
            );
            const subCollectionSnapshot = await getDocs(subCollectionRef);

            // Map the data from the subcollection
            const subCollectionData = subCollectionSnapshot.docs.map(
              (subDoc) => ({
                id: subDoc.id,
                ...subDoc.data(),
              })
            );

            // Add the fetched questions to the main array
            allQuestions.push(...subCollectionData);
          }

          console.log("Fetched Data:", allQuestions); // Log the fetched data
          setQuestionAnswerData(allQuestions); // Update state with fetched data
        } else {
          console.log("No documents found in the collection:", collectionName);
          Alert.alert(
            "No Data",
            "No questions found in the selected collection."
          );
        }
      } else {
        throw new Error("Invalid collection name. Please check the title.");
      }
    } catch (error) {
      console.error("Error fetching data:", error); // Log the error
      Alert.alert(
        "Error",
        `An error occurred while fetching data: ${error.message}`
      );
    } finally {
      setLoading(false); // Update loading state
    }
  };

  const copyToClipboard = (text) => {
    Clipboard.setString(text);
    Alert.alert("Copied!", "Answer copied to clipboard.");
  };

  useEffect(() => {
    fetchQuestionAnswer();
  }, []); // Only run once when the component mounts

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#007BFF" />
        <Text>Loading Questions...</Text>
      </SafeAreaView>
    );
  }

  if (questionAnswerData.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>No questions available.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={[styles.headerTitle]}>{title}</Text>
      </View>

      <View style={styles.cards}>
        <FlatList
          data={questionAnswerData}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <View style={styles.card}>
              <Text style={styles.question}>Question {index + 1}</Text>
              <Text style={styles.question}>{item.question}?</Text>
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
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
    backgroundColor: "#343842",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    borderRadius: 4,
  },
  answer: {
    fontSize: 14,
    color: "#fff",
    flex: 1,
  },
  cards: {
    paddingHorizontal: 20,
    marginTop: 12,
  },
});

export default QuestionsAnswer;
