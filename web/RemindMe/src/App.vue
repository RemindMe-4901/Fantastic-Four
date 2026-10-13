<script setup>
import Tasks from "./component/Tasks.vue";
//import Home from ""
</script>

<template>
  <div id="app">

  <nav>
    <router-link to="/">home</router-link> |
    <router-link to="/createAccount">createAccount</router-link> |
    <router-link to="/Login">Login</router-link>
  </nav>

  <!--SOMETHING IS HERE--> 
  <Tasks />
  <router-view></router-view>
  </div>
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
