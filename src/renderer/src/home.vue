<template>
  <demo_index ref="index"></demo_index>
  
</template>
<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import demo_index from './demo/demo_index.vue'

const dmenus = ref(null)
const index = ref(null)
onMounted(() => {
  // console.log('home onMounted')
})
onUnmounted(() => {
  // console.log('home onUnmounted')
})
</script>
<style scoped></style>
