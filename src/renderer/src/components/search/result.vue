<template>
  <div>
    <div
      v-show="!!options.length && (searchValue || !!clipboardFile.length) && !currentPlugin.name"
      class="options"
      ref="scrollDom"
    >
      <a-list
        item-layout="horizontal"
        :dataSource="sort(options)"
      >
        <template #renderItem="{ item, index }">
          <a-list-item
            @click="() => clickPlugin(item)"
            @dblclick="() => dblclickPlugin(item)"
            :class="currentSelect === index ? 'active op-item' : 'op-item'"
          >
            <a-list-item-meta :description="renderDesc(item.path || item.desc)">
              <template #title>
                <span v-html="renderTitle(item.selectName || item.name)"></span>
              </template>
              <template #avatar>
                <a-avatar
                  style="border-radius: 0"
                  :src="item.icon_path"
                />
              </template>
            </a-list-item-meta>
          </a-list-item>
        </template>
      </a-list>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, onMounted, ref, watch, watchEffect } from 'vue'

const scrollDom = ref(null)

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

const renderTitle = (title) => {
  if (typeof title !== 'string') return
  if (!props.searchValue) return title
  const result = title.toLowerCase().split(props.searchValue.toLowerCase())
  if (result && result.length > 1) {
    return `<div>${result[0]}<span style='color: red'>${props.searchValue}</span>${result[1]}</div>`
  } else {
    return `<div>${result[0]}</div>`
  }
}

const renderDesc = (desc) => {
  if (desc.length > 80) {
    return `${desc.substr(0, 63)}...${desc.substr(desc.length - 14, desc.length)}`
  }
  return desc
}

const sort = (options) => {
  for (let i = 0; i < options.length; i++) {
    for (let j = i + 1; j < options.length; j++) {
      if (options[j].zIndex > options[i].zIndex) {
        let temp = options[i]
        options[i] = options[j]
        options[j] = temp
      }
    }
  }
  return options
}

const scrollToVisible = (currentSelect) => {
  const parent = scrollDom.value
  const targetElement = parent.querySelectorAll('.op-item')[currentSelect]
  const targetRect = targetElement.getBoundingClientRect()
  const containerRect = scrollDom.value.getBoundingClientRect()
  if (targetRect.top < containerRect.top || targetRect.bottom > containerRect.bottom) {
    parent.scrollTop = targetElement.offsetTop - parent.offsetTop
  }
}
watch(
  () => props.currentSelect,
  (newValue, oldValue) => {
    scrollToVisible(newValue)
  }
)
const emit = defineEmits([
  // 单击插件
  'onClickPlugin',
  // 双击插件
  'onDblclickPlugin'
])

const clickPlugin = (plugin) => {
  // console.log(`${plugin.name} click`)
  emit('onClickPlugin', plugin)
}
const dblclickPlugin = (plugin) => {
  // console.log(`${plugin.name} dblclick`)
  emit('onClickPlugin', plugin)
}
</script>

<style lang="less">
.options {
  // position: absolute;
  // top: 62px;
  // left: 0;
  width: 100%;
  z-index: 99;
  max-height: calc(~'100vh - 64px');
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
