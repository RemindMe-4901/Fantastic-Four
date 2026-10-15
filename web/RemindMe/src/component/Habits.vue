<script setup>
import { ref, onMounted } from "vue";
import {
  addHabit,
  getHabits,
  updateHabit,
  deleteHabit
} from "../habits.js";

const habits = ref([]);
const newHabit = ref("");

async function loadHabits() {
  try {
    habits.value = await getHabits();
  } catch (error) {
    console.error("Error loading habits:", error);
  }
}

async function createHabit() {
  if (!newHabit.value.trim()) return;

  try {
    await addHabit({
      name: newHabit.value,
      frequency: "Daily"
    });

    newHabit.value = "";
    await loadHabits();
  } catch (error) {
    console.error("Error creating habit:", error);
  }
}

async function markComplete(habitId) {
  try {
    await updateHabit(habitId, {
      completedToday: true
    });

    await loadHabits();
  } catch (error) {
    console.error("Error updating habit:", error);
  }
}

async function removeHabit(habitId) {
  try {
    await deleteHabit(habitId);
    await loadHabits();
  } catch (error) {
    console.error("Error deleting habit:", error);
  }
}

onMounted(() => {
  loadHabits();
});
</script>

<template>
  <div>
    <h1>Habits</h1>

    <input
      v-model="newHabit"
      type="text"
      placeholder="Enter a habit"
    />

    <button @click="createHabit">
      Add Habit
    </button>

    <ul>
      <li v-for="habit in habits" :key="habit.id">
        {{ habit.name }} -
        {{ habit.completedToday ? "Completed Today" : "Not Completed" }}

        <button @click="markComplete(habit.id)">
          Complete
        </button>

        <button @click="removeHabit(habit.id)">
          Delete
        </button>
      </li>
    </ul>
  </div>
</template>