import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Heading from "./Heading";

const ProfileItemContainer = ({ title, viewLink, onPress }) => {
  return (
    <View style={styles.main}>
      <Heading textColor={"#e7e8e9"}>{title}</Heading>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.buttonAdd}
          onPress={() => onPress(true, title)}
        >
          <Text style={styles.buttonText}>Add Questions</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonView}>
          <Text style={styles.buttonText}>View Questions</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileItemContainer;

const styles = StyleSheet.create({
  main: {
    backgroundColor: "#414652",
    padding: 20,
    elevation: 6,
    shadowColor: "#999",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.7,
    shadowRadius: 12,
    borderRadius: 12,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    gap: 12,
  },
  buttonAdd: {
    backgroundColor: "#5a9bfc", // Light blue for Add button
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonView: {
    backgroundColor: "#fcb045", // Orange for View button
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
