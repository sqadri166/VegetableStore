// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC003o0JOmXnWcEw_Z_esi-ZYg9Gy9BcfI",
  authDomain: "bluerolesclaims.firebaseapp.com",
  databaseURL: "https://bluerolesclaims.firebaseio.com",
  projectId: "bluerolesclaims",
  storageBucket: "bluerolesclaims.appspot.com",
  messagingSenderId: "875435668394",
  appId: "1:875435668394:web:ea6596dbfcefad524cb1d3",
  measurementId: "G-6Z0PC2HWY0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);


