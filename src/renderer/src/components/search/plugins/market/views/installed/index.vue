<template>
  <a-layout style="max-height: 500px; height: 500px">
    <a-layout-sider
      class="installed-list"
      width="300"
    >
      <a-list
        item-layout="horizontal"
        :data-source="installeds"
      >
        <template #renderItem="{ item }">
          <a-list-item
            :class="currentShow.name === item.name ? 'active plugin-item' : 'plugin-item'"
            @click="() => clickPlugin(item)"
          >
            <a-list-item-meta :description="item.description">
              <template #title>
                {{ item.pluginName }}
              </template>
              <template #avatar>
                <a-avatar :src="item.logo" />
              </template>
            </a-list-item-meta>
          </a-list-item>
        </template>
      </a-list>
    </a-layout-sider>
    <a-layout-content class="installed-item">
      <div class="mt10">
        <span class="fs18 fw600">{{ currentShow.pluginName }}</span>
        <span>{{ '   ' + currentShow.version }}</span>
      </div>
      <div class="mt10">
        <a-button
          type="primary"
          class="mr5"
          shape="round"
          @click="showPluginDetail = true"
        >
          <template #icon>
            <star-outlined />
          </template>
          版本更新说明
        </a-button>
        <a-button
          type="primary"
          shape="round"
          danger
        >
          卸载
          <template #icon>
            <minus-circle-outlined />
          </template>
        </a-button>
      </div>
      <a-divider orientation="center">关键字</a-divider>
      <Keyword :features="features" />
    </a-layout-content>
  </a-layout>
  <plugin_detail :detail="currentShow" :visible="showPluginDetail" @onClose="showPluginDetail = false" />
</template>
<script setup lang="ts">
import { StarOutlined, MinusCircleOutlined } from '@ant-design/icons-vue'
import { ctx } from '@/renderer/src/startup/ctx_starter'
import { onMounted, ref } from 'vue'
import { userStore } from '../../store/plugins_market_store'
import { storeToRefs } from 'pinia'
import { ThirdPlugin, ThirdPluginFeature } from '@/common/core/plugins'
import Keyword from './keyword.vue'
import { copyFeatures } from '@/common/plugin/plugin_meta_utils'
import plugin_detail from '../widget/plugin_detail.vue'
const store = userStore()
const { installeds } = storeToRefs(store)
const currentShow = ref<{ [name: string]: any }>({})
const features = ref<Array<ThirdPluginFeature>>([])
const showPluginDetail = ref(false)
onMounted(() => {
  ctx.services.plugin.getInstalledPlugins().then((res) => {
    if (res && res.length) {
      store.setInstalledPlugins(res)
      currentShow.value = res[0].name
      clickPlugin(res[0])
    }
  })
})
const clickPlugin = (item: ThirdPlugin) => {
  console.log(`clickPlugin ${item.pluginName}`)
  currentShow.value = {
    logo: item.logo,
    name: item.name,
    pluginName: item.pluginName,
    description: item.description,
    version: item.version
  }
  const f = copyFeatures(item.features)
  console.log(f)
  features.value = f
}
</script>
<style scoped lang="less">
.installed-list {
  background: #fafafa;
  .plugin-item {
    padding: 0;
    height: 60px;
    &.active {
      background: #dee2e8;
    }
    .ant-list-item-meta-content {
      height: 100%;
    }
  }
}
.installed-item {
}
</style>
