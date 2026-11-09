import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import cAccountView from '../views/cAccountView.vue'
import LoginView from '../views/LoginView.vue'
import TaskView from '../views/TaskView.vue'
import HabitView from '../views/HabitView.vue'
import TimerSessionView from '../views/TimerSessionView.vue'
import SpotifyView from '../views/SpotifyView.vue'

const routes = [
    { path: '/', name: 'Login', component: LoginView, meta: {requiresAuth: false, showNavBar: false} },
    { path: '/Home', name: 'home', component: HomeView },
    { path: '/TimerSession', name: 'timer', component: TimerSessionView },
    //{ path: '/', name: 'home', component: HomeView },
    { path: '/createAccount', name: 'createAccount', component: cAccountView, meta: {requiresAuth: false, showNavBar: false} },
    //{ path: '/Login', name: 'Login', component: LoginView },
    { path: '/Task', name: 'Task', component: TaskView },
    { path: '/Habit', name: 'Habit', component: HabitView },
    { path: '/Spotify', name: 'spotify', component: SpotifyView }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from) => {
  const isAuthenticated = !!sessionStorage.getItem('userInfo')

  if (to.meta.requiresAuth != false && !isAuthenticated) {
    return { name: 'Login', query: { redirect: to.fullPath } }
  }
})

export default router
