<script setup>
import { ref } from 'vue';
import { loginUser, sendResetEmail, emailHasAccount } from "../api/LogIn.js";
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

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value)) {
        setMessage("That doesn't look like a valid email address.", "error");
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

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value)) {
        setMessage("That doesn't look like a valid email address.", "error");
        return;
    }

    resetting.value = true;

    try {
        const exists = await emailHasAccount(email.value);

        if (!exists) {
            setMessage("There is no account with that email address.", "error");
            return;
        }

        await sendResetEmail(email.value);
        setMessage("Reset link sent. Check your inbox and spam folder.", "success");
    } catch (error) {
        console.error("Reset error code:", error.code);
        if (error.code === "auth/invalid-email") {
            setMessage("Invalid email address.", "error");
        } else if (error.code === "auth/too-many-requests") {
            setMessage("Too many requests... Please wait a few minutes and try again.", "error");
        } else {
            setMessage("Couldn't send the reset email... Please try again.", "error");
            //setMessage("Error: " + error.code, "error");
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

        <form @submit.prevent="handleLogin" novalidate>
            <div class="field-row">
                <input
                    id="email"
                    type="email"
                    v-model="email"
                    placeholder="email"
                />
                <button type="submit" class="submit-btn" :disabled="loading">
                    {{ loading ? "Logging in..." : "Submit" }}
                </button>
            </div>

            <div class="field-row">
                <input
                    id="password"
                    type="password"
                    v-model="password"
                    placeholder="password"
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
.message {
    margin: 12px 0;
    padding: 10px 12px;
    border-radius: 6px;
    font-size: 0.95rem;
    max-width: 320px;
    width: 100%;
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
.forgot-btn {
    background: none;
    border: none;
    color: #2563eb;
    cursor: pointer;
    padding: 0;
    margin-top: 8px;
    font-size: 0.9rem;
    text-decoration: underline;
}
.forgot-btn:disabled {
    opacity: 0.6;
    cursor: default;
}
</style>
