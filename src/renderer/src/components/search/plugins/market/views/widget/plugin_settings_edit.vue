<template>
  <a-drawer
    width="100%"
    placement="right"
    :closable="false"
    :visible="visible"
    :mask-closable="false"
    :get-container="false"
    @close="close()"
  >
    <template #title>
      <div class="plugin-title-info">
        <div
          class="text-lg mr-10"
          @click="close()"
        >
          <ArrowLeftOutlined />
        </div>
        <div class="info">
          <img
            :src="detail.logo"
            class="plugin-icon"
          />
          <div class="plugin-desc">
            <div class="title">
              {{ detail.pluginName }}
            </div>
            <div class="desc">用户配置设置</div>
          </div>
        </div>
      </div>
    </template>
    <div v-for="(value, key) in settings">
      <a-form-item
        :label="key"
        :label-col="{ span: 2 }"
        style="display: flex; margin-bottom: 8px"
      >
        <a-input v-model:value="settings[key]" style="width: 500px;" />
        <a-button
          type="text"
          shape="round"
          danger
          @click="deleteSettingItem(key)"
        >
          <template #icon>
            <delete-outlined />
          </template>
        </a-button>
        <!-- <delete-outlined class="ml-4 text-gray-500 hover:brightness-75 transition duration-300 ease-in-out transform hover:scale-110"/> -->
      </a-form-item>
    </div>
    <a-form-item :wrapper-col="{ offset: 2, span: 16 }">
      <a-button
        type="primary"
        html-type="submit"
        @click="addSettings"
        >添加</a-button
      >
      <a-button
        type="primary"
        html-type="submit"
        class="ml-4"
        >保存</a-button
      >
      <a-button
        type="primary"
        html-type="submit"
        class="ml-4"
        >重置</a-button
      >
    </a-form-item>
  </a-drawer>
</template>
<script setup lang="ts">
import { PropType } from 'vue'
import { ArrowLeftOutlined, DeleteOutlined } from '@ant-design/icons-vue'
import _ from 'lodash'

const props = defineProps({
  detail: {
    type: [Object],
    default: ''
  },
  visible: {
    type: Boolean,
    default: false
  },
  settings: {
    type: Object,
    default: {}
  }
})

const emit = defineEmits([
  // 关闭事件
  'onClose',
  // 保存配置
  'onSave'
])

const close = () => {
  emit('onClose')
}

const addSettings = () => {}

const deleteSettingItem = (key) => {

}
</script>
<style scoped lang="less">
.plugin-title-info {
  display: flex;
  align-items: flex-start;

  .info {
    display: flex;
    align-items: center;
  }

  .plugin-icon {
    width: 100px;
    height: 100px;
    margin-right: 20px;
  }

  .plugin-desc {
    .title {
      font-size: 18px;
      font-weight: bold;
      color: var(--color-text-primary);
    }

    .desc {
      font-size: 12px;
      font-weight: normal;
      margin-top: 5px;
      margin-bottom: 20px;
      color: var(--color-text-desc);
    }
  }
}
</style>
