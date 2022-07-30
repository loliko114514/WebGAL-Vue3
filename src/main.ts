import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import "./assets/style/animation.scss"

const store = createPinia()

createApp(App).use(store).mount('#app')
