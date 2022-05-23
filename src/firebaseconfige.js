// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use 
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCYUwkPofGdkFw2TjHh4X1x-XK6z5UQAXg",
  authDomain: "insta-connect-15e55.firebaseapp.com",
  projectId: "insta-connect-15e55",
  storageBucket: "insta-connect-15e55.appspot.com",
  messagingSenderId: "399048392481",
  appId: "1:399048392481:web:d66a7551ac7fb094658860",
  measurementId: "G-34GVXYCXE7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const analytics = getAnalytics(app);