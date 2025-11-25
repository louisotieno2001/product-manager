import { createApp } from 'vue'
import App from './App.vue'

import router from './router'
import pinia from './stores'
import './assets/tailwind.css'
import { useAuthStore } from './stores/auth'
import { useThemeStore } from './stores/theme'

const app = createApp(App)
app.use(router)
app.use(pinia)

const auth = useAuthStore()
auth.restoreSession()

const theme = useThemeStore()
theme.initialize()

app.mount('#app')
