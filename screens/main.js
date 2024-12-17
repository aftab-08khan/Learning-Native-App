import React from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { useTheme } from "../context/themeContext";

const Main = ({ navigation }) => {
  const { mode } = useTheme();

  return (
    <View
      style={[
        styles.container,
        mode === false ? styles.darkMode : styles.lightMode,
      ]}
    >
      <Text
        style={[styles.title, { color: mode === true ? "#333" : "#e7e8e9" }]}
      >
        Welcome to the Learning App!
      </Text>
      <Text
        style={[styles.subtitle, { color: mode === true ? "#666" : "#c2c2c2" }]}
      >
        Please sign up or log in to get started.
      </Text>

      <TouchableOpacity
        style={[
          styles.button,
          { backgroundColor: mode === true ? "#007bff" : "#5a9bfc" },
        ]}
        onPress={() => navigation.navigate("SignUp")}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text
          style={[
            styles.footerText,
            { color: mode === true ? "#333" : "#e7e8e9" },
          ]}
        >
          Already have an account?
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("Login")}
          style={styles.linkButton}
        >
          <Text
            style={[
              styles.linkText,
              { color: mode === true ? "#007bff" : "#5a9bfc" },
            ]}
          >
            Log In
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Main;

const styles = StyleSheet.create({
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
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 30,
  },
  button: {
    width: "80%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: 3,
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  footer: {
    marginTop: 20,
    flexDirection: "row",
  },
  footerText: {
    fontSize: 14,
  },
  linkButton: {
    paddingLeft: 5,
  },
  linkText: {
    fontSize: 14,
    fontWeight: "bold",
  },
});
