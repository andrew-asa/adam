<template>
  <el-form-item
    label="输入"
    class="form-item"
  >
    <el-input
      v-model="value"
      @keypress.enter="translate"
    />
  </el-form-item>

  <el-select
    placeholder="源语言"
    class="language-select"
    v-model="from"
  >
    <el-option
      v-for="item in languages"
      :key="item"
      :label="item"
      :value="item"
    ></el-option>
  </el-select>

  <span> => </span>
  <el-select
    placeholder="目标语言"
    class="language-select"
    v-model="to"
  >
    <el-option
      v-for="item in languages"
      :key="item"
      :label="item"
      :value="item"
    ></el-option>
  </el-select>
  <el-button
    type="primary"
    @click="reset_default"
    >默认</el-button
  >
  <el-form-item
    label="翻译结果"
    class="form-item"
  >
    <el-input
      type="textarea"
      v-model="translateText"
    />
  </el-form-item>
  <el-form-item
    label="检测结果"
    class="form-item"
  >
    <el-input
      type="textarea"
      v-model="checkResult"
    />
  </el-form-item>
  <el-button
    type="success"
    @click="translate"
  >
    翻译</el-button
  >
  <el-button
    type="success"
    @click="check"
  >
    检测</el-button
  >
</template>
<script setup lang="ts">
import SearchPane from '@renderer/components/lib/search_pane.vue'
import { ref } from 'vue'

import GoogleTranslator from '../components/translators/google'
const value = ref('你好')

const translateText = ref('')
const checkResult = ref('')
let translator = new GoogleTranslator()
let languages = translator.supportedLanguages()
const from_defalut = 'zh-CN'
const to_default = 'en'
const from = ref(from_defalut)
const to = ref(to_default)
const translate = () => {
  translator.translate(value.value, from.value, to.value).then((res) => {
    translateText.value = res.mainMeaning
  })
}
const reset_default = () => {
  from.value = from_defalut
  to.value = to_default
}
const check = () => {
  translator.detect(value.value).then((res) => {
    checkResult.value = res
    if (res === 'zh-CN') {
      to.value = 'en'
      from.value = 'zh-CN'
    } else if (res === 'en') {
      to.value = 'zh-CN'
      from.value = 'en'
    }
  })
}
</script>
<style scoped>
.form-item {
  width: 500px;
}
.language-select {
  width: 150px;
}
</style>
