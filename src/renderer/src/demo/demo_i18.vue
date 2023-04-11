<template>
 <div>
    <!-- <p>{{ $t('hello') }}, {{ $t('world') }}!</p> -->

    <!-- {{ i18.t('hello') }} -->
  </div>   
</template>
<script setup lang="ts">
import { createI18n } from 'vue-i18n';
 
const i18 = createI18n({
  locale: 'en', // set the initial locale
  messages: {
    en: {
      hello: 'hello',
      world: 'world',
    },
    zh: {
      hello: '你好',
      wrold: '世界',
    }
  }
})
</script>
<style scoped>
</style>