<template>
  <div>
    <search-pane @search="search"></search-pane>
  </div>
  <div>
    <result :options="options"></result>
  </div>
</template>
<script setup lang="ts">
import result from '@renderer/components/search/result.vue'
import searchPane from '@renderer/components/lib/search_pane.vue'
import { userStore } from './result_store';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
const store = userStore()
const { options } = storeToRefs(store)
const add = () => {
    store.addOption({
        name: 'xxxxx'
    })
}
const initOptions = () => {
    store.initOptions()
}
onMounted(() => {
  initOptions()
})

const search = (searchText) => {
  store.search(searchText)
}
</script>
<style scoped></style>
