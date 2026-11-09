<script setup>
import { ref } from 'vue'
import { createUserAccount } from "../api/cAccount.js";
import { useRouter } from 'vue-router';

const email = ref("");
const password = ref("");
const errorAccount = ref();
const router = useRouter()


async function handleCreate() {
    errorAccount.value = "";

    try {
    const { user, userCredential } = await createUserAccount(email.value, password.value);

    console.log("here", user, userCredential)

    if (user){
        router.push('/');
    }
    }
    catch(e){
        errorAccount.value = e.message;
        
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

            <button class="btn btn-primary" type="submit">Create Account</button>
            
            <router-link to="/" custom v-slot="{ navigate }">
                <button @click="navigate" class="btn btn-secondary" type="button">
                    Back to Login
                </button>
            </router-link>
        
        
        </form>

        <BModal
            v-model="errorAccount"
            id="modal-center"
            centered
            title="Create account error"
            >
            <p class="my-4">{{ errorAccount}}</p>
        </BModal>
    </div>


</template>

<style scoped>

    /*.cAccount-page {
        display: flex;
    }*/

    .error {
        color : "red"
    }

</style>