<template>
  <el-button
    type="success"
    @click="getApps"
    >获取列表</el-button
  >
</template>
<script setup lang="ts">
import appSearch from '@/common/core/app-search'
const getApps = async () => {
  console.log('getApps')
  const value = await appSearch()
  console.log(value)
}
</script>
<style scoped></style>
