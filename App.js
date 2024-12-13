import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, View, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Main from "./screens/main";
import SignUp from "./screens/signUp";
import Login from "./screens/Login";
import Home from "./screens/Home";
import { ThemeProvider } from "./context/themeContext";
import { UserContextProvider } from "./context/UserContext";
import LanguageProfile from "./screens/LanguageProfile";
import QuestionsAnswer from "./screens/QuestionsAnswer";
import LottieView from "lottie-react-native"; // Import the LottieView component

export default function App() {
  const Stack = createStackNavigator();

  // State to control loading animation
  const [loading, setLoading] = useState(true);

  // Simulate loading with a timeout (or replace with your actual loading logic)
  useEffect(() => {
    setTimeout(() => {
      setLoading(false); // After loading, navigate to the main screen
    }, 3000); // 3 seconds of loading animation
  }, []);

  return (
    <UserContextProvider>
      <ThemeProvider>
        <View style={{ flex: 1 }}>
          {loading ? (
            // Loader Screen with Lottie animation
            <View style={styles.loaderContainer}>
              <LottieView
                source={require("./assets/animation2.json")} // Specify your animation path here
                autoPlay
                loop
                style={styles.lottieStyle}
              />
              <Text style={styles.loadingText}>Loading...</Text>
            </View>
          ) : (
            // Main app content once loading is done
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
                <Stack.Screen
                  name="LanguageProfile"
                  component={LanguageProfile}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="QuestionAnswer"
                  component={QuestionsAnswer}
                  options={{ headerShown: false }}
                />
              </Stack.Navigator>
            </NavigationContainer>
          )}
          <StatusBar style="auto" />
        </View>
      </ThemeProvider>
    </UserContextProvider>
  );
}

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  lottieStyle: {
    width: 200,
    height: 200,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 18,
    color: "#007bff",
  },
});
