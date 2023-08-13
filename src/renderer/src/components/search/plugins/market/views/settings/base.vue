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
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'
import { QuestionCircleOutlined } from '@ant-design/icons-vue'
import { userStore } from './plugins_settings_store'
import { storeToRefs } from 'pinia'
const store = userStore()   
const {
    autoPasteIntoSearch
} = storeToRefs(store)
watch(autoPasteIntoSearch, () => {
    store.doSaveSettings()
})
</script>
<style scoped></style>
