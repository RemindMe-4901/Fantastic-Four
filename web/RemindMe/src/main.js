import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'

const app  = createApp(App)
//createApp(App).mount('#app')
app.use(router)
app.mount('#app')
