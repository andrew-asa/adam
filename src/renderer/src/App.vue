<template>
  <div
    id="router-content"
    v-contextmenu="{ name: 'app-contextmenus' }"
  >
    <router-view></router-view>
  </div>
  <context-menu :name="`app-contextmenus`" v-if="noEnv">
    <context-menu-item @click="ctx.app.controller.openConsole()"> 控制台 </context-menu-item>
    <context-menu-item @click="ctx.app.controller.forward()"> 前进 </context-menu-item>
    <context-menu-item @click="ctx.app.controller.back()"> 后退 </context-menu-item>
  </context-menu>
</template>
<script setup lang="ts">
import { isNodeEnv } from '@renderer/utils/app/app_utils'
import { ctx } from '@renderer/startup/ctx_starter.js'
import { ref } from 'vue'
const noEnv = ref(isNodeEnv())
</script>
<style>
body {
  -webkit-app-region: drag;
}
</style>
