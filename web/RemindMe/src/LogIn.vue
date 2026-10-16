<script setup>
import { ref } from 'vue'
import { loginUser } from "./LogIn.js";

const email = ref("");
const password = ref("");
const message = ref("");

async function handleLogin() {
    if (!email.value || !password.value) {
        message.value = "Enter email and password.";
        return;
    }

    message.value = "Logging in.";

    try {
        await loginUser(email.value, password.value);
        message.value = "Login successful.";
    } catch (error) {
        message.value = "Login failed: " + error.message;
    }
}
</script>

<template>
    <div class="login-page">
        <h1>Welcome to ReadMe</h1>
        <h2>Login to your ReadMe account</h2>

        <form @submit.prevent = "Login">
            <label for = "email">Email:</label>
            <input
                id = "email"
                type = "email"
                v-model = "email"
                placeholder = "Enter your email"
                required
            />

            <label for = "password">Password:</label>
            <input
                id = "password"
                type = "password"
                v-model = "password"
                placeholder = "Enter your password"
                required
            />

            <button type = "submit">Login</button>

        </form>

    </div>
    
</template>
