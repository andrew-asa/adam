import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import vue from '@vitejs/plugin-vue'
import { render } from 'vue'
import fs from 'fs-extra'
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

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
var inputs = {
  index: 'src/preload/index.ts',
  adam: 'src/preload/adam/index.ts',
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
    },
    resolve: {
      alias: {
        '@': resolve('src'),
        '@common': resolve('src/common'),
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
      },
    ],
    css: {
      postcss: {
        plugins: [
          tailwindcss(),
          autoprefixer()
        ]
      }
    }
  }
})
