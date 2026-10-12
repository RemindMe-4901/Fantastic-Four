import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase.js";

const login = document.getElementById("LogIn");
const message = document.getElementById("message");

login.addEventListener("submit", async function(event) {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  message.textContent = "Logging in...";

  try {
    await signInWithEmailAndPassword(auth, email, password);
    message.textContent = "Login successful!";
  } catch (error) {
    message.textContent = "Login failed: " + error.message;
  }
});
