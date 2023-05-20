<template>
  <!-- <div class="options">
    <el-scrollbar>
      <div
        class="op-item"
        v-for="item in options"
      >
        <span v-html="renderTitle(item.name)"></span>
        <el-avatar
          style="border-radius: 0"
          shape="square"
          :size="50"
          :src="`${item.icon_path}`"
        />
      </div>
    </el-scrollbar>
  </div> -->
  <div class="options">
    <el-scrollbar>
      <AList
        item-layout="horizontal"
        :dataSource="options"
      >
        <template #renderItem="{ item, index }">
          <AListItem
            @click="() => item.click && item.click()"
            :class="currentSelect === index ? 'active op-item' : 'op-item'"
          >
            <AListItemMeta :description="renderDesc(item.path)">
              <template #title>
                <span v-html="renderTitle(item.name)"></span>
              </template>
              <template #avatar>
                <a-avatar
                  style="border-radius: 0"
                  :src="item.icon_path"
                />
              </template>
            </AListItemMeta>
          </AListItem>
        </template>
      </AList>
    </el-scrollbar>
  </div>
</template>
<script setup lang="ts">
import 'ant-design-vue/lib/button/style/css'
import _ from 'lodash'

const props = defineProps({
  searchValue: {
    type: [String],
    default: ''
  },
  options: {
    type: Array,
    default: (() => [])()
  },
  currentSelect: {
    type: Number,
    default: 0
  },
  currentPlugin: {},
  clipboardFile: {
    type: Array,
    default: (() => [])()
  }
})
const renderDesc = (desc) => {
  if (desc.length > 80) {
    return `${desc.substr(0, 63)}...${desc.substr(desc.length - 14, desc.length)}`
  }
  return desc
}
const renderTitle = (title) => {
  if (typeof title !== 'string') {
    return ''
  }
  if (!props.searchValue) {
    return title
  }
  const result = _.toLower(title).split(_.toLower(props.searchValue))
  if (result && result.length > 1) {
    return `<div>${result[0]}<span style='color: red'>${props.searchValue}</span>${result[1]}</div>`
  } else {
    return `<div>${result[0]}</div>`
  }
}

const sort = (options) => {
  for (let i = 0; i < options.length; i++) {
    for (let j = i + 1; j < options.length; j++) {
      if (options[j].zIndex > options[i].zIndex) {
        let temp = options[i]
        options[i] = options[j]
        options[j] = temp
      }
    }
  }
  return options
}
</script>
<style scoped lang="less">
.options {
  // position: absolute;
  // top: 62px;
  // left: 0;
  width: 100%;
  z-index: 99;
  max-height: calc(~'100vh - 64px');
  // overflow: auto;
  // background: var(--color-body-bg);
  .op-item {
    padding: 0 10px;
    height: 60px;
    line-height: 50px;
    max-height: 500px;
    overflow: auto;
    background: #fafafa;
    &.active {
      background: #dee2e8;
    }
  }
}
</style>
