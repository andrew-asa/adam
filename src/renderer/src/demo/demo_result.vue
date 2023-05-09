<template>
  <div>
    <el-button type="primary" @click="initOptions">获取app</el-button>
    <el-button type="primary" @click="add">添加</el-button>
  </div>
  <div>
    <result :options="options"></result>
  </div>
</template>
<script setup lang="ts">
import result from '@renderer/components/search/result.vue'
import { userStore } from './result_store';
import { storeToRefs } from 'pinia';
const store = userStore()
const { options } = storeToRefs(store)
const add = () => {
    store.addOption({
        name: 'xxxxx'
    })
}
const initOptions = () => {
    store.initOptions()
}
</script>
<style scoped></style>
