<script setup>
import { ref, onMounted } from "vue";
import { addTask, getTasks, updateTask, deleteTask } from "../tasks.js";
import Spotify from "./Spotify.vue";

const tasks = ref([]);
const newTask = ref([]);

async function loadTasks() {
  try {
    tasks.value = await getTasks();
  } catch (error) {
    console.error("Error loading tasks:", error);
  }
}

async function createTask() {
  if (!newTask.value.trim()) return;

  try {
    await addTask({
      name: newTask.value,
    });

    newTask.value = "";
    await loadTasks();
    alert("Task added successfully!");
  } catch (error) {
    console.error("Error creating task:", error);
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

    <input
      v-model="newTask"
      type="text"
      placeholder="Enter a task"
    />

    <button @click="createTask">
      Add Task
    </button>

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
