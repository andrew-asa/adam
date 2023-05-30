<template>
  <el-input @keydown="keydown"></el-input>
  <div>key:{{ key }}</div>
  <div>code:{{ code }}</div>
  <div>keycode:{{ keycode }}</div>
  <div>stringify:{{ s }}</div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const key = ref('')
const code = ref('')
const keycode = ref()
const s = ref('')
const keydown = (e: KeyboardEvent) => {
  key.value = e.key
  code.value = e.code
  keycode.value = e.keyCode
  //   s.value = JSON.stringify(e)
  console.log(e)
}
</script>
<style scoped></style>
