<script setup>
import { ref } from 'vue'
import { createUserAccount } from "../api/cAccount.js";
//import useRouter from 'vue-router';

const email = ref("");
const password = ref("");
const errorAccount = ref("");
const successAccount = ref("");
//const router = useRouter()


async function handleCreate() {
    errorAccount.value = "";
    successAccount.value = "";

    const { account, error } = await createUserAccount(email.value, password.value);

    if (error){
        errorAccount = error;
    } else if (user){
        successAccount.value = "Your account has been created!"
        router.push('/');
    }

}
</script>

<template>
    <div class = "cAccount-page">

        <h3>Enter the following information to create your account: </h3>

        <form @submit.prevent = "handleCreate">
            <div>
                <label for = "email">Email:</label>
                <input
                    ype = "email"
                    id = "email"
                    v-model = "email"
                    placeholder = "Enter your email"
                    required
                />
            </div>

            <div>
                <label for = "password">Password:</label>
                <input
                    type = "password"
                    id = "password"
                    v-model = "password"
                    placeholder = "Enter your password"
                    required
                />
            </div>

            <button type = "submit">Create Account</button>
        </form>

        <p v-if = "errorAccount" class="error"> { errorAccount} </p>
        <p v-if = "successAccount" class="success"> { successAccount} </p>

    </div>


</template>

<style scoped>

    /*.cAccount-page {
        display: flex;
    }*/

    .error {
        color : "red"
    }

    .success{
        color: "green"
    }

</style>