import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import cAccountView from '../views/cAccountView.vue'
import LoginView from '../views/LoginView.vue'
import TaskView from '../views/TaskView.vue'
import HabitView from '../views/HabitView.vue'
import SpotifyView from '../views/SpotifyView.vue'

const routes = [
    { path: '/', name: 'Login', component: LoginView, meta: {hideNavBar: true}},
    { path: '/Home', name: 'home', component: HomeView },
    //{ path: '/', name: 'home', component: HomeView },
    { path: '/createAccount', name: 'createAccount', component: cAccountView, meta: {hideNavBar: true} },
    //{ path: '/Login', name: 'Login', component: LoginView },
    { path: '/Task', name: 'Task', component: TaskView },
    { path: '/Habit', name: 'Habit', component: HabitView },
    { path: '/Spotify', name: 'spotify', component: SpotifyView }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
