import React, { createContext, useContext, useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserContextProvider = ({ children }) => {
  const [admin, setAdmin] = useState(false);
  const [user, setUser] = useState(null);
  const auth = getAuth();

  // Check if user email is admin
  const validateCredentials = async (email) => {
    if (email === "armaan.js02@gmail.com") {
      setAdmin(true);
      await AsyncStorage.setItem("isAdmin", "true");
    } else {
      setAdmin(false);
      await AsyncStorage.setItem("isAdmin", "false");
    }
  };

  // Monitor Firebase Authentication State
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        await AsyncStorage.setItem("userEmail", currentUser.email);
        validateCredentials(currentUser.email);
      } else {
        setUser(null);
        setAdmin(false);
        await AsyncStorage.removeItem("userEmail");
        await AsyncStorage.removeItem("isAdmin");
      }
    });
    return unsubscribe;
  }, [auth]);

  // Retrieve Session on App Load
  useEffect(() => {
    const retrieveSession = async () => {
      const storedEmail = await AsyncStorage.getItem("userEmail");
      const isAdmin = await AsyncStorage.getItem("isAdmin");

      if (storedEmail) {
        setUser({ email: storedEmail });
        setAdmin(isAdmin === "true");
      }
    };
    retrieveSession();
  }, []);

  return (
    <UserContext.Provider value={{ user, admin, validateCredentials }}>
      {children}
    </UserContext.Provider>
  );
};
