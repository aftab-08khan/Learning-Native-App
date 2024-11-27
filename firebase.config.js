// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAMV3MGeELE0ZsEtqB0lw5HtzNIf2TtwmA",
  authDomain: "auth-firebase-ab91a.firebaseapp.com",
  projectId: "auth-firebase-ab91a",
  storageBucket: "auth-firebase-ab91a.firebasestorage.app",
  messagingSenderId: "250913757056",
  appId: "1:250913757056:web:f65b7b8a50ae4a975a5365",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
