import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import store from './store'

const vueSetup = createApp(App)
vueSetup.use(router)
vueSetup.use(store)
vueSetup.mount('#app')

