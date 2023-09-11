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
    <a-layout-content
      width="600"
      class="installed-item ml-2"
    >
      <div class="mt-3">
        <span class="text-lg font-bold">{{ currentShow.pluginName }}</span>
        <span>{{ '   ' + currentShow.version }}</span>
      </div>
      <div class="mt-3">
        <a-button
          type="primary"
          class="mr-2"
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
        <a-button
          type="primary"
          shape="round"
          class="ml-2"
          @click="settingPlugin"
        >
          设置
          <template #icon>
            <setting-outlined />
          </template>
        </a-button>
      </div>
      <a-divider orientation="center">关键字</a-divider>
      <Keyword
        :features="features"
        @run="runPlugin"
      />
    </a-layout-content>
  </a-layout>
  <plugin_detail
    :detail="currentShow"
    :visible="showPluginDetail"
    @onClose="showPluginDetail = false"
  />
  <Plugin_settings_edit
    :detail="currentShow"
    :visible="showPluginSetting"
    @onClose="showPluginSetting = false"
    :settings="pluginsSeting"
    @on-save="savePluginSettings"
    @onReset="resetPluginSettings"
  />
</template>
<script setup lang="ts">
import { StarOutlined, MinusCircleOutlined, SettingOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import { ctx } from '@/renderer/src/startup/ctx_starter'
import { onMounted, ref } from 'vue'
import { userStore } from '../../store/plugins_market_store'
import { storeToRefs } from 'pinia'
import { ThirdPlugin, ThirdPluginFeature } from '@/common/core/plugins'
import Keyword from './keyword.vue'
import { copyFeatures } from '@/common/plugin/plugin_meta_utils'
import plugin_detail from '../widget/plugin_detail.vue'
import Plugin_settings_edit from '../widget/plugin_settings_edit.vue'
import _ from 'lodash'
const store = userStore()
const { installeds } = storeToRefs(store)
const currentShow = ref<{ name?: string; [key: string]: any }>({})
const features = ref<Array<ThirdPluginFeature>>([])
const showPluginDetail = ref(false)
const showPluginSetting = ref(false)
const pluginsSeting = ref({})
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
  // console.log(`clickPlugin ${item.pluginName}`)
  currentShow.value = {
    logo: item.logo,
    name: item.name,
    pluginName: item.pluginName,
    description: item.description,
    version: item.version,
    pluginType: item.pluginType
  }
  const f = copyFeatures(item.features)
  features.value = f
}

const showSettingPanel = () => {
  showPluginSetting.value = true
}
const hideSettingPanel = () => {
  showPluginSetting.value = false
}
const settingPlugin = () => {
  ctx.services.plugin.getPluginSettings(currentShow.value.name).then((res) => {
    pluginsSeting.value = res
    showSettingPanel()
  })
}

const savePluginSettings = (settings) => {
  ctx.services.plugin.updatePluginSettings(currentShow.value.name, settings).then(() => {
    message.success('保存成功')
    pluginsSeting.value = settings
    hideSettingPanel()
  })
}

const resetPluginSettings = () => {
  ctx.services.plugin.resetPluginSettings(currentShow.value.name).then((res) => {
    pluginsSeting.value = res
  })
}
const runPlugin = ({ feature, cmd }) => {
  ctx.app.search.open(
    {
      name: currentShow.value.name,
      pluginName: currentShow.value.pluginName,
      pluginType: currentShow.value.pluginType,
      logo: currentShow.value.logo
    },
    {
      playload: cmd,
      code: feature?.code || ''
    }
  )
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
  // background: #fafafa;

  width: 600px;
}
</style>
