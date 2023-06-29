<template>
  <div
    class="adam-search-container"
    ref="container"
  >
    <div
      v-if="isWindows"
      class="drag-bar"
    ></div>
    <div :class="isMacOS && 'drag'"></div>
    <div>
      <search
        ref="searchContainer"
        :currentPlugin="currentPlugin"
        :clipboardFile="clipboardFile"
        :searchValue="searchValue"
        :placeholder="placeholder"
        @onSearch="(e) => store.search(e.target.value)"
        @onKeydown="(e) => store.keydown(e)"
      ></search>
      <result
        :currentPlugin="currentPlugin"
        :clipboardFile="clipboardFile"
        :options="options"
        :searchValue="searchValue"
        :currentSelect="currentSelect"
        @onClickPlugin="(e) => store.onClickPlugin(e)"
      ></result>
    </div>
  </div>
</template>
<script setup lang="ts">
import { isMacOS, isWindows } from '@renderer/utils/constants/common_const'
import { storeToRefs } from 'pinia'
import { onMounted, ref, watch } from 'vue'
import search from './search.vue'
import result from './result.vue'
import { userStore } from './plugins/plugins_store'
import _ from 'lodash'
import { ctx } from '@renderer/startup/ctx_starter'
import { isNodeEnv } from '@renderer/utils/app/app_utils'
const store = userStore()
const { searchValue, currentPlugin, options, currentSelect, placeholder, clipboardFile } =
  storeToRefs(store)
const container = ref(null)
const searchContainer = ref(null)
// let preH = 0
// let preW = 0
// function resizeWindowSize(resultHight = 0) {
//   if (isNodeEnv()){
//     const width = container.value.scrollWidth
//     const height = resultHight > 0 ? 600 : 60
//     if (width !== preW || height !== preH) {
//       preW = width
//       preH = height
      
//       ctx.app.controller.setWindowSize({ width, height })
//     }
//   }
// }

// onMounted(() => {
//   // resizeWindowSize()
//   if (isNodeEnv()) {
//     // ctx.app.controller.show()
//   }
// })
// watch(
//   () => options.value.length,
//   (newValue, oldValue) => {
//     resizeWindowSize(newValue * 60)
//   }
// )
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
