<template>
  <div class="tabs flex">
    <div
      v-for="(tab, index) in tabs"
      :title="tab.description"
      :class="{
        active: tab.key === selectKey,
        tab: true
      }"
      :data-key="tab.key"
      @mouseup.middle="removeTabs([tab])"
      @mousedown.left="switchTab(tab)"
      @contextmenu.exact.prevent.stop="(e) => showContextMenu(e, tab)"
    >
      <div class="label">
        {{ tab.label }}
      </div>
      <div
        class="icon"
        :title="'关闭'"
        @mousedown.prevent.stop="removeTabs([tab])"
      >
        <svg-icon
          name="times"
          style="width: 12px; height: 12px"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { CustomMouseMenu } from '../mouse-menu/MouseMenu'
import { MenuSetting } from '../mouse-menu/types'
import { TabItem } from './types'
const props = defineProps({
  selectKey: {
    type: String
  },
  tabs: {
    type: Array<TabItem>,
    default: () => []
  }
})
const emits = defineEmits(['remove', 'switch'])
const removeTabs = (items: TabItem[]) => {
  emits('remove', items)
}

const switchTab = (item: TabItem) => {
  emits('switch', item)
}
function removeOther(item: TabItem) {
  removeTabs(props.tabs.filter((x) => x.key !== item.key && !x.fixed))
}
function removeRight(item: TabItem) {
  if (item.fixed) {
    removeTabs(props.tabs.filter((x) => !x.fixed))
  } else {
    removeTabs(props.tabs.slice(props.tabs.findIndex((x) => x.key === item.key) + 1))
  }
}

function removeLeft(item: TabItem) {
  if (item.fixed) {
    return
  }

  const start = props.tabs.findIndex((x) => !x.fixed)
  removeTabs(
    props.tabs.slice(
      start,
      props.tabs.findIndex((x) => x.key === item.key)
    )
  )
}
function removeAll() {
  removeTabs(props.tabs.filter((x) => !x.fixed))
}
function toggleFix(item: TabItem) {}
const showContextMenu = (e, item: TabItem) => {
  const menuList: MenuSetting[] = [
    { label: '关闭', fn: () => removeTabs([item]) },
    { label: '关闭其它', fn: () => removeOther(item) },
    { label: '关闭右侧', fn: () => removeRight(item) },
    { label: '关闭左侧', fn: () => removeLeft(item) },
    { label: '关闭所有', fn: () => removeAll() },
    { line: true },
    { label: item.fixed ? '解固' : '固定', fn: () => toggleFix(item) },
    { label: '分离窗口', fn: () => toggleFix(item) }
  ]
  e.preventDefault()
  const MouseMenuCtx = CustomMouseMenu({
    el: e.target,
    // Other Options
    menuList
  })
  MouseMenuCtx.showOnPoint(e)
}
</script>
<style scoped lang="less">
@import '@/renderer/assets/less/style.less';
.tab {
  width: fit-content;
  max-width: 250px;
  min-width: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 1px;
  color: @--g-color-25;
  cursor: default;
  font-size: 12px;
  overflow: hidden;
  background: @--g-color-87;
}
.label {
  padding: 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.tab.active {
  color: @--g-color-0;
  background: @--g-color-100;
  border-radius: var(--g-border-radius);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  position: relative;
}

.icon {
  color: @--g-color-50;
  height: 18px;
  width: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  margin-right: 5px;
  flex: none;
}
.icon:hover {
  color: @--g-color-40;
  background: @--g-color-75;
}
</style>
