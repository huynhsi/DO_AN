// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getDatabase} from "firebase/database";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCL0vICuMmCECiS3VKQdFkEhHrqA9Nndns",
  authDomain: "shose-shope.firebaseapp.com",
  projectId: "shose-shope",
  storageBucket: "shose-shope.appspot.com",
  messagingSenderId: "447336252407",
  appId: "1:447336252407:web:c93ff9f556a69b521664f2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);