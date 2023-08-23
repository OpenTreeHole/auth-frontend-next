import { createApp } from 'vue'

import { router } from '@/plugins/router'
import { vuetify } from '@/plugins/vuetify'
import { pinia } from '@/plugins/pinia'

import { globalErrorHandler } from '@/globalErrorHandler'

import App from '@/App.vue'
import '@/styles/main.scss'

const app = createApp(App).use(vuetify).use(pinia).use(router)
app.config.errorHandler = globalErrorHandler
app.mount('#app')
