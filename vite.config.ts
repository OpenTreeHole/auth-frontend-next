import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Vuetify from 'vite-plugin-vuetify'
import VueRouter from 'unplugin-vue-router/vite'
import Visualizer from 'rollup-plugin-visualizer'

import path from 'path'
import fs from 'fs'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    {
      name: 'create-router-folder-plugin',
      configureServer() {
        const routerFolderPath = path.resolve(__dirname, '.router')
        if (!fs.existsSync(routerFolderPath)) fs.mkdirSync(routerFolderPath)
      }
    },
    VueRouter({
      dts: '.router/typed-router.d.ts',
      importMode: 'sync'
    }),
    Vue(),
    Vuetify({
      styles: {
        configFile: path.resolve(__dirname, './src/styles/vuetify-settings.scss')
      }
    }),
    Visualizer({
      emitFile: true,
      filename: 'report.html'
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
