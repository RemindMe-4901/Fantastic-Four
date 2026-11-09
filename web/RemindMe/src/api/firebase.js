import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
  const firebaseConfig = {
  apiKey: "AIzaSyCu4OkRNsMuBA8Mfw2rSa2XKSwPCyb5tXE",
  authDomain: "remindme-c8e1c.firebaseapp.com",
  projectId: "remindme-c8e1c",
  storageBucket: "remindme-c8e1c.firebasestorage.app",
  messagingSenderId: "518858829886",
  appId: "1:518858829886:web:721d04ee7bf788f3d6a16f",
  measurementId: "G-42GHDCJ0LZ"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);