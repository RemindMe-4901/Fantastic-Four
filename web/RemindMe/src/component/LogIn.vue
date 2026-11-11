<script setup>
import { ref } from 'vue';
import { loginUser, sendResetEmail } from "../api/LogIn.js";
import { useRouter, useRoute } from 'vue-router';

const email = ref("");
const password = ref("");
const message = ref("");
const messageType = ref("");
const loading = ref(false);
const resetting = ref(false);

const router = useRouter();
const route = useRoute();

function setMessage(text, type) {
    message.value = text;
    messageType.value = type;
}

function friendlyError(code) {
    switch (code) {
        case "auth/invalid-email":
            return "Invalid email address.";
        case "auth/missing-password":
            return "Please enter your password.";
        case "auth/invalid-credential":
        case "auth/wrong-password":
        case "auth/user-not-found":
            return "Incorrect email or password... Please try again.";
        case "auth/user-disabled":
            return "Please contact support.";
        case "auth/too-many-requests":
            return "Too many failed attempts... Please wait and try again.";
        case "auth/network-request-failed":
            return "Network error.";
        default:
            return "Something went wrong... Please try again.";
    }
}

async function handleLogin() {
    if (!email.value || !password.value) {
        setMessage("Enter email and password.", "error");
        return;
    }

    loading.value = true;
    setMessage("", "");

    try {
        const test = await loginUser(email.value, password.value);
        sessionStorage.setItem("userInfo", test.user.uid);
        router.push(route.query.redirect || '/Home');
    } catch (error) {
        setMessage(friendlyError(error.code), "error");
        password.value = "";
    } finally {
        loading.value = false;
    }
}

async function handleForgotPassword() {
    if (!email.value) {
        setMessage("Enter your email above first, then tap Forgot password.", "error");
        return;
    }

    resetting.value = true;

    try {
        await sendResetEmail(email.value);
        setMessage("Reset link sent. Check your inbox and spam folder.", "success");
    } catch (error) {
        if (error.code === "auth/invalid-email") {
            setMessage("Invalid email address.", "error");
        } else if (error.code === "auth/too-many-requests") {
            setMessage("Too many requests... Please wait a few minutes and try again.", "error");
        } else {
            setMessage("Couldn't send the reset email... Please try again.", "error");
        }
    } finally {
        resetting.value = false;
    }
}
</script>

<template>
    <div class="login-page">
        <div class="header-row">
            <h1 class="brand">RemindMe</h1>
            <h1>Login</h1>
        </div>

        <form @submit.prevent="handleLogin">
            <!-- Email row: input + Submit side by side -->
            <div class="field-row">
                <input
                    id="email"
                    type="email"
                    v-model="email"
                    placeholder="email"
                    required
                />
                <button type="submit" class="submit-btn" :disabled="loading">
                    {{ loading ? "Logging in..." : "Submit" }}
                </button>
            </div>

            <!-- Password row: input + Forgot password side by side -->
            <div class="field-row">
                <input
                    id="password"
                    type="password"
                    v-model="password"
                    placeholder="password"
                    required
                />
                <button
                    type="button"
                    class="forgot-btn"
                    @click="handleForgotPassword"
                    :disabled="resetting"
                >
                    {{ resetting ? "Sending..." : "Forgot password" }}
                </button>
            </div>
        </form>

        <p v-if="message" :class="['message', messageType]" role="alert">
            {{ message }}
        </p>

        <router-link to="/createAccount">
            <button type="button" class="create-btn">
                Create Account
            </button>
        </router-link>
    </div>
</template>

<style scoped>
.login-page {
    min-height: 100vh;
    background-color: #F4E9CD;
    padding: 60px 40px;
    box-sizing: border-box;
}

.header-row {
    display: flex;
    align-items: baseline;
    gap: 12px;
    margin-bottom: 32px;
}

h1 {
    color: #031926;
    font-size: 2.5rem;
    margin: 0;
}

.brand {
    color: #031926;
}

form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.field-row {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 12px;
}

input {
    width: 320px;
    padding: 10px 12px;
    font-size: 1rem;
    border: 1px solid #468189;
    border-radius: 4px;
    background-color: #FFFFFF;
    box-sizing: border-box;
}

input:focus {
    outline: 2px solid #77ACA2;
    outline-offset: 1px;
}

.submit-btn {
    padding: 10px 24px;
    font-size: 1rem;
    background-color: #77ACA2;
    color: #031926;
    border: 1px solid #468189;
    border-radius: 4px;
    cursor: pointer;
    white-space: nowrap;
}

.submit-btn:disabled {
    opacity: 0.6;
    cursor: default;
}

.forgot-btn {
    background: none;
    border: none;
    color: #468189;
    cursor: pointer;
    padding: 0;
    font-size: 0.9rem;
    text-decoration: underline;
    white-space: nowrap;
}

.forgot-btn:disabled {
    opacity: 0.6;
    cursor: default;
}

.create-btn {
    margin-top: 20px;
    padding: 10px 24px;
    font-size: 1rem;
    background-color: #77ACA2;
    color: #031926;
    border: 1px solid #468189;
    border-radius: 4px;
    cursor: pointer;
}

.message {
    margin: 16px 0 0 0;
    padding: 10px 12px;
    border-radius: 4px;
    font-size: 0.95rem;
    max-width: 320px;
    box-sizing: border-box;
    text-align: left;
}
.message.error {
    background: #fdecea;
    color: #b3261e;
    border: 1px solid #f5c6c2;
}
.message.success {
    background: #e7f5ea;
    color: #1e6b34;
    border: 1px solid #bfe3c8;
}
</style>
