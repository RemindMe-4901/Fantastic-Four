<script setup>
import { ref, onMounted, computed } from "vue";
import {
  addTask,
  getTasks,
  updateTask,
  deleteTask
} from "../tasks.js";

const tasks = ref([]);
const newTask = ref("");
const selectedTaskId = ref(null);

const activeTasks = computed(() =>
  tasks.value.filter(
    task => !task.completed && task.title && task.title.trim()
  )
);

const completedTasks = computed(() =>
  tasks.value.filter(
    task => task.completed && task.title && task.title.trim()
  )
);

async function loadTasks() {
  try {
    tasks.value = await getTasks();
  } catch (error) {
    console.error("Error loading tasks:", error);
  }
}

async function createTask() {
  if (!newTask.value.trim()) {
    alert("Please enter a task name.");
    return;
  }

  try {
    await addTask({
      title: newTask.value.trim(),
      completed: false
    });

    newTask.value = "";
    await loadTasks();
  } catch (error) {
    console.error("Error creating task:", error);
  }
}

async function markComplete(taskId) {
  try {
    await updateTask(taskId, {
      completed: true
    });

    selectedTaskId.value = null;
    await loadTasks();
  } catch (error) {
    console.error("Error updating task:", error);
  }
}

async function removeSelectedTask() {
  if (!selectedTaskId.value) {
    alert("Please select a task first.");
    return;
  }

  try {
    await deleteTask(selectedTaskId.value);
    selectedTaskId.value = null;
    await loadTasks();
  } catch (error) {
    console.error("Error deleting task:", error);
  }
}

function selectTask(taskId) {
  selectedTaskId.value =
    selectedTaskId.value === taskId ? null : taskId;
}

onMounted(() => {
  loadTasks();
});
</script>

<template>
  <div class="task-page">

    <!-- HEADER -->
    <header class="task-header">
      <div class="hamburger">
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div class="page-title">TASKS</div>

      <div class="profile-circle"></div>
    </header>

    <!-- MAIN AREA -->
    <main class="task-content">

      <!-- LEFT TASK LIST -->
      <section class="task-list-area">

        <div class="vertical-line"></div>

        <div class="task-lists">

          <!-- CURRENT TASKS -->
          <div
            v-for="task in activeTasks"
            :key="task.id"
            class="task-row active-task"
            :class="{ selected: selectedTaskId === task.id }"
            @click="selectTask(task.id)"
          >
            <span>{{ task.title }}</span>

            <button
              class="complete-small"
              @click.stop="markComplete(task.id)"
            >
              ✓
            </button>
          </div>

          <!-- COMPLETED TASKS -->
          <div class="completed-section">
            <div
              v-for="task in completedTasks"
              :key="task.id"
              class="task-row completed-task"
              :class="{ selected: selectedTaskId === task.id }"
              @click="selectTask(task.id)"
            >
              {{ task.title }}
            </div>
          </div>

        </div>
      </section>

      <!-- RIGHT CONTROLS -->
      <section class="task-controls">

        <form
          class="add-form"
          @submit.prevent="createTask"
        >
          <input
            v-model="newTask"
            class="task-input"
            type="text"
            placeholder="Task name"
          />

          <button
            class="action-button"
            type="submit"
          >
            Add task
          </button>
        </form>

        <button
          class="action-button remove-button"
          @click="removeSelectedTask"
        >
          Remove task
        </button>

      </section>

    </main>

  </div>
</template>

<style scoped>
* {
  box-sizing: border-box;
}

.task-page {
  width: 100%;
  max-width: none;
  min-height: calc(100vh - 60px);
  margin: 0;
  border: 2px solid #4a86e8;
  background: white;
  font-family: Arial, Helvetica, sans-serif;
}

/* HEADER */

.task-header {
  height: 82px;
  background: #4a86e8;
  display: flex;
  align-items: center;
  position: relative;
  padding: 0 16px;
}

.hamburger {
  width: 56px;
  display: flex;
  flex-direction: column;
  gap: 7px;
}

.hamburger span {
  width: 54px;
  height: 13px;
  background: white;
  border: 2px solid #333;
}

.page-title {
  color: white;
  font-size: 43px;
  font-weight: 400;
  margin-left: 20px;
}

.profile-circle {
  width: 72px;
  height: 72px;
  background: white;
  border: 2px solid #333;
  border-radius: 50%;
  margin-left: auto;
}

/* CONTENT */

.task-content {
  display: flex;
  min-height: calc(100vh - 142px);
  padding: 15px 30px 25px 35px;
}

.task-list-area {
  position: relative;
  width: 55%;
  min-height: calc(100vh - 170px);
}

.vertical-line {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 2px;
  width: 8px;
  background: #c6dafc;
}

.task-lists {
  height: 100%;
  margin-left: 22px;
  display: flex;
  flex-direction: column;
}

.task-row {
  width: 430px;
  min-height: 45px;
  margin-bottom: 5px;
  padding: 10px;
  font-size: 19px;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.active-task {
  background: #c8d8f3;
}

.active-task:hover {
  background: #b6caec;
}

.selected {
  outline: 3px solid #4a86e8;
}

.complete-small {
  margin-left: auto;
  border: none;
  background: transparent;
  font-size: 20px;
  cursor: pointer;
}

.completed-section {
  position: absolute;
  left: 22px;
  bottom: 10px;
}

.completed-task {
  background: #d9ead3;
}

/* RIGHT SIDE */

.task-controls {
  width: 45%;
  padding-left: 40px;
}

.add-form {
  display: flex;
  flex-direction: column;
}

.task-input {
  width: 260px;
  height: 38px;
  padding: 8px 10px;
  font-size: 16px;
  margin-bottom: 8px;
  border: 1px solid #888;
}

.action-button {
  width: 260px;
  height: 62px;
  font-size: 20px;
  background: #cfe2f3;
  border: 1px solid #333;
  cursor: pointer;
}

.action-button:hover {
  background: #bcd6ee;
}

.remove-button {
  margin-top: 16px;
}
</style>