import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth } from "./firebase.js";

export async function loginUser(email, password) {
  return await signInWithEmailAndPassword(auth, email, password);
}

export async function sendResetEmail(email) {
  return await sendPasswordResetEmail(auth, email);
}

export async function emailHasAccount(email) {
  const q = query(
    collection(db, "users"),
    where("email", "==", email.toLowerCase())
  );
  const snapshot = await getDocs(q);
  return !snapshot.empty;
}
