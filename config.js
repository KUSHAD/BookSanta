import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyDmNBXt71HU3fyR1o21uWolQS3sJ72KDJo",
  authDomain: "book-santa-whjr.firebaseapp.com",
  projectId: "book-santa-whjr",
  storageBucket: "book-santa-whjr.appspot.com",
  messagingSenderId: "1094917670587",
  appId: "1:1094917670587:web:cd420a045dfb913c4f4b9e",
};
firebase.initializeApp(firebaseConfig);
export const firebaseAuth = firebase.auth();
export const firebaseFirestore = firebase.firestore();
export const time = firebase.firestore.Timestamp;
export const firebaseStorage = firebase.storage();
