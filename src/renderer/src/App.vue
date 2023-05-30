<template>
  <div
    v-if="nodeEnv"
    class="electron-env"
    id="router-content"
  >
    <router-view></router-view>
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
import { ref } from 'vue'
const nodeEnv = ref(isNodeEnv())
</script>
<style>
@import url('./assets/css/common.css');
body {
  -webkit-app-region: drag;
}
</style>
