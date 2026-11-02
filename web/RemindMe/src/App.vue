<script setup>
import { RouterLink, RouterView } from "vue-router";

</script>

<template>

  <nav class="navbar navbar-expand navbar-dark bg-dark mb-4">
    <div class="container">
      <RouterLink class="navbar-brand" to="/">RemindMe</RouterLink>
      <div class="navbar-nav">
        <RouterLink class="nav-link" to="/tasks">Tasks</RouterLink>
        <RouterLink class="nav-link" to="/spotify">Spotify Playlist</RouterLink>
      </div>
    </div>
  </nav>

  <RouterView />

</template>

