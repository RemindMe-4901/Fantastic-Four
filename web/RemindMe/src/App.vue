<script setup>
//import Tasks from "./component/Tasks.vue";
//import Home from ""
import Spotify from "./component/Spotify.vue";
import { BApp } from "bootstrap-vue-next";
import {useRoute} from "vue-router"

const route = useRoute();
</script>

<template>
  <BApp id="app">

  <!--<nav v-if="!$route.meta.hideNavBar" class = "navBar"> -->
  <nav v-if= "route.meta.showNavBar != false">
    <router-link to="/home">Home</router-link> | 
    <router-link to="/Task">Tasks</router-link> |
    <router-link to="/Habit">Habit</router-link> |
    <router-link to="/TimerSession">Timer</router-link> |
    <router-link to="/Spotify">Spotify</router-link>
  </nav>

  <!--   --> 
  <!--<Tasks /> <-- dont remember why I had this here to begin with, maybe need it??-->
  <router-view></router-view>
</BApp>
</template>

<style>
nav{
  padding: 20px;
}
nav a {
  margin-right: 10px;
  text-decoration: none;
  font-weight: bold;
}
</style>
