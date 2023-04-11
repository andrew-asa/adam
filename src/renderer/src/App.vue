<template>
  <router-view></router-view>
</template>
<script setup lang="ts">
import debugmenus from '@renderer/demo/debugmenus.vue'
import { onMounted, onUnmounted, ref } from 'vue'

const dmenus = ref(null)
function openContextmenu(e: any) {
  // dmenus.value.openContextMenu(e)
  // console.log('app openContextmenu')
}
onMounted(() => {
  // console.log('app onMounted')
  // console.log(dmenus.value.openContextMenu)
  document.addEventListener('contextmenu', openContextmenu)
})
onUnmounted(() => {
  // console.log('app onUnmounted')
  document.removeEventListener('contextmenu', openContextmenu)
})
</script>
<style>
body {
  -webkit-app-region: drag;
}
</style>
