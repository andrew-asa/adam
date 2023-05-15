<template>
  <div class="options">
    <el-scrollbar>
      
      <div class= "op-item" v-for="option in options">
        <el-avatar shape="square" :size="50" :src="`${option.icon_path}`" />
        {{ option.name }}
      </div>
    </el-scrollbar>
  </div>
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
<style scoped lang="less">
.options {
  position: absolute;
  top: 62px;
  left: 0;
  width: 100%;
  z-index: 99;
  max-height: calc(~'100vh - 64px');
  overflow: auto;
  background: var(--color-body-bg);
  .op-item {
    padding: 0 10px;
    height: 60px;
    line-height: 50px;
    max-height: 500px;
    // overflow: auto;
    // background: var(--color-body-bg);
    // color: var(--color-text-content);
    // border-color: var(--color-border-light);
    // &.active {
    //   background: var(--color-list-hover);
    // }
    // .ant-list-item-meta-title {
    //   color: var(--color-text-content);
    // }
    // .ant-list-item-meta-description {
    //   color: var(--color-text-desc);
    // }
  }
}
</style>
