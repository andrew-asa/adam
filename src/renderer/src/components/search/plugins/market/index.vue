<template>
  <div class="main-container">
    <div class="slider-bar">
      <a-menu
        v-model:selectedKeys="active"
        mode="horizontal"
        @select="({ key }) => changeMenu(key)"
      >
        <a-menu-item key="appstore">
          <template #icon>
            <AppstoreOutlined />
          </template>
          插件市场
        </a-menu-item>
        <a-menu-item key="installed">
          <template #icon>
            <HeartOutlined />
          </template>
          已安装
        </a-menu-item>
        <a-menu-item key="settings">
          <template #icon>
            <SettingOutlined />
          </template>
          设置
        </a-menu-item>
        <a-menu-item key="account">
          <template #icon>
            <UserOutlined />
          </template>
          账户
        </a-menu-item>
        <a-menu-item key="dev">
          <template #icon>
            <BugOutlined />
          </template>
          开发者
        </a-menu-item>
      </a-menu>
    </div>
    <div class="sub-container">
      <component :is="Components[active[0]]" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import account from './views/account/index.vue'
import appstore from './views/appstore/index.vue'
import dev from './views/dev/index.vue'
import installed from './views/installed/index.vue'
import settings from './views/settings/index.vue'
import "./assets/ant_reset.less";
import {
  HeartOutlined,
  UserOutlined,
  AppstoreOutlined,
  SettingOutlined,
  BugOutlined
} from '@ant-design/icons-vue'

const active = ref(['appstore'])
const changeMenu = (key: any) => {
  // router.push(key);
}
const Components = {
  account: account,
  appstore: appstore,
  dev: dev,
  installed: installed,
  settings: settings
}
</script>
<style lang="less" >
* {
  margin: 0;
  padding: 0;
}

.main-container {
  display: flex;
  align-items: flex-start;
  background: var(--color-body-bg);
  flex-direction: column;

  .slider-bar {
    width: 100%;
    .ant-menu {
      background: var(--color-body-bg);
      border-color: var(--color-border-light);
      :deep(.ant-menu-item) {
        &:not(.ant-menu-item-selected) {
          color: var(--color-text-primary);
        }
      }
    }
  }
}
.sub-container{
  width: 800px;
}
</style>
