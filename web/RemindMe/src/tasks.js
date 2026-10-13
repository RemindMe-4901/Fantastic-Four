import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp
} from "firebase/firestore";

import { db } from "./firebase.js";

export async function addTask(taskData) {
  const docRef = await addDoc(collection(db, "tasks"), {
    ...taskData,
    createdAt: serverTimestamp()
  });

  return docRef.id;
}

export async function getTasks() {
  const querySnapshot = await getDocs(collection(db, "tasks"));

  return querySnapshot.docs.map((document) => ({
    id: document.id,
    ...document.data()
  }));
}

export async function updateTask(taskId, updatedData) {
  const taskRef = doc(db, "tasks", taskId);
  await updateDoc(taskRef, updatedData);
}

export async function deleteTask(taskId) {
  const taskRef = doc(db, "tasks", taskId);
  await deleteDoc(taskRef);
}