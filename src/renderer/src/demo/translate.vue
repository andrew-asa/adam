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
  <el-form-item
    label="翻译引擎"
    class="form-item"
  >
    <el-select
      placeholder="请选择"
      style="width: 300px"
      v-model="select"
    >
      <el-option
        v-for="item in engines"
        :key="item.name"
        :label="item.name"
        :value="item.name"
      ></el-option>
    </el-select>
  </el-form-item>
  <el-form-item
    label="翻译结果"
    class="form-item"
  >
    <el-input
      type="textarea"
      v-model="translateText"
    />
  </el-form-item>
  <el-button
    type="success"
    @click="translate"
  >
    翻译</el-button
  >
</template>
<script setup lang="ts">
import SearchPane from '@renderer/components/lib/search_pane.vue'
import { ref } from 'vue'
import BaiduTranslator from '../components/translators/baidu'
import BingTranslator from '../components/translators/bing'
import GoogleTranslator from '../components/translators/google'
const value = ref('你好')

const translateText = ref('')
let TRANSLATOR = null
const engines = [
  {
    name: '百度翻译',
    engine: new BaiduTranslator()
  },
  {
    name: 'google翻译',
    engine: new GoogleTranslator()
  },
  {
    name: '必应翻译',
    engine: new BingTranslator()
  }
]
const select = ref(engines[1].name)
const translate = () => {
  if (select.value) {
    TRANSLATOR = engines.find((item) => item.name === select.value).engine
    TRANSLATOR.translate(value.value, 'zh-CN', 'en').then((res) => {
      translateText.value = res.mainMeaning
    })
  }
}
</script>
<style scoped>
.form-item {
  width: 500px;
}
</style>
