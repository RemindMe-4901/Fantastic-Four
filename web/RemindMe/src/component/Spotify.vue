<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  compact: { type: Boolean, default: false },
});

const RECOMMENDED = [
  { name: "Workday Lounge", id: "37i9dQZF1DWT5lkChsPmpy" },
  { name: "House Focus", id: "37i9dQZF1DX8wtrGDH81Oa" },
  { name: "Classical Reading", id: "37i9dQZF1DWYkztttC1w38" },
  { name: "Chill Lofi Beats", id: "37i9dQZF1DX8Uebhn9wzrS" },
  { name: "Focus Jazz", id: "37i9dQZF1DX8wWHvPMMfNA" },
  { name: "Bossa Lofi", id: "37i9dQZF1DX95MHDa0jj42" },
];

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

function setPlaylist(id) {
  playlistId.value = id;
  input.value = `https://open.spotify.com/playlist/${id}`;
  localStorage.setItem("remindme_playlist", input.value);
}

function save() {
  const id = extractId(input.value);
  if (!id) {
    alert("That is not a Spotify playlist link...");
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

  <div :class="compact ? '' : 'card p-3 mb-3'">
    <template v-if="!compact">
      <h2 class="h5">Spotify Playlist</h2>
      <div class="input-group mb-2">
        <input v-model="input" class="form-control" placeholder="Paste a Spotify playlist link" />
        <button class="btn btn-success" @click="save">Save</button>
        <button v-if="playlistId" class="btn btn-outline-secondary" @click="clear">Clear</button>
      </div>

    <p class="small text-muted mb-3">
      No volume slider... Spotify's embed controls its own audio. Use the speaker icon.
    </p>
    
      <h3 class="h6 text-muted mb-2">Recommended</h3>
  <div class="d-flex flex-wrap gap-2 mb-3">
    <button
      v-for="p in RECOMMENDED"
      :key="p.id"
      class="btn btn-sm"
      :class="p.id === playlistId ? 'btn-success' : 'btn-outline-success'"
      @click="setPlaylist(p.id)"
  >
    {{ p.name }}
  </button>
</div>
    
    </template>

    <iframe
      v-if="embedUrl"
      :src="embedUrl"
      width="100%"
      :height="compact ? 152 : 600"
      frameborder="0"
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
      style="border-radius: 12px; display: block"
    ></iframe>

    <p v-else-if="compact" class="small text-muted mb-0">
      No playlist saved.
    </p>
  </div>

</template>
