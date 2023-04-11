<template>
  <div class="adam-select">
    <div
      class="select-tag"
      v-show="currentPlugin.cmd"
    >
      {{ currentPlugin.cmd }}
    </div>
    <el-input
      id="search"
      class="main-input"
      ref="mainInput"
      v-model="searchValue"
      :placeholder="placeholder"
      @focus="emit('focus')"
      @input="(e) => changeValue(e)"
    >
      <template #suffix>
        <div class="suffix-tool">
          <el-icon class="icon-more"><More /></el-icon>
          <div
            v-if="currentPlugin && currentPlugin.logo"
            style="position: relative"
          >
            <img
              class="icon-tool"
              :src="currentPlugin.logo"
            />
          </div>
          <div
            v-else
            class="adam-logo"
          >
            <img src="../../assets/jarvis_64x64.png" />
          </div>
        </div>
      </template>
    </el-input>
  </div>
</template>
<script setup lang="ts">
import { ctx } from '@/renderer/src/startup/ctx_starter.js'
import { defineProps, defineEmits, ref, onMounted } from 'vue'
const props: any = defineProps({
  searchValue: {
    type: [String, Number],
    default: ''
  },
  placeholder: {
    type: String,
    default: 'Hi, adam'
  },
  currentPlugin: {
    type: Object,
    default: {
      // cmd: '微信',
      // logo:'src/assets/jarvis_64x64.png'
    }
  },
  pluginLoading: Boolean,
  clipboardFile: (() => [])()
})

const emit = defineEmits([
  'onSearch',
  'changeCurrent',
  'openMenu',
  'changeSelect',
  'choosePlugin',
  'focus',
  'clearSearchValue',
  'readClipboardContent'
])

const mainInput = ref(null)
ctx.app.search.hooks.onShow = () => {
  if (mainInput) {
    var $input = mainInput.value.$el.querySelector('input')
    $input && $input.focus()
  }
}
ctx.app.search.hooks.onHide = () => {
  emit('clearSearchValue')
}
onMounted(() => {
  var $input = mainInput.value.$el.querySelector('input')
  $input.classList.add('search-input')
  // console.log(mainInput.value.querySelector('input'))
})
const searchValue = ref(props.searchValue)
const changeValue = (e) => {
  if (props.currentPlugin.name === 'adam-system-feature') return;
  targetSearch(e)
  emit('onSearch', e)
}
const targetSearch = (text) => {
  if (props.currentPlugin.name) {
    ctx.app.controller.sendSubInputChangeEvent(text)
  }
}
</script>
<style lang="less">
.adam-select {
  display: flex;
  padding-left: 10px;
  background: #fff;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  align-items: center;
  .select-tag {
    white-space: pre;
    user-select: none;
    font-size: 18px;
    border-radius: 16px;
    height: 32px;
    position: relative;
    color: #fff;
    background-color: rgba(255, 78, 164, 0.8);
    display: inline-flex;
    align-items: center;
    margin-right: 1px;
    padding: 0 10px;
  }
  .main-input {
    height: 60px !important;
    box-sizing: border-box;
    flex: 1;
    border: none;
    outline: none;
    box-shadow: none !important;
    .search-input {
      height: 100% !important;
      font-size: 22px;
      border: none !important;
    }
  }

  .adam-logo,
  .icon-tool {
    width: 40px;
    height: 40px;
    background: #574778;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 100%;
    img {
      width: 32px;
    }
  }
  .icon-tool {
    background: #fff;
  }

  .main-input .el-input__inner:focus {
    border: none;
    box-shadow: none;
  }
  .el-input {
    // --el-input-focus-border: #cdd0d6;
    // --el-input-focus-border-color: #cdd0d6;
    --el-input-focus-border: none;
    --el-input-focus-border-color: none;
  }
  .suffix-tool {
    display: flex;
    align-items: center;
    .icon-more {
      font-size: 26px;
      font-weight: bold;
      cursor: pointer;
      transform: rotate(90deg);
    }
  }
}
</style>
