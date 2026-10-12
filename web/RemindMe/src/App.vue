<script setup>
import { ref, onMounted } from "vue";
import { getTasks, updateTask, deleteTask } from "./tasks.js";

const tasks = ref([]);

async function loadTasks() {
  tasks.value = await getTasks();
}

async function markComplete(taskId) {
  await updateTask(taskId, { completed: true });
  await loadTasks();
}

async function removeTask(taskId) {
  await deleteTask(taskId);
  await loadTasks();
}

onMounted(() => {
  loadTasks();
});
</script>

<template>
  <div>
    <h1>Firestore Tasks</h1>

    <ul>
      <li v-for="task in tasks" :key="task.id">
        {{ task.title }} - {{ task.completed ? "Completed" : "Pending" }}

        <button @click="markComplete(task.id)">
          Complete
        </button>

        <button @click="removeTask(task.id)">
          Delete
        </button>
      </li>
    </ul>
  </div>
</template>
