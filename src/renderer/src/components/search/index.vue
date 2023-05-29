<template>
  <div class="adam-search-container">
    <div
      v-if="isWindows"
      class="drag-bar"
    ></div>
    <div :class="isMacOS && 'drag'"></div>
    <div>
      <search
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
import { isMacOS, isWindows, isElectron } from '@renderer/utils/constants/common_const'
import { storeToRefs } from 'pinia'
import { onMounted, reactive, ref, watch } from 'vue'
import search from './search.vue'
import result from './result.vue'
import { userStore } from './plugins/plugins_store'
import _ from 'lodash'
const store = userStore()
const { searchValue, currentPlugin, options, currentSelect, placeholder, clipboardFile } =
  storeToRefs(store)
onMounted(() => {
  store.initOptions()
})
// const handleSearchDebounce = _.debounce(store.search.bind(store), 100)
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
