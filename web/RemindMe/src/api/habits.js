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

const habitsRef = collection(db, "habits");

export async function addHabit(habitData) {
  const docRef = await addDoc(habitsRef, {
    ...habitData,
    completedToday: false,
    streak: 0,
    createdAt: serverTimestamp()
  });

  return docRef.id;
}

export async function getHabits() {
  const snapshot = await getDocs(habitsRef);

  return snapshot.docs.map((habitDoc) => ({
    id: habitDoc.id,
    ...habitDoc.data()
  }));
}

export async function updateHabit(habitId, updatedData) {
  const habitRef = doc(db, "habits", habitId);
  await updateDoc(habitRef, updatedData);
}

export async function deleteHabit(habitId) {
  const habitRef = doc(db, "habits", habitId);
  await deleteDoc(habitRef);
}