<template>
  <div class="settings flex">
    <div class="left-menu w-150">
      <a-menu
        v-model:selectedKeys="current"
        mode="inline"
      >
        <a-menu-item
          v-for="(value, key) in subItems"
          :key="key"
        >
          <template #icon>
            <component :is="value.icon" />
          </template>
          {{ value.title }}
        </a-menu-item>
      </a-menu>
    </div>
    <div class="settings-detail ml-4 w-full">
      <component
        class=""
        :is="subItems[current[0]].detail"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { ToolOutlined, LaptopOutlined, FileAddOutlined } from '@ant-design/icons-vue'
import base from './base.vue'
import globalkey from './globalkey.vue'
import superpanel from './superpanel.vue'
import { userStore } from './plugins_settings_store'
const subItems = {
  base: {
    key: 'base',
    // title: t('feature.settings.base.title'),
    title: '基本设置',
    icon: ToolOutlined,
    detail: base
  },
  globalkey: {
    key: 'globalkey',
    // title: t('feature.settings.globalkey.title'),
    title: '全局快捷键',
    icon: LaptopOutlined,
    detail: globalkey
  },
  superpanel: {
    key: 'superpanel',
    title: '超级面板',
    // title: t('feature.settings.superpanel.title'),
    icon: FileAddOutlined,
    detail: superpanel
  }
}
const current = ref(['base'])
const store = userStore()
store.init()
</script>
<style scoped lang="less">
.left-menu {
  & /deep/ .ant-menu-inline .ant-menu-item::after {
    border-right: none;
  }
}
</style>
