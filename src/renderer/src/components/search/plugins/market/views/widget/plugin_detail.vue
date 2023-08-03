<template>
  <a-drawer
    width="100%"
    placement="right"
    :closable="false"
    :visible="visible"
    :mask-closable="false"
    class="plugin-info"
    :get-container="false"
    @close="close()"
  >
    <template #title>
      <div class="plugin-title-info">
        <div
          class="back-icon"
          @click="close()"
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
            <!-- <a-button
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
            </a-button> -->
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
<script setup lang="ts">
import { ref } from 'vue'
import MarkdownIt from 'markdown-it'
import { ArrowLeftOutlined } from '@ant-design/icons-vue'

const props = defineProps({
  detail: {
    type: [Object],
    default: ''
  },
  visible: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits([
  // 单击插件
  'onClose'
])
const markdown = new MarkdownIt()
const content = ref('')

const close = () => {
  emit('onClose')
}
</script>
<style scoped lang="less">
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
