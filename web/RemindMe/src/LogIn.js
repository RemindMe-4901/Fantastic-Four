import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase.js";

export async function loginUser(email, password) {
  return await signInWithEmailAndPassword(auth, email, password);
}
