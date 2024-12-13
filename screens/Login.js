import React, { useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import { auth } from "../firebase.config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useTheme } from "../context/themeContext";
import { Ionicons } from "@expo/vector-icons";

const Login = ({ navigation }) => {
  const { mode } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleInputChange = (setter) => (value) => {
    setter(value);
    if (error) {
      setError(null);
    }
  };

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigation.navigate("Home"); // Redirect to Home page after successful login
      })
      .catch((error) => {
        const errorMsg = error.message;
        setError(errorMsg); // Set error message from Firebase
      });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView
        style={[
          styles.container,
          mode === false ? styles.darkMode : styles.lightMode,
        ]}
      >
        <View style={styles.container}>
          <TouchableOpacity
            style={[
              styles.backButton,
              { backgroundColor: mode ? "#e0e0e0" : "#4e535f" },
            ]}
            onPress={() => navigation.goBack()}
          >
            <Ionicons
              name="arrow-back"
              size={24}
              color={mode === true ? "#000" : "#fff"}
            />
          </TouchableOpacity>
          <View style={styles.form}>
            <Text style={[styles.title, { color: mode ? "#333" : "#e7e8e9" }]}>
              Login
            </Text>
            <TextInput
              placeholder="Email"
              placeholderTextColor={mode ? "#666" : "#c2c2c2"}
              style={[
                styles.input,
                {
                  backgroundColor: mode ? "#fff" : "#4e535f",
                  color: mode ? "#000" : "#fff",
                },
              ]}
              value={email}
              onChangeText={handleInputChange(setEmail)}
            />
            <TextInput
              placeholder="Password"
              placeholderTextColor={mode ? "#666" : "#c2c2c2"}
              secureTextEntry
              style={[
                styles.input,
                {
                  backgroundColor: mode ? "#fff" : "#4e535f",
                  color: mode ? "#000" : "#fff",
                },
              ]}
              value={password}
              onChangeText={handleInputChange(setPassword)}
            />
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <TouchableOpacity
              style={[
                styles.button,
                { backgroundColor: mode ? "#007bff" : "#5a9bfc" },
              ]}
              onPress={handleLogin}
            >
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <View style={styles.footer}>
              <Text
                style={[
                  styles.footerText,
                  { color: mode ? "#333" : "#e7e8e9" },
                ]}
              >
                Don't have an account?{" "}
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                <Text
                  style={[styles.link, { color: mode ? "#007bff" : "#5a9bfc" }]}
                >
                  Sign Up
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate("Main")}>
                <Text
                  style={[styles.link, { color: mode ? "#007bff" : "#5a9bfc" }]}
                >
                  / Home
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default Login;

const styles = StyleSheet.create({
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    padding: 10,
    borderRadius: 50,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    width: "100%",
  },
  lightMode: {
    backgroundColor: "#f7f7f7",
  },
  darkMode: {
    backgroundColor: "#292f3d",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    width: "100%",
    height: 50,
    marginBottom: 15,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  button: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  form: {
    width: "100%",
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderRadius: 10,
    backgroundColor: (mode) => (mode === true ? "#fff" : "#3e4450"),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  error: {
    color: "red",
    marginBottom: 15,
  },
  footer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
  },
  footerText: {
    fontSize: 16,
  },
  link: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
