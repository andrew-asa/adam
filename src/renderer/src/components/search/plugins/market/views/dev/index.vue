<template>
 dev   
</template>
<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';

onMounted(()=>{
   console.log('dev onMounted') 
})
onUnmounted(() => {
   console.log('dev onUnmounted')
})
</script>
<style scoped>
</style>