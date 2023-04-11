<template>
  <div
    class="area area-1"
    v-contextmenu="{ name: 'area-1_contextmenus' }"
  >
    {{ area1 }}
  </div>
  <div
    class="area area-2"
    v-contextmenu="{ name: 'area-2_contextmenus' }"
  >
    {{ area2 }}
  </div>
  <div class="area area-3">{{ area3 }}</div>

  <context-menu :name="`area-1_contextmenus`">
    <context-menu-item @click="setText('area1', 'area1前进')"> 前进 </context-menu-item>
    <context-menu-item @click="setText('area1', 'area1后退')"> 后退 </context-menu-item>
  </context-menu>

  <context-menu :name="`area-2_contextmenus`">
    <context-menu-item @click="setText('area2', '上')" :divider="true"> 上 </context-menu-item>
    <context-menu-item @click="setText('area2', '下')"> 下 </context-menu-item>
  </context-menu>
</template>
<script lang="ts">
import { inject, openBlock } from 'vue'

export default {
  data() {
    return {
      area1: 'area-1',
      area2: 'area-2',
      area3: 'area-3'
    }
  },
  props: {},
  components: {},
  setup(props) {
    const emitContext = inject('emitContext') as (
      event: Event,
      dataId: Record<string, unknown>
    ) => void
    return {
      emitContext
    }
  },
  methods: {
    setText: function (type, text) {
      this[type] = text
    },
    openContextMenu(e, name) {
      this.emitContext(e, { name: name })
    }
  }
}
</script>
<style scoped>
.area {
  width: 100px;
  height: 100px;
}
.area-1 {
  background-color: aliceblue;
}
.area-2 {
  background-color: aqua;
}
.area-3 {
  background-color: aquamarine;
}
</style>
