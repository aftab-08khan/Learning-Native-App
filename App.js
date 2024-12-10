import React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Main from "./screens/main";
import SignUp from "./screens/signUp";
import Login from "./screens/Login";
import Home from "./screens/Home";
import { ThemeProvider } from "./context/themeContext";
import { UserContextProvider } from "./context/UserContext";
import LanguageProfile from "./screens/LanguageProfile";
import { LinearGradient } from "expo-linear-gradient";
import QuestionsAnswer from "./screens/QuestionsAnswer";

export default function App() {
  const Stack = createStackNavigator();

  return (
    <UserContextProvider>
      <ThemeProvider>
        <View style={{ flex: 1 }}>
          {/* <SafeAreaView style={styles.container}> */}
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
          <StatusBar style="auto" />
          {/* </SafeAreaView> */}
        </View>
      </ThemeProvider>
    </UserContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
});
