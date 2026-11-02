<script setup>

import { useRouter } from "vue-router";
const router = useRouter();
</script>

<template>
  <div class="container py-4">
    <h1 class="h3 mb-3">RemindMe</h1>
    <p class="text-muted">Click on a page to get started.</p>
    <button class="btn btn-primary me-2" @click="router.push('/tasks')">Tasks</button>
    <button class="btn btn-success" @click="router.push('/spotify')">Spotify Playlist</button>
  </div>

</template>
