<template>
  <div class="flex justify-center p-4">
    <div>
        <a-input-search
          v-model:value="searchText"
          placeholder="按键回车搜索"
          style="width: 800px"
          @search="onSearch"
          @keydown.enter="onSearch"
        />
    </div>
  </div>


  <div class="flex flex-wrap">
    <div
      v-for="(item, index) in routers"
      :key="index"
      class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2"
    >
      <span
        class="hover:underline cursor-pointer"
        @click="read(item)"
        >{{ item.path }}</span
      >
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import router from '../router/index'
const routers = ref(router.getRoutes())
const searchText = ref('')
const onSearch = () => {
  if (searchText.value) {
    routers.value = router.getRoutes().filter((item) => {
      return item.path.includes(searchText.value)
    })
  } else {
    routers.value = router.getRoutes()
  }
}
const read = (item: any) => {
  router.push(item.path)
  // console.log(item)
}
</script>
<style scoped></style>
