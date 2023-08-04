<template>
  <a-button
    v-if="isKeyword(value)"
    type="primary" shape="round" size="small"
    class="mr-2 mt-1"
  >
    <template #icon>
      <plus-outlined />
    </template>
    {{ value }}
  </a-button>
</template>
<script setup lang="ts">
import _ from 'lodash'
import { PlusOutlined } from '@ant-design/icons-vue'
const props = defineProps({
  value: {
    type: [Object, String, null],
    default: ''
  }
})

const isKeyword = (value) => {
  return _.isString(value)
}
const isOver = (value: any) => {
  // @ts-ignore
  return _.isObject(value) && value.type && value.type === 'over'
}
const isFile = (value: any) => {
  // @ts-ignore
  return _.isObject(value) && value.type && value.type === 'file'
}
</script>
<style scoped lang="less">
</style>
