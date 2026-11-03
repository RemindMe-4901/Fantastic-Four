import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import cAccountView from '../views/cAccountView.vue'
import LoginView from '../views/LoginView.vue'
import TaskView from '../views/TaskView.vue'

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/createAccount',
        name: 'createAccount',
        component: cAccountView
    },
    {
        path: '/Login',
        name: 'Login',
        component: LoginView
    },
    {
        path: '/Task',
        name: 'Task',
        component: TaskView
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router