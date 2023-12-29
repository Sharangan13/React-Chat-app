// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAFxBu1TWqu3dF9FluH2YcWKuzgmlMk9ps",
  authDomain: "chatapp-287d1.firebaseapp.com",
  projectId: "chatapp-287d1",
  storageBucket: "chatapp-287d1.appspot.com",
  messagingSenderId: "288422610480",
  appId: "1:288422610480:web:631f789761088320028ff5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();