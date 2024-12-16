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
import LottieView from "lottie-react-native";

export default function App() {
  const Stack = createStackNavigator();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, []);

  return (
    <UserContextProvider>
      <ThemeProvider>
        <View style={{ flex: 1 }}>
          {loading ? (
            <View style={styles.loaderContainer}>
              <LottieView
                source={require("./assets/animation2.json")}
                autoPlay
                loop
                style={styles.lottieStyle}
              />
              <Text style={styles.loadingText}>Loading...</Text>
            </View>
          ) : (
            <NavigationContainer>
              <Stack.Navigator initialRouteName="Home">
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
    backgroundColor: "#292f3d",
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
