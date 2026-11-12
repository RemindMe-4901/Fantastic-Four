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

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

    if (!emailPattern.test(email.value)) {
        setMessage("That doesn't look like a valid email address.", "error");
        return;
    }

    resetting.value = true;
    setMessage("", "");

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
            setMessage("That email does not have an account.", "error");
        }
    } finally {
        resetting.value = false;
    }
}
</script>

<template>
    <div class="login-page">
        <div class="login-column">
            <div class="header-row">
                <h1 class="brand">RemindMe</h1>
                <h1>Login</h1>
            </div>

            <form @submit.prevent="handleLogin" novalidate>
                <input
                    id="email"
                    type="email"
                    v-model="email"
                    placeholder="email"
                />

                <input
                    id="password"
                    type="password"
                    v-model="password"
                    placeholder="password"
                />

                <button type="submit" class="submit-btn" :disabled="loading">
                    {{ loading ? "Logging in..." : "Submit" }}
                </button>

                <button
                    type="button"
                    class="forgot-btn"
                    @click="handleForgotPassword"
                    :disabled="resetting"
                >
                    {{ resetting ? "Sending..." : "Forgot password" }}
                </button>
            </form>

            <p v-if="message" :class="['message', messageType]" role="alert">
                {{ message }}
            </p>

            <router-link to="/createAccount" class="create-link">
                <button type="button" class="create-btn">
                    Create Account
                </button>
            </router-link>
        </div>
    </div>
</template>

<style scoped>
.login-page {
    min-height: 100vh;
    background-color: #fef7e5;
    padding: 60px 0;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.login-column {
    width: 320px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.header-row {
    display: flex;
    align-items: baseline;
    justify-content: center;
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
    align-items: center;
    width: 100%;
}

input {
    width: 100%;
    padding: 10px 12px;
    font-size: 1rem;
    border: 1px solid #468189;
    border-radius: 4px;
    background-color: #FFFFFF;
    box-sizing: border-box;
    margin-bottom: 12px;
    text-align: left;
}

input:focus {
    outline: 2px solid #77ACA2;
    outline-offset: 1px;
}

.submit-btn {
    width: 100%;
    padding: 10px 24px;
    font-size: 1rem;
    background-color: #77ACA2;
    color: #ffffff;
    border: 1px solid #468189;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 4px;
    text-align: center;
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
    margin-top: 16px;
    font-size: 0.9rem;
    text-decoration: underline;
    text-align: center;
}

.forgot-btn:disabled {
    opacity: 0.6;
    cursor: default;
}

.divider {
    width: 100%;
    height: 1px;
    background-color: #468189;
    margin: 40px 0;
}

.create-link {
    margin-top: 120px;
    text-decoration: none;
}

.create-btn {
    padding: 10px 24px;
    font-size: 1rem;
    background-color: #77ACA2;
    color: #ffffff;
    border: 1px solid #468189;
    border-radius: 4px;
    cursor: pointer;
}

.message {
    margin: 16px 0 0 0;
    padding: 10px 12px;
    border-radius: 4px;
    font-size: 0.95rem;
    width: 100%;
    box-sizing: border-box;
    text-align: center;
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
