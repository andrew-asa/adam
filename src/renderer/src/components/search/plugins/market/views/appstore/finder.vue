<template>
  <div class="finder">
    <a-carousel arrows>
      <template #prevArrow>
        <div
          class="custom-slick-arrow"
          style="left: 10px; z-index: 1"
        >
          <left-circle-outlined />
        </div>
      </template>
      <template #nextArrow>
        <div
          class="custom-slick-arrow"
          style="right: 10px"
        >
          <right-circle-outlined />
        </div>
      </template>
      <!-- <div :key="index" v-for="(banner, index) in (data.banners || [])">
        <img @click="jumpTo(banner.link)" width="100%" :src="banner.src" />
      </div> -->
    </a-carousel>
    <PluginList
      v-if="recommend && !!recommend.length"
      title="推荐"
      :list="recommend"
    />
    <PluginList
      v-if="newList && !!newList.length"
      title="最近更新"
      :list="newList"
    />
  </div>
</template>
<script setup lang="ts">
import { LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons-vue'
import PluginList from './plugin_list.vue'
import { computed, ref } from 'vue'
import { total_plugins } from '../../action/fake/total_plugins'
import { ThirdPlugin } from '@/common/core/plugins'

import { userStore } from '../../store/plugins_market_store'
import { storeToRefs } from 'pinia'
const store = userStore()
const { totalPlugins, recommendPlugins, newPlugins } = storeToRefs(store)

// defineProps({
//   totalPlugins: {
//     type: Array<ThirdPlugin>,
//     default: []
//   }
// })
// const recommendPlugins = ref(total_plugins)

const recommend = computed(() => {
  const defaultData = recommendPlugins.value || []
  if (!defaultData.length) return []
  return defaultData.map((plugin) => {
    let searchInfo = null
    totalPlugins.value.forEach((t) => {
      if (t.name === plugin) {
        searchInfo = t
      }
    })
    return searchInfo
  })
})
const newList = computed(() => {
  const defaultData = newPlugins.value || []
  if (!defaultData.length) return []
  return defaultData.map((plugin) => {
    let searchInfo = null
    totalPlugins.value.forEach((t) => {
      if (t.name === plugin) {
        searchInfo = t
      }
    })
    return searchInfo
  })
})
</script>
<style scoped lang="less">
.finder {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  box-sizing: border-box;
  &::-webkit-scrollbar {
    width: 0;
  }
  .ant-carousel .slick-slide {
    text-align: center;
    height: 235px;
    line-height: 160px;
    overflow: hidden;
    border-radius: 4px;
    img {
      width: 100%;
      height: 235px;
    }
  }
  .ant-carousel .custom-slick-arrow {
    width: 25px;
    height: 25px;
    font-size: 25px;
    color: #fff;
    background-color: rgba(31, 45, 61, 0.11);
    opacity: 0.3;
  }

  .ant-carousel .custom-slick-arrow.slick-next:focus {
    color: #fff;
  }

  .ant-carousel .custom-slick-arrow:before {
    display: none;
  }

  .ant-carousel .custom-slick-arrow:hover {
    opacity: 0.5;
  }

  .ant-carousel .slick-slide h3 {
    color: #fff;
  }
}
</style>
