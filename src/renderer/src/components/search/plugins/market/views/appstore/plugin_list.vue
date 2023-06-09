<template>
  <div class="panel-item">
    <h3 class="title">{{ title }}</h3>
    <div class="list-item">
      <a-list
        :grid="{ gutter: 16, column: 2 }"
        :data-source="list.filter((item) => !!item)"
      >
        <template #renderItem="{ item, index }">
          <a-list-item
            v-if="item"
            @click="showDetail(item)"
          >
            <template #actions>
              <a-button
                style="color: #ff4ea4"
                type="text"
                :loading="item.isloading"
              >
                <CloudDownloadOutlined
                  v-show="!item.isloading && !item.isdownload"
                  @click.stop="downloadPlugin(item)"
                  style="font-size: 20px; cursor: pointer"
                />
              </a-button>
            </template>
            <a-list-item-meta>
              <template #description>
                <span class="ellipse desc">{{ item.description }}</span>
              </template>
              <template #title>
                <span class="ellipse">{{ item.pluginName }}</span>
              </template>
              <template #avatar>
                <a-avatar :src="item.logo" />
              </template>
            </a-list-item-meta>
          </a-list-item>
        </template>
      </a-list>
    </div>
  </div>

  <a-drawer
    width="100%"
    placement="right"
    :closable="false"
    :visible="visible"
    :mask-closable="false"
    class="plugin-info"
    :get-container="false"
    @close="visible = false"
  >
    <template #title>
      <div class="plugin-title-info">
        <div
          class="back-icon"
          @click="visible = false"
        >
          <ArrowLeftOutlined />
        </div>
        <div class="info">
          <img
            :src="detail.logo"
            class="plugin-icon"
          />
          <div class="plugin-desc">
            <div class="title">
              {{ detail.pluginName }}
            </div>
            <div class="desc">
              {{ detail.description }}
            </div>
            <a-button
              v-if="!detail.isdownload"
              @click.stop="downloadPlugin(detail)"
              shape="round"
              type="primary"
              :loading="detail.isloading"
            >
              <template #icon>
                <CloudDownloadOutlined v-show="!detail.isloading && !detail.isdownload" />
              </template>
              获取
            </a-button>
          </div>
        </div>
      </div>
    </template>
    <div
      v-html="content"
      class="home-page-container"
    ></div>
  </a-drawer>
</template>

<script lang="ts" setup>
import { CloudDownloadOutlined, ArrowLeftOutlined } from '@ant-design/icons-vue'

import { defineProps, ref } from 'vue'
import { message } from 'ant-design-vue'
import MarkdownIt from 'markdown-it'
import { getPluginDetail } from '../../action/plugins_market_require'
import { ThirdPlugin } from '@/common/core/plugins'
import { userStore } from '../../store/plugins_market_store'
import { storeToRefs } from 'pinia'
const store = userStore()
const startDownload = () => {}
const successDownload = () => {}

defineProps({
  list: {
    type: Array<ThirdPlugin>,
    default: []
  },
  title: String
})

const downloadPlugin = async (plugin: ThirdPlugin) => {
  // startDownload(plugin.name)
  // plugin.isloading = true
  store.install(plugin)
  // await window.market.downloadPlugin(plugin);
  message.success(`${plugin.name}安装成功！`)
  // successDownload(plugin.name)
}

const visible = ref(false)
const detail = ref<any>({})
const markdown = new MarkdownIt()
const content = ref('')

const showDetail = async (item) => {
  visible.value = true
  detail.value = item
  let mdContent = '暂无内容'
  if (item.homePage) {
    mdContent = await getPluginDetail(item.homePage)
  }
  content.value = markdown.render(mdContent)
}
</script>

<style lang="less">
&::-webkit-scrollbar {
  width: 0;
}
.panel-item {
  margin: 20px 0;
  .title {
    margin-bottom: 30px;
    color: var(--color-text-primary);
  }
  .ellipse {
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
    color: var(--color-text-content);
    &.desc {
      color: var(--color-text-desc);
    }
  }
  &:after {
    content: ' ';
    display: block;
    width: 100%;
    height: 1px;
    border-bottom: 1px solid var(--color-border-light);
    transform: scaleY(0.5);
  }
  .ant-list-item {
    display: flex !important;
  }

  &:last-child {
    border-bottom: none;
  }
}

.plugin-title-info {
  display: flex;
  align-items: flex-start;

  .back-icon {
    font-size: 16px;
    margin-right: 40px;
  }

  .info {
    display: flex;
    align-items: center;

    .plugin-icon {
      width: 100px;
      height: 100px;
      margin-right: 20px;
    }

    .plugin-desc {
      .title {
        font-size: 18px;
        font-weight: bold;
        color: var(--color-text-primary);
      }

      .desc {
        font-size: 12px;
        font-weight: normal;
        margin-top: 5px;
        margin-bottom: 20px;
        color: var(--color-text-desc);
      }
    }
  }
}
</style>
