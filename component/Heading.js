import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Heading = ({ children, textColor }) => {
  return (
    <View>
      <Text style={[styles.Text, { color: textColor ? textColor : "#000" }]}>
        {children}
      </Text>
    </View>
  );
};
export default Heading;
const styles = StyleSheet.create({
  Text: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
