<template>
  <div class="market">
    <div class="left-menu">
      <div class="search-container">
        <a-input-search
          v-model:value="searchValue"
          placeholder="搜索插件"
          style="width: 100%"
          @search="onSearch"
        />
      </div>

      <a-menu
        v-model:selectedKeys="current"
        mode="inline"
      >
        <a-menu-item key="finder">
          <template #icon>
            <StarOutlined />
          </template>
          探索
        </a-menu-item>
        <a-menu-item key="worker">
          <template #icon>
            <SendOutlined style="transform: rotate(-45deg)" />
          </template>
          效率
        </a-menu-item>
        <a-menu-item key="tools">
          <template #icon>
            <SearchOutlined />
          </template>
          搜索工具
        </a-menu-item>
        <a-menu-item key="image">
          <template #icon>
            <FileImageOutlined />
          </template>
          图像
        </a-menu-item>
        <a-menu-item key="dev">
          <template #icon>
            <CodeOutlined />
          </template>
          开发
        </a-menu-item>
        <a-menu-item key="system">
          <template #icon>
            <DatabaseOutlined />
          </template>
          系统
        </a-menu-item>
      </a-menu>
    </div>
    <div class="container">
      <component
        :totalPlugins="totalPlugins"
        :is="Components[current[0]]"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  StarOutlined,
  SendOutlined,
  SearchOutlined,
  FileImageOutlined,
  DatabaseOutlined,
  CodeOutlined
} from '@ant-design/icons-vue'
import { reactive, toRefs, computed, ref } from 'vue'
import Finder from './finder.vue'
import { storeToRefs } from 'pinia'

const Components = {
  finder: Finder
  // system: System,
  // worker: Worker,
  // image: Image,
  // tools: Tools,
  // dev: Dev,
}

const current = ref(['finder'])
const searchValue = ref('')
import { userStore } from '../../store/plugins_market_store'
const store = userStore()

const { totalPlugins } = storeToRefs(store)
const onSearch = (value: string) => {
  console.log(value)
}
</script>

<style lang="less" scoped>
// @import '../../assets/common.less';
.market {
  display: flex;
  box-sizing: border-box;
  align-items: flex-start;
  width: 100%;
  overflow: hidden;
  background: var(--color-menu-bg);
  height: calc(~'100vh - 46px');
  .container {
    background: var(--color-body-bg);
    width: calc(~'100% - 200px');
    height: 100%;
    box-sizing: border-box;
    padding: 10px 20px;
    position: relative;
  }
}

.left-menu {
  width: 200px;
  height: 100vh;
  border-right: 1px solid var(--color-border-light);
  .search-container {
    padding: 10px;
  }
  .ant-input-affix-wrapper {
    border: none;
    background: var(--color-input-hover);
    :deep(input) {
      background: none;
      color: var(--color-text-desc);
    }
    :deep(.anticon) {
      color: var(--color-text-desc);
    }
  }
  :deep(.ant-menu) {
    background: var(--color-menu-bg);
    height: 100%;
    border-right: none;
    .ant-menu-item {
      color: var(--color-text-content);
      &:active {
        background: none;
      }
    }
    .ant-menu-item-selected {
      background-color: var(--color-list-hover);
      color: var(--color-text-primary);
      &:after {
        display: none;
      }
    }
  }
}

</style>
