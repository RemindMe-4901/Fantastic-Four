import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import {auth, db} from "./firebase.js";

export async function createUserAccount(email, password){
    return await createUserWithEmailAndPassword(auth, email, password);

    await setDoc(doc(db, "users", result.user.uid), {
        email: email.toLowerCase(),
        createdAt: new Date().toISOString()
    });

    return result;
}
