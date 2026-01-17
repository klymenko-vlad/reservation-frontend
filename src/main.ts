import 'vuetify/styles'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { VueQueryPlugin } from '@tanstack/vue-query'

import App from './App.vue'
import router from './router'
import setupVuetify from './plugins/vuetify'
import { useUserStore } from './stores/user'

const app = createApp(App)

app.use(createPinia())

const userStore = useUserStore()
userStore.load()

app.use(router)
app.use(setupVuetify())
app.use(VueQueryPlugin, {
  queryClientConfig: {
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 1,
        staleTime: 5 * 60 * 1000,
      },
    },
  },
})

app.mount('#app')
