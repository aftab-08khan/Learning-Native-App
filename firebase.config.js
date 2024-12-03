import { initializeApp } from "firebase/app";
import {
  initializeAuth,
  getAuth,
  getReactNativePersistence,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAMV3MGeELE0ZsEtqB0lw5HtzNIf2TtwmA",
  authDomain: "auth-firebase-ab91a.firebaseapp.com",
  projectId: "auth-firebase-ab91a",
  storageBucket: "auth-firebase-ab91a.firebasestorage.app",
  messagingSenderId: "250913757056",
  appId: "1:250913757056:web:f65b7b8a50ae4a975a5365",
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getFirestore(app);
