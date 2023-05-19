<template>
  <div>
    <search-pane
      @search="search"
      @clear="clear"
    ></search-pane>
    <el-icon
      class="op-icon"
      @click="dialogVisible = true"
      ><Setting
    /></el-icon>
  </div>
  <el-dialog
    v-model="dialogVisible"
    title="设置"
    width="30%"
    :before-close="handleClose"
  >
    <el-form-item label="每页行数">
      <el-input v-model="form.pageCount" />
    </el-form-item>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button
          type="primary"
          @click="settingSure"
        >
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
  <div>
    <result :options="options" :searchValue="searchValue" :currentSelect="currentSelect"></result>
  </div>
</template>
<script setup lang="ts">
import result from '@renderer/components/search/result.vue'
import searchPane from '@renderer/components/lib/search_pane.vue'
import { userStore } from './result_store'
import { storeToRefs } from 'pinia'
import { onMounted, reactive, ref, watch } from 'vue'
const store = userStore()
const { options, pageCount,searchValue,currentSelect } = storeToRefs(store)
const dialogVisible = ref(false)

const form = reactive({
  pageCount: pageCount
})

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
const clear = () => {
  search('')
}
const handleClose = () => {
  dialogVisible.value = false
}

const settingSure = () => {
  handleClose()
  store.setPageCount(form.pageCount)
}
// watch(pageCount, () => {
//   console.log(`pageCount: ${pageCount.value}`);
// })
</script>
<style scoped></style>
