<template>
  <a-popover
    trigger="click"
    :overlayClassName="'popover-content-p-0'"
  >
    <template #content>
      <div class="keyworld-options">
        <div
          class="options-item shadow-md"
          @click="run(value)"
        >
          <span>
            <caret-right-outlined />
          </span>
          <span class="ml-2"> {{ $t('feature.installed.keyword.play') }}</span>
        </div>
      </div>
    </template>
    <a-button
      v-if="isKeyword(value)"
      type="primary"
      shape="round"
      size="small"
      class="mr-2 mt-1"
    >
      <template #icon>
        <plus-outlined />
      </template>
      {{ value }}
    </a-button>
  </a-popover>
</template>
<script setup lang="ts">
import _ from 'lodash'
import { PlusOutlined, CaretRightOutlined } from '@ant-design/icons-vue'
const props = defineProps({
  value: {
    type: [Object, String, null],
    default: ''
  }
})
const emit = defineEmits(['run'])
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

const run = (v) => {
  emit('run', v)
}
</script>
<style scoped lang="less">
.keyworld-options {
  padding: 0 !important;
  width: 150px;
}
</style>
