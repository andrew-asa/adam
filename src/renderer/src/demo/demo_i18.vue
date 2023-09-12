<template>
  <div>

    <div>{{ $t('hello') }}</div>
    <div>{{ tip }}</div>
  </div>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const tip = t('feature.installed.keyword.play')
console.log(`${tip}`)
</script>
<style scoped></style>
