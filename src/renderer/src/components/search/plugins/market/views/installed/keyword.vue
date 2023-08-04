<template>
  <div class="keyword-container">
    <div v-for="feature in features">
      <Keyworditem
      v-for="cmd in feature.cmds"
      :value="cmd"
      />
      <div class="mt-2">{{ feature.explain }}</div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ThirdPluginFeature } from '@/common/core/plugins'
import Keyworditem from './keyworditem.vue'

const props = defineProps({
  features: {
    type: Array<ThirdPluginFeature>,
    default: []
  }
})
</script>
<style scoped lang="less">
.keyword-container {
}
</style>
