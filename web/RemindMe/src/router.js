import { createRouter, createWebHistory } from "vue-router";
import Home from "./component/Home.vue";
import Tasks from "./component/Tasks.vue";
import Spotify from "./component/Spotify.vue";

const routes = [
  { path: "/", name: "home", component: Home },
  { path: "/tasks", name: "tasks", component: Tasks },
  { path: "/spotify", name: "spotify", component: Spotify },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
