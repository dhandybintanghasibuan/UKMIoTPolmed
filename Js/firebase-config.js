// firebase-config.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "ukm-iot-polmed.firebaseapp.com",
  projectId: "ukm-iot-polmed",
  storageBucket: "ukm-iot-polmed.appspot.com",
  messagingSenderId: "XXXXXX",
  appId: "XXXXXX"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
