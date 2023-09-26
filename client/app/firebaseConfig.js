// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import "firebase/auth";
import { getAuth, GoogleAuthProvider } from "firebase/auth"; // Assurez-vous que le module "firebase/auth" est bien importé ici


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebase = {
  apiKey: "AIzaSyCoHmZNMzPbh7iT0He5iZHIeggkpgrnRUk",
  authDomain: "e-commerce-59f87.firebaseapp.com",
  projectId: "e-commerce-59f87",
  storageBucket: "e-commerce-59f87.appspot.com",
  messagingSenderId: "1096061572951",
  appId: "1:1096061572951:web:29efd1e0a25b8e4d9e5012",
  measurementId: "G-CZX9SH0Q3S"
};

// Initialize Firebase
const app = initializeApp(firebase);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export default firebase;