import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDDEYUqi3oNydhq4bASkkT53NdDgbORKvQ",
  authDomain: "se-project-1fd94.firebaseapp.com",
  projectId: "se-project-1fd94",
  storageBucket: "se-project-1fd94.appspot.com",
  messagingSenderId: "253955922062",
  appId: "1:253955922062:web:d406f5e9c0a5db2527d1df",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export default getFirestore(app);
