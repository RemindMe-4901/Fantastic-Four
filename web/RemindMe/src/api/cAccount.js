import { createUserWithEmailAndPassword } from "firebase/auth";
import {auth} from "./firebase.js";

export async function createUserAccount(email, password){
    return await createUserWithEmailAndPassword(auth, email, password);
}