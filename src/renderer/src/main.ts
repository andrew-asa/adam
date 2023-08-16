import { createApp, onUnmounted } from 'vue'
import App from './App.vue'
import router from './router'
import { destroy, start } from './startup/app_startup'
// import "tailwindcss/tailwind.css"

const app = createApp(App)
start(app)
app.use(router)
app.mount('#app')
onUnmounted(() => {
    // 执行卸载时的逻辑
    destroy()
})