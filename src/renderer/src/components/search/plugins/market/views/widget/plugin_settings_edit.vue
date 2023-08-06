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
        <a-input
          v-model:value="settings[key]"
          style="width: 500px"
        />

        <a-popconfirm
          title="确认删除?"
          ok-text="Yes"
          cancel-text="No"
          @confirm="confirmDelete(key)"
          @cancel="cancelDelete"
        >
          <a-button
            type="text"
            shape="round"
            danger
          >
            <template #icon>
              <delete-outlined />
            </template>
          </a-button>
        </a-popconfirm>

        <!-- <delete-outlined class="ml-4 text-gray-500 hover:brightness-75 transition duration-300 ease-in-out transform hover:scale-110"/> -->
      </a-form-item>
    </div>
    <div v-if="addItemShow">
      <a-form-item
        label="key"
        :label-col="{ span: 2 }"
        style="display: flex; margin-bottom: 8px"
      >
        <a-input
          v-model:value="itemName"
          style="width: 100px"
          ref="newIteminputRef"
        />
        <div class="ant-col ant-col-2 ant-form-item-label ml-5">
          <label
            class=""
            title="key"
            >value</label
          >
        </div>
        <a-input
          v-model:value="itemValue"
          style="width: 332px"
        />

        <a-button
          type="text"
          shape="round"
          danger
          @click="deleteAddItem"
        >
          <template #icon>
            <delete-outlined />
          </template>
        </a-button>

        <a-popover>
          <template #content>
            <span>保存</span>
          </template>
          <a-button
            type="text"
            shape="round"
            @click="saveAddItem"
          >
            <template #icon>
              <save-outlined />
            </template>
          </a-button>
        </a-popover>
      </a-form-item>
    </div>
    <a-form-item :wrapper-col="{ offset: 2, span: 16 }">
      <a-button
        type="primary"
        html-type="submit"
        @click="addSettingsItem"
        >添加</a-button
      >
      <a-button
        type="primary"
        html-type="submit"
        class="ml-4"
        @click="saveSettings"
        >保存</a-button
      >
      <a-button
        type="primary"
        html-type="submit"
        class="ml-4"
        @click="resetSettings"
        >恢复默认</a-button
      >
    </a-form-item>
  </a-drawer>
</template>
<script setup lang="ts">
import { PropType, ref } from 'vue'
import { ArrowLeftOutlined, DeleteOutlined, SaveOutlined } from '@ant-design/icons-vue'
import _ from 'lodash'
import { message } from 'ant-design-vue'

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
const newIteminputRef = ref()
const emit = defineEmits([
  // 关闭事件
  'onClose',
  // 保存配置
  'onSave',
  // 重置
  'onReset'
])

const addItemShow = ref(false)
const confirmLoading = ref<boolean>(false)
const itemName = ref<string>('')
const itemValue = ref<string>('')
const hideAddItem = () => {
  addItemShow.value = false
  resetAddItem()
}
const deleteAddItem = () => {
  hideAddItem()
}
const resetAddItem = () => {
  itemName.value = ''
  itemValue.value = ''
}
const addSettingsItem = () => {
  if (addItemShow.value) {
    message.info('存在正在添加项目，请先保存')
    newIteminputRef.value.focus()
  } else {
    addItemShow.value = true
    resetAddItem()
  }
}
const beforeSaveItemCheck = () => {
  if (addItemShow.value && !itemName.value) {
    message.error('key值不能为空')
    newIteminputRef.value.focus()
    return false
  }
  return true
}
const getSaveItem = () => {
  const s = _.clone(props.settings)
  if(addItemShow.value && itemName.value) {
    s[itemName.value] = itemValue.value
  }
  return s
}
const saveAddItem = () => {
  if (beforeSaveItemCheck()) {
    addItemShow.value = false
    props.settings[itemName.value] = itemValue.value
    resetAddItem()
    // emit('onSave',getSaveItem())
  }
}

const close = () => {
  emit('onClose')
  deleteAddItem()
}

const deleteSettingItem = (key) => {
  delete props.settings[key]
}
/**
 * 确认删除
 */
const confirmDelete = (key) => {
  deleteSettingItem(key)
  // emit('onSave',getSaveItem())
}

const cancelDelete = () => {}

const saveSettings = () => {
  if (beforeSaveItemCheck()) {
    emit('onSave', getSaveItem())
    hideAddItem()
  }
}

const resetSettings = () => {
  emit('onReset')
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
