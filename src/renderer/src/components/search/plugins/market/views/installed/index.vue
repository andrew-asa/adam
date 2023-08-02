<template>
  <a-layout style="max-height: 500px; height: 500px">
    <a-layout-sider
      class="installed-list"
      width="300"
    >
      left
    </a-layout-sider>
    <a-layout-content>
      <div>prev</div>
    </a-layout-content>
  </a-layout>
</template>
<script setup lang="ts">
import { onMounted } from 'vue';


onMounted(() => {
  console.log('dev onMounted')
})
</script>
<style scoped lang="less">
.installed-list {
    background-color: aliceblue;
}
</style>
