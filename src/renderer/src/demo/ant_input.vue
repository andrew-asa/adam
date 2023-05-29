<template>
  <div class="suggest-content">
    <a-input
      :placeholder="placeholder"
      :v-model="inputValue"
      class="intput-content"
    >
    </a-input>
    <span class="suggest">{{ suggest }}</span>
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'
const placeholder = ref('输入文本内容')
const suggest = ref('')
const inputValue = ref('')

</script>
<style scoped>
.suggest-content {
  width: 400px;
}
.input-content {
  width: 100%;
  position: relative;
  z-index: 1;
}
.suggest {
  position: absolute;
  /* top: 50%; */
  left: 0px;

  /* transform: translateY(-50%); */
  color: #aaa;
  pointer-events: none;
  z-index: 0;
  padding: 4px 11px;
}
</style>
