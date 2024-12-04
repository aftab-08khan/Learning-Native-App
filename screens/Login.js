import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import React, { useEffect, useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import { auth } from "../firebase.config";
import { useUser } from "../context/UserContext";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { validateCredentials } = useUser();

  const handleInputChange = (setter) => (value) => {
    setter(value);
    if (error) {
      setError(null);
    }
  };

  const handleLogin = () => {
    setError(null);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        if (user.emailVerified) {
          navigation.navigate("Home");
        } else {
          Alert.alert("Invalid Credentials Try Again");
        }
      })
      .catch((error) => {
        console.error("Login Error: ", error.message); // Debug log
        setError(error.message);
      });
  };
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        validateCredentials(user.email);
      }
    });
    return unsubscribe;
  }, []);
  const handleDismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={handleDismissKeyboard}>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.homeButton}
          onPress={() => navigation.navigate("Main")}
        >
          <Text style={styles.homeButtonText}>Go to Home</Text>
        </TouchableOpacity>
        <Image
          source={{
            uri: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
          }}
          style={styles.logo}
        />
        <Text style={styles.title}>Welcome Back!</Text>
        <Text style={styles.subtitle}>Login to your account</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={handleInputChange(setEmail)}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          secureTextEntry
          autoCapitalize="none"
          onChangeText={handleInputChange(setPassword)}
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account?</Text>
          <TouchableOpacity>
            <Text
              style={styles.footerLink}
              onPress={() => navigation.navigate("SignUp")}
            >
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
    borderRadius: 50,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 30,
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 15,
    marginBottom: 15,
    backgroundColor: "#fff",
    fontSize: 16,
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#007bff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginBottom: 15,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  footer: {
    flexDirection: "row",
    marginTop: 20,
  },
  footerText: {
    color: "#666",
  },
  footerLink: {
    color: "#007bff",
    fontWeight: "bold",
    marginLeft: 5,
  },
  homeButton: {
    marginTop: 20,
    backgroundColor: "#28a745", // Green color
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    position: "absolute",
    top: 0,
    left: 30,
    padding: 12,
  },
  homeButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
});
