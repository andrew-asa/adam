<template>
  <tabs :tabs="tabsItem" :select-key="select" @switch="switchTab"> </tabs>
</template>
<script setup lang="ts">
import tabs from '@renderer/components/widgets/tabs/tabs.vue'
import tab from '@renderer/components/widgets/tabs/tab.vue'
import { TabItem } from '../components/widgets/tabs/types'
import { ref } from 'vue'
const tabsItem: TabItem[] = [
  {
    key: 'tab1',
    label: 'tab1'
  },
  {
    key: 'tab2',
    label: 'tab2'
  }
]
const select = ref('tab1')  
const switchTab = (item: TabItem) => {
  select.value = item.key
}
</script>
<style scoped></style>
