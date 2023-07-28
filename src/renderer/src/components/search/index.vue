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
      <div class="internal-plugin-container">
        <component :is="Components[internalPluginName]" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { isMacOS, isWindows } from '@renderer/utils/constants/common_const'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import market from '@renderer/components/search/plugins/market/index.vue'
import search from './search.vue'
import result from './result.vue'
import { userStore } from './plugins/plugins_store'
import _ from 'lodash'
const store = userStore()
const { searchValue, currentPlugin, options, currentSelect, placeholder, clipboardFile,internalPluginName } =
  storeToRefs(store)
const container = ref(null)
const searchContainer = ref(null)
const Components = {
  market: market
}
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
