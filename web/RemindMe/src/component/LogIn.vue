<script setup>
import { ref } from 'vue'
import { loginUser } from "../api/LogIn.js";

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
        router.push('/home');
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

        <h3> No account? No problem!</h3>

        <router-link to="/createAccount">
            <button @click="navigate" role = "link">
                Make a new Account
            </button>

        </router-link>

    </div>
    
</template>
