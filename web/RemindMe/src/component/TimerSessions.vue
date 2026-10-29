<script setup>
import { ref, onMounted } from "vue";
import {
  addTimerSession,
  getTimerSessions,
  updateTimerSession,
  deleteTimerSession
} from "../timerSessions.js";

const sessions = ref([]);
const duration = ref("");

async function loadSessions() {
  sessions.value = await getTimerSessions();
}

async function createSession() {
  if (!duration.value) return;

  await addTimerSession({
    duration: Number(duration.value),
    completed: false
  });

  duration.value = "";
  await loadSessions();

  alert("Timer session added successfully!");
}

async function markComplete(sessionId) {
  await updateTimerSession(sessionId, {
    completed: true
  });

  await loadSessions();
}

async function removeSession(sessionId) {
  await deleteTimerSession(sessionId);
  await loadSessions();

  alert("Timer session removed successfully!");
}

onMounted(() => {
  loadSessions();
});
</script>

<template>
  <div>
    <h1>Timer Sessions</h1>

    <input
      v-model="duration"
      type="number"
      placeholder="Duration in minutes"
    />

    <button @click="createSession">
      Add Session
    </button>

    <ul>
      <li v-for="session in sessions" :key="session.id">
        {{ session.duration }} minutes -
        {{ session.completed ? "Completed" : "Not Completed" }}

        <button @click="markComplete(session.id)">
          Complete
        </button>

        <button @click="removeSession(session.id)">
          Delete
        </button>
      </li>
    </ul>
  </div>
</template>