import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import React, { useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { auth } from "../firebase.config";
import { useTheme } from "../context/themeContext";

const SignUp = ({ navigation }) => {
  const { handleDismissKeyboard } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const handleInputChange = (setter) => (value) => {
    setter(value);
    if (error) {
      setError(null);
    }
  };

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        sendEmailVerification(user)
          .then(() => {
            Alert.alert("Verify the email in your inbox");
            setEmailSent(true);
          })
          .catch((error) => {
            setError("Email not verified", error);
          });
        setEmail("");
        setPassword("");
      })
      .catch((error) => {
        const errorMsg = error.message;
        setError(errorMsg); // Set error message from Firebase
      });
  };

  return (
    <TouchableWithoutFeedback onPress={handleDismissKeyboard}>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to Sign Up Page</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your Email"
          onChangeText={handleInputChange(setEmail)}
          keyboardType="email-address"
          value={email}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter your Password"
          onChangeText={setPassword}
          secureTextEntry
          value={password}
        />
        {error ? <Text style={styles.error}>{error}</Text> : null}
        {!emailSent && (
          <TouchableOpacity style={styles.button} onPress={handleSignUp}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        )}
        {emailSent && (
          <Text>Your email has been sent, please check your inbox</Text>
        )}
        <View style={styles.footer}>
          <Text>Already have an account? </Text>
          <TouchableOpacity>
            <Text
              style={styles.link}
              onPress={() => navigation.navigate("Login")}
            >
              Login
            </Text>
          </TouchableOpacity>
        </View>

        {/* Home Button */}
        <TouchableOpacity
          style={styles.homeButton}
          onPress={() => navigation.navigate("Main")}
        >
          <Text style={styles.homeButtonText}>Go to Home</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f7f7f7",
    width: "100%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#007bff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  error: {
    color: "red",
    marginBottom: 15,
  },
  footer: {
    marginTop: 20,
    flexDirection: "row",
  },
  link: {
    color: "#007bff",
  },
  homeButton: {
    marginTop: 20,
    width: "100%",
    height: 50,
    backgroundColor: "#28a745", // Green color
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  homeButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
