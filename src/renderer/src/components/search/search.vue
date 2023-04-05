<template>
  <div class="adam-select">
    <div class="adam-select-tag"></div>
    <el-input
      id="search"
      class="search-input"
      ref="mainInput"
      :placeholder="placeholder"
      :value="searchValue"
    >
      <template #suffix>
        <el-icon>
          <Close
            v-show="searchText"
            @click="clearSearch"
          />
        </el-icon>
      </template>
    </el-input>
  </div>
</template>
<script setup lang="ts">
const props: any = defineProps({
  searchValue: {
    type: [String, Number],
    default: ''
  },
  placeholder: {
    type: String,
    default: 'Hi, adam'
  },
  currentPlugin: {},
  pluginLoading: Boolean,
  clipboardFile: (() => [])()
})
</script>
<style scoped lang="less"></style>
