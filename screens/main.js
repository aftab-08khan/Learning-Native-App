import React from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";

const Main = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the Firebase Auth App!</Text>
      <Text style={styles.subtitle}>
        Please sign up or log in to get started.
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("SignUp")}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Already have an account?</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("Login")}
          style={styles.linkButton}
        >
          <Text style={styles.linkText}>Log In</Text>
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
    backgroundColor: "#f7f7f7",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 30,
  },
  button: {
    width: "80%",
    height: 50,
    backgroundColor: "#007bff",
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
  footer: {
    marginTop: 20,
    flexDirection: "row",
  },
  footerText: {
    color: "#333",
    fontSize: 14,
  },
  linkButton: {
    paddingLeft: 5,
  },
  linkText: {
    color: "#007bff",
    fontSize: 14,
    fontWeight: "bold",
  },
});
