<template>
  <div
    class="container"
    ref="container"
  >
    <a-list>
      <a-list-item
        v-for="(item, index) in list"
        :key="index"
        :class="currentSelect === index ? 'active op-item' : 'op-item'"
      >
        {{ `index:${index} value:${item}` }}
      </a-list-item>
    </a-list>
  </div>
</template>
<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import BScrollCore from '@better-scroll/core'
import MouseWheel from '@better-scroll/mouse-wheel'
import ScrollBar from '@better-scroll/scroll-bar'
const container = ref(null)
const list = Array.from({ length: 100 }, () => Math.random().toString(36).substring(2))
const currentSelect = ref(0)
var bs = null
const handleKeyDown = (event) => {
  if (event.key === 'Tab') {
    event.preventDefault()
    currentSelect.value += 1
    currentSelect.value %= list.length
    const targetElement = container.value.querySelectorAll('.op-item')[currentSelect.value]
    const targetRect = targetElement.getBoundingClientRect()
    const containerRect = container.value.getBoundingClientRect()
    if (targetRect.top < containerRect.top || targetRect.bottom > containerRect.bottom) {
      bs && bs.scrollToElement(targetElement, 300)
      console.log(`屏幕之外 currentSelect:${currentSelect.value}`)
    }
  }
}

onMounted(() => {
  bs = new BScrollCore(container.value, {
    plugins: [MouseWheel, ScrollBar],
    scrollY: true,
    scrollbar: {
      interactive: false, // 设置为false以禁用交互
      fade: false // 设置为false以防止滚动条淡入淡出效果
      //   offsetLeft: container.value.offsetWidth - 8 // 滚动条距离wrapper右侧的偏移量
    }
  })
  //   console.log(`onMounted bs=${json.stringify(bs)}` );

  window.addEventListener('keydown', handleKeyDown)
})
</script>
<style lang="less">
.container {
  width: 500px;
  height: 500px;
  z-index: 99;
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
