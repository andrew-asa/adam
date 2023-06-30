import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import vue from '@vitejs/plugin-vue'
import { render } from 'vue'
import fs from 'fs-extra'

var inputs = {
  index: 'src/preload/index.ts', 
  rubick: 'src/preload/rubick/index.ts',
  utools: 'src/preload/utools/index.ts',
}
export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()],
    resolve: {
      alias: {
        '@': resolve('src'),
        '@main': resolve('src/main'),
        '@resources': resolve('resources'),
      }
    }
  },
  preload: {
    plugins: [externalizeDepsPlugin()],
    build: {
      rollupOptions: {
        input: inputs
      }
    }
  },
  renderer: {
    // server: {
    //   host: '0.0.0.0',
    // },
    resolve: {
      alias: {
        '@': resolve('src'),
        '@renderer': resolve('src/renderer/src'),
      }
    },
    plugins: [vue()]
  }
})
