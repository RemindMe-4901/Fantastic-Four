<script setup>
import { ref, onMounted } from "vue";
import { getTasks, updateTask, deleteTask } from "../tasks.js";

const tasks = ref([]);

async function loadTasks() {
  try {
    tasks.value = await getTasks();
  } catch (error) {
    console.error("Error loading tasks:", error);
  }
}

async function markComplete(taskId) {
  try {
    await updateTask(taskId, { completed: true });
    await loadTasks();
  } catch (error) {
    console.error("Error updating task:", error);
  }
}

async function removeTask(taskId) {
  try {
    await deleteTask(taskId);
    await loadTasks();
  } catch (error) {
    console.error("Error deleting task:", error);
  }
}

onMounted(() => {
  loadTasks();
});
</script>

<template>
  <div>
    <h1>Tasks</h1>

    <ul>
      <li v-for="task in tasks" :key="task.id">
        {{ task.title }} -
        {{ task.completed ? "Completed" : "Pending" }}

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