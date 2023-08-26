import { createI18n } from 'vue-i18n'
import zh from '@/locales/zh.json'

export const i18n = createI18n({
  legacy: false,
  fallbackLocale: 'zh',
  messages: {
    zh
  }
})
