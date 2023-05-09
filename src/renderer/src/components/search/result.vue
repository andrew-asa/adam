<template>
  <div v-for="option in options">{{ option.name || option._name }}</div>
</template>
<script setup lang="ts">
const props = defineProps({
  searchValue: {
    type: [String, Number],
    default: ''
  },
  options: {
    type: Array,
    default: (() => [])()
  },
  currentSelect: {
    type: Number,
    default: 0
  },
  currentPlugin: {},
  clipboardFile: (() => [])()
})
</script>
<style scoped lang="less"></style>
