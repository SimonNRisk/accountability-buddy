// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBVxvTnUlcu-Tt1bzU2JdHSzbneDWcEtaM",
  authDomain: "accountability-buddy-305c1.firebaseapp.com",
  projectId: "accountability-buddy-305c1",
  storageBucket: "accountability-buddy-305c1.firebasestorage.app",
  messagingSenderId: "395132344421",
  appId: "1:395132344421:web:6fa15ab6baec1d37dece8c",
  measurementId: "G-RC9VWY4J71",
};

const SIMON_DOCUMENT_ID = "MEeyg4rN6yvmxjNEAmyH";

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//database
export const db = getFirestore(app);

// collection ref
export const colRef = collection(db, "users");

//get a single doc
export const docRef = doc(db, "users", SIMON_DOCUMENT_ID);
