<script setup>
import { ref, computed } from "vue";

const saved = localStorage.getItem("remindme_playlist");
const input = ref(saved || "");
const playlistId = ref(saved ? extractId(saved) : "");

function extractId(url) {
  const match = url.match(/playlist\/([a-zA-Z0-9]+)/);
  return match ? match[1] : "";
}

const embedUrl = computed(() =>
  playlistId.value
    ? `https://open.spotify.com/embed/playlist/${playlistId.value}?utm_source=generator`
    : ""
);

function save() {
  const id = extractId(input.value);
  if (!id) {
    alert("That doesn't look like a Spotify playlist link.");
    return;
  }
  playlistId.value = id;
  localStorage.setItem("remindme_playlist", input.value);
}

function clear() {
  playlistId.value = "";
  input.value = "";
  localStorage.removeItem("remindme_playlist");
}
</script>

<template>
  <div class="card p-3 mb-3">
    <h2 class="h5">Focus playlist</h2>

    <div class="input-group mb-2">
      <input
        v-model="input"
        class="form-control"
        placeholder="Paste a Spotify playlist link"
      />
      <button class="btn btn-success" @click="save">Save</button>
      <button v-if="playlistId" class="btn btn-outline-secondary" @click="clear">
        Clear
      </button>
    </div>

    <iframe
      v-if="embedUrl"
      :src="embedUrl"
      width="100%"
      height="352"
      frameborder="0"
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
      style="border-radius: 12px"
    ></iframe>
  </div>
</template>
