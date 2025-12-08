import 'vuetify/styles'
import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import setupVuetify from './plugins/vuetify'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(setupVuetify())

app.mount('#app')
