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
  
  <div v-if="route.path !== '/spotify'" class="spotify-corner">
    <Spotify compact />
  </div>
</template>

<style>
.spotify-corner {
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  width: 300px;
  z-index: 1050;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
  border-radius: 12px;
  overflow: hidden;
  background: #000000;
  padding: 0px;
}

.spotify-corner .spotify-mini {
  background: #000000;
}

@media (max-width: 768px) {
  .spotify-corner {
    display: none;
  }
}
</style>
