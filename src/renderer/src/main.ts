import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { start } from './startup/app_startup'

const app = createApp(App)
start(app)
app.use(router)
app.mount('#app')
