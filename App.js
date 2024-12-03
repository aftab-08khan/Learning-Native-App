import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Main from "./screens/main";
import SignUp from "./screens/signUp";
import Login from "./screens/Login";
import Home from "./screens/Home";
import { ThemeContext } from "./context/themeContext";

export default function App() {
  const Stack = createStackNavigator();

  return (
    <ThemeContext>
      <StatusBar style="auto" />
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Main">
              <Stack.Screen
                name="Main"
                component={Main}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="SignUp"
                component={SignUp}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Login"
                component={Login}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Home"
                component={Home}
                options={{ headerShown: false }}
              />
            </Stack.Navigator>
          </NavigationContainer>
          <StatusBar style="auto" />
        </View>
      </SafeAreaView>
    </ThemeContext>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Takes up the entire screen height
    backgroundColor: "#fff",
    width: "100%", // Takes up the full width of the screen
  },
});
