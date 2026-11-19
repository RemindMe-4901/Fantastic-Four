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
const selectedHabitId = ref(null);
const editingHabitId = ref(null);
const editedHabitName = ref("");

async function loadHabits() {
  try {
    habits.value = await getHabits();
  } catch (error) {
    console.error("Error loading habits:", error);
  }
}

async function createHabit() {
  if (!newHabit.value.trim()) {
    alert("Please enter a habit name.");
    return;
  }

  try {
    await addHabit({
      name: newHabit.value.trim(),
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

    selectedHabitId.value = null;
    await loadHabits();
  } catch (error) {
    console.error("Error updating habit:", error);
  }
}

async function removeSelectedHabit() {
  if (!selectedHabitId.value) {
    alert("Please select a habit first.");
    return;
  }

  try {
    await deleteHabit(selectedHabitId.value);
    selectedHabitId.value = null;
    await loadHabits();
  } catch (error) {
    console.error("Error deleting habit:", error);
  }
}

function selectHabit(habitId) {
  selectedHabitId.value =
    selectedHabitId.value === habitId ? null : habitId;
}

async function addHabitGoal() {
  if (!selectedHabitId.value) {
    alert("Please select a habit first.");
    return;
  }

  const goal = prompt("Enter a goal for this habit:");

  if (!goal || !goal.trim()) {
    return;
  }

  try {
    await updateHabit(selectedHabitId.value, {
  goal: goal.trim(),
  goalCompleted: false
});

    await loadHabits();
    alert("Habit goal added.");
  } catch (error) {
    console.error("Error adding habit goal:", error);
  }
}
function startEditHabit(habit) {
  editingHabitId.value = habit.id;
  editedHabitName.value = habit.name;
}

async function saveHabitEdit(habitId) {
  if (!editedHabitName.value.trim()) {
    alert("Please enter a habit name.");
    return;
  }

  try {
    await updateHabit(habitId, {
      name: editedHabitName.value.trim()
    });

    editingHabitId.value = null;
    editedHabitName.value = "";
    await loadHabits();
  } catch (error) {
    console.error("Error editing habit:", error);
  }
}

function cancelEdit() {
  editingHabitId.value = null;
  editedHabitName.value = "";
}
async function completeHabitGoal(habitId) {
  try {
    await updateHabit(habitId, {
      goalCompleted: true
    });

    await loadHabits();
  } catch (error) {
    console.error("Error completing habit goal:", error);
  }
}
onMounted(() => {
  loadHabits();
});
</script>

<template>
  <div class="habit-page">

    <!-- HEADER -->
    <header class="habit-header">
      <div class="hamburger">
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div class="page-title">HABITS</div>

      <div class="profile-circle"></div>
    </header>

    <!-- MAIN CONTENT -->
    <main class="habit-content">

      <!-- LEFT SIDE -->
      <section class="habit-list-area">

        <div class="vertical-line"></div>

        <div class="habit-list">
          <div
            v-for="habit in habits"
            :key="habit.id"
            class="habit-row"
            :class="{
              selected: selectedHabitId === habit.id,
              completed: habit.completedToday
            }"
            @click="selectHabit(habit.id)"
          >
            <div class="habit-name-area">
  <template v-if="editingHabitId === habit.id">
    <input
      v-model="editedHabitName"
      class="edit-input"
      @click.stop
      @keyup.enter="saveHabitEdit(habit.id)"
    />

    <button
      class="edit-small-button"
      @click.stop="saveHabitEdit(habit.id)"
    >
      Save
    </button>

    <button
      class="edit-small-button"
      @click.stop="cancelEdit"
    >
      Cancel
    </button>
  </template>

  <template v-else>
  <div>
    <div>{{ habit.name }}</div>

    <div
  v-if="habit.goal"
  class="habit-goal"
>
  <span
    :class="{ 'goal-completed': habit.goalCompleted }"
  >
    Goal: {{ habit.goal }}
  </span>

  <button
    v-if="!habit.goalCompleted"
    class="goal-complete-button"
    @click.stop="completeHabitGoal(habit.id)"
  >
    ✓
  </button>
</div>
  </div>

  <button
    class="edit-icon"
    @click.stop="startEditHabit(habit)"
  >
    Edit
  </button>
</template>
</div>

            <button
              v-if="!habit.completedToday"
              class="complete-box"
              @click.stop="markComplete(habit.id)"
            >
              ✓
            </button>

            <span
              v-else
              class="completed-check"
            >
              ✓
            </span>
          </div>
        </div>

      </section>

      <!-- RIGHT SIDE -->
      <section class="habit-controls">

        <form
          class="add-form"
          @submit.prevent="createHabit"
        >
          <input
            v-model="newHabit"
            class="habit-input"
            type="text"
            placeholder="Habit name"
          />

          <button
            type="submit"
            class="action-button"
          >
            Add habit
          </button>
        </form>

        <button
          class="action-button remove-button"
          @click="removeSelectedHabit"
        >
          Remove habit
        </button>

        <button
          class="action-button goal-button"
          @click="addHabitGoal"
        >
          Add habit goal
        </button>

      </section>

    </main>

  </div>
</template>

<style scoped>
* {
  box-sizing: border-box;
}

.habit-page {
  width: 100%;
  max-width: none;
  min-height: calc(100vh - 60px);
  margin: 0;
  border: 2px solid #468189;
  background: #F4E9CD;
  font-family: Arial, Helvetica, sans-serif;
}

/* HEADER */

.habit-header {
  height: 82px;
  background: #031926;
  display: flex;
  align-items: center;
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

/* MAIN CONTENT */

.habit-content {
  display: flex;
  min-height: calc(100vh - 142px);
  padding: 15px 30px 25px 35px;
}

/* LEFT */

.habit-list-area {
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
  background: #9DBEBB;
}

.habit-list {
  margin-left: 22px;
}


 

.habit-row {
  width: 430px;
  min-height: 45px;
  margin-bottom: 5px;
  padding: 10px;
  font-size: 19px;
  cursor: pointer;
  display: flex;
  align-items: center;
  background: #9DBEBB;
}

.habit-row:hover {
  background: #77ACA2;
}
.selected {
  outline: 3px solid #468189;
}

.habit-input {
  width: 260px;
  height: 38px;
  padding: 8px 10px;
  margin-bottom: 8px;
  font-size: 16px;
  background: #F4E9CD;
  border: 1px solid #468189;
  color: #031926;
}
.habit-name-area {
  display: flex;
  align-items: center;
  flex: 1;
  gap: 8px;
}

.edit-input {
  flex: 1;
  height: 32px;
  padding: 5px 8px;
  background: #F4E9CD;
  border: 1px solid #468189;
  color: #031926;
}

.edit-icon,
.edit-small-button {
  background: #77ACA2;
  border: 1px solid #031926;
  color: #031926;
  padding: 5px 8px;
  cursor: pointer;
}
.habit-goal {
  font-size: 14px;
  margin-top: 4px;
  color: #031926;
  display: flex;
  align-items: center;
  gap: 8px;
}

.goal-complete-button {
  background: #F4E9CD;
  border: 1px solid #468189;
  color: #031926;
  cursor: pointer;
}

.goal-completed {
  text-decoration: line-through;
}
.complete-box {
  margin-left: auto;
  width: 30px;
  height: 30px;
  background: #F4E9CD;
  border: 2px solid #468189;
  color: #031926;
  cursor: pointer;
  font-size: 18px;
}
.completed-check {
  margin-left: auto;
  font-size: 20px;
}

/* RIGHT */

.habit-controls {
  width: 45%;
  padding-left: 40px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.add-form {
  display: flex;
  flex-direction: column;
}



.action-button {
  width: 260px;
  height: 62px;
  font-size: 20px;
  background: #77ACA2;
  border: 1px solid #031926;
  color: #031926;
  cursor: pointer;
}
.action-button:hover {
  background: #468189;
  color: white;
}

.remove-button {
  margin-top: 16px;
}

.goal-button {
  margin-top: 16px;
}
</style>