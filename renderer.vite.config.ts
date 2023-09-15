import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import fs from 'fs-extra';
import { resolve } from 'path'
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

// https://vitejs.dev/config/
async function copyFolderRecursive(source, destination) {
  try {
    await fs.copy(source, destination);
    const files = await fs.readdir(source);
    for (const file of files) {
      const sourcePath = `${source}/${file}`;
      const destinationPath = `${destination}/${file}`;
      const stat = await fs.stat(sourcePath);
      if (stat.isDirectory()) {
        await copyFolderRecursive(sourcePath, destinationPath); // 递归复制子文件夹
      } else {
        await fs.copy(sourcePath, destinationPath); // 复制文件
      }
    }
    console.log(`success copy ${source} to ${destination}`);
  } catch (error) {
    console.error(`fail copy ${source} to ${destination}`, error);
  }
}

export default defineConfig({
  base: "./",
  build: {
    rollupOptions: {
    },
  },
  resolve: {
    alias: {
      '@': resolve('src'),
      '@base': resolve('src/base'),
      '@renderer': resolve('src/renderer'),
    }
  },
  plugins: [
    vue(),
    {
      name: 'copy-after-build',
      apply: 'build',
      async writeBundle() {
        // 复制指定文件到 dist 文件夹
        await copyFolderRecursive('./src/assets/renderer', './out/renderer/assets');
        // 可以添加更多的复制操作
      },
    }
  ],
  css: {
    postcss: {
      plugins: [
        tailwindcss(),
        autoprefixer()
      ]
    }
  }
})
