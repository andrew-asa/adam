<template>
  <search-pane
    :placeholder="placeholder"
    @search="search"
    @clear="clearSearch"
  ></search-pane>
  <el-button
    type="success"
    @click="click"
    >获取列表</el-button
  >
  <el-button
    type="success"
    @click="add"
    >添加</el-button
  >
  <div class="apps-container">
    <el-card
      class="app-item"
      v-for="app in apps"
    >
      <div>
        {{ app._name }}
      </div>
    </el-card>
  </div>
</template>
<script setup lang="ts">
import SearchPane from '@renderer/components/lib/search_pane.vue'
import { getApps } from '../utils/app/app_api'
import { ref } from 'vue'
import _ from 'lodash';

const placeholder = '搜索'
const apps: any = ref([])

const add = () => {
  apps.value.push({
    _name: 'xxxxx'
  })
}
const click = () => {
  console.log('getApps')
  if (!apps.value.length) {
    getApps().then(({ data }) => {
      _.concat(apps.value,data)
    })
  }
}
const search = (searchText) => {}
const clearSearch = () => {}
</script>
<style scoped></style>
