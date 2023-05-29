<template>
  <div
    class="wrapper options"
    ref="wrapper"
  >
    <div
      v-for="(item, index) in list"
      :key="index"
      :class="currentSelect === index ? 'active op-item' : 'op-item'"
    >
      {{ `index:${index} value:${item}` }}
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, onUnmounted, ref, watch } from 'vue'

const list = Array.from({ length: 16 }, () => Math.random().toString(36).substring(2))
const currentSelect = ref(0)
const wrapper = ref(null)
const setCurrentSelect = (index: number) => {
  var len = list.length
  if (len > 0) {
    var i = (currentSelect.value + index) % len
    currentSelect.value = i >= 0 ? i : len - 1
  }
}
const handleKeyDown = (event) => {
  if (event.key === 'Tab') {
    event.preventDefault()
    setCurrentSelect(1) 
    // event.preventDefault()
  }
  if (event.code === 'ArrowUp') {
    setCurrentSelect(-1)
  }
  if (event.key === 'ArrowDown') {
    setCurrentSelect(1)
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
})
onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
})

const scrollToVisible = () => {
  const wrapperEl = wrapper.value
  const currentEl = wrapperEl.querySelector('.active')
  if (!currentEl) {
    return
  }
  const wrapperRect = wrapperEl.getBoundingClientRect()
  const currentRect = currentEl.getBoundingClientRect()
  if (currentRect.bottom > wrapperRect.bottom) {
    wrapperEl.scrollTop += currentRect.bottom - wrapperRect.bottom
  } else if (currentRect.top < wrapperRect.top) {
    wrapperEl.scrollTop -= wrapperRect.top - currentRect.top
  }
}

// 监听 currentSelect 的变化，并自动滚动到可见
watch(currentSelect, scrollToVisible)
</script>

<style lang="less" scoped>
.options {
  // position: absolute;
  // top: 62px;
  // left: 0;
  width: 600px;
  height: 400px;
  z-index: 99;
  // max-height: calc(~'100vh - 64px');
  overflow: auto;
  .op-item {
    padding: 0 10px;
    height: 60px;
    line-height: 50px;
    max-height: 500px;
    overflow: auto;
    background: #fafafa;
    &.active {
      background: #dee2e8;
    }
  }
}
</style>
