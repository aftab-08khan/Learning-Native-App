import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  Alert,
  TouchableOpacity,
} from "react-native";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useTheme } from "../context/themeContext";
import Container from "../component/Container";
import { SafeAreaView } from "react-native";
// import InterviewQsContainer from "../component/InterviewQsContainer";
const Home = ({ navigation }) => {
  const [userEmail, setUserEmail] = useState(null);
  const { mode, handleMode } = useTheme();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email);
      } else {
        setUserEmail(null);
      }
    });
    return unsubscribe;
  }, []);

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        navigation.navigate("Login");
      })
      .catch((error) => Alert.alert("Error", error.message));
  };

  return (
    <SafeAreaView
      style={[
        { flex: 1 },
        mode === false ? styles.darkContainer : styles.lightContainer,
      ]}
    >
      <View style={styles.container}>
        <View style={[styles.header]}>
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
            }}
            style={styles.profileImage}
          />
          <View style={styles.welcomeContainer}>
            <Text style={[styles.greetingText]}>Welcome</Text>
            <Text
              style={[
                styles.welcomeText,
                // mode === false ? styles.lightText : styles.darkText,
              ]}
            >
              {userEmail ? userEmail : "Guest"}
            </Text>
          </View>
          <TouchableOpacity
            style={[
              styles.themeToggleButton,
              mode === false
                ? styles.darkToggleButton
                : styles.lightToggleButton,
            ]}
            onPress={handleMode}
          >
            <Text style={styles.toggleButtonText}>
              {mode === false ? "Light Mode" : "Dark Mode"}
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[
            styles.logoutButton,
            mode === false ? styles.darkButton : styles.lightButton,
          ]}
          onPress={handleLogout}
        >
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
        {/* <InterviewQsContainer /> */}
        <Container navigation={navigation} />
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 20,
  },
  lightContainer: {
    backgroundColor: "#fff",
  },
  darkContainer: {
    backgroundColor: "#292f3d",
  },
  header: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  welcomeContainer: {
    flex: 1,
    marginLeft: 15,
  },
  greetingText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  welcomeText: {
    fontSize: 16,
    fontWeight: "500",
    marginTop: 5,
    color: "#000",
  },
  lightText: {
    color: "#333",
  },
  darkText: {
    color: "#fff",
  },
  themeToggleButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  lightToggleButton: {
    backgroundColor: "#007bff",
  },
  darkToggleButton: {
    backgroundColor: "#444",
  },
  toggleButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  logoutButton: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginTop: 30,
    marginBottom: 50,
  },
  lightButton: {
    backgroundColor: "#d9534f",
  },
  darkButton: {
    backgroundColor: "#c9302c",
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
