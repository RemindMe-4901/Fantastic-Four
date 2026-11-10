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

const timerSessionsRef = collection(db, "timerSessions");

export async function addTimerSession(sessionData) {
  const docRef = await addDoc(timerSessionsRef, {
    ...sessionData,
    createdAt: serverTimestamp()
  });

  return docRef.id;
}

export async function getTimerSessions() {
  const snapshot = await getDocs(timerSessionsRef);

  return snapshot.docs.map((timerDoc) => ({
    id: timerDoc.id,
    ...timerDoc.data()
  }));
}

export async function updateTimerSession(sessionId, updatedData) {
  const sessionRef = doc(db, "timerSessions", sessionId);
  await updateDoc(sessionRef, updatedData);
}

export async function deleteTimerSession(sessionId) {
  const sessionRef = doc(db, "timerSessions", sessionId);
  await deleteDoc(sessionRef);
}