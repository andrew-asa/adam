<template>
  <div class="adam-search-container">
    <div
      v-if="isWindows"
      class="drag-bar"
    ></div>
    <div :class="isMacOS && 'drag'"></div>
    <div class="adam-select">
      <search @onSearch="onSearch"></search>
      <result></result>
    </div>
  </div>
</template>
<script setup lang="ts">
import { isMacOS, isWindows, isElectron } from '@renderer/utils/constants/common_const'
import search from './search.vue'
import result from './result.vue'
import { ref } from 'vue'
import createPluginManager from './plugins/manager/plugin_manager'
const { onSearch } = createPluginManager()
</script>
<style scoped lang="less">
.drag-bar {
  -webkit-app-region: drag;
  width: 100%;
  height: 20px;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
}

#components-layout {
  height: 100vh;
  overflow: hidden;
  ::-webkit-scrollbar {
    width: 0;
  }
}

.drag {
  -webkit-app-region: drag;
}
</style>
