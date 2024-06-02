import { createApp } from 'vue'

import { router } from '@/plugins/router'
import { vuetify } from '@/plugins/vuetify'
import { pinia } from '@/plugins/pinia'
import { i18n } from '@/plugins/i18n'

import { globalErrorHandler } from '@/globalErrorHandler'

import App from '@/App.vue'
import '@/styles/main.scss'

const app = createApp(App).use(vuetify).use(pinia).use(router).use(i18n)
app.config.errorHandler = globalErrorHandler
app.mount('#app')
