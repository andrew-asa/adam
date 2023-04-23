<template>
  <el-button
    type="success"
    @click="click"
    >获取列表</el-button
  >
</template>
<script setup lang="ts">
import getApps  '@/common/core/app-search'
const click = () => {
  console.log('getApps')
  getApps()
    .then((appNames) => {
      console.log(appNames)
    })
    .catch((err) => {
      console.error(err)
    })
}
</script>
<style scoped></style>
