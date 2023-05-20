<template>
  <div class="search-container">
    <search
      :currentPlugin="currentPlugin"
      :searchValue="searchValue"
      @onSearch="onSearch"
      @onKeydown="e=>store.keydown(e)"
    ></search>
  </div>
  <div class="search-conditional-simulation">
    <el-form-item label="当前插件" class="fake-item">
      <el-select
        v-model="select"
        placeholder="选择"
        style="width: 300px"
      >
        <el-option
          v-for="plugin in apps"
          :label="plugin.name"
          :value="plugin.name"
        ></el-option>
      </el-select>
      <el-button @click="resetSelection">重置</el-button>
    </el-form-item>

    <el-form-item label="输入搜索" class="fake-item">
      <el-input v-model="searchValue" />
    </el-form-item>
    <el-form-item label="粘贴">
      <el-button>文件</el-button>
      <el-button>图片</el-button>
      <el-button>文本</el-button>
    </el-form-item>
  </div>
</template>
<script setup lang="ts">
import search from '@renderer/components/search/search.vue'
import { storeToRefs } from 'pinia'
import { userStore } from '@renderer/components/search/plugins/plugins_store'
import { onMounted, ref, watch, onUnmounted } from 'vue'
import { fakeAppDatas } from './app_search'
import _ from 'lodash'
const store = userStore()
const { apps,  searchValue, currentPlugin } = storeToRefs(store)
const select = ref('')
onMounted(() => {
  store.setApps(fakeAppDatas)
})
const resetSelection = () => {
  select.value = ''
}
watch(select, () => {
  let index = _.findIndex(fakeAppDatas, { name: select.value })
  if (index > -1) {
    store.setCurrentPlugin(fakeAppDatas[index])
  } else {
    store.setCurrentPlugin({})
  }
})
onUnmounted(() => {
  store.setApps([])
})
const onSearch = (e) => {
  store.search(e.target.value)
}
const pasteFile = () => {
  
}
</script>
<style scoped>
.search-container {
  width: 600px;
  display: flex;
}

.search-conditional-simulation {
  padding-top: 20px;
}
.fake-item{
    width:500px
}
</style>
