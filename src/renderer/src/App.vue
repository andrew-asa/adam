<template>
  <div
    v-if="nodeEnv"
    class="electron-env"
    id="router-content"
    v-contextmenu="{ name: 'app-contextmenus' }"
  >
    <router-view></router-view>
    <context-menu :name="`app-contextmenus`">
      <context-menu-item @click="ctx.app.controller.openConsole()"> 控制台 </context-menu-item>
      <context-menu-item @click="ctx.app.controller.forward()"> 前进 </context-menu-item>
      <context-menu-item @click="ctx.app.controller.back()"> 后退 </context-menu-item>
    </context-menu>
  </div>
  <div
    v-else
    class="browser-env"
  >
    <router-view></router-view>
  </div>
</template>
<script setup lang="ts">
import { isNodeEnv } from '@renderer/utils/app/app_utils'
import { ctx } from '@renderer/startup/ctx_starter.js'
import { ref } from 'vue'
const nodeEnv = ref(isNodeEnv())
</script>
<style>
@import url('./assets/css/common.css');
body {
  -webkit-app-region: drag;
}
</style>
