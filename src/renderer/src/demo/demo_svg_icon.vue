<template>
  <div class="mb-4 mt-2 flex items-center justify-center">
    <a-input-search
      v-model:value="searchText"
      placeholder="按键回车搜索图标"
      style="width: 400px"
      @search="onSearch"
      @keydown.enter="onSearch"
      :allow-clear="true"
    />
  </div>
  <div class="grid grid-cols-4 gap-4">
    <div
      v-for="op in svgIcons"
      :key="op"
      @contextmenu.exact.prevent.stop="(e) => showContextMenu(e, op)"
    >
      <span>{{ op }}</span>
      <svg-icon
        :name="op"
        width="24px"
        height="24px"
        class="mr-2 ml-2"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { icons } from '@renderer/components/widgets/icons/svgicon'
import _ from 'lodash'
import { ref } from 'vue'
import { MenuSetting } from '@renderer/components/widgets/mouse-menu/types'
import { CustomMouseMenu } from '@renderer/components/widgets/mouse-menu/MouseMenu'
import { CommonUtils } from '../utils/CommonUtils'
import { message } from 'ant-design-vue'

const svgIcons = ref(_.keys(icons))
const searchText = ref('')
const onSearch = () => {
  if (searchText.value) {
    svgIcons.value = svgIcons.value.filter((item) => {
      return item.includes(searchText.value)
    })
  } else {
    svgIcons.value = _.keys(icons)
  }
}
const copyIcon = (icon: string) => {
  const text = `<svg-icon name="${icon}" width="12px"/>`
  CommonUtils.copyToClipboard(text).then(() => {
    message.success('复制成功')
  })
  // console.log(`${text}`);
}
const showContextMenu = (e, op: string) => {
  const menuList: MenuSetting[] = [{ label: '复制 ' + op, fn: () => copyIcon(op) }]
  e.preventDefault()
  const MouseMenuCtx = CustomMouseMenu({
    el: e.target,
    // Other Options
    menuList
  })
  const { x, y } = e
  MouseMenuCtx.show(x, y)
}
</script>
<style scoped></style>
