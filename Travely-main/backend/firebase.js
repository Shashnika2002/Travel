const { initializeApp } = require("firebase/app");
const { getAuth } = require("firebase/auth");
const { getFirestore } = require("@firebase/firestore");

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDzdc6B_R5qfZ0sxsphZVYsx3wbIzqBJwQ",
  authDomain: "fir-final-project-9a40c.firebaseapp.com",
  databaseURL: "https://fir-final-project-9a40c-default-rtdb.firebaseio.com",
  projectId: "fir-final-project-9a40c",
  storageBucket: "fir-final-project-9a40c.appspot.com",
  messagingSenderId: "980757971098",
  appId: "1:980757971098:web:0da87ecab4ab961d98df23",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app);

// Initialize Firestore Database
const db = getFirestore(app);

// Export the initialized services
module.exports = { app, auth, db };
