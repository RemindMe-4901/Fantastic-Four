<script setup>
import { ref } from 'vue'

const email = ref('')
const password = ref('')

    function handleLogin() {
        if(!email.value || !password.value) {
            alert('Enter email and password.')
            return
        }

        console.log('Login sent:', email.value)
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
