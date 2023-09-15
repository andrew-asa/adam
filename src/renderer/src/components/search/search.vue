<template>
  <div class="adam-select">
    <div
      class="select-tag"
      v-show="currentPlugin && currentPlugin.pluginName"
    >
      {{ currentPlugin && currentPlugin.pluginName }}
    </div>
    <div
      :class="clipboardFile[0].name ? 'clipboard-tag' : 'clipboard-img'"
      v-if="!!clipboardFile.length"
    >
      <img :src="getIcon()" />
      <div class="ellipse">{{ clipboardFile[0].name }}</div>
      <a-tag
        color="#aaa"
        v-if="clipboardFile.length > 1"
        >{{ clipboardFile.length }}</a-tag
      >
    </div>
    <a-input
      id="search"
      ref="mainInput"
      class="main-input"
      :placeholder="placeholder"
      :value="searchValue"
      @input="changeValue"
      @keydown="keydown"
      autoComplete="off"
    >
      <template #suffix>
        <div class="suffix-tool">
          <MoreOutlined
            @click="showSeparate()"
            class="icon-more"
          />
          <div
            v-if="currentPlugin && currentPlugin.logo"
            style="position: relative"
          >
            <a-spin
              v-show="pluginLoading"
              class="loading"
            >
              <template #indicator>
                <LoadingOutlined style="font-size: 42px" />
              </template>
            </a-spin>
            <img
              class="icon-tool"
              :src="currentPlugin.logo || '../../assets/jarvis.png'"
            />
          </div>
          <div
            @click="() => emit('openMenu')"
            v-else
            class="adam-logo"
          >
            <img src="../../assets/jarvis.png" />
          </div>
        </div>
      </template>
    </a-input>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref } from 'vue'
import { LoadingOutlined, MoreOutlined } from '@ant-design/icons-vue'
import { ctx } from '@renderer/core/context'
import fileIcon from '../../assets/file.png'
import folderIcon from '../../assets/folder.png'


const props: any = defineProps({
  searchValue: {
    type: [String],
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  },
  currentPlugin: {
    type: Object,
    default: {}
  },
  pluginLoading: Boolean,
  clipboardFile: {
    type: Array<{
      name: String,
      dataUrl?: String,
      isFile?: Boolean
      [key: string]: any
    }>,
    default: []
  }
})

const emit = defineEmits([
  'onSearch',
  'onKeydown',
  // 'changeCurrent',
  'openMenu'
  // 'changeSelect',
  // 'choosePlugin',
  // 'focus',
  // 'clearSearchValue',
  // 'readClipboardContent'
])
const changeValue = (e) => {
  emit('onSearch', e)
}
const keydown = (e) => {
  emit('onKeydown', e)
}

const showSeparate = () => {
  let hasPlugin = !!(props.currentPlugin && props.currentPlugin.pluginName)
  ctx.app.controller.showPopupMenu({
    hasPlugin: hasPlugin,
    pluginType: props.currentPlugin.pluginType,
    name: props.currentPlugin.name
  })
}

const changeHideOnBlur = () => {
  // let cfg = { ...config.value };
  // cfg.perf.common.hideOnBlur = !cfg.perf.common.hideOnBlur;
  // opConfig.set(cfg);
  // config.value = cfg;
}

const getIcon = () => {
  if (props.clipboardFile[0].dataUrl) return props.clipboardFile[0].dataUrl
  return props.clipboardFile[0].isFile ? fileIcon : folderIcon
}

const newWindow = () => {
  // ipcRenderer.send('msg-trigger', {
  //   type: 'detachPlugin',
  // });
  // todo
}

const mainInput = ref(null)
// window.rubick.hooks.onShow = () => {
//   (mainInput.value as unknown as HTMLDivElement).focus();
// };

// window.rubick.hooks.onHide = () => {
//   emit('clearSearchValue');
// };
</script>

<style lang="less">
.adam-select {
  display: flex;
  padding-left: 10px;
  background: #fff;
  // position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  align-items: center;
  .ellipse {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 200px;
  }

  .select-tag {
    white-space: pre;
    user-select: none;
    font-size: 18px;
    border-radius: 16px;
    height: 32px;
    position: relative;
    color: #fff;
    background-color: rgba(255, 78, 164, 0.8);
    display: inline-flex;
    align-items: center;
    margin-right: 1px;
    padding: 0 10px;
  }

  .main-input {
    height: 60px !important;
    box-sizing: border-box;
    flex: 1;
    border: none;
    outline: none;
    box-shadow: none !important;

    .ant-select-selection,
    .ant-input,
    .ant-select-selection__rendered {
      height: 100% !important;
      font-size: 22px;
      border: none !important;
    }
  }
  .adam-logo,
  .icon-tool {
    width: 40px;
    height: 40px;
    background: #574778;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 100%;
    img {
      width: 32px;
    }
  }
  .icon-tool {
    background: #fff;
  }
  .ant-input:focus {
    border: none;
    box-shadow: none;
  }
  .suffix-tool {
    display: flex;
    align-items: center;
    .icon-more {
      font-size: 26px;
      font-weight: bold;
      cursor: pointer;
    }
    .loading {
      color: #ff4ea4;
      position: absolute;
      top: 0;
      left: 0;
    }
  }
  .clipboard-tag {
    white-space: pre;
    user-select: none;
    font-size: 16px;
    height: 32px;
    position: relative;
    align-items: center;
    display: flex;
    border: 1px solid #e6e6e6;
    padding: 0 8px;
    margin-right: 12px;
    img {
      width: 24px;
      height: 24px;
      margin-right: 6px;
    }
  }
  .clipboard-img {
    white-space: pre;
    user-select: none;
    font-size: 16px;
    height: 32px;
    position: relative;
    align-items: center;
    display: flex;
    img {
      width: 32px;
      height: 32px;
    }
  }
}
</style>
