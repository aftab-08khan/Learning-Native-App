import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Heading from "./Heading";
import { useTheme } from "../context/themeContext";
import { useUser } from "../context/UserContext";

const ProfileItemContainer = ({ title, viewLink, onPress, handleTitle }) => {
  const { mode } = useTheme();
  const { admin } = useUser();
  return (
    <View
      style={[styles.main, mode === false ? styles.darkMode : styles.lightMode]}
    >
      <Heading textColor={mode === true ? "#414652" : "#e7e8e9"}>
        {title}
      </Heading>
      <View style={styles.buttonContainer}>
        {admin === true ? (
          <TouchableOpacity
            style={styles.buttonAdd}
            onPress={() => onPress(true, title)}
          >
            <Text style={styles.buttonText}>Add Questions</Text>
          </TouchableOpacity>
        ) : (
          ""
        )}
        <TouchableOpacity
          style={[styles.buttonView, { width: admin === false ? "100%" : "" }]}
          onPress={() => handleTitle(title)}
        >
          <Text style={styles.buttonText}>View Questions</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileItemContainer;

const styles = StyleSheet.create({
  main: {
    padding: 20,
    elevation: 6,
    shadowColor: "#1d212b",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.7,
    shadowRadius: 12,
    borderRadius: 12,
    width: "100%",
  },
  lightMode: {
    backgroundColor: "#fff",
  },
  darkMode: {
    backgroundColor: "#3e4450",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    gap: 12,
    width: "100%",
  },
  buttonAdd: {
    backgroundColor: "#5a9bfc",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonView: {
    backgroundColor: "#fcb045",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
