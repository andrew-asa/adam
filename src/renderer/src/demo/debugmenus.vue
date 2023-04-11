<template>
  <context-menu :name="`show_debug_contextmenus`">
    <context-menu-item @click="forward"> 前进 </context-menu-item>
    <context-menu-item @click="back"> 后退 </context-menu-item>
    <context-menu-item @click="openConsole"> 检查 </context-menu-item>
  </context-menu>
  <div
    v-if="showButton"
    v-contextmenu="{ name: 'show_debug_contextmenus' }"
  >
    检查
  </div>
</template>
<script setup lang="ts">
import { ctx } from '@/renderer/src/startup/ctx_starter.js'
import { inject } from 'vue'
const props: any = defineProps({
  showButton: {
    type: Boolean,
    default: false
  }
})
const emitContext = inject('emitContext') as (event: Event, dataId: Record<string, unknown>) => void
const forward = () => {
  // console.log('forward')
  ctx.app.controller.forward()
}
const back = () => {
  // console.log('back')
  ctx.app.controller.back()
}
const openConsole = () => {
  ctx.app.controller.openConsole()
}
function openContextMenu(e: any) {
  emitContext(e, { name: 'show_debug_contextmenus' })
}
defineExpose({ openContextMenu })
</script>

<style scoped></style>
