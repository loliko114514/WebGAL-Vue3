import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import "./assets/style/animation.scss"
import "./index.css"

const store = createPinia()

createApp(App).use(store).mount('#app')
