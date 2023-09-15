<template>
  <div class="pt-2">
    <label class="text-xl text-blue-500">{{ $t('feature.settings.base.normal') }}</label>
    <div class="detail mt-2">
      <div class="flex">
        <div class="flex-1">
          <label>{{ $t('feature.settings.base.autopaste') }}</label>
          <a-popover>
            <template #content>
              {{ $t('feature.settings.base.autopaste_explain') }}
            </template>
            <question-circle-outlined class="ml-2"></question-circle-outlined>
          </a-popover>
        </div>
        <div class="flex-1 flex justify-end mr-4">
          <a-switch v-model:checked="autoPasteIntoSearch"></a-switch>
        </div>
      </div>
      <div class="flex pt-3">
        <div class="flex-1">
          <label>{{ $t('feature.settings.base.placeholder') }}</label>
        </div>
        <div class="flex-1 flex justify-end mr-4">
          <a-input
            v-model:value="placeholder"
            :placeholder="default_conf.placeholder"
          />
          <a-button
            class="ml-2"
            type="primary"
            @click="placeholderSure"
          >
            确定</a-button
          >
          <a-button
            class="ml-2"
            type="primary"
            @click="placeholderReset"
          >
            重置</a-button
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'
import { QuestionCircleOutlined } from '@ant-design/icons-vue'
import { userStore } from './plugins_settings_store'
import { default_conf } from '@renderer/components/search/services/SearchConfigureServices'
import { storeToRefs } from 'pinia'
import { message } from 'ant-design-vue'
const store = userStore()
const { autoPasteIntoSearch } = storeToRefs(store)
const placeholder = ref('')
watch(autoPasteIntoSearch, () => {
  store.doSaveSettings()
})
const placeholderSure = () => {
  if (placeholder.value) {
    store.setPlaceholder(placeholder.value)
    message.success('设置成功')
  }
}

const placeholderReset = () => {
  placeholder.value = default_conf.placeholder
  placeholderSure()
}
</script>
<style scoped></style>
