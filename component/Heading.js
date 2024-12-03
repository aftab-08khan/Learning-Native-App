import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Heading = ({ children }) => {
  return (
    <View>
      <Text style={styles.Text}>{children}</Text>
    </View>
  );
};
export default Heading;
const styles = StyleSheet.create({
  Text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
});
